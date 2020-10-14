using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Trips
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Trip, TripDTO>();
        }
    }
}