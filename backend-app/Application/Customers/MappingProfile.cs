using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Customers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Customer, CustomerDTO>();
        }
    }
}