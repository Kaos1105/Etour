using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Trips
{
    public class Edit
    {
        public class Command : IRequest
        {
            //command properties
            public Guid? TripId { get; set; }
            public string TripName { get; set; }
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public string Description { get; set; }
            public string Notes { get; set; }
            public long? Price { get; set; }
            public string TripType { get; set; }
            public Guid? TourId { get; set; }
            public bool? IsActive { get; set; }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.TripId).NotEmpty();
                    //RuleFor(x => x.TourType).NotEmpty();
                    //RuleFor(x => x.TourDuration).NotEmpty();
                    //RuleFor(x => x.StartPlaceId).NotEmpty();
                    //RuleFor(x => x.EndPlaceId).NotEmpty();
                }
            }

            public class Handler : IRequestHandler<Command>
            {
                private readonly DataContext _context;
                public Handler(DataContext context)
                {
                    this._context = context;
                }

                public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                {
                    //handler logic
                    var trip = await _context.Trips.FindAsync(request.TripId);
                    var tour = await _context.Tours.FindAsync(request.TourId);

                    if (tour == null && request.TourId != Guid.Empty && request.TourId != null)
                        throw new RestException(HttpStatusCode.NotFound, new { Tour = "Not found" });
                    if (trip == null)
                        throw new RestException(HttpStatusCode.NotFound, new { Trip = "Not found" });
                    trip.TripName = request.TripName ?? trip.TripName;
                    trip.TripType = request.TripType ?? trip.TripType;
                    trip.Description = request.Description ?? trip.Description;
                    trip.Notes = request.Notes ?? trip.Notes;
                    trip.Price = request.Price ?? trip.Price;
                    trip.StartDate = request.StartDate ?? trip.StartDate;
                    trip.EndDate = request.EndDate ?? trip.StartDate.AddHours(tour.TourDuration);
                    trip.IsActive = request.IsActive ?? trip.IsActive;
                    trip.Tour = tour;

                    //return result
                    var isSuccess = await _context.SaveChangesAsync() > 0;
                    if (isSuccess) return Unit.Value;

                    throw new Exception("Problem saving changes");
                }
            }
        }
    }
}