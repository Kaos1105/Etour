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

namespace Application.Customers
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid CustomerId { get; set; }
            public string CustomerName { get; set; }
            public string CustomerType { get; set; }
            public string CitizenId { get; set; }
            public string PasssportId { get; set; }
            public DateTime PasssportExpiryDate { get; set; }
            public string VisaId { get; set; }
            public DateTime VisaExpiryDate { get; set; }
            public string Address { get; set; }
            public string Phone { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CustomerId).NotEmpty();
                RuleFor(x => x.CustomerName).NotEmpty();
                RuleFor(x => x.CustomerType).NotEmpty();
                RuleFor(x => x.CitizenId).NotEmpty();
                RuleFor(x => x.PasssportId).NotEmpty();
                RuleFor(x => x.PasssportExpiryDate).NotEmpty();
                RuleFor(x => x.VisaId).NotEmpty();
                RuleFor(x => x.VisaExpiryDate).NotEmpty();
                RuleFor(x => x.Address).NotEmpty();
                RuleFor(x => x.Phone).NotEmpty();
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
                var existCustomer = _context.Customers.FirstOrDefault(x => x.CitizenId == request.CitizenId || x.PasssportId == request.PasssportId || x.VisaId == request.VisaId);

                if (existCustomer != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Customer = "Customer with same Passport ID/Visa ID or same citizen ID already exist" });
                }

                var customer = new Customer
                {
                    CustomerId = request.CustomerId,
                    CustomerName = request.CustomerName,
                    CustomerType = request.CustomerType,
                    CitizenId = request.CitizenId,
                    PasssportId = request.PasssportId,
                    VisaId = request.VisaId,
                    PasssportExpiryDate = request.PasssportExpiryDate,
                    VisaExpiryDate = request.VisaExpiryDate,
                    Address = request.Address,
                    Phone = request.Phone,
                    IsActive = true,
                };

                _context.Customers.Add(customer);

                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}