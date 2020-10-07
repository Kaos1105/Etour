using System;
using System.Threading.Tasks;
using Application.Places;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PlacesController : BaseController
    {
        // [HttpGet]
        // public async Task<ActionResult<List<Activity>>> List(CancellationToken cancellationToken)
        // {
        //     return await Mediator.Send(new List.Query(), cancellationToken);
        // }

        [HttpGet]
        public async Task<ActionResult<List.PlacesEnvelope>> List(int? limit, int? offset, string? placeName, bool? isActive)
        {
            return await Mediator.Send(new List.Query(limit, offset, placeName, isActive));
        }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<ActionResult<Place>> Details(Guid id)
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
            command.PlaceId = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command() { Id = id });
        }

    }
}