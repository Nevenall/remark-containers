# Development Log for remark containers

## 10.28.2020, danb

time to update the pluggy for remark 13!

## 10.30.2020, danb 

add a link to the generic directives implementation https://github.com/remarkjs/remark-directive to the readme.md. People might like that better. 

## 10.31.2020, danb

looks like https://github.com/micromark/micromark/blob/main/lib/tokenize/code-fenced.js is a pretty tokenizer example. 

looks like we are hand-coding a state machine. 

## 1.29.2021, danb

Ok, time to fix this up for the new version of remark parser.
Thankfully we have a stronger understanding of how the toolchain works. 

## 1.31.2021, danb

got a working tokenizer setup. It will successfully consume the ::: 
and the dev harness is ready. 

So, key is the tokenizer is a state machine the consumes characters and turns them into tokens, I believe by emitting events. 

https://github.com/micromark/micromark-extension-gfm-table/blob/main/syntax.js


## 2.8.2021, danb

understanding the remark-directives more. In the readme there is custom html handlers to do the transform of directive nodes into some html nodes. 
we want that, but also some default behaviors, so, can we add htmlDirectives to the pipeline from our container? 
because it has to extend remark2rehype, though we could translate that into the mdast nodes that will translate into html well. 

## 2.27.2021, danb

dude was I slow. markdownline ending returns a bool. therefore a code will never equal that. geezz
that, at least, is an argument for strong typing. 


## 5.6.2021, danb

we have learned some about tokens. In the exitConfig we can call this.sliceSerialize(token) to get the config string. 
The question is...do we take take the whole string and parse it once in the exit, or do we parse each part of it? 

I think we should do it at the state machine level. Otherwise, how do we do the extra md parsing we might want?

## 9.1.2021, danb

little dribs and drabs of work. Here's documentation about the state machine. https://github.com/micromark/common-markup-state-machine