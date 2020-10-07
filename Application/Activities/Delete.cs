using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Activities
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
            private readonly DataContextSample _context;
            public Handler(DataContextSample context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //handler logic
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Notfound" });

                _context.Remove(activity);
                //return result
                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}