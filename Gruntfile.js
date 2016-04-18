module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        csslint: {
            default: {
                src: ["css/**/*.css"]
            }
        },
        jshint: {
            default: {
                src: ['js/**/*.js', "!js/vendor/**/*"]
            }
        },
        karma: {
            default: {
                configFile: "karma.conf.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-karma");

    grunt.registerTask("default", ["csslint", "jshint", "karma"]);
};