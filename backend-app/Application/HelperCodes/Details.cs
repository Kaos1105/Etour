using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.HelperCodes
{
    public class Details
    {
        public class Query : IRequest<HelperCode>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, HelperCode>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;
            }
            public async Task<HelperCode> Handle(Query request, CancellationToken cancellationToken)
            {
                //eager loading
                // var activity = await _context.Activities.Include(x => x.UserActivities).ThenInclude(x => x.AppUser).SingleOrDefaultAsync(x => x.Id == request.Id);

                //lazy loading
                var code = await _context.HelperCodes.FindAsync(request.Id);

                if (code == null)
                    throw new RestException(HttpStatusCode.NotFound, new { HelperCode = "Not found" });

                //return activityToReturn;
                return code;
            }
        }
    }
}