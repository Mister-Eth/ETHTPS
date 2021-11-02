CREATE TABLE [Providers] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255),
  [Type] int
)
GO

CREATE TABLE [ProviderTypes] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)
GO

CREATE TABLE [ProviderProperties] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Provider] int,
  [Name] nvarchar(255),
  [Value] nvarchar(255)
)
GO

CREATE TABLE [TPSData] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int,
  [Provider] int,
  [Date] datetime,
  [Block] nvarchar(255),
  [TPS] float
)
GO

CREATE TABLE [AccesStats] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Project] nvarchar(255),
  [Path] nvarchar(255),
  [Count] int
)
GO

CREATE TABLE [CachedResponses] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255),
  [JSON] varchar(max)
)
GO

CREATE TABLE [Networks] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)
GO

CREATE TABLE [LatestEntries] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Provider] int,
  [Entry] int
)
GO

CREATE TABLE [TaskPerformanceMetrics] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Machine] int,
  [TaskName] nvarchar(255),
  [RunCount] int,
  [AverageRunTime] float
)
GO

CREATE TABLE [MachineConfigurations] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255),
  [CPUCoreCount] int,
  [TotalRAM] int
)
GO

CREATE TABLE [MaxTPSEntries] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Provider] int,
  [Entry] int
)
GO

CREATE TABLE [TPSData_Hour] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int,
  [Provider] int,
  [StartDate] datetime,
  [AverageTPS] float,
  [ReadingsCount] int
)
GO

ALTER TABLE [TPSData_Hour] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSData_Hour] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

CREATE TABLE [TPSData_Day] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int,
  [Provider] int,
  [StartDate] datetime,
  [AverageTPS] float,
  [ReadingsCount] int
)
GO

ALTER TABLE [TPSData_Day] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSData_Day] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

CREATE TABLE [TPSData_Week] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int,
  [Provider] int,
  [StartDate] datetime,
  [AverageTPS] float,
  [ReadingsCount] int
)
GO

ALTER TABLE [TPSData_Week] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSData_Week] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

CREATE TABLE [TPSData_Month] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int,
  [Provider] int,
  [StartDate] datetime,
  [AverageTPS] float,
  [ReadingsCount] int
)
GO

ALTER TABLE [TPSData_Month] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSData_Month] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [MaxTPSEntries] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [MaxTPSEntries] ADD FOREIGN KEY ([Entry]) REFERENCES [TPSData] ([ID])
GO

ALTER TABLE [Providers] ADD FOREIGN KEY ([Type]) REFERENCES [ProviderTypes] ([ID])
GO

ALTER TABLE [ProviderProperties] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSData] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [TPSData] ADD FOREIGN KEY ([Network]) REFERENCES [Networks] ([ID])
GO

ALTER TABLE [TaskPerformanceMetrics] ADD FOREIGN KEY ([Machine]) REFERENCES [MachineConfigurations] ([ID])
GO

ALTER TABLE [LatestEntries] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
GO

ALTER TABLE [LatestEntries] ADD FOREIGN KEY ([Entry]) REFERENCES [TPSData] ([ID])
GO
