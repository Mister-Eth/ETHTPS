# ETHTPS
Aggregated Ethereum TPS data for L2s and sidechains

# Frontend

Requirements: [NodeJS](https://nodejs.org/en/download/)

Setup:

1. Clone the repository

  ```git clone --branch dev https://github.com/Mister-Eth/ETHTPS```
  
2. CD to the frontend directory

  ```cd ETHTPS/Frontend```
  
3. Install the dependencies

  ```npm i```
  
4. Run the app

  On Windows: ```npm run win-start```
  
  On Linux: ```npm run linux-start```
  
 # Backend
 
 Requirements: [.NET 5.0 Framework](https://dotnet.microsoft.com/en-us/download/dotnet/5.0), [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) and optionally [SSMS](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
 
Database setup:

1. Run ```docs/init.sql``` to create the tables

2. Run ```docs/populate.sql``` to add data
