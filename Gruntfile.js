 var shell = require('shelljs');
 module.exports = function(grunt) { 

  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      single: {
        singleRun: true,
      }
    }
  });

  grunt.registerTask('test', ['karma:single']);
  
  grunt.registerTask('pull', function() {
    var c = shell.exec('git pull --rebase upstream master').code;
    if(c !== 0) {
      shell.exec('npm install');
      shell.exec('bower install');
    }
  });

};