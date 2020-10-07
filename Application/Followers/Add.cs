using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class Add
    {
        public class Command : IRequest
        {
            //command properties
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContextSample _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContextSample context, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //handler logic
                var observer = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                var target = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.UserName);

                if (target == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });
                }

                var following = await _context.Followings.SingleOrDefaultAsync(x => x.ObserverId == observer.Id && x.TargetId == target.Id);

                if (following != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { User = "You are already following this user" });
                else
                {
                    following = new UserFollowing
                    {
                        Observer = observer,
                        Target = target
                    };
                    _context.Followings.Add(following);
                }
                //return result
                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}