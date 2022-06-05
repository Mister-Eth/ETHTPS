ALTER TABLE [Providers]
ADD [SubchainOf] int

ALTER TABLE [Providers] ADD FOREIGN KEY ([SubchainOf]) REFERENCES [Providers] ([ID])
GO

UPDATE [Providers] SET [SubchainOf] = 1 WHERE ID != 1