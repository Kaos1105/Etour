using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Tours
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Tour, TourDTO>();
        }
    }
}