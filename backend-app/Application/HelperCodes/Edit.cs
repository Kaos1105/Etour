using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.HelperCodes
{
    public class Edit
    {
        public class Command : IRequest
        {
            //command properties
            public Guid Id { get; set; }
            public string CodeType { get; set; }
            public string CodeName { get; set; }
            public string CodeValue { get; set; }
            public string CodeContent { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
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
                var code = await _context.HelperCodes.FindAsync(request.Id);

                if (code == null)
                    throw new RestException(HttpStatusCode.NotFound, new { HelperCode = "Not found" });
                code.CodeContent = request.CodeContent ?? code.CodeContent;
                code.CodeName = request.CodeName ?? code.CodeName;
                code.CodeType = request.CodeType ?? code.CodeType;
                code.CodeValue = request.CodeValue ?? code.CodeValue;
                code.IsActive = code.IsActive ? code.IsActive : true;

                //return result
                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}