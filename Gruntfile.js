module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
  	  // define the files to lint
  	  files: ['Gruntfile.js', 'js/**/*.js', 'js/*.js'],
  	  // configure JSHint (documented at http://www.jshint.com/docs/)
  	  options: {
  	      // more options here if you want to override JSHint defaults
  	    globals: {
  	      jQuery: true,
  	      console: true,
  	      module: true
  	    }
  	  }
  	},
    handlebars: {
      compile: {
        files: {
          'templates/templates.js': ['templates/*.hbs']
        },
        options: {
          commonjs: true
        }
      }

    },
    browserify: {
      'dist/background.js': ['js/background.js'],
      'dist/popup.js': ['js/popup.js'],
      options: {
        bundleOptions: {
          debug: true
        }
      }
    },

    watch: {
      src: {
        files: ['js/*.js', 'templates/templates.js', 'js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      handlebars: {
        files: ['templates/*.hbs'],
        tasks: ['handlebars', 'browserify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'handlebars', 'browserify']);

};
