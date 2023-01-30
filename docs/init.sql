/*
* Up-to-date schema available at https://dbdiagram.io/d/613dd6b1825b5b0146fdfc5f
*/

CREATE SCHEMA [dbo]
GO

CREATE SCHEMA [Security]
GO

CREATE SCHEMA [Configuration]
GO

CREATE SCHEMA [ABTesting]
GO

CREATE SCHEMA [ProjectManagement]
GO

CREATE SCHEMA [Info]
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
  [MaxGPS] float NOT NULL,
  [MaxTPSBlockNumber] int,
  [MaxGPSBlockNumber] int
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

CREATE TABLE [Security].[APIKeys] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [KeyHash] nvarchar(255) NOT NULL,
  [TotalCalls] int NOT NULL,
  [CallsLast24h] int NOT NULL,
  [Limit24h] int NOT NULL,
  [RequesterIPAddress] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Security].[APIKeyGroups] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [APIKeyID] int NOT NULL,
  [GroupID] int NOT NULL
)
GO

CREATE TABLE [Security].[Roles] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Security].[Groups] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Security].[Permissions] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Security].[PermissionsForRoles] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [RoleID] int NOT NULL,
  [PermissionID] int NOT NULL
)
GO

CREATE TABLE [Security].[GroupRoles] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [GroupID] int NOT NULL,
  [RoleID] int NOT NULL
)
GO

CREATE TABLE [Configuration].[AppConfigurationValues] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Value] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ABTesting].[APIKeyExperimentBinding] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [ExperimentID] int NOT NULL,
  [APIKeyID] int NOT NULL
)
GO

CREATE TABLE [ABTesting].[ExperimentTargetTypes] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [TargetTypeName] nvarchar(255) NOT NULL,
  [TargetTypeValue] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ABTesting].[ExperimentTargets] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255),
  [Type] int NOT NULL
)
GO

CREATE TABLE [ABTesting].[ExperimentRunParameters] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [StartDate] datetime,
  [EndDate] datetime,
  [Enabled] bit NOT NULL,
  [DisplayToNPeopleBeforeEnd] int,
  [ConsiderFinishedAfterTimeoutSeconds] int NOT NULL
)
GO

CREATE TABLE [ABTesting].[Experiments] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [ProjectID] int NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255),
  [Target] int NOT NULL,
  [RunParameters] int NOT NULL
)
GO

CREATE TABLE [ABTesting].[ExperimentResults] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Experiment] int NOT NULL,
  [AverageRetentionSeconds] int NOT NULL,
  [SDRetentionSeconds] int NOT NULL,
  [AveragePercentageReturnVisitors] int NOT NULL,
  [SDPercentageReturnVisitors] int NOT NULL
)
GO

CREATE TABLE [ABTesting].[ExperimentalSessions] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Experiment] int NOT NULL,
  [TargetIPAddress] nvarchar(255) NOT NULL,
  [RetentionSeconds] int NOT NULL
)
GO

CREATE TABLE [ABTesting].[ExperimentFeedback] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Experiment] int NOT NULL,
  [Vote] bit,
  [Rating] int,
  [Text] nvarchar(255)
)
GO

CREATE TABLE [ProjectManagement].[Projects] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Enabled] bit NOT NULL,
  [Provider] int,
  [Name] nvarchar(255) NOT NULL,
  [Website] nvarchar(255) NOT NULL,
  [Details] nvarchar(255)
)
GO

CREATE TABLE [Info].[ExternalWebsites] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [IconBase64] varchar(max) NOT NULL,
  [Category] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Info].[ProviderLinks] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [ProviderID] int NOT NULL,
  [ExternalWebsiteID] int NOT NULL
)
GO

CREATE TABLE [Info].[MarkdownPages] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [RawMarkdown] varchar(max) NOT NULL
)
GO

CREATE TABLE [Info].[ProviderDetailsMarkdownPages] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [ProviderID] int NOT NULL,
  [MarkdownPageID] int NOT NULL
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

ALTER TABLE [Security].[APIKeyGroups] ADD FOREIGN KEY ([APIKeyID]) REFERENCES [Security].[APIKeys] ([ID])
GO

ALTER TABLE [Security].[APIKeyGroups] ADD FOREIGN KEY ([GroupID]) REFERENCES [Security].[Groups] ([ID])
GO

ALTER TABLE [Security].[PermissionsForRoles] ADD FOREIGN KEY ([RoleID]) REFERENCES [Security].[Roles] ([ID])
GO

ALTER TABLE [Security].[PermissionsForRoles] ADD FOREIGN KEY ([PermissionID]) REFERENCES [Security].[Permissions] ([ID])
GO

ALTER TABLE [Security].[GroupRoles] ADD FOREIGN KEY ([GroupID]) REFERENCES [Security].[Groups] ([ID])
GO

ALTER TABLE [Security].[GroupRoles] ADD FOREIGN KEY ([RoleID]) REFERENCES [Security].[Roles] ([ID])
GO

ALTER TABLE [ABTesting].[APIKeyExperimentBinding] ADD FOREIGN KEY ([ExperimentID]) REFERENCES [ABTesting].[Experiments] ([ID])
GO

ALTER TABLE [ABTesting].[APIKeyExperimentBinding] ADD FOREIGN KEY ([APIKeyID]) REFERENCES [Security].[APIKeys] ([ID])
GO

ALTER TABLE [ABTesting].[ExperimentTargets] ADD FOREIGN KEY ([Type]) REFERENCES [ABTesting].[ExperimentTargetTypes] ([ID])
GO

ALTER TABLE [ABTesting].[ExperimentFeedback] ADD FOREIGN KEY ([Experiment]) REFERENCES [ABTesting].[Experiments] ([ID])
GO

ALTER TABLE [ABTesting].[ExperimentalSessions] ADD FOREIGN KEY ([ID]) REFERENCES [ABTesting].[Experiments] ([ID])
GO

ALTER TABLE [ABTesting].[ExperimentResults] ADD FOREIGN KEY ([Experiment]) REFERENCES [ABTesting].[Experiments] ([ID])
GO

ALTER TABLE [ABTesting].[Experiments] ADD FOREIGN KEY ([RunParameters]) REFERENCES [ABTesting].[ExperimentRunParameters] ([ID])
GO

ALTER TABLE [ABTesting].[Experiments] ADD FOREIGN KEY ([Target]) REFERENCES [ABTesting].[ExperimentTargets] ([ID])
GO

ALTER TABLE [ABTesting].[Experiments] ADD FOREIGN KEY ([ProjectID]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [ProjectManagement].[Projects] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [Info].[ProviderLinks] ADD FOREIGN KEY ([ProviderID]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [Info].[ProviderLinks] ADD FOREIGN KEY ([ExternalWebsiteID]) REFERENCES [Info].[ExternalWebsites] ([ID])
GO

ALTER TABLE [Info].[ProviderDetailsMarkdownPages] ADD FOREIGN KEY ([ProviderID]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [Info].[ProviderDetailsMarkdownPages] ADD FOREIGN KEY ([MarkdownPageID]) REFERENCES [Info].[MarkdownPages] ([ID])
GO
