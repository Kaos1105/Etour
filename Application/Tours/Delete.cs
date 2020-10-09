using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Tours
{
    public class Delete
    {
        public class Command : IRequest
        {
            //command properties
            public Guid Id { get; set; }
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
                var tour = await _context.Tours.FindAsync(request.Id);
                if (tour == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Tour = "Not found" });
                //_context.Places.Remove(place);
                tour.IsActive = false;
                //return result
                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}