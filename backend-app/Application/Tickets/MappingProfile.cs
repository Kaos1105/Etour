using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Tickets
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Ticket, TicketDTO>().ForMember(d => d.TripId, o => o.MapFrom(s => s.Trip.TripId)).ForMember(d => d.CustomerId, o => o.MapFrom(s => s.Customer.CustomerId));
        }
    }
}