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

namespace Application.Places
{
    public class List
    {
        public class PlacesEnvelope
        {
            public List<PlaceDTO> Places { get; set; }
            public int PlaceCount { get; set; }
        }
        public class Query : IRequest<PlacesEnvelope>
        {
            public Query(int? limit, int? offset, string placeName, bool? isActive)
            {
                this.Limit = limit;
                this.Offset = offset;
                this.PlaceName = placeName;
                this.IsActive = isActive;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public string PlaceName { get; set; }
            public bool? IsActive { get; set; }

        }

        public class Handler : IRequestHandler<Query, PlacesEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                this._mapper = mapper;
            }

            public async Task<PlacesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                //lazy loading
                var queryable = _context.Places.Where(item => (string.IsNullOrEmpty(request.PlaceName) || item.PlaceName.Contains(request.PlaceName)) && (request.IsActive == null || item.IsActive == request.IsActive))
                .AsQueryable();

                var places = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? 3).ToListAsync();

                var returnPlaces = new PlacesEnvelope
                {
                    Places = _mapper.Map<List<Place>, List<PlaceDTO>>(places),
                    PlaceCount = queryable.Count()
                };
                return returnPlaces;
            }
        }
    }
}