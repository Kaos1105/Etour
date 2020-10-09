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

namespace Application.Tours
{
    public class List
    {
        public class ToursEnvelope
        {
            public List<TourDTO> Tours { get; set; }
            public int TourCount { get; set; }
        }
        public class Query : IRequest<ToursEnvelope>
        {
#nullable enable
            public Query(int? limit, int? offset, string? tourName, string? tourType, int? tourDuration, Guid? startPlaceId, Guid? endPlaceId, bool? isActive)
            {
                this.Limit = limit;
                this.Offset = offset;
                this.TourName = tourName;
                this.TourType = tourType;
                this.TourDuration = tourDuration;
                this.StartPlaceId = startPlaceId;
                this.EndPlaceId = endPlaceId;
                this.IsActive = isActive;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public string? TourName { get; set; }
            public bool? IsActive { get; set; }
            public string? TourType { get; set; }
            public int? TourDuration { get; set; }
            public Guid? StartPlaceId { get; set; }
            public Guid? EndPlaceId { get; set; }

        }

        public class Handler : IRequestHandler<Query, ToursEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                this._mapper = mapper;
            }

            public async Task<ToursEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                //lazy loading

                var queryable = _context.Tours.Where(item =>
                (string.IsNullOrEmpty(request.TourName) || item.TourName.Contains(request.TourName)) &&
                (string.IsNullOrEmpty(request.TourType) || item.TourName.Contains(request.TourType)) &&
                (request.TourDuration == null || item.TourDuration == request.TourDuration) &&
                (request.StartPlaceId == null || item.StartPlace.PlaceId == request.StartPlaceId) &&
                (request.EndPlaceId == null || item.EndPlace.PlaceId == request.EndPlaceId) &&
                (request.IsActive == null || item.IsActive == request.IsActive))
                .AsQueryable();

                var tours = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? 3).ToListAsync();

                var returnTours = new ToursEnvelope
                {
                    Tours = _mapper.Map<List<Tour>, List<TourDTO>>(tours),
                    TourCount = queryable.Count()
                };
                return returnTours;
            }
        }
    }
}