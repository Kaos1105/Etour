using System;
using System.Threading.Tasks;
using Application.Trips;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class TripsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.TripsEnvelope>> List(int? limit, int? offset, string tripName, string tripType, DateTime? startDate, DateTime? endDate, long? price, Guid? tourId, bool? isActive)
        {
            return await Mediator.Send(new List.Query(limit, offset, tripName, tripType, startDate, endDate, price, tourId, isActive));
        }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<ActionResult<TripDTO>> Details(Guid id)
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
            command.TripId = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command() { Id = id });
        }

    }
}