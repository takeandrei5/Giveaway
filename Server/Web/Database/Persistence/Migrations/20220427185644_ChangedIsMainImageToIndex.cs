using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Giveaway.Database.Persistence.Migrations
{
    public partial class ChangedIsMainImageToIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Images_ListingId",
                schema: "dbo",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "IsMainImage",
                schema: "dbo",
                table: "Images");

            migrationBuilder.AddColumn<int>(
                name: "Index",
                schema: "dbo",
                table: "Images",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Images_ListingId_Index",
                schema: "dbo",
                table: "Images",
                columns: new[] { "ListingId", "Index" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Images_ListingId_Index",
                schema: "dbo",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "Index",
                schema: "dbo",
                table: "Images");

            migrationBuilder.AddColumn<bool>(
                name: "IsMainImage",
                schema: "dbo",
                table: "Images",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Images_ListingId",
                schema: "dbo",
                table: "Images",
                column: "ListingId");
        }
    }
}
