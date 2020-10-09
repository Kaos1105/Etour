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
    public class Create
    {
        public class Command : IRequest
        {
            public Guid PlaceId { get; set; }
            public string PlaceName { get; set; }
            public Guid ParentPlaceId { get; set; }
            public string Description { get; set; }
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
                var parentPlace = await _context.Places.FindAsync(request.ParentPlaceId);

                if (parentPlace == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Place = "Not found" });

                var place = new Place
                {
                    PlaceId = request.PlaceId,
                    PlaceName = request.PlaceName,
                    Description = request.Description,
                    ParentPlace = parentPlace,
                    Notes = request.Notes,
                    IsActive = true,
                };

                _context.Places.Add(place);

                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}