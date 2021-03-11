module.exports = function( eleventyConfig ){

    // eleventyConfig.addWatchTarget("./src/assets/styles/src");
    eleventyConfig.addWatchTarget("./src/sass/");


    // Copy the /img directory
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy("src/assets/styles/*.css*");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/web.config");
    
    

    // Inline Minified CSS
    // eleventyConfig.addFilter("cssmin", function(code) {
    //     return new CleanCSS({}).minify(code).styles;
    // });

    return {
        dir: { input: 'src', output: 'dist', includes: '_includes' }
    };

}
