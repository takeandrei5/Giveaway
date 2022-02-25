using Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Users;

public sealed record UserLocation
{
    internal UserLocation(Latitude latitude, Longitude longitude)
    {
        Latitude = latitude;
        Longitude = longitude;
    }

    public Latitude Latitude { get; init; }

    public Longitude Longitude { get; init; }
}