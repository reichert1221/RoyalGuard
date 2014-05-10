module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      less: {
        files: ["public/libs/bootstrap/less/*"],
        tasks: ["less"],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['gruntfile.js', 'server.js', 'server/**/*.js', 'public/js/**'],
        tasks: ['jshint'],
        options: {
           livereload: true
        }
      },
      html: {
        files: ['public/views/**', 'server/views/**'],
        options: {
          livereload: true
        }
      }
    },
    styles: {
      // Which files to watch (all .less files recursively in the less directory)
      files: ['public/libs/bootstrap/less/bootstrap.less'],
      tasks: ['less'],
      options: {
        nospawn: true
      }
    },
    jshint: {
      all: {
        src: ['gruntfile.js', 'server.js', 'server/**/*.js', 'public/js/**'],
        options: {
          jshintrc: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: [],
          ignore: ['public/**'],
          ext: 'js,html',
          nodeArgs: ['--debug'],
          delayTime: 1,
          env: {
            PORT: 8080
          },
          cwd: __dirname
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: false,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "public/css/custom-bootstrap.min.css": "public/libs/bootstrap/less/bootstrap.less"
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
       options: {
         logConcurrentOutput: true
      }
    }
  });

  //Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');



  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Default task(s).
  if (process.env.NODE_ENV === 'production') {
      grunt.registerTask('default', ['jshint', 'concurrent']);
  } else {
      grunt.registerTask('default', ['jshint', 'concurrent']);
  }

  //Test task.
  //grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};
