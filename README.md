# remark-containers

This [remark] plugin provides parsing for `:::` delimited containers to wrap markdown blocks in arbitrary html. 

## Default Syntax

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

```bash
npm install remark-containers
```

## Usage

```javascript
const unified = require('unified')
const parse = require('remark-parse')
const containers = require('remark-containers')
const stringify = require('rehype-stringify')
const remark2rehype = require('remark-rehype')

unified()
  .use(parse)
  .use(containers)
  .use(remark2rehype)
  .use(stringify)
```

## Options

Using the `options` for this plugin allows for control over the resulting [mdast].

```javascript
.use(containers, {
  default: true, 
  custom: [{
    type: 'callout',
    element: 'article',
    transform: function(node, config, tokenize) {
      node.data.hProperties = {
          className: config || 'left'
      }
    }
    }, {
        type: 'quote',
        element: 'aside',
        transform: function(node, config, tokenize) {
          var words = tokenizeWords.parse(config)

          node.data.hProperties = {
              className: `quoted ${words.shift()}`
          }
          node.children.push({
              type: 'footer',
              data: {
                hName: 'footer'
              },
              children: tokenize(words.join(' '))
          })
        }
    }
  ]
})
```

### `default`

When `true` the default syntax will be enabled. 

### `custom`

An array of custom container configurations.

#### `type`

A single word string identifying the type of this container. Any markdown of the form `::: {type}` will match this container.

#### `element`

The html element name to use for the container. Default 'div'.

#### `transform(node, config, tokenize)`

A function to manipulate the [mdast] node. 

##### `node`

The [mdast] node for this container.

##### `config`

The markdown string from after `::: type` until the end of the line.

##### `tokenize`

 A `function(value): mdastNode` you can use to tokenize an inline markdown string, if needed.

## Feedback

[Bugs & feedback][bugs].

## License

[MIT][license] © [Dan Behlings][nevenall]

<!-- Definitions -->

[license]: https://github.com/Nevenall/remark-containers/blob/master/LICENSE

[nevenall]: https://github.com/nevenall

[bugs]: https://github.com/Nevenall/remark-containers/issues

[npm]: https://www.npmjs.com/package/remark-containers

[remark]: https://github.com/remarkjs/remark

[mdast]: https://github.com/syntax-tree/mdast/blob/master/readme.md