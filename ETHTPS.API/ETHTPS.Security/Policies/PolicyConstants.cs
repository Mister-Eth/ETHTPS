﻿namespace ETHTPS.API.Security.Policies
{
    public static class PolicyConstants
    {
        public static PolicyDescriptor EditorPolicy => new("EditorsOnly", "Editor");
        public static PolicyDescriptor AdminPolicy => new("AdminsOnly", "Admin");
    }
}
