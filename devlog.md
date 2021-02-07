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

