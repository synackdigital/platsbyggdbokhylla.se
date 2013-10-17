'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var appConfig = {
    src: 'src',
    components: 'bower_components',
    dist: 'dist'
  };

  grunt.initConfig({
    app: appConfig,
    watch: {
      options: {
        nospawn: false
      },
      less: {
        files: ['<%= app.src %>/less/{,*/}*.less'],
        tasks: ['less']
      }
    },
    clean: {
      dist: ['.tmp', '<%= app.dist %>/*'],
      less: ['<%= app.src %>/less/{,*/}*.css']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= app.src %>/js/{,*/}*.js',
        '!<%= app.src %>/js/vendor/*'
      ]
    },
    less: {
      development: {
        options: {
          paths: [
            '<%= app.src %>/less',
            '<%= app.components %>/lesshat',
            '<%= app.components %>/semantic-grid/stylesheets/less',
            '<%= app.components %>/font-awesome/less',
            '<%= app.components %>/flexslider-less',
            '<%= app.components %>/jquery-popover'
          ]
        },
        files: {
          '<%= app.src %>/less/main.css': ['<%= app.src %>/less/main.less']
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= app.dist %>/assets/css/main.css': [
            '.tmp/less/{,*/}*.css',
            '<%= app.src %>/less/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          // removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= app.src %>',
          src: '*.html',
          dest: '<%= app.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= app.src %>',
          dest: '<%= app.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'fonts/{,*/}*.*'
          ]
        }]
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= app.dist %>/assets/js/{,*/}*.js',
            '<%= app.dist %>/assets/css/{,*/}*.css',
            '<%= app.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= app.dist %>/assets/fonts/{,*/}*.*'
          ]
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'less',
    'htmlmin',
    'cssmin',
    'copy',
    'clean:less',
    'rev'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

};
