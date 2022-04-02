using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Giveaway.Database.Persistence.Migrations
{
    public partial class AddedDataSeederForCategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                schema: "dbo",
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Men Clothes" });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Women Clothes" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
