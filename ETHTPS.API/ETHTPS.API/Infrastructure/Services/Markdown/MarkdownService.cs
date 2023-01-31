using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;

using System;

namespace ETHTPS.API.Infrastructure.Services.Markdown
{
    public class MarkdownService : EFCoreCRUDServiceBase<MarkdownPage>, IMarkdownService
    {
        public MarkdownService(EthtpsContext context) : base(context.MarkdownPages, context)
        {
        }
    }
}
