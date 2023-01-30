﻿using ETHTPS.Data.Extensions;
using ETHTPS.Data.Extensions.StringExtensions;

using Microsoft.AspNetCore.Http;

using System.Linq;

namespace ETHTPS.Data.Database.Extensions
{
    public static class APIKeyExtensions
    {
        public static int GetAPIKeyID(this ETHTPSContext context, HttpContext httpContext)=>context.GetAPIKeyID(httpContext.ExtractAPIKey());
        public static int GetAPIKeyID(this ETHTPSContext context, string apiKey)
        {
            lock (context.LockObj)
            {
                return context.Apikeys.First(context => context.KeyHash == apiKey.SHA256()).Id;
            }
        }
        public static bool ValidateAPIKey(this ETHTPSContext context, string apiKey)
        {
            var keyHash = apiKey.SHA256();
            lock (context.LockObj)
            {
                return context.Apikeys.Any(context => context.KeyHash == keyHash);
            }
        }

        public static bool ValidateNumberOfCalls(this ETHTPSContext context, string apiKey)
        {
            var keyHash = apiKey.SHA256();
            lock (context.LockObj)
            {
                var entry = context.Apikeys.First(context => context.KeyHash == keyHash);
                return entry.CallsLast24h < entry.Limit24h;
            }
        }

        public static void IncrementNumberOfCalls(this ETHTPSContext context, string apiKey)
        {
            var keyHash = apiKey.SHA256();
            lock (context.LockObj)
            {
                var entry = context.Apikeys.First(context => context.KeyHash == keyHash);
                entry.CallsLast24h++;
                entry.TotalCalls++;
                context.Update(entry);
                context.SaveChanges();
            }
        }
    }
}