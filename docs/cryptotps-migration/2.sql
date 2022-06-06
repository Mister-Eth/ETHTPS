CREATE SCHEMA [ProjectManagement]
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
  [Provider] int,
  [Name] nvarchar(255) NOT NULL,
  [Website] nvarchar(255) NOT NULL,
  [Details] nvarchar(255)
)
GO

ALTER TABLE [ProjectManagement].[Projects] ADD FOREIGN KEY ([Provider]) REFERENCES [dbo].[Providers] ([ID])
GO

ALTER TABLE [ProjectManagement].[Features] ADD FOREIGN KEY ([ProjectID]) REFERENCES [ProjectManagement].[Projects] ([ID])
GO

INSERT INTO [ProjectManagement].[Projects] VALUES
    (1, 1, 'ETHTPS', 'ethtps.info', 'ETHTPS website'),
    (1, NULL, 'CryptoTPS', 'cryptotps.info', 'CryptoTPS website')
