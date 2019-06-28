module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: './public',
            src: ['**'],
            dest: './dist/public'
          },
          {
            expand: true,
            cwd: './views',
            src: ['**'],
            dest: './dist/views'
          }
        ]
      }
    },
    ts: {
      app: {
        files: [
          {
            src: ['src/**/*.ts', '!src/.baseDir.ts'],
            dest: './dist'
          }
        ],
        options: {
          module: 'commonjs',
          target: 'es6',
          sourceMap: true,
          rootDir: 'src',
          baseUrl: "./",
          paths: {
            "@modules/*": ["src/modules/*"]
          },
          experimentalDecorators: true,
          emitDecoratorMetadata: true
        }
      }
    },
    watch: {
      ts: {
        files: ['src/**/*.ts'],
        tasks: ['ts']
      },
      views: {
        files: ['views/**/*.html'],
        tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-ts-compiler');
  grunt.registerTask('default', ['copy', 'ts']);
};
