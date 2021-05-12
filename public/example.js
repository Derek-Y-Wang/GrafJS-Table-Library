/* JS Library usage examples */
"use strict";
console.log('----------');
console.log('SCRIPT: Examples of using our libraries');

var table = new Graf({
    data:  [[1, 2, 3],
            [4, null, 6, 7],
            [8, 9, 10, 11]],
    columns: ['Col 1', 'Col 2', 'Col 3'],
    anchor: "tab",
    title: "Linear",
    style: "linear"
});

var table1 = new Graf({
    data:  [[1, 2, 3],
            [4, null, 6, 7],
            [8, 9, 10, 11]],
    columns: ['Col 1', 'Col 2', 'Col 3'],
    anchor: "tab1",
    title: "Clear",
    style: "clear"
});

var table2 = new Graf({
    data:  [[1, 2, 3],
            [4, null, 6, 7],
            [8, 9, 10, 11]],
    columns: ['Col 1', 'Col 2', 'Col 3'],
    anchor: "tab2",
    title: "Boxy",
    style: "boxy"
});

var table3 = new Graf({
    data:  [[1, 2, 3],
            [4, null, 6, 7],
            [8, 9, 10, 11]],
    columns: ['Col 1', 'Col 2', 'Col 3'],
    anchor: "tab3",
    title: "Another Sample Table",
    style: "boxy",
    height: "300px",
    width: "400px",
    titleSize: "32px",
    columnFont: "Franklin Gothic Medium",
    titleFont: "'Brush Script MT', cursive"

});

var table4 = new Graf({
    data:  [[1, 2, 3],
            [4, null, 6, 7],
            [8, 9, 10, 11]],
    columns: ['Col 1', 'Col 2', 'Col 3'],
    anchor: "tab4",
    title: "Another Sample Table",
    style: "boxy",
    height: "300px",
    width: "400px",
    titleSize: "32px",
    columnFont: "Franklin Gothic Medium",
    titleFont: "'Brush Script MT', cursive"

});


var table5 = new Graf({
    data:  [[1, 2, 3],
            [4, null, 6, 7],
            [8, 9, 10, 11]],
    columns: ['Col 1', 'Col 2', 'Col 3'],
    anchor: "tab5",
    title: "Sample1",
    style: "boxy"
});

var table6 = new Graf({
    data:  [[1, 2, 3],
            [4, null, 6, 7],
            [8, 9, 10, 11]],
    columns: ['Col 1', 'Col 2', 'Col 3'],
    anchor: "tab6",
    title: "Sample2",
    style: "linear"
});

function examples() {	
    
    table.makeFullTable();
    table1.makeFullTable();
    table2.makeFullTable();
    table3.makeFullTable();
    table4.makeTableByRows(0,3);

    table5.makeFullTable();

    // row buttons
    var rowDiv = document.getElementById("rowButtons");
    var addbutton = document.createElement('button');
    var removebutton = document.createElement('button');
    addbutton.innerHTML = "Add";
    removebutton.innerHTML = "Remove";
    rowDiv.appendChild(addbutton);
    rowDiv.appendChild(removebutton);
    
    addbutton.onclick = function(){
        table5.addRow([10, 20, 30]);
    }
    removebutton.onclick = function(){
        table5.removeRow(0);
    }
    

    table6.makeFullTable();
    // col buttons
    var colDiv = document.getElementById("colButtons");
    var addColbutton = document.createElement('button');
    var removeColbutton = document.createElement('button');
    addColbutton.innerHTML = "Add";
    removeColbutton.innerHTML = "Remove";
    colDiv.appendChild(addColbutton);
    colDiv.appendChild(removeColbutton);

    addColbutton.onclick = function(){
        table6.addColumn([10, 20, 30, 40], "new_col");
    }
    removeColbutton.onclick = function(){
        table6.removeColumn("new_col");
    }

}

examples();