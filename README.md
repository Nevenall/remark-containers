# remark-containers

This [remark] plugin provides parsing for containers in your markdown. 

## Default Syntax

Containers begin with `::: [noparse] {HTML Element Name} [optional list of classes]` on a new line, and end with `:::` on a new line. Container markers may be indented by up to 2 spaces.

For example:

```markdown
::: aside class-one class-two
# Header One

With container contents. 
:::
```

renders as:

```html
<aside class="class-one class-two">
  <h1>Header One</h1>
  <p>With container contents.</p>
</aside>
```

### Containers may be nested

For example: 

```markdown
::: div outer
# Header One

Outer contents.

  ::: div inner
  Inner contents.
  :::

More outer contents.
::: 
```

renders as:

```html
<div class="outer">           
  <h1>Header One</h1>         
  <p>Outer contents.</p>      
  <div class="inner">         
    <p>Inner contents.</p>    
  </div>                      
  <p>More outer contents.</p> 
</div>                        
```

### `noparse` stops processing of the container contents and instead treats it as raw text.

For example: 

```markdown
::: noparse div outer
# Header One

Outer contents.

 ::: div inner
 Inner contents. 
 :::

More outer contents.
::: 
```

renders as:

```html
<div class="outer">           
# Header One
Outer contents.
::: div inner
Inner contents. 
:::
More outer contents.
</div>                        
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

Passing an `options` object allows full control over the resulting [mdast]. 

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

When `true` the default syntax will also be enabled. 

### `custom`

An array of custom container configurations.

#### `type`

A single word string identifying the type of this container. Any markdown of the form `::: {type}` will use this custom transform.

#### `element`

The html element name to use for the container. Default 'div'.

#### `transform(node, config, tokenize)`

A function to manipulate the [mdast] node. 

##### `node`

The [mdast] node for this container.

##### `config`

The string after `::: type` until the end of the line. Can be used to configure how the transform operates.

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