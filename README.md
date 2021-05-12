# GrafJS
Landing page: https://grafjs.herokuapp.com/example.html
Documentation: https://grafjs.herokuapp.com/doc.html


### GETTING STARTED
1. Drag graf.js into the same directory as your HTML or Javascript.
2. Add <script type="text/javascript" src="graf.js"></script> to your HTML file such that the library is accessible by the HTML page.
3. Create a ```<div id="sample">``` in the HTML. The id will act as an identifier for where the table will be inserted.
4. In your Javascript file you can create a new Graf object by 
```javascript
  var table = new Graf({
    data:  [[1, 2, 3],
            [4, null, 6, 7],
            [8, 9, 10, 11]],
    columns: ['Col 1', 'Col 2', 'Col 3'],
    anchor: "sample",
    title: "Linear",
    style: "linear"
    });
```
here the make sure the id from ```<div>``` matches the anchor as that will tell the library where to insert the table.
  
