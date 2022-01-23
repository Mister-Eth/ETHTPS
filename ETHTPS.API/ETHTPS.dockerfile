FROM mcr.microsoft.com/dotnet/sdk:5.0


# Set environment variables

ENV ASPNETCORE_URLS="http://*:5000"

ENV ASPNETCORE_ENVIRONMENT="Release"

WORKDIR /

RUN ["dotnet", "build"]

WORKDIR /ETHTPS.API

EXPOSE 5000/tcp

ENTRYPOINT ["dotnet", "run"]