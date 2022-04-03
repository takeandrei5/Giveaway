using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Giveaway.Database.Persistence.Migrations
{
    public partial class AdjustedFKFromImagesToListing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Listings_ListingEntityId",
                schema: "dbo",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Listings_ListingId",
                schema: "dbo",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_ListingEntityId",
                schema: "dbo",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "ListingEntityId",
                schema: "dbo",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Listings_ListingId",
                schema: "dbo",
                table: "Images",
                column: "ListingId",
                principalSchema: "dbo",
                principalTable: "Listings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Listings_ListingId",
                schema: "dbo",
                table: "Images");

            migrationBuilder.AddColumn<Guid>(
                name: "ListingEntityId",
                schema: "dbo",
                table: "Images",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Images_ListingEntityId",
                schema: "dbo",
                table: "Images",
                column: "ListingEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Listings_ListingEntityId",
                schema: "dbo",
                table: "Images",
                column: "ListingEntityId",
                principalSchema: "dbo",
                principalTable: "Listings",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Listings_ListingId",
                schema: "dbo",
                table: "Images",
                column: "ListingId",
                principalSchema: "dbo",
                principalTable: "Listings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
