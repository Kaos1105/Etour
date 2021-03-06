using System;
using System.Threading.Tasks;
using Application.Tickets;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class TicketsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.TicketsEnvelope>> List(int? limit, int? offset, string status, long? ticketPrice, Guid? customerId, Guid? tripId, bool? isActive)
        {
            return await Mediator.Send(new List.Query(limit, offset, status, ticketPrice, customerId, tripId, isActive));
        }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<ActionResult<TicketDTO>> Details(Guid id)
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
            command.TicketId = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command() { Id = id });
        }

    }
}