/*
 * Copyright 2013, All Rights Reserved.
 *
 * Code licensed under the BSD License:
 * https://github.com/eduardolundgren/liferay-ui-docs/blob/master/LICENSE.md
 *
 * @author Eduardo Lundgren <edu@rdo.io>
 */

'use strict';

module.exports = function(grunt) {

    var async = require('async');
    var marked = require('marked');
    var path = require('path');
    var pygmentize = require('pygmentize-bundled');

    grunt.task.registerMultiTask('markdown', function() {

        var files,
            operations,
            options;

        options = this.options({

            dest: 'dest',

            src: '*.md',

            cssPath: path.join(__dirname, 'lib/github.css'),

            templatePath: path.join(__dirname, 'lib/github.html')

        });

        options.cssContent = grunt.file.read(options.cssPath);

        options.templateContent = grunt.file.read(options.templatePath);

        marked.setOptions({

            highlight: function(code, lang, callback) {

                pygmentize({
                    format: 'html',
                    lang: lang,
                    options: {
                        nowrap: true
                    }
                }, code, function(err, result) {
                    callback(err, result.toString());
                });

            }

        });

        files = grunt.file.expand(options.src);

        operations = [];

        files.forEach(function(filepath) {

            operations.push(function(callback) {

                marked(grunt.file.read(filepath), function(err, content) {

                    var outputPath = path.join(
                        options.dest, getFilepath(filepath, '.html'));

                    content = parseTemplate(options.templateContent, {
                        content: content,
                        style: options.cssContent
                    });
                    grunt.log.ok(outputPath);
                    grunt.file.write(outputPath, content);
                    callback(err);

                });

            });

        });

        async.series(operations, this.async());

    });

    function getFilepath(src, opt_extension) {

        var extension = path.extname(src);

        return path.join(
            path.dirname(src),
            path.basename(src, extension) + (opt_extension || extension));

    }

    function parseTemplate(template, context) {

        Object.keys(context).forEach(function(key) {
            template = template.replace('{{' + key + '}}', context[key]);
        });

        return template;

    }

};