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
            public Guid PlaceId { get; set; }
            public string PlaceName { get; set; }
            public Place ParentPlace { get; set; }
            public string Description { get; set; }
            public bool IsActive { get; set; }
            public string Notes { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.PlaceName).NotEmpty();
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
                if (place == null)
                    throw new RestException(HttpStatusCode.NotFound, new { place = "Notfound" });
                place.PlaceName = request.PlaceName ?? place.PlaceName;
                place.Description = request.Description ?? place.Description;
                place.ParentPlace = request.ParentPlace ?? place.ParentPlace;
                place.Notes = request.Notes ?? place.Notes;
                place.IsActive = request.IsActive;

                //return result
                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}