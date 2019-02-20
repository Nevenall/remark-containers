# remark-containers

This [remark] plugin provides parsing for containers so you can wrap blocks of markdown in arbitrary html containers. 

## Bugs

This is an initial version and is likely to have some bugs. If you find one, please [report it].

## Future plans

In the future I plan to make the containers more configurable so you can specify whatever html you like for a specific container-type. 

## Default Syntax

The current default syntax is basic. You can specify the name of the html element to wrap the contents in, and optionally add a list of class names to apply to that element. 

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

