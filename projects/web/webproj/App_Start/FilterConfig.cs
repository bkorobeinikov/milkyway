using System.Web;
using System.Web.Mvc;

namespace Se7enRedLines.Milkyway.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}