module.exports = function(eleventyConfig) {
  // Copiar assets estáticos al output
  eleventyConfig.addPassthroughCopy({"src/css": "css"});
  eleventyConfig.addPassthroughCopy({"src/js": "js"});
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});
  eleventyConfig.addPassthroughCopy({"src/images": "images"});
  
  // Watch targets
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");
  
  // Configurar BrowserSync para acceso desde red local
  eleventyConfig.setBrowserSyncConfig({
    host: "0.0.0.0",
    port: 8080,
    ui: false
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: "/taquerias-landing-page/"
  };
};
