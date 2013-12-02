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
    dist: 'dist',
    lib: 'bower_components'
  };

  // configure tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    app: appConfig,

    watch: {
      options: {
        nospawn: false
      },
      files: {
        files: [
          'Gruntfile.js',
          '<%= app.src %>/*.html',
          '<%= app.src %>/**/{,*/}*.js',
          '<%= app.src %>/**/{,*/}*.less',
          '<%= app.lib %>/**/{,*/}*.js',
          '<%= app.lib %>/**/{,*/}*.less'
        ],
        tasks: ['build']
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
        '<%= app.src %>/js/{,*/}*.js'
      ]
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        preserveComments: 'some' // none, some, all
        // beautify: true,
        // mangle: false,
        // compress: false
      },
      plugins: {
        src: [
          '<%= app.lib %>/jquery/jquery.js',
          '<%= app.lib %>/jquery.animate-enhanced/jquery.animate-enhanced.min.js',
          '<%= app.lib %>/jquery.superslides/dist/jquery.superslides.js',
          '<%= app.lib %>/bootstrap/js/transition.js',
          // '<%= app.lib %>/bootstrap/js/alert.js',
          '<%= app.lib %>/bootstrap/js/button.js',
          // '<%= app.lib %>/bootstrap/js/carousel.js',
          // '<%= app.lib %>/bootstrap/js/collapse.js',
          // '<%= app.lib %>/bootstrap/js/dropdown.js',
          // '<%= app.lib %>/bootstrap/js/modal.js',
          // '<%= app.lib %>/bootstrap/js/tooltip.js',
          // '<%= app.lib %>/bootstrap/js/popover.js',
          // '<%= app.lib %>/bootstrap/js/scrollspy.js',
          '<%= app.lib %>/bootstrap/js/tab.js',
          // '<%= app.lib %>/bootstrap/js/affix.js',
        ],
        dest: '<%= app.dist %>/js/plugins.js'
      },
      main: {
        src: ['<%= app.src %>/js/main.js'],
        dest: '<%= app.dist %>/js/main.js'
      },
      modernizr: {
        src: [
          '<%= app.lib %>/modernizr/modernizr.js'
        ],
        dest: '<%= app.dist %>/js/modernizr.js'
      }
    },

    less: {
      development: {
        options: {
          paths: [
            '<%= app.src %>/less',
            '<%= app.lib %>/flexslider-less',
            '<%= app.lib %>/font-awesome/less',
            '<%= app.lib %>/jquery.superslides/dist/stylesheets',
            '<%= app.lib %>/bootstrap/less'
          ]
        },
        files: {
          '<%= app.src %>/less/main.css': ['<%= app.src %>/less/main.less']
        }
      }
    },

    useminPrepare: {
      html: '<%= app.src %>/index.html',
      options: {
        dest: '<%= app.dist %>'
      }
    },

    usemin: {
      html: ['<%= app.dist %>/{,*/}*.html'],
      css: ['<%= app.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%= app.dist %>']
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= app.dist %>/css/main.css': [
            '.tmp/less/{,*/}*.css',
            '<%= app.src %>/less/{,*/}*.css'
          ]
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.src %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= app.dist %>/images'
        }]
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
          // removeOptionalTags: true
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
            'images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            'fonts/{,*/}*.*'
          ]
        }]
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= app.dist %>/js/{,*/}*.js',
            '<%= app.dist %>/css/{,*/}*.css',
            '<%= app.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= app.dist %>/fonts/{,*/}*.*'
          ]
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'less',
    'uglify',
    'useminPrepare',
    'imagemin',
    'htmlmin',
    'cssmin',
    'copy',
    'clean:less',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

};
