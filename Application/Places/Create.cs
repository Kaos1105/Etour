using System;
using System.Threading;
using System.Threading.Tasks;
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
            public Place ParentPlace { get; set; }
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
                var place = new Place
                {
                    PlaceId = request.PlaceId,
                    PlaceName = request.PlaceName,
                    ParentPlace = request.ParentPlace,
                    Description = request.Description,
                    Notes = request.Notes,
                };

                _context.Places.Add(place);

                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}