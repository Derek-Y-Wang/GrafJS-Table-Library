"use strict";


(function(global, document) { 

	// this function is currently only in the scope of the anonymous function at the moment.
	function Graf(items) {
        this.data = items.data;
        this.col_name = items.columns;
        this.title = items.title;
        this.id = items.anchor;

        // set table width
        this.tableWidth = "auto";
        if (items.width){
            this.tableWidth = items.width;
        } 

        // set table height
        this.tableHeight = "auto";
        if (items.height){
            this.tableHeight = items.height;
        } 

        // set title font size
        if (items.titleSize){
            this.titleSize = items.titleSize;
        }

        if (items.titleFont){
            this.titleFont = items.titleFont;
        }

        // set column label font
        if (items.columnFont){
            this.columnFont = items.columnFont;
        } 


        // setting the preset table styles
        this.style = "default";
        if (items.style && items.style == "boxy"){
            this.style = "boxy";
        }

        if (items.style && items.style == "linear"){
            this.style = "linear";
        }

        if (items.style && items.style == "clear"){
            this.style = "clear";
        }
	}

	
    function _nullNormalizer(data){
        // function adds nulls so that columns match in size
        // finding max list size
        var list_sizes = [];
        for (var i = 0; i < data.length; i++){
            list_sizes.push(data[i].length);
        }
        // cleaning data by adding null to match column lengths
        for (var j = 0; j < data.length; j++){
            if (data[j].length < Math.max(...list_sizes) ){
    
                while (data[j].length != Math.max(...list_sizes)){
                    data[j].push(null);
                }
            }
        }
        return data;
    }
    function generate_row_data(data){
    // finding max list size
    var list_sizes = [];
    for (var i = 0; i < data.length; i++){
        list_sizes.push(data[i].length);
    }
    // cleaning data by adding null to match column lengths
    for (var j = 0; j < data.length; j++){
        if (data[j].length < Math.max(...list_sizes) ){

            while (data[j].length != Math.max(...list_sizes)){
                data[j].push(null);
            }
        }
    }

    // creatings rows
    var rows = [];
    var c = 0;
    for (var i = 0; i < Math.max(...list_sizes); i++){
        var r = [];
         
        for (var e = 0; e < data.length; e++){
            r.push(data[e][c]);
        }
        rows.push(r);
        c += 1;
    }
    return rows;
    }    
    
	/* End of private properties/functions */

	Graf.prototype = {
       
    
        makeFullTable: function(){
            var body = document.getElementById(this.id);
    
            var the_table = document.createElement('table');
            the_table.setAttribute("id", this.title);
            
            //set title
            var title = the_table.createCaption();
            title.innerHTML = "<b>" + this.title + "</b>";
            title.style.fontSize = this.titleSize;
            title.style.fontFamily = this.titleFont;
            the_table.appendChild(title);
            
    
            // create the column names
            var header = document.createElement('thead');
            var tr_header = document.createElement('tr');
            
            
            for (var i = 0; i < this.col_name.length; i++){
                var th = document.createElement('th');
                var div = document.createElement('div');
    
                div.innerHTML = this.col_name[i];
                th.appendChild(div);
                tr_header.appendChild(th);
                div.style.fontFamily = this.columnFont;
                th.style.border = "thick solid black";
                th.style.borderWidth = "1px";
                th.style.textAlign = "center";
                
            }
            header.appendChild(tr_header);
            the_table.appendChild(header);
            body.appendChild(the_table);
    
    
            // create the body of table
            var tbody = document.createElement('tbody');
            
            var rows = generate_row_data(this.data);
            // console.log(rows);
    
            for (var i = 0; i < rows.length; i++){
                var body_tr = document.createElement('tr');
                for (var j = 0; j < rows[i].length; j++){
                    var td = document.createElement('td');
                    var div = document.createElement('div');
                    
    
                    div.innerHTML = rows[i][j];
                    td.append(div);
                    body_tr.appendChild(td);
    
                    td.style.border = "thick solid black";
                    td.style.borderWidth = "1px";
                    td.style.textAlign = "center";
                    if (this.style == "clear"){
                        td.style.border = "none";
                    }
                } 
                
                tbody.appendChild(body_tr);
            }
            
    
            the_table.appendChild(tbody);
            if (this.style == "default" || this.style == "linear"){
                var table = document.getElementById(this.title);
                table.style.border = "solid 1px";
                table.style.borderCollapse = "collapse";
                table.style.width = this.tableWidth;
                table.style.height = this.tableHeight; 
            }
            if (this.style == "boxy"){
                var table = document.getElementById(this.title);
                table.style.border = "solid 1px";
                table.style.width = this.tableWidth;
                table.style.height = this.tableHeight; 
            }

            if (this.style == "clear"){
                var table = document.getElementById(this.title);
                table.style.border = "solid 1px";
                table.style.width = this.tableWidth;
                table.style.height = this.tableHeight; 
            }
            
        },
    
        makeTableByRows: function(start = null, end = null){
                var rows = generate_row_data(this.data);
                // console.log(this.data);
                if (start == null){
                    start = 0;
                }
                if (end == null){
                    end = rows.length ;
                }
                // generate selected data based off of rows
                var new_data = [];
                for (var i = start; i < end; i++){
                    new_data.push(rows[i]);
                }
                // console.log(new_data);
                
                var body = document.getElementById(this.id);
                var the_table = document.createElement('table');
                the_table.setAttribute("id", this.title);
                
    
                var header = document.createElement('thead');
                var tr_header = document.createElement('tr');
    
                // set title
                var title = the_table.createCaption();
                title.innerHTML = "<b>" + this.title + "</b>";
                title.style.fontSize = this.titleSize;
                title.style.fontFamily = this.titleFont;
                the_table.appendChild(title);
                
                // column name
                for (var i = 0; i < this.col_name.length; i++){
                    var th = document.createElement('th');
                    var div = document.createElement('div');
    
                    div.innerHTML = this.col_name[i];
                    th.appendChild(div);
                    
                    tr_header.appendChild(th);
                    div.style.fontFamily = this.columnFont;
                    th.style.border = "thick solid black";
                    th.style.borderWidth = "1px";
                    th.style.textAlign = "center";
                }
                header.appendChild(tr_header);
                the_table.appendChild(header);
                body.appendChild(the_table);
    
    
                // create the body of table
                var tbody = document.createElement('tbody');
                
                for (var i = 0; i < new_data.length; i++){
                    var body_tr = document.createElement('tr');
                    for (var j = 0; j < new_data[i].length; j++){
                        var td = document.createElement('td');
                        var div = document.createElement('div');
    
                        div.innerHTML = new_data[i][j];
                        td.appendChild(div);
                        body_tr.appendChild(td);
                        td.style.border = "thick solid black";
                        td.style.borderWidth = "1px";
                        td.style.textAlign = "center";
                        if (this.style == "clear"){
                            td.style.border = "none";
                        }
                    }
                    tbody.appendChild(body_tr);
                }
                
                the_table.appendChild(tbody);
                if (this.style == "default" || this.style == "linear"){
                    the_table.style.border = "solid 1px";
                    the_table.style.borderCollapse = "collapse";
                    the_table.style.width = this.tableWidth;
                    the_table.style.height = this.tableHeight; 
                }
                if (this.style == "boxy"){
                    the_table.style.border = "solid 1px";
                    the_table.style.width = this.tableWidth;
                    the_table.style.height = this.tableHeight; 
                }
    
                if (this.style == "clear"){
                    the_table.style.border = "solid 1px";
                    the_table.style.width = this.tableWidth;
                    the_table.style.height = this.tableHeight; 
                }
        },
    
        addColumn: function(col_data, col_name){
    
            this.data.push(col_data);
            this.col_name.push(col_name);
            this.data = _nullNormalizer(this.data);
    
            var thead_tr = document.getElementById(this.title).children[1].children[0];
    
            // adding the new column name
            var th = document.createElement('th');
            var div = document.createElement('div');
            th.style.border = "thick solid black";
            th.style.borderWidth = "1px";
            th.style.textAlign = "center";
            div.innerHTML = col_name;
            th.appendChild(div);
            thead_tr.appendChild(th);
    
            // remaking the body
            var table = document.getElementById(this.title);
            var tbody = document.getElementById(this.title).children[2];
            var nodes = tbody.childNodes.length;
            // remove existing nodes if it exists
            if(tbody.hasChildNodes()){
                for (var i = 0; i < nodes; i++){
                    tbody.remove(tbody.childNodes[i]);
                }
            }
            
            // we now want to remake the table with our new data
            var rows = generate_row_data(this.data);
            var new_tbody = document.createElement('tbody');
    
            for (var i = 0; i < rows.length; i++){
                var body_tr = document.createElement('tr');
                for (var j = 0; j < rows[i].length; j++){
                    var td = document.createElement('td');
                    var div = document.createElement('div');
                    
    
                    div.innerHTML = rows[i][j];
                    td.append(div);
                    body_tr.appendChild(td);
    
                    // td.style.border = "thick solid black";
                    // td.style.borderWidth = "2px";
                    // td.style.textAlign = "center";
                    td.style.border = "thick solid black";
                    td.style.borderWidth = "1px";
                    td.style.textAlign = "center";
                    if (this.style == "clear"){
                        td.style.border = "none";
                    }
                } 
                
                new_tbody.appendChild(body_tr);
            }
            table.appendChild(new_tbody);
            
        },
    
        addRow: function(row_data){
            if (row_data.length > this.col_name.length){
                console.log("Data does not match table dimensions");
            } else {
                this.data = _nullNormalizer(this.data);
                for (var i = 0; i < this.data.length; i++){
                    this.data[i].push(row_data[i]);
                }
    
                var tbody = document.getElementById(this.title).children[2];
                var new_tr = document.createElement('tr');
                for (var i = 0; i < row_data.length; i++){
                    var div = document.createElement('div');
                    div.innerHTML = row_data[i];
                    var td = document.createElement('td');
                    td.appendChild(div);
                    new_tr.appendChild(td);
                    td.style.border = "thick solid black";
                    td.style.borderWidth = "1px";
                    td.style.textAlign = "center";
                    if (this.style == "clear"){
                        td.style.border = "none";
                    }
                }
                tbody.appendChild(new_tr);
                
                
                console.log(tbody);
            }
     
        },
    
        removeRow: function(row_index){
            // remove row from the this.data list
            for (var i = 0; i < this.data.length; i++){
                this.data[i].splice(row_index, 1);
            }
            
            // remove the row node from the tbody
            var tbody = document.getElementById(this.title).children[2];
            tbody.removeChild(tbody.childNodes[row_index]);
            
        },
    
        removeColumn: function(col_name){
            // if the col_name is an integer we delete columns by index
            if (Number.isInteger(col_name)){
                    // deleting the data from the list
                    this.col_name.splice(col_name, 1);
                    this.data.splice(col_name, 1);
    
                    var table = document.getElementById(this.title).children;
    
                    // delete the col from thead
                    var thead = table[1].children[0];
                    thead.removeChild(thead.childNodes[col_name])
    
                    // delete the col from tbody
                    var tbody = table[2].children;
                    for (var i = 0; i < tbody.length; i++){
                        tbody[i].removeChild(tbody[i].childNodes[col_name]);
                    }
    
            }
            // if the col_name is a string
            else if (this.col_name.includes(col_name)){
    
                // remove column name and data from the lists
                var index = this.col_name.indexOf(col_name);
                 // deleting the data from the list
                 this.col_name.splice(index, 1);
                 this.data.splice(index, 1);
    
                 var table = document.getElementById(this.title).children;
    
                 // delete the col from thead
                 var thead = table[1].children[0];
                 thead.removeChild(thead.childNodes[index])
    
                 // delete the col from tbody
                 var tbody = table[2].children;
                 for (var i = 0; i < tbody.length; i++){
                     tbody[i].removeChild(tbody[i].childNodes[index]);
                 }
            } 
        },
    
        fillNullColMean: function(){
            // finding max list size
            var temp = this.data;
            
            // update the values in the data
            this._nullNormalizer();
            for (var i = 0; i < this.data.length; i++){
                let sum = 0;
                for (var v=0; v < temp[i].length; v++){
                    sum = sum + temp[i][v];
                }
                
                var avg = sum/temp[i].length;
                for (var j = 0; j < this.data[i].length; j++){
                    if (this.data[i][j] == null){
                        this.data[i][j] = avg;
                    }
                }
            }
            // console.log(this.data);
    
    
        },
    
        fillNullColZeros: function(){
            // finding max list size
            var temp = this.data;
          
            _nullNormalizer();       
            for (var i = 0; i < this.data.length; i++){
                let sum = 0;
                for (var v=0; v < temp[i].length; v++){
                    sum = sum + temp[i][v];
                }
                       
                var avg = sum/temp[i].length;
                for (var j = 0; j < this.data[i].length; j++){
                    if (this.data[i][j] == null){
                        this.data[i][j] = avg;
                    }
                }
            }
        },
    
        fillNullCol: function(value){
            // finding max list size
            var temp = this.data;
            
            _nullNormalizer();   
            for (var i = 0; i < this.data.length; i++){
                let sum = 0;
                for (var v=0; v < temp[i].length; v++){
                    sum = sum + temp[i][v];
                }
                       
                var avg = sum/temp[i].length;
                for (var j = 0; j < this.data[i].length; j++){
                    if (this.data[i][j] == null){
                        this.data[i][j] = avg;
                    }
                }
            }
        },
    
        getColumnNames: function(){
            return this.col_name;
        },
    
        printSelectRow: function(index){
            return generate_row_data(this.data)[index];
        },
    
        printSelectColumn: function(index){
            return this.data[index];
        }
    }
	
	global.Graf = global.Graf || Graf

})(window, window.document);