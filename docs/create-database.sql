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

ALTER TABLE [Providers] ADD FOREIGN KEY ([Type]) REFERENCES [ProviderTypes] ([ID])
GO
