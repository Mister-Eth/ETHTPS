CREATE TABLE [Providers] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) UNIQUE NOT NULL,
  [Type] int NOT NULL,
  [Color] varchar(16) NOT NULL,
  [IsGeneralPurpose] bit,
  [HistoricalAggregationDeltaBlock] int,
  [Enabled] bit NOT NULL
)
GO

CREATE TABLE [ProviderTypes] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) UNIQUE NOT NULL,
  [Color] varchar(16) NOT NULL,
  [Enabled] bit NOT NULL
)
GO

CREATE TABLE [AccesStats] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Project] nvarchar(255) NOT NULL,
  [Path] nvarchar(255) NOT NULL,
  [Count] int NOT NULL,
  [AverageRequestTimeMs] float NOT NULL
)
GO

CREATE TABLE [DetailedAccessStats] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Path] nvarchar(255) NOT NULL,
  [RequestTimeMs] float NOT NULL,
  [IPAddress] nvarchar(255) NOT NULL,
  [Date] datetime NOT NULL
)
GO

CREATE TABLE [CachedResponses] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) UNIQUE NOT NULL,
  [JSON] varchar(max)
)
GO

CREATE TABLE [Networks] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) UNIQUE NOT NULL
)
GO

CREATE TABLE [TPSAndGasData_Latest] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Provider] int UNIQUE NOT NULL,
  [Network] int NOT NULL,
  [TPS] float NOT NULL,
  [GPS] float NOT NULL
)
GO

CREATE TABLE [TPSAndGasData_Max] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Provider] int UNIQUE NOT NULL,
  [Network] int NOT NULL,
  [Date] datetime NOT NULL,
  [MaxTPS] float NOT NULL,
  [MaxGPS] float NOT NULL
)
GO

CREATE TABLE [TPSAndGasData_Hour] (
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

CREATE TABLE [TPSAndGasData_Day] (
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

CREATE TABLE [TPSAndGasData_Week] (
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

CREATE TABLE [TPSAndGasData_Month] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL,
  [ReadingsCount] int NOT NULL
)
GO

CREATE TABLE [TPSAndGasData_Year] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL,
  [ReadingsCount] int NOT NULL
)
GO

CREATE TABLE [TPSAndGasData_All] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL,
  [ReadingsCount] int NOT NULL
)
GO

CREATE TABLE [OldestLoggedHistoricalEntries] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [OldestBlock] int NOT NULL
)
GO

CREATE TABLE [APIKeys] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [KeyHash] nvarchar(255) NOT NULL,
  [TotalCalls] int NOT NULL,
  [CallsLast24h] int NOT NULL,
  [Limit24h] int NOT NULL
)
GO

CREATE TABLE [TimeWarpData] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [Block] int,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL
)
GO

CREATE TABLE [TimeWarpData_Minute] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [Block] int,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL
)
GO

CREATE TABLE [TimeWarpData_Hour] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [Block] int,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL
)
GO

CREATE TABLE [TimeWarpData_Day] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [Block] int,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL
)
GO

CREATE TABLE [TimeWarpData_Week] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [Block] int,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL
)
GO

CREATE TABLE [OldestLoggedTimeWarpBlocks] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [OldestBlock] int NOT NULL
)
GO

CREATE TABLE [StarkwareTransactionCountData] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Product] nvarchar(255) NOT NULL,
  [LastUpdateTime] datetime NOT NULL,
  [LastUpdateCount] int NOT NULL
)
GO

ALTER TABLE [Providers] ADD FOREIGN KEY ([Type]) REFERENCES [ProviderTypes] ([ID])
GO

ALTER TABLE [TPSAndGasData_Latest] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSAndGasData_Latest] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TPSAndGasData_Max] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSAndGasData_Max] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TPSAndGasData_Hour] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSAndGasData_Hour] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TPSAndGasData_Day] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSAndGasData_Day] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TPSAndGasData_Week] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSAndGasData_Week] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TPSAndGasData_Month] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSAndGasData_Month] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TPSAndGasData_Year] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSAndGasData_Year] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TPSAndGasData_All] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSAndGasData_All] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [OldestLoggedHistoricalEntries] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [OldestLoggedHistoricalEntries] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TimeWarpData] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TimeWarpData] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TimeWarpData_Minute] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TimeWarpData_Minute] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TimeWarpData_Hour] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TimeWarpData_Hour] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TimeWarpData_Day] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TimeWarpData_Day] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TimeWarpData_Week] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TimeWarpData_Week] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [OldestLoggedTimeWarpBlocks] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [OldestLoggedTimeWarpBlocks] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [StarkwareTransactionCountData] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO
