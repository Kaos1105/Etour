using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Places
{
    public class Details
    {
        public class Query : IRequest<PlaceDTO>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, PlaceDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;
            }
            public async Task<PlaceDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                //eager loading
                // var activity = await _context.Activities.Include(x => x.UserActivities).ThenInclude(x => x.AppUser).SingleOrDefaultAsync(x => x.Id == request.Id);

                //lazy loading
                var place = await _context.Places.FindAsync(request.Id);

                if (place == null)
                    throw new RestException(HttpStatusCode.NotFound, new { place = "Notfound" });

                var placeToReturn = _mapper.Map<Place, PlaceDTO>(place);
                //return activityToReturn;
                return placeToReturn;
            }
        }
    }
}