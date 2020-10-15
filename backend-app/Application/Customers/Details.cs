using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Customers
{
    public class Details
    {
        public class Query : IRequest<CustomerDTO>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, CustomerDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;
            }
            public async Task<CustomerDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                //eager loading
                // var activity = await _context.Activities.Include(x => x.UserActivities).ThenInclude(x => x.AppUser).SingleOrDefaultAsync(x => x.Id == request.Id);

                //lazy loading
                var customer = await _context.Customers.FindAsync(request.Id);

                if (customer == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Customer = "Not found" });

                var customerToReturn = _mapper.Map<Customer, CustomerDTO>(customer);
                //return activityToReturn;
                return customerToReturn;
            }
        }
    }
}