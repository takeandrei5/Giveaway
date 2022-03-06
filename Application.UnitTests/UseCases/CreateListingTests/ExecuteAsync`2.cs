using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Giveaway.Application.UnitTests.UseCases.CreateListingTests;
using Giveaway.Domain.Listings;
using SoftwareCraft.Functional;
using Giveaway.Application.UseCases.CreateListing;
using AutoFixture;
using Giveaway.Domain.Items;
using Giveaway.Extensions;

namespace Giveaway.Application.UnitTests.UseCases.CreateListingTests;

public sealed class ExecuteAsync_2 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow if creating the listing items returns error result.")]
    public async Task Check_ExecuteAsync_Execution_Flow_If_Creating_The_Listing_Items_Returns_Error_Result()
    {
        // Arrange
        Initialize();

        _listingRepositoryMock.Setup(listingRepository => listingRepository.CreateAsync(It.IsAny<Listing>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Success<string>());

        _itemRepositoryMock.Setup(itemRepository => itemRepository.CreateManyAsync(It.IsAny<IEnumerable<Item>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(string.Empty.AsError());

        var commandFeed = new CommandFeed
        {
            Title = new ListingTitle(_fixture.CreateTextWithMaxLength(30)),
            Description = new ListingDescription(_fixture.CreateTextWithMaxLength(30)),
            Items = new CommandFeed.Item[]
            {
                new()
                {
                    Title = new ItemTitle(_fixture.CreateTextWithMaxLength(30)),
                    Description = new ItemDescription(_fixture.CreateTextWithMaxLength(30)),
                }
            }
        };

        // Act
        await _sut.ExecuteAsync(commandFeed, CancellationToken.None);

        // Assert
        _listingRepositoryMock.Verify(listingRepository =>
            listingRepository.CreateAsync(It.Is<Listing>(listing => listing.Title == commandFeed.Title && listing.Description == commandFeed.Description),
                CancellationToken.None),
        Times.Once);

        _itemRepositoryMock.Verify(listingRepository =>
            listingRepository.CreateManyAsync(It.Is<IEnumerable<Item>>(items =>
                    items.All(item =>
                        commandFeed.Items
                            .Select(i => i.Title)
                            .Contains(item.Title) 
                        && commandFeed.Items
                            .Select(i => i.Description)
                            .Contains(item.Description))),
                CancellationToken.None),
        Times.Once);
    }
}
