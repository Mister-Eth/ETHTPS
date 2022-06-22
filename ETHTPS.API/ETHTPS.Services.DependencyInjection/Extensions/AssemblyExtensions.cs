using System;
using System.Reflection;
using System.Linq;
using System.Collections.Generic;

namespace ETHTPS.Services.DependencyInjection.Extensions
{
    public static class AssemblyExtensions
    {
        public static IEnumerable<Assembly> GetApplicationAssemblies()
        {
            var list = new List<string>();
            var stack = new Stack<Assembly>();

            stack.Push(Assembly.GetEntryAssembly());

            do
            {
                var asm = stack.Pop();

                yield return asm;

                foreach (var reference in asm.GetReferencedAssemblies())
                {
                    if (!list.Contains(reference.FullName))
                    {
                        stack.Push(Assembly.Load(reference));
                        list.Add(reference.FullName);
                    }
                }   

            }
            while (stack.Count > 0);

        }
    }
}
