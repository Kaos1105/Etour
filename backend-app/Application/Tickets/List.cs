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

namespace Application.Tickets
{
    public class List
    {
        public class TicketsEnvelope
        {
            public List<TicketDTO> Tickets { get; set; }
            public int TripCount { get; set; }
        }
        public class Query : IRequest<TicketsEnvelope>
        {
            public Query(int? limit, int? offset, string status, long? ticketPrice, Guid? customerId, Guid? tripId, bool? isActive)
            {
                this.Limit = limit;
                this.Offset = offset;
                this.Status = status;
                this.TicketPrice = ticketPrice;
                this.CustomerId = customerId;
                this.TripId = tripId;
                this.IsActive = isActive;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public string Status { get; set; }
            public long? TicketPrice { get; set; }
            public Guid? CustomerId { get; set; }
            public Guid? TripId { get; set; }
            public bool? IsActive { get; set; }

        }

        public class Handler : IRequestHandler<Query, TicketsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                this._mapper = mapper;
            }

            public async Task<TicketsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                //lazy loading

                var queryable = _context.Tickets.Where(item =>
                (string.IsNullOrEmpty(request.Status) || item.Status.Contains(request.Status)) &&
                (request.TicketPrice == null || item.TicketPrice == request.TicketPrice) &&
                (request.CustomerId == null || item.Customer.CustomerId == request.CustomerId) &&
                (request.TripId == null || item.Trip.TripId == request.TripId) &&
                (request.IsActive == null || item.IsActive == request.IsActive))
                .AsQueryable();

                var tickets = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? 3).ToListAsync();

                var returnTickets = new TicketsEnvelope
                {
                    Tickets = _mapper.Map<List<Ticket>, List<TicketDTO>>(tickets),
                    TripCount = queryable.Count()
                };
                return returnTickets;
            }
        }
    }
}