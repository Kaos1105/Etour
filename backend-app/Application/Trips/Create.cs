using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using System.Linq;
using Persistence;

namespace Application.Trips
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid TripId { get; set; }
            public string TripName { get; set; }
            public DateTime StartDate { get; set; }
            public string Description { get; set; }
            public string Notes { get; set; }
            public long Price { get; set; }
            public string TripType { get; set; }
            public Guid TourId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.TripName).NotEmpty();
                RuleFor(x => x.StartDate).NotEmpty();
                RuleFor(x => x.Price).NotEmpty();
                RuleFor(x => x.TripType).NotEmpty();
                RuleFor(x => x.TourId).NotEmpty();
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
                var existTrip = _context.Trips.FirstOrDefault(x => x.TripName == request.TripName);
                var tour = await _context.Tours.FindAsync(request.TourId);

                if (tour == null && request.TourId != Guid.Empty && request.TourId != null)
                    throw new RestException(HttpStatusCode.NotFound, new { Tour = "Not found" });

                if (existTrip != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Trip = "Trip with same name already exist" });
                }

                var trip = new Trip
                {
                    TripId = request.TripId,
                    TripType = request.TripType,
                    TripName = request.TripName,
                    Description = request.Description,
                    Notes = request.Notes,
                    Price = request.Price,
                    StartDate = request.StartDate,
                    EndDate = request.StartDate.AddHours(tour.TourDuration),
                    Tour = tour,
                    IsActive = true,
                };

                _context.Trips.Add(trip);

                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}