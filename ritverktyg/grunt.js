module.exports = function(grunt) {
  // Project configuration.
  var req = [
    'src/req/prototype.js',
    'src/req/raphael.min.js',
    'src/req/ScaleRaphael.js',
  ];
  var mine = [
    'src/settings.js',
    'src/app.js',
    'src/hylla.js'
  ];

  var basepath = '../public/js/ritverktyg/';
  var all = req.concat(req,mine);
  grunt.initConfig({
    concatreq: {
      dist: {
        src: all,
        dest: basepath+'req.js'
      }
    },
    concat: {
      dist: {
        src: all,
        dest: basepath+'build.js'
      }
    },
    min: {
      dist: {
        src: basepath+'build.js',
        dest: basepath+'build.min.js'
      }
    },
    watch: {
      files: ['grunt.js', 'src/*.js'],
      tasks:'default'
    },
    lint: {
      files:mine
    }
  });
  grunt.registerTask('default', 'concat');
};