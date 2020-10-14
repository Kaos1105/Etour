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

namespace Application.HelperCodes
{
    public class List
    {
        public class HelperCodesEnvelope
        {
            public List<HelperCode> HelperCodes { get; set; }
            public int TourCount { get; set; }
        }
        public class Query : IRequest<HelperCodesEnvelope>
        {
            public Query(int? limit, int? offset, string codeType, string codeName, string codeValue, string codeContent, bool? isActive)
            {
                this.Limit = limit;
                this.Offset = offset;
                this.CodeType = codeType;
                this.CodeContent = codeContent;
                this.CodeName = codeName;
                this.CodeValue = codeValue;
                this.IsActive = isActive;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public string CodeType { get; set; }
            public string CodeName { get; set; }
            public string CodeValue { get; set; }
            public string CodeContent { get; set; }
            public bool? IsActive { get; set; }

        }

        public class Handler : IRequestHandler<Query, HelperCodesEnvelope>
        {
            private readonly DataContext _context;
            //private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                //this._mapper = mapper;
            }

            public async Task<HelperCodesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                //lazy loading

                var queryable = _context.HelperCodes.Where(item =>
                (string.IsNullOrEmpty(request.CodeType) || item.CodeType.Contains(request.CodeType)) &&
                (string.IsNullOrEmpty(request.CodeName) || item.CodeName.Contains(request.CodeName)) &&
                (string.IsNullOrEmpty(request.CodeValue) || item.CodeValue.Contains(request.CodeValue)) &&
                (string.IsNullOrEmpty(request.CodeContent) || item.CodeContent.Contains(request.CodeContent)) &&
                (request.IsActive == null || item.IsActive == request.IsActive))
                .AsQueryable();

                var codes = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? 3).ToListAsync();

                var returnCodes = new HelperCodesEnvelope
                {
                    HelperCodes = codes,
                    TourCount = queryable.Count()
                };
                return returnCodes;
            }
        }
    }
}