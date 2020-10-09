using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Places
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Place, PlaceDTO>();
        }
    }
}