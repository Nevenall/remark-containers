# Containers

if was want to allow multiple container plugins, 
then, we need to include a "type" in each option so we know to only match containers of that type.
then we need to know the html element to use, and what to do with the configurations. 

pretty simple. 

if we can provide an  options supplied function enough context, could we do the extra children nodes we want? 
that's basically the one other thing that I want to support. 

though more complex templating is an option, but maybe a bad one. 

So, if this was the case, we would have two optional functions, one that is run just prior to the body, and one that is just after?
Or, maybe one function and we give it the body function to place whereever? 
not sure if that would work very well. 
could create the node, and then allow the function to transform it? 
add the figure caption or quote attribution by hand. 
would give the optional function a fair bit to do, but it could be worse,
so,eat and tokenize everything and then give the optional function the config string and the tree and let them do what they need to do. 
That is a little technically, but maybe the easiest to pull off.  


Options gives

todo - there is an issue where two containers without any other markdown between them get merged into 1. maybe because of the regex 