using AutoFixture;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Extensions;
public static class FixtureExtensions
{
    public static string CreateTextWithMaxLength(this Fixture fixture, int length) =>
        string.Join("", fixture.CreateMany<char>(length));
}
