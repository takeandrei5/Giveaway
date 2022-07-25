using AutoFixture;
using Giveaway.Commons.Services;
using Microsoft.AspNetCore.Http;
using Moq;

namespace Commons.UnitTests.Services;

public class Base
{
    protected readonly Fixture _fixture;
    protected readonly Mock<IHttpContextAccessor> _httpContextAccessor;

    protected readonly HttpContextLoggedUser _sut;

    protected Base()
    {
        _httpContextAccessor = new Mock<IHttpContextAccessor>();
        _fixture = new Fixture();

        _sut = new HttpContextLoggedUser(_httpContextAccessor.Object);
    }
}
