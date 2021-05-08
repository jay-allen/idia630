const slugify = require("slugify");

module.exports = function (eleventyConfig) {
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

    eleventyConfig.addFilter("slugify", function (value) {
        if (!value) {
            return;
        }

        let slugifyConfig = {
            replacement: "-", // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true, // convert to lower case, defaults to `false`
            strict: true, // strip special characters except replacement, defaults to `false`
        };

        return slugify(value, slugifyConfig);
    });

    eleventyConfig.addFilter("squash", function (text) {
        /**
         * Make a search index string by removing duplicated words
         * and removing less useful, common short words
         *
         * https://github.com/philhawksworth/hawksworx.com/blob/8c96ba2541c8fd6fe6f521cdb5e17848c231636c/src/site/_filters/squash.js
         *
         */
        var content = new String(text);

        // all lower case, please
        var content = content.toLowerCase();

        // remove all html elements and new lines
        var re = /(&lt;.*?&gt;)/gi;
        var plain = unescape(content.replace(re, ""));

        // remove duplicated words
        var words = plain.split(" ");
        var deduped = [...new Set(words)];
        var dedupedStr = deduped.join(" ");

        // remove short and less meaningful words
        var result = dedupedStr.replace(
            /\b(\.|\,|the|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi,
            ""
        );
        //remove newlines, and punctuation
        result = result.replace(/\.|\,|\?|-|—|\n/g, "");
        //remove repeated spaces
        result = result.replace(/[ ]{2,}/g, " ");
        // remove tabs
        result = result.replace(/\t/g, " ");
        // Remove characters
        result = result.replace(/\u0011/g, " ");
        result = result.replace(/\\/g, "");

        result.trim();

        return result;
    });

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes",
        },
    };
};
