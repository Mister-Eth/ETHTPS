CREATE TABLE [Providers] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) UNIQUE NOT NULL,
  [Type] int NOT NULL
)
GO

CREATE TABLE [ProviderTypes] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) UNIQUE NOT NULL
)
GO

CREATE TABLE [ProviderTypeProperties] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [ProviderType] int NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Value] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ProviderProperties] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Provider] int NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Value] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [AccesStats] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Project] nvarchar(255) NOT NULL,
  [Path] nvarchar(255) NOT NULL,
  [Count] int NOT NULL,
  [AverageRequestTimeMs] float NOT NULL,
  [ExternalCount] int NOT NULL
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
  [Provider] int NOT NULL,
  [Network] int NOT NULL,
  [TPS] float NOT NULL,
  [GPS] float NOT NULL
)
GO

CREATE TABLE [TPSAndGasData_Max] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Provider] int NOT NULL,
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
  [ReadingsCount] int NOT NULL
)
GO

CREATE TABLE [TPSAndGasData_Day] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL,
  [ReadingsCount] int NOT NULL
)
GO

CREATE TABLE [TPSAndGasData_Week] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Network] int NOT NULL,
  [Provider] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [AverageTPS] float NOT NULL,
  [AverageGPS] float NOT NULL,
  [ReadingsCount] int NOT NULL
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

ALTER TABLE [Providers] ADD FOREIGN KEY ([Type]) REFERENCES [ProviderTypes] ([ID])
GO

ALTER TABLE [ProviderTypeProperties] ADD FOREIGN KEY ([ProviderType]) REFERENCES [ProviderTypes] ([ID])
GO

ALTER TABLE [ProviderProperties] ADD FOREIGN KEY ([Provider]) REFERENCES [Providers] ([ID])
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
