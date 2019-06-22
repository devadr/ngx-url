# NgxUrl

NgxUrl is an Angular library for dealing with url in a more convenient way.
It allows easy access to particular parts of the url. It also provides tracking of url changes,
so that it is easy to compare current and previous urls.

## Installation

NPM:

```bash
npm install ngx-url
```

Yarn:

```bash
yarn add ngx-url
```

## Usage

Use `Url` as any other service:

```typescript
import {Url} from 'ngx-url'; 

class Component {
  constructor(private url: Url) { }
}
```

With `Url` service you are able to:

* create a url state containing handy properties

```typescript
const urlState = this.url.createState('some/url/');
```

* subscribe to url changes that are updated on every navigation

```typescript
this.url.changes$.subscribe(({current, previous}: UrlChanges) => {
  // do your stuff
});
```

* get recently updated url changes without subscribing

```typescript
const changes = this.url.changesValue;
```

## Issues

If you find any issue or have an idea regarding the project and want to share with it,
do not hesitate to open a new [issue](https://github.com/devadr/ngx-url/issues).

## Contributing

Contributions are welcome. Submit a [pull request](https://github.com/devadr/ngx-url/pulls) if you want to apply your changes.

## Development

### Build

Run 

```
ng build
```

or

```
npm run build
```

or

```
yarn run build
```

to build the project. The build artifacts will be stored in the dist/ directory.

### Test

You can test the project in three ways by running an appropriate script defined in package.json file.

If you want to run disposable tests, run `test` script.

In case you want to watch for changes in files being tested, run `test-watch` script.

Or if you want to debug your code in a browser, run `test-debug` script.

## License

The code is available under the [MIT License](https://github.com/devadr/ngx-url/blob/release/v1.0.0/projects/ngx-url/LICENSE).
