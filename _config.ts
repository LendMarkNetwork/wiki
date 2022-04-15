import lume from "https://deno.land/x/lume@v1.7.3/mod.ts";
import postcss from "https://deno.land/x/lume@v1.7.3/plugins/postcss.ts";
import sass from "https://deno.land/x/lume@v1.7.3/plugins/sass.ts";
import esbuild from "https://deno.land/x/lume@v1.7.3/plugins/esbuild.ts";
import codeHighlight from "https://deno.land/x/lume@v1.7.3/plugins/code_highlight.ts";
import { htmlMinifier } from "https://raw.githubusercontent.com/xHyroM/xHyroM/master/packages/site/plugins/htmlMinifier.ts";

const site = lume(
    {
      src: "./src",
      server: {
        page404: "./404/",
      },
    },
);

site
  .ignore("README.md")
  .copy("static", ".")
  .loadAssets([".ts"])
  .use(htmlMinifier())
  .use(sass())
  .use(codeHighlight())
  .use(postcss())
  .use(esbuild({
    options: {
      bundle: true,
      keepNames: true,
      minify: false,
      minifyWhitespace: true,
      minifySyntax: true,
      platform: "browser",
    },
  }))
  .scopedUpdates(
    (path) => path.endsWith(".css"),
    (path) => path.endsWith(".png") || path.endsWith(".jpg"),
  )
  // Filters
  .filter("slice", (arr, length) => arr.slice(0, length));
export default site;
