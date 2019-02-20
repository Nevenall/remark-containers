# remark-containers

This [remark][remark] plugin provides parsing for containers so you can wrap blocks of markdown in arbitrary html containers. 

## Bugs

This is an initial version and is likely to have some bugs. If you find one, please [report it].

## Syntax

The first word after the `:::` is the container-type. **This is currently expected to be an html element name.** The rest of line is configuration and currently translates directly to the html element's class attribute. In the future I plan to make containers more configurable so you can specify whatever html you like for a specific container-type and map the configuration string in various ways.

```
::: aside optional list of classes
# Header One

With container contents. 
::: 
```
results in:

```
<aside class="optional list of classes">
<h1>Header One</h1>
<p>With container contents.</p>
</aside>
```
## Installation

[npm][npm]:

```bash
npm install remark-containers
```

## Usage

Dependencies:

```javascript
const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkContainers = require('remark-containers')
const stringify = require('rehype-stringify')
const remark2rehype = require('remark-rehype')
```

Usage:

```javascript
unified()
  .use(remarkParse)
  .use(remarkContainers)
  .use(remark2rehype)
  .use(stringify)
```

## License

[MIT][license] © [Dan Behlings][nevenall]

<!-- Definitions -->

[license]: https://github.com/Nevenall/remark-containers/blob/master/LICENSE

[nevenall]: https://github.com/nevenall

[npm]: https://www.npmjs.com/package/remark-containers

[remark]: https://github.com/remarkjs/remark