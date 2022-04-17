using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Giveaway.Database.Persistence.Migrations
{
    public partial class ChangedMaxLengthForListingDescriptionTo1000 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Description",
                schema: "dbo",
                table: "Listings",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(250)",
                oldMaxLength: 250);

            migrationBuilder.CreateIndex(
                name: "IX_Listings_OwnerId",
                schema: "dbo",
                table: "Listings",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_Users_OwnerId",
                schema: "dbo",
                table: "Listings",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listings_Users_OwnerId",
                schema: "dbo",
                table: "Listings");

            migrationBuilder.DropIndex(
                name: "IX_Listings_OwnerId",
                schema: "dbo",
                table: "Listings");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                schema: "dbo",
                table: "Listings",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000);
        }
    }
}
