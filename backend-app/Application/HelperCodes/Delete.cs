using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.HelperCodes
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
                var code = await _context.HelperCodes.FindAsync(request.Id);
                if (code == null)
                    throw new RestException(HttpStatusCode.NotFound, new { HelperCode = "Not found" });
                //_context.Places.Remove(place);
                code.IsActive = false;
                //return result
                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}