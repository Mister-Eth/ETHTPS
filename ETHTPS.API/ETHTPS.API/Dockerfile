#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ETHTPS.API/ETHTPS.API.csproj", "ETHTPS.API/"]
COPY ["ETHTPS.BackgroundServices/ETHTPS.Services.csproj", "ETHTPS.BackgroundServices/"]
COPY ["ETHTPS.Data/ETHTPS.Data.csproj", "ETHTPS.Data/"]
COPY ["ETHTPS.Services.Ethereum/ETHTPS.Services.Ethereum.csproj", "ETHTPS.Services.Ethereum/"]
RUN dotnet restore "ETHTPS.API/ETHTPS.API.csproj"
COPY . .
WORKDIR "/src/ETHTPS.API"
RUN dotnet build "ETHTPS.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ETHTPS.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ETHTPS.API.dll"]