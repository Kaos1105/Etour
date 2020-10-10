using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System.Linq;

namespace Application.HelperCodes
{
    public class Create
    {
        public class Command : IRequest
        {
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
                var existCode = _context.HelperCodes.FirstOrDefault(x => (x.CodeContent == request.CodeContent) && (x.CodeName == request.CodeName) && (x.CodeType == request.CodeType) && (x.CodeValue == x.CodeValue));

                if (existCode != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { HelperCode = "HelperCode already exist" });

                var code = new HelperCode
                {
                    CodeContent = request.CodeContent,
                    CodeName = request.CodeName,
                    CodeType = request.CodeType,
                    CodeValue = request.CodeValue,
                    IsActive = true,
                };

                _context.HelperCodes.Add(code);

                var isSuccess = await _context.SaveChangesAsync() > 0;
                if (isSuccess) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}