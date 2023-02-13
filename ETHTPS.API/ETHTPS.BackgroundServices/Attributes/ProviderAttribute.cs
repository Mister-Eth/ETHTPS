using System;

namespace ETHTPS.Services.Attributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public class ProviderAttribute : Attribute
    {
        public ProviderAttribute(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
}
