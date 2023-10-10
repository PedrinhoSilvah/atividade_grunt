
module.exports = function(grunt){
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
        development: {
            files: {
                'dev/styles/main.css' : 'src/styles/main.less'
            }
        },
        production: {
            options: {
                compress: false,
            },
            files: {
                'dist/styles/styles.css' : 'src/styles/main.less'
            }
        }
    },
    watch: {
        less: {
            files: ['src/styles/**/*.less'],
            tasks: ['less:development']
        },
        html: {
            files: ['src/index.html'],
            tasks: ['replace:dev']
        }
    },
    replace: {
        dev: {
            options: {
                patterns: [
                    {

                    match: 'ENDERECO_DO_CSS',
                    replacement: './styles/main.css'

                },
                {

                match: 'ENDERECO_DO_JS',
                replacement: './src/scripts/script.js'
            
                }
            ]
            },
            files: [
                {
                    expand: true,
                    flatten: true,
                    src: ['src/index.html'],
                    dest: 'dev/'
                }
            ]
        },
        dist: {
            options: {
                patterns: [
                    {
                        match: 'ENDERECO_DO_CSS',
                        replacement: './styles/styles.css'
                    },
                    {
                        match: 'ENDERECO_DO_JS',
                        replacement: './scripts/main.js'
                    }
                ]
            },
            files: [
                {
                    expand: true,
                    flatten: true,
                    src: ['src/index.html'],
                    dest: 'dist/'
                }
            ]
        }
        
    },
    uglify: {
        target: {
            files: {
                'dist/scripts/main.js' : 'src/scripts/script.js'
            }
        }
    }
    })

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'replace:dist', 'uglify']);
}