const slugify = require('slugify');


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

    eleventyConfig.addFilter('slugify', function(value) {

        if (!value) { return }
        
        let slugifyConfig = {   
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            strict: true,     // strip special characters except replacement, defaults to `false`
        }
                
        return slugify(value, slugifyConfig);

    });

    return {
        dir: { input: 'src', output: 'dist', includes: '_includes' }
    };

}
