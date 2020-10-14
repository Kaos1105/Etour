using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Trips
{
    public class Details
    {
        public class Query : IRequest<TripDTO>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, TripDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;
            }
            public async Task<TripDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                //eager loading
                // var activity = await _context.Activities.Include(x => x.UserActivities).ThenInclude(x => x.AppUser).SingleOrDefaultAsync(x => x.Id == request.Id);

                //lazy loading
                var trip = await _context.Trips.FindAsync(request.Id);

                if (trip == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Trip = "Not found" });

                var tripToReturn = _mapper.Map<Trip, TripDTO>(trip);
                //return activityToReturn;
                return tripToReturn;
            }
        }
    }
}