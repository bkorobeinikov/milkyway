using System.Web.Optimization;

namespace Se7enRedLines.Milkyway.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/app.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/app/*.js",
                "~/Scripts/app/model/*.js",
                "~/Scripts/app/helpers/*.js",
                "~/Scripts/app/map/*.js",
                "~/Scripts/app/services/*.js",
                "~/Scripts/app/social/*.js",
                "~/Scripts/app/home/*.js"));
        }
    }
}