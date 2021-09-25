using ETHTPS.API.Infrastructure.Database.Models;

using HtmlAgilityPack;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Fizzler.Systems.HtmlAgilityPack;

namespace ETHTPS.TPSLogger.TPSLogging.HttpLogger
{
    public abstract class HTTPTPSLoggerBase : TPSLoggerBase
    {
        public string BaseURL { get; private set; }
        private readonly string _targetElementSelector;
        private readonly HttpClient _httpClient;

        protected HTTPTPSLoggerBase(ETHTPSContext context, string name, string baseURL, string targetElement) : base(context, name)
        {
            BaseURL = baseURL;
            _targetElementSelector = targetElement;
            _httpClient = new HttpClient();
        }

        public override async void LogDataAsync()
        {
            try
            {
                HtmlWeb web = new HtmlWeb();
                HtmlDocument doc = web.Load(BaseURL);

                var nodes = doc.DocumentNode.QuerySelectorAll(_targetElementSelector);
                var x = new string(nodes.First().InnerText.Where(c => char.IsNumber(c) || c == '.').ToArray());
                Console.WriteLine($"{Name}: {x}TPS");
                lock (Program.LockObject)
                {
                    var provider = Context.Providers.First(x => x.Name == Name);
                    var data = new TPSData()
                    {
                        Date = DateTime.Now,
                        Provider = provider.Id,
                        Tps = float.Parse(x)
                    };
                    Context.Tpsdata.Add(data);
                    Context.SaveChanges();
                }
                ;
            }
            catch(Exception e)
            {
                Console.WriteLine($"{Name}: {e.Message}");
            }
        }

        private static string Between(string STR, string FirstString, string LastString)
        {
            string FinalString;
            int Pos1 = STR.IndexOf(FirstString) + FirstString.Length;
            int Pos2 = STR.IndexOf(LastString);
            FinalString = STR.Substring(Pos1, Pos2 - Pos1);
            return FinalString;
        }
    }
}
