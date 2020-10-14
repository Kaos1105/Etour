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

namespace Application.Tours
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid TourId { get; set; }
            public string TourName { get; set; }
            public string TourType { get; set; }
            public string Description { get; set; }
            public string Notes { get; set; }
            public int TourDuration { get; set; }
            public Guid? StartPlaceId { get; set; }
            public Guid? EndPlaceId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.TourName).NotEmpty();
                RuleFor(x => x.TourType).NotEmpty();
                RuleFor(x => x.TourDuration).NotEmpty();
                RuleFor(x => x.StartPlaceId).NotEmpty();
                RuleFor(x => x.EndPlaceId).NotEmpty();
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
                var existTour = _context.Tours.FirstOrDefault(x => x.TourName == request.TourName);
                var startPlace = await _context.Places.FindAsync(request.StartPlaceId);
                var endPlace = await _context.Places.FindAsync(request.EndPlaceId);

                if ((startPlace == null && request.StartPlaceId != Guid.Empty && request.StartPlaceId != null) || (endPlace == null && request.EndPlaceId != Guid.Empty && request.EndPlaceId != null))
                    throw new RestException(HttpStatusCode.NotFound, new { Place = "Not found" });

                if (existTour != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Tour = "Tour with same name already exist" });
                }

                var tour = new Tour
                {
                    TourId = request.TourId,
                    TourType = request.TourType,
                    TourName = request.TourName,
                    Description = request.Description,
                    Notes = request.Notes,
                    TourDuration = request.TourDuration,
                    StartPlace = startPlace,
                    EndPlace = endPlace,
                    IsActive = true,
                };

                _context.Tours.Add(tour);

                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}