FROM mcr.microsoft.com/dotnet/sdk:7.0

WORKDIR /app
COPY ./ ./app
ENV ASPNETCORE_URLS="http://*:6430"
ENV ASPNETCORE_ENVIRONMENT="Release"
RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]

EXPOSE 6430/tcp

ENTRYPOINT ["dotnet", "run", "--project=ETHTPS.API"]
