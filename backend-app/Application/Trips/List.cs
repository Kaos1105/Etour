using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Trips
{
    public class List
    {
        public class TripsEnvelope
        {
            public List<TripDTO> Trips { get; set; }
            public int TripCount { get; set; }
        }
        public class Query : IRequest<TripsEnvelope>
        {
            public Query(int? limit, int? offset, string tripName, string tripType, DateTime? startDate, DateTime? endDate, long? price, Guid? tourId, bool? isActive)
            {
                this.Limit = limit;
                this.Offset = offset;
                this.TripName = tripName;
                this.TripType = tripType;
                this.StartDate = startDate;
                this.EndDate = endDate;
                this.Price = price;
                this.TourId = tourId;
                this.IsActive = isActive;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public string TripName { get; set; }
            public bool? IsActive { get; set; }
            public string TripType { get; set; }
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public long? Price { get; set; }
            public Guid? TourId { get; set; }

        }

        public class Handler : IRequestHandler<Query, TripsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                this._mapper = mapper;
            }

            public async Task<TripsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                //lazy loading

                var queryable = _context.Trips.Where(item =>
                (string.IsNullOrEmpty(request.TripName) || item.TripName.Contains(request.TripName)) &&
                (string.IsNullOrEmpty(request.TripType) || item.TripType.Contains(request.TripType)) &&
                (request.Price == null || item.Price == request.Price) &&
                (request.TourId == null || item.Tour.TourId == request.TourId) &&
                (request.StartDate == null || item.StartDate >= request.StartDate) &&
                (request.EndDate == null || item.EndDate <= request.EndDate) &&
                (request.IsActive == null || item.IsActive == request.IsActive))
                .AsQueryable();

                var trips = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? 3).ToListAsync();

                var returnTrips = new TripsEnvelope
                {
                    Trips = _mapper.Map<List<Trip>, List<TripDTO>>(trips),
                    TripCount = queryable.Count()
                };
                return returnTrips;
            }
        }
    }
}