CREATE SCHEMA [dbo]
GO

CREATE SCHEMA [ProjectManagement]
GO

CREATE TABLE [dbo].[Providers] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) UNIQUE NOT NULL,
  [Type] int NOT NULL,
  [Color] varchar(16) NOT NULL,
  [IsGeneralPurpose] bit,
  [HistoricalAggregationDeltaBlock] int,
  [Enabled] bit NOT NULL,
  [SubchainOf] int
)
GO

CREATE TABLE [dbo].[ProviderTypes] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) UNIQUE NOT NULL,
  [Color] varchar(16) NOT NULL,
  [Enabled] bit NOT NULL
)
GO

CREATE TABLE [dbo].[AccesStats] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Project] nvarchar(255) NOT NULL,
  [Path] nvarchar(255) NOT NULL,
  [Count] int NOT NULL,
  [AverageRequestTimeMs] float NOT NULL
)
GO

CREATE TABLE [dbo].[DetailedAccessStats] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Path] nvarchar(255) NOT NULL,
  [RequestTimeMs] float NOT NULL,
  [IPAddress] nvarchar(255) NOT NULL,
  [Date] datetime NOT NULL
)
GO

CREATE TABLE [dbo].[CachedResponses] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) UNIQUE NOT NULL,
  [JSON] varchar(max)
)
GO

CREATE TABLE [dbo].[Networks] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) UNIQUE NOT NULL
)
GO

CREATE TABLE [dbo].[TPSAndGasData_Latest] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Provider] int UNIQUE NOT NULL,
  [Network] int NOT NULL,
  [TPS] float NOT NULL,
  [GPS] float NOT NULL
)
GO

CREATE TABLE [dbo].[TPSAndGasData_Max] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Provider] int UNIQUE NOT NULL,
  [Network] int NOT NULL,
  [Date] datetime NOT NULL,
  [MaxTPS] float NOT NULL,
  [MaxGPS] float NOT NULL
)
GO

CREATE TABLE [dbo].[TPSAndGasData_Hour] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL,
  [ReadingsCount] int NOT NULL,
  [OCLH_JSON] nvarchar(255)
)
GO

CREATE TABLE [dbo].[TPSAndGasData_Day] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL,
  [ReadingsCount] int NOT NULL,
  [OCLH_JSON] nvarchar(255)
)
GO

CREATE TABLE [dbo].[TPSAndGasData_Week] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL,
  [ReadingsCount] int NOT NULL,
  [OCLH_JSON] nvarchar(255)
)
GO

CREATE TABLE [dbo].[TPSAndGasData_Month] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL,
  [ReadingsCount] int NOT NULL
)
GO

CREATE TABLE [dbo].[TPSAndGasData_Year] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL,
  [ReadingsCount] int NOT NULL
)
GO

CREATE TABLE [dbo].[TPSAndGasData_All] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL,
  [ReadingsCount] int NOT NULL
)
GO

CREATE TABLE [dbo].[OldestLoggedHistoricalEntries] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [OldestBlock] int NOT NULL
)
GO

CREATE TABLE [dbo].[APIKeys] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [KeyHash] nvarchar(255) NOT NULL,
  [TotalCalls] int NOT NULL,
  [CallsLast24h] int NOT NULL,
  [Limit24h] int NOT NULL
)
GO

CREATE TABLE [dbo].[TimeWarpData] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [Block] int,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL
)
GO

CREATE TABLE [dbo].[TimeWarpData_Minute] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [Block] int,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL
)
GO

CREATE TABLE [dbo].[TimeWarpData_Hour] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [Block] int,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL
)
GO

CREATE TABLE [dbo].[TimeWarpData_Day] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [Block] int,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL
)
GO

CREATE TABLE [dbo].[TimeWarpData_Week] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [Block] int,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL
)
GO

CREATE TABLE [dbo].[OldestLoggedTimeWarpBlocks] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [OldestBlock] int NOT NULL
)
GO

CREATE TABLE [dbo].[StarkwareTransactionCountData] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Product] nvarchar(255) NOT NULL,
  [LastUpdateTime] datetime NOT NULL,
  [LastUpdateCount] int NOT NULL,
  [LastUpdateTPS] float NOT NULL
)
GO

CREATE TABLE [ProjectManagement].[Features] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [ProjectID] int NOT NULL,
  [Enabled] bit NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Details] nvarchar(255)
)
GO

CREATE TABLE [ProjectManagement].[Projects] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Enabled] bit NOT NULL,
  [Provider] int NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Website] nvarchar(255) NOT NULL,
  [Details] nvarchar(255)
)
GO

ALTER TABLE [dbo].[Providers] ADD FOREIGN KEY ([Type]) REFERENCES [dbo].[ProviderTypes] ([ID])
GO

ALTER TABLE [dbo].[Providers] ADD FOREIGN KEY ([SubchainOf]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Latest] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Latest] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Max] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Max] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Hour] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Hour] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Day] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Day] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Week] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Week] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Month] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Month] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Year] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_Year] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_All] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TPSAndGasData_All] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[OldestLoggedHistoricalEntries] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[OldestLoggedHistoricalEntries] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TimeWarpData] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TimeWarpData] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TimeWarpData_Minute] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TimeWarpData_Minute] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TimeWarpData_Hour] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TimeWarpData_Hour] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TimeWarpData_Day] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TimeWarpData_Day] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[TimeWarpData_Week] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[TimeWarpData_Week] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[OldestLoggedTimeWarpBlocks] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [dbo].[OldestLoggedTimeWarpBlocks] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [dbo].[StarkwareTransactionCountData] ADD FOREIGN KEY ([Network]) REFERENCES [dbo].[Networks] ([ID])
GO

ALTER TABLE [ProjectManagement].[Projects] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [ProjectManagement].[Features] ADD FOREIGN KEY ([ProjectID]) REFERENCES [ProjectManagement].[Projects] ([ID])
GO
