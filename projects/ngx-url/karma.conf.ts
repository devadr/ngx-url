/**
 * Karma configuration file, see link for more information
 * https://karma-runner.github.io/1.0/config/configuration-file.html
 */

import {Config, ConfigOptions} from 'karma';
import * as path from 'path';

interface ConfigurationOptions extends ConfigOptions {
  /**
   * https://github.com/mattlewis92/karma-coverage-istanbul-reporter#configuration
   */
  coverageIstanbulReporter: {[key: string]: any};
}

interface Configuration extends Config {
  set: (config: ConfigurationOptions) => void;
}

function setConfig(config: Configuration): void {
  config.set({
    basePath: 'src',
    browsers: [
      'ChromeHeadless',
    ],
    client: {
      clearContext: false,
    },
    frameworks: [
      'jasmine',
      '@angular-devkit/build-angular',
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-coverage-istanbul-reporter',
      '@angular-devkit/build-angular/plugins/karma',
    ],
    reporters: [
      'dots',
      'kjhtml',
    ],
    coverageIstanbulReporter: {
      reports: [
        'html',
        'lcovonly',
        'text-summary',
      ],
      dir: path.join(__dirname, '../../coverage/ngx-url'),
      fixWebpackSourcePaths: true,
    },
  });
}

// noinspection JSUnusedGlobalSymbols
export default setConfig;
