using System;
using System.Threading.Tasks;
using Application.Tours;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ToursController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List.ToursEnvelope>> List(int? limit, int? offset, string tourName, string tourType, int? tourDuration, Guid? startPlaceId, Guid? endPlaceId, bool? isActive)
        {
            return await Mediator.Send(new List.Query(limit, offset, tourName, tourType, tourDuration, startPlaceId, endPlaceId, isActive));
        }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<ActionResult<TourDTO>> Details(Guid id)
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
            command.TourId = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command() { Id = id });
        }

    }
}