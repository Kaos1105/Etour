using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Tours
{
    public class Edit
    {
        public class Command : IRequest
        {
            //command properties

            public Guid? TourId { get; set; }
            public string TourName { get; set; }
            public string TourType { get; set; }
            public string Description { get; set; }
            public string Notes { get; set; }
            public int? TourDuration { get; set; }
            public bool? IsActive { get; set; }
            public Guid? StartPlaceId { get; set; }
            public Guid? EndPlaceId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                //RuleFor(x => x.TourId).NotEmpty();
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
                var startPlace = await _context.Places.FindAsync(request.StartPlaceId);
                var endPlace = await _context.Places.FindAsync(request.EndPlaceId);
                var tour = await _context.Tours.FindAsync(request.TourId);

                if ((startPlace == null && request.StartPlaceId != Guid.Empty && request.StartPlaceId != null) || (endPlace == null && request.EndPlaceId != Guid.Empty && request.EndPlaceId != null))
                    throw new RestException(HttpStatusCode.NotFound, new { Place = "Not found" });
                if (tour == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Tour = "Not found" });
                tour.TourType = request.TourType ?? tour.TourType;
                tour.TourName = request.TourName ?? tour.TourName;
                tour.Description = request.Description ?? tour.Description;
                tour.Notes = request.Notes ?? tour.Notes;
                tour.TourDuration = request.TourDuration ?? tour.TourDuration;
                tour.StartPlace = startPlace;
                tour.EndPlace = endPlace;
                tour.IsActive = request.IsActive ?? tour.IsActive;

                //return result
                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}