using System;
using System.Threading.Tasks;
using Application.Customers;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class CustomersController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.CustomersEnvelope>> List(int? limit, int? offset, string customerName, string customerType, string citizenId, string passsportId, string visaId, string address, string phone, DateTime? passsportExpiryDate, DateTime? visaExpiryDate, bool? isActive)
        {
            return await Mediator.Send(new List.Query(limit, offset, customerName, customerType, citizenId, passsportId,
            visaId, address, phone, passsportExpiryDate, visaExpiryDate, isActive));
        }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<ActionResult<CustomerDTO>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.CustomerId = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command() { Id = id });
        }

    }
}