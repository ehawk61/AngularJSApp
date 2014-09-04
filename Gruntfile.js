module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    jasmine : {
	// Your project's source files
	src : [ 'bower_components/angular/angular.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'bower_components/angular-strap/dist/angular-strap.js',
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/bootbox/bootbox.js',
		'bower_components/bootstrap/dist/js/bootstrap.min.js',
		'vendor/angular-route.js',
		'vendor/angular-resource.js',
		'vendor/ng-table.js',
		'app/intro.js',
		'app/controllers/*.js'],
	// Your Jasmine spec files
	options : {
	  specs : 'testUnit.js'
	}
    }//end jasmine
    
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('default', 'jasmine');
  
};

