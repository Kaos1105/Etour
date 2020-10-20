using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using System.Linq;
using Persistence;
using Application.Trips;

namespace Application.Tickets
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid TicketId { get; set; }
            public string Status { get; set; }
            public string Description { get; set; }
            public string Notes { get; set; }
            public long TicketPrice { get; set; }
            public Guid CustomerId { get; set; }
            public Guid TripId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Status).NotEmpty();
                RuleFor(x => x.TicketPrice).NotEmpty();
                RuleFor(x => x.CustomerId).NotEmpty();
                RuleFor(x => x.TripId).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var existTicket = _context.Tickets.FirstOrDefault(x => x.Customer.CustomerId == request.CustomerId && x.Trip.TripId == request.TripId);

                var trip = await _context.Trips.FindAsync(request.TripId);

                var customer = await _context.Customers.FindAsync(request.CustomerId);

                if (trip == null && request.TripId != Guid.Empty && request.TripId != null)
                    throw new RestException(HttpStatusCode.NotFound, new { Trip = "Not found" });
                else if (trip.TripStatus == TripConst.UNAVAILABLE)
                    throw new RestException(HttpStatusCode.BadRequest, new { Trip = "Not availabe" });
                if (customer == null && request.CustomerId != Guid.Empty && request.CustomerId != null)
                    throw new RestException(HttpStatusCode.NotFound, new { Customer = "Not found" });

                if (existTicket != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Ticket = "Trip with same Trip and Customer already exist" });
                }

                var ticket = new Ticket
                {
                    TicketId = request.TicketId,
                    Status = request.Status,
                    Description = request.Description,
                    Notes = request.Notes,
                    TicketPrice = request.TicketPrice,
                    Trip = trip,
                    Customer = customer,
                    IsActive = true,
                };

                _context.Tickets.Add(ticket);

                //check trip capacity
                var takenSeat = _context.Tickets.Where(x => x.Trip.TripId == request.TripId && x.Status == TicketConst.ACTIVE);
                if (takenSeat.Count() == trip.TripCapacity)
                    trip.TripStatus = TripConst.UNAVAILABLE;

                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}