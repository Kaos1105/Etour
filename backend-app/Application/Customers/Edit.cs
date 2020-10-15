using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Customers
{
    public class Edit
    {
        public class Command : IRequest
        {
            //command properties
            public Guid? CustomerId { get; set; }
            public string CustomerName { get; set; }
            public string CustomerType { get; set; }
            public string CitizenId { get; set; }
            public string PasssportId { get; set; }
            public DateTime? PasssportExpiryDate { get; set; }
            public string VisaId { get; set; }
            public DateTime? VisaExpiryDate { get; set; }
            public string Address { get; set; }
            public string Phone { get; set; }
            public bool? IsActive { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CustomerId).NotEmpty();
                //RuleFor(x => x.customerType).NotEmpty();
                //RuleFor(x => x.customerDuration).NotEmpty();
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
                var customer = await _context.Customers.FindAsync(request.CustomerId);

                if (customer == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Customer = "Not found" });
                customer.CustomerType = request.CustomerType ?? customer.CustomerType;
                customer.CustomerName = request.CustomerName ?? customer.CustomerName;
                customer.CitizenId = request.CitizenId ?? customer.CitizenId;
                customer.PasssportId = request.PasssportId ?? customer.PasssportId;
                customer.PasssportExpiryDate = request.PasssportExpiryDate ?? customer.PasssportExpiryDate;
                customer.VisaId = request.VisaId ?? customer.VisaId;
                customer.VisaExpiryDate = request.VisaExpiryDate ?? customer.VisaExpiryDate;
                customer.Address = request.Address ?? customer.Address;
                customer.Phone = request.Phone ?? customer.Phone;
                customer.IsActive = request.IsActive ?? customer.IsActive;

                //return result
                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}