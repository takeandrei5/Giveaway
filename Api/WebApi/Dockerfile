FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 81

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

COPY . .

RUN dotnet restore "WebApi/WebApi.csproj"

FROM build AS publish
RUN dotnet publish "WebApi/WebApi.csproj" -c Release -o /app/publish -v d

FROM base AS final
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Giveaway.WebApi.dll"]