using AutoFixture;
using Giveaway.Database.DataAccess.ListingDbOperations;
using Giveaway.Database.UnitTests.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Database.UnitTests.ListingDbOperations.ProfileTests;

public class Base : AutoMapperFixture
{
    protected readonly Fixture _fixture;
    protected readonly Profile _sut;

    public Base()
    {
        _fixture = new Fixture();
        _sut = new Profile();
    }
}
