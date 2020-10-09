using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tours
{
    public class Details
    {
        public class Query : IRequest<TourDTO>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, TourDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                //this._mapper = mapper;
                this._context = context;
            }
            public async Task<TourDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                //eager loading
                // var activity = await _context.Activities.Include(x => x.UserActivities).ThenInclude(x => x.AppUser).SingleOrDefaultAsync(x => x.Id == request.Id);

                //lazy loading
                var tour = await _context.Tours.FindAsync(request.Id);

                if (tour == null)
                    throw new RestException(HttpStatusCode.NotFound, new { TourDTO = "Not found" });

                var tourToReturn = _mapper.Map<Tour, TourDTO>(tour);
                //return activityToReturn;
                return tourToReturn;
            }
        }
    }
}