module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'build/css/style.css': 'sass/style.scss'
        }
      }
    },

    shell: {
      ms: {
        command: 'node metalsmith.js'
      }
    },

    watch: {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      },
      ms: {
        files: ['src/**/*.md', 'layouts/**/*.html'],
        tasks: ['shell:ms']
      },
      livereload: {
        options: { livereload: true },
        files: ['build/**/*'],
      },
    },

    connect: {
        server: {
          options: {
            port: 8080,
            base: 'build'
          }
        }
      }
  });



  grunt.registerTask('default', [
    'sass',
    'shell:ms'
    ]);

  grunt.registerTask('watcher', [
    'default',
    'connect',
    'watch'
    ]);

};
