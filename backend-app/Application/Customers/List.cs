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

namespace Application.Customers
{
    public class List
    {
        public class CustomersEnvelope
        {
            public List<CustomerDTO> Customers { get; set; }
            public int CustomerCount { get; set; }
        }
        public class Query : IRequest<CustomersEnvelope>
        {
            public Query(int? limit, int? offset, string customerName, string customerType, string citizenId, string passsportId, string visaId, string address, string phone, DateTime? passsportExpiryDate, DateTime? visaExpiryDate, bool? isActive)
            {
                this.Limit = limit;
                this.Offset = offset;
                this.CustomerName = customerName;
                this.CustomerType = customerType;
                this.CitizenId = citizenId;
                this.PasssportId = passsportId;
                this.PasssportExpiryDate = passsportExpiryDate;
                this.VisaId = visaId;
                this.VisaExpiryDate = visaExpiryDate;
                this.Address = address;
                this.Phone = phone;
                this.IsActive = isActive;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
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

        public class Handler : IRequestHandler<Query, CustomersEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                this._mapper = mapper;
            }

            public async Task<CustomersEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                //lazy loading

                var queryable = _context.Customers.Where(item =>
                (string.IsNullOrEmpty(request.CustomerName) || item.CustomerName.Contains(request.CustomerName)) &&
                (string.IsNullOrEmpty(request.CustomerType) || item.CustomerType.Contains(request.CustomerType)) &&
                (string.IsNullOrEmpty(request.CitizenId) || item.CitizenId.Contains(request.CitizenId)) &&
                (string.IsNullOrEmpty(request.PasssportId) || item.PasssportId.Contains(request.PasssportId)) &&
                (string.IsNullOrEmpty(request.VisaId) || item.VisaId.Contains(request.VisaId)) &&
                (string.IsNullOrEmpty(request.Address) || item.Address.Contains(request.Address)) &&
                (string.IsNullOrEmpty(request.VisaId) || item.VisaId.Contains(request.VisaId)) &&
                (string.IsNullOrEmpty(request.Phone) || item.Phone.Contains(request.Phone)) &&
                (request.IsActive == null || item.IsActive == request.IsActive))
                .AsQueryable();

                var customers = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? 3).ToListAsync();

                var returnCustomers = new CustomersEnvelope
                {
                    Customers = _mapper.Map<List<Customer>, List<CustomerDTO>>(customers),
                    CustomerCount = queryable.Count()
                };
                return returnCustomers;
            }
        }
    }
}