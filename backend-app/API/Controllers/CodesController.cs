using System;
using System.Threading.Tasks;
using Application.HelperCodes;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class CodesController : BaseController
    {
        // [HttpGet]
        // public async Task<ActionResult<List<Activity>>> List(CancellationToken cancellationToken)
        // {
        //     return await Mediator.Send(new List.Query(), cancellationToken);
        // }

        [HttpGet]
        public async Task<ActionResult<List.HelperCodesEnvelope>> List(int? limit, int? offset, string codeType, string codeName, string codeValue, string codeContent, bool? isActive)
        {
            return await Mediator.Send(new List.Query(limit, offset, codeType, codeName, codeValue, codeContent, isActive));
        }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<ActionResult<HelperCode>> Details(Guid id)
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
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command() { Id = id });
        }

    }
}