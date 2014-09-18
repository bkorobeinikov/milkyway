using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Se7enRedLines.Milkyway.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(null, "timeline",
                            new { controller = "Home", action = "Timeline" });

            routes.MapRoute(null, "edit",
                            new { controller = "Home", action = "Edit" });

            routes.MapRoute(null, "login",
                            new { controller = "Home", action = "Login" });

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}