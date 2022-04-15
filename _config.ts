import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import sass from "lume/plugins/sass.ts";
import esbuild from "lume/plugins/esbuild.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import { htmlMinifier } from "https://raw.githubusercontent.com/xHyroM/xHyroM/master/packages/site/plugins/htmlMinifier.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import cacheBusting from "lume/middlewares/cache_busting.ts";

const site = lume(
  {
    src: "./src",
    server: {
      page404: "./404/",
      middlewares: [cacheBusting({})]
    },
  },
);

site
  .ignore("README.md")
  .copy("static", ".")
  .use(resolveUrls())
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
