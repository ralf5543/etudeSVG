module.exports = function (grunt) {

// 1. Toutes les configurations vont ici:
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/assets/css/global.css': 'assets/css/global.scss'
                }
            }
        },
        watch: {
            css: {
                files: ['assets/css/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },
        svg_sprite: {
            options: {
                // generic options go here.
            },
            basic: {
                // Target-specific file lists and/or options go here.
                expand: true,
                cwd: 'src/sprites',
                src: ['**/*.svg'],
                dest: 'img/sprites',
                options: {
                    // Target-specific options
                    mode: {
                        view: {
                            sprite: 'pictos_digiposte.svg',
                            bust: false, //remove 46546456456465 cache to name file
                            render: {
                                css: true
                            }
                        }
                    },
                    svg: {
                        xmlDeclaration: false,     // Add XML declaration to SVG sprite
                        doctypeDeclaration: false  // Add DOCTYPE declaration to SVG sprite
                    }
                }
            }
        }
    });

// 3. Nous disons à Grunt que nous voulons utiliser ce plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-svg-sprite');

// 4. Nous disons à Grunt quoi faire lorsque nous tapons "grunt" dans la console.
    grunt.registerTask('default', ['sass']);
    grunt.registerTask('sprite', ['svg_sprite']);

};
