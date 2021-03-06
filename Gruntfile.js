/*
 * Copyright 2013, All Rights Reserved.
 *
 * Code licensed under the BSD License:
 * https://github.com/eduardolundgren/liferay-ui-docs/blob/master/LICENSE.md
 *
 * @author Eduardo Lundgren <eduardolundgren@gmail.com>
 */

'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        bump: {
            options: {
                commit: true,
                commitFiles: ['package.json'],
                commitMessage: 'Release v%VERSION%',
                createTag: true,
                files: ['package.json'],
                push: true,
                pushTo: 'origin',
                tagMessage: '',
                tagName: 'v%VERSION%'
            }
        },

        clean: {
            images: ['dest']
        },

        copy: {
            images: {
                expand: true,
                src: ['src/**/images/**'],
                dest: 'dest'
            }
        },

        jsbeautifier: {
            // files: ['dest/**/*.html'],
            options: {
                html: {
                    indentChar: ' ',
                    indentSize: 2,
                    preserveNewlines: false
                }
            }
        },

        markdown: {
            alloy: {
                options: {
                    src: ['src/**/*.md']
                }
            }
        },

        watch: {
            files: [
                'Gruntfile.js',
                '<%= markdown.alloy.options.src %>',
                '<%= copy.images.src %>'
            ],
            tasks: ['default']
        }
    });

    grunt.task.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('default', ['clean', 'copy', 'markdown', 'jsbeautifier']);

};
