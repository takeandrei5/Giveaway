FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 85

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

COPY ./Chat ./Chat 
COPY ./Commons ./Commons

RUN dotnet restore "Chat/ChatApi/ChatApi.csproj"

FROM build AS publish
RUN dotnet publish "Chat/ChatApi/ChatApi.csproj" -c Release -o /app/publish -v d

FROM base AS final
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Giveaway.Chat.ChatApi.dll"]
