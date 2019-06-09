/**
 * This file is required by karma.conf.ts and loads recursively all the .spec and framework files
 */

// tslint:disable-next-line:no-reference
/// <reference path="../../../node_modules/@types/webpack-env/index.d.ts" />

import {
  BrowserDynamicTestingModule, platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import {getTestBed} from '@angular/core/testing';
import 'zone.js/dist/zone-testing';

declare const require: __WebpackModuleApi.RequireFunction;

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

const context: __WebpackModuleApi.RequireContext = require.context('./', true, /\.spec\.ts$/);

context.keys().map(context);
