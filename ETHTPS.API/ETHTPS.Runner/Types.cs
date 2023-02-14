namespace ETHTPS.Runner
{
    public enum ServiceEventType
    {
        OutputChanged, StateChanged, Error
    }
    public enum ServiceState
    {
        Stopped, Stopping, Starting, Running, Dead
    }
}
