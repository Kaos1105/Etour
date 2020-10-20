using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Tickets
{
    public class Edit
    {
        public class Command : IRequest
        {
            //command properties

            public Guid? TicketId { get; set; }
            public string Status { get; set; }
            public string Description { get; set; }
            public string Notes { get; set; }
            public long? TicketPrice { get; set; }
            public Guid? CustomerId { get; set; }
            public Guid? TripId { get; set; }
            public bool? IsActive { get; set; }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    //RuleFor(x => x.ticketId).NotEmpty();
                    //RuleFor(x => x.TourType).NotEmpty();
                    //RuleFor(x => x.TourDuration).NotEmpty();
                    //RuleFor(x => x.StartPlaceId).NotEmpty();
                    //RuleFor(x => x.EndPlaceId).NotEmpty();
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
                    //handler logic
                    var ticket = await _context.Tickets.FindAsync(request.TicketId);
                    var trip = await _context.Trips.FindAsync(request.TripId);
                    var customer = await _context.Customers.FindAsync(request.CustomerId);

                    if (trip == null && request.TripId != Guid.Empty && request.TripId != null)
                        throw new RestException(HttpStatusCode.NotFound, new { ticket = "Not found" });
                    if (customer == null && request.CustomerId != Guid.Empty && request.CustomerId != null)
                        throw new RestException(HttpStatusCode.NotFound, new { ticket = "Not found" });
                    if (ticket == null)
                        throw new RestException(HttpStatusCode.NotFound, new { Ticket = "Not found" });

                    ticket.Status = request.Status ?? ticket.Status;
                    ticket.Description = request.Description ?? ticket.Description;
                    ticket.Notes = request.Notes ?? ticket.Notes;
                    ticket.TicketPrice = request.TicketPrice ?? ticket.TicketPrice;
                    ticket.IsActive = request.IsActive ?? ticket.IsActive;
                    ticket.Trip = trip ?? ticket.Trip;
                    ticket.Customer = customer ?? ticket.Customer;

                    //return result
                    var isSuccess = await _context.SaveChangesAsync() > 0;
                    if (isSuccess) return Unit.Value;

                    throw new Exception("Problem saving changes");
                }
            }
        }
    }
}