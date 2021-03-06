using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Places
{
    public class Edit
    {
        public class Command : IRequest
        {
            //command properties
            public Guid? PlaceId { get; set; }
            public string PlaceName { get; set; }
            public Guid? ParentPlaceId { get; set; }
            public string Description { get; set; }
            public bool? IsActive { get; set; }
            public string Notes { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                //RuleFor(x => x.PlaceId).NotEmpty();
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
                var place = await _context.Places.FindAsync(request.PlaceId);
                var parentPlace = await _context.Places.FindAsync(request.ParentPlaceId);

                if (parentPlace == null && request.ParentPlaceId != Guid.Empty && request.ParentPlaceId != null)
                    throw new RestException(HttpStatusCode.NotFound, new { ParentPlace = "Not found" });
                if (place == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Place = "Not found" });
                place.PlaceName = request.PlaceName ?? place.PlaceName;
                place.Description = request.Description ?? place.Description;
                place.ParentPlace = parentPlace ?? place.ParentPlace;
                place.Notes = request.Notes ?? place.Notes;
                place.IsActive = request.IsActive ?? place.IsActive;

                //return result
                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}