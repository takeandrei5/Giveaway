using AutoFixture;
using Giveaway.WebApi.Services;
using Microsoft.AspNetCore.Http;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.UnitTests.Services;

public class Base
{
    protected readonly Fixture _fixture;
    protected readonly Mock<IHttpContextAccessor> _httpContextAccessor;

    protected readonly HttpContextLoggedUser _sut;

    public Base()
    {
        _httpContextAccessor = new();
        _fixture = new();

        _sut = new(_httpContextAccessor.Object);
    }
}