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
                    'build/assets/css/styles.css': 'assets/css/styles.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['assets/js/scripts/*.js'],
                tasks: ['concat']
            },
            css: {
                files: ['assets/css/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },
        concat: {
            options: {
                separator: ';' // permet d'ajouter un point-virgule entre chaque fichier concaténé.
            },
            dist: {
                src: ['assets/js/scripts/*.js'], // la source
                dest: 'assets/js/scripts.js' // la destination finale
            }
        },
        uglify: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['assets/js/scripts.js'],
                dest: 'build/assets/js/built.min.js'
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['node_modules/jquery/dist/jquery.min.js'], dest: 'build/assets/js', filter: 'isFile', flatten: true},
                    {expand: true, src: ['assets/css/styleSVG-bike.css'], dest: 'build/assets/css', filter: 'isFile', flatten: true},
                ]
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

// 4. Nous disons à Grunt quoi faire lorsque nous tapons "grunt" dans la console.
    grunt.registerTask('default', ['sass']);
    grunt.registerTask('sprite', ['svg_sprite']);//Genere une feuille de sprites
    grunt.registerTask('build', ['concat', 'uglify', 'copy', 'sass']);//Prépare els fichiers pour le build (js concaténés/uglifiés, css déplacés).
};
