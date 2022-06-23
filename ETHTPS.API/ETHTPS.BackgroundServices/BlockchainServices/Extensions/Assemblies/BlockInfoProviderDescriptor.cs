﻿using ETHTPS.Services.BlockchainServices.Attributes;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Extensions.Assemblies
{
    public class BlockInfoProviderDescriptor
    {
        public ProviderAttribute Attribute { get; set; }
        public Type ImplementationType { get; set; }
    }
}
