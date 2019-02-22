# remark-containers

This [remark] plugin provides parsing for containers so you can wrap blocks of markdown in arbitrary html containers. 

## Bugs

This is an initial version and is likely to have some bugs. If you find one, please [report it][bugs].

## Default Container

The first word after the `:::` is the HTML element name. The rest of line is optional but, if present, will become the element's `class` attribute. 

```markdown
::: aside class-one class-two
# Header One

With container contents. 
::: 
```
results in:

```html
<aside class="class-one class-two">
  <h1>Header One</h1>
  <p>With container contents.</p>
</aside>
```

## Installation

[npm]:

```bash
npm install remark-containers
```

## Usage

```javascript
const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkContainers = require('remark-containers')
const stringify = require('rehype-stringify')
const remark2rehype = require('remark-rehype')

unified()
  .use(remarkParse)
  .use(remarkContainers)
  .use(remark2rehype)
  .use(stringify)
```

## Custom Containers

Using the `options` for this plugin allows for control over the resulting [mdast].

When used, only containers who's first word matches the `type` will be parsed. It's possible to `use()` this plugin multiple times to support different types of custom containers. 

It is also possible to `use()` various custom containers & `use()` a default container.

### Usage

```javascript
unified()
  .use(remarkContainers, {
      type: 'my-custom-container',
      element: 'figure',
      transform: (node, config, tokenize) => {
         node.children.push({
            type: 'figcaption',
            data: {
               hName: 'figcaption'
            },
            children: tokenize(config)
         })
      }
   })
```

```markdown
::: my-custom-container This is a caption **string** for the figure
# Header One

With container contents. 
::: 
```
results in:

```html
<figure>
  <h1>Header One</h1>
  <p>With container contents.</p>
  <figcaption>This is a caption <strong>string</strong> for the figure</figcaption>
</figure>
```

The follow `options` are **required**:

- `type:` should be a one word string. Only `::: type-name` markdown will match this container instance.
- `element:` should be the name of an HTML element. It will wrap the body of the container.
- `transform:` should be a function accepting
  - `node:` the [mdast] node for the container.
  - `config:` the markdown string after the `::: container-type` until the end of the line.
  - `tokenize:` a `function(value): MDAST Node` you can use to tokenize an inline markdown string if needed.

## License

[MIT][license] © [Dan Behlings][nevenall]

<!-- Definitions -->

[license]: https://github.com/Nevenall/remark-containers/blob/master/LICENSE

[nevenall]: https://github.com/nevenall

[bugs]: https://github.com/Nevenall/remark-containers/issues

[npm]: https://www.npmjs.com/package/remark-containers

[remark]: https://github.com/remarkjs/remark

[mdast]: https://github.com/syntax-tree/mdast/blob/master/readme.md