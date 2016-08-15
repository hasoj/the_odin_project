var gridSize;
var gridWidth;
var gridHeight;
var grid;
var inter;
var ok = 0;

window.onload = function(){

	grid = document.getElementById("grid");
	inter = document.getElementById("interface");
	gridHeight = window.innerHeight - inter.offsetHeight - 41;
	grid.style.height = gridHeight + "px";

};


// Code stack-overflow (resize div #grid conform to new size of the window)

var addEvent = function(object, type, callback) {
	    		
		if (object == null || typeof(object) == 'undefined') return;
	    	if (object.addEventListener) {
	    	    object.addEventListener(type, callback, false);
	    	} else if (object.attachEvent) {
	     	   object.attachEvent("on" + type, callback);
	    	} else {
	      		object["on"+type] = callback;
	    	}
	};

/*
addEvent(window, "resize", function() {
		
	grid = document.getElementById("grid");
	inter = document.getElementById("interface");
	gridHeight = window.innerHeight - inter.offsetHeight - 41;
	grid.style.height = gridHeight + "px";

	
	//REDRAW =============
	
	var x;
	var input = document.getElementById("gridSize");
	gridSize = input.value;	
	gridWidth = window.innerWidth - (window.innerWidth/4);		

	// Removing existing cells
	var gridChilds = grid.childNodes;
	if(gridChilds.length>1)	
	{
		gridChilds.remove();

		// Drawing cells
		cellSizeH = gridHeight / gridSize;
		cellSizeW = gridWidth / gridSize;
	
	
		if(cellSizeH > cellSizeW) 
		{
			grid.style.width = gridSize * cellSizeW + "px";
			cellSizeH = cellSizeW;
		}	
		else
			grid.style.width = gridSize * cellSizeH + "px";

		for(var i=1;i<=gridSize;i++)
		{
			if(i>1)
			{
				x = document.createElement("div");
				x.className = "gridCellFinal";
				x.style.width = (cellSizeH) - 2 + "px";		
				x.style.height = (cellSizeH) - 2 + "px";
				grid.appendChild(x);
			}
			else
			{
				x = document.createElement("div");
				x.className = "gridCell";
				x.style.width = (cellSizeH) - 2 + "px";		
				x.style.height = (cellSizeH) - 2 + "px";
				grid.appendChild(x);
			}
	
			for(var j=2;j<=gridSize;j++)
			{
				x = document.createElement("div");
				x.className = "gridCell";
				x.style.width = (cellSizeH) - 2 + "px";		
				x.style.height = (cellSizeH) - 2 + "px";
				grid.appendChild(x);					
			}	
		
		}
	}		
});
*/

// Code stack-overflow (append a new method for deleting an element);
 
Element.prototype.remove = function() {
	if(this.parentElement.removeChild(this))
		return 1;
	return 0;
	
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	var ok = 0;
	for(var i = this.length - 1; i >= 0; i--) {	
		if(this[i] && this[i].parentElement) {
        		this[i].parentElement.removeChild(this[i]);
			ok = 1;        	
		}
    	}	
	if(ok) return 1;
	return 0;
}

// Get value input pass by user for creating the grid. The grid keeps track of the size of div#grid, and draws the cells such that the gridSize which is the number of cells from a row or column to describe the right amount of cell that fit the div#grid.

function getSize()
{

	var x;
	var input = document.getElementById("gridSize");
	var selectOption = document.getElementById("drawOptions");
	grid = document.getElementById("grid");
	gridSize = input.value;	
	gridWidth = window.innerWidth - (window.innerWidth/4);
	
	
	// Removing existing cells
	var gridChilds = grid.childNodes;
	gridChilds.remove();
	
	// Drawing cells
	cellSizeH = gridHeight / gridSize;
	cellSizeW = gridWidth / gridSize;

	if(cellSizeH > cellSizeW) 
	{
		grid.style.width = gridSize * cellSizeW + "px";
		cellSizeH = cellSizeW;
	}	
	else
		grid.style.width = gridSize * cellSizeH + "px";
		
	
	for(var i=1;i<=gridSize;i++)
	{
		if(i>1)
		{
			x = document.createElement("div");
			x.className = "gridCellFinal";
			x.style.width = (cellSizeH) - 2 + "px";		
			x.style.height = (cellSizeH) - 2 + "px";
			grid.appendChild(x);
			if(selectOption.value == "Random")
			{
				x.style.backgroundColor = "#FFF";			
				x.addEventListener("mouseover", function (){
					this.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
				}, false);
			}			
			if(selectOption.value == "Alpha")
			{
				x.style.backgroundColor = "#000";
				x.style.opacity = "1.0";
				x.addEventListener("mouseover", function (){
					var opac = parseFloat(this.style.opacity);
					opac -= 0.1;
					this.style.opacity = opac.toString();
				
				}, false);
			}
			if(selectOption.value == "Track")
			{

				x.opac = 1.0;
				x.divIn = null;
				x.divOut = null;
				x.style.backgroundColor = "#000";	
				x.style.opacity = "1.0";
				x.addEventListener("mouseenter", function (){
					var current = this;
					if(current.divOut)
					{
						clearInterval(current.divOut);
						current.divOut = null;
					}
					console.log(current.opac);
					current.divIn = setInterval(function(){
						current.opac -= 0.045; current.style.opacity = current.opac.toString();
						if(current.opac<=0.0)
						{
							current.opac = 0.0;
							clearInterval(current.divIn);
							current.divIn = null; 
						}
					},10);
				}, false);

				x.addEventListener("mouseout", function (){
					var current = this;
					if(current.divIn)
					{
						clearInterval(current.divIn);
						current.divIn = null;
					}
					console.log(current.opac);
					current.divOut = setInterval(function(){
						current.opac += 0.045; current.style.opacity = current.opac.toString();
						if(current.opac >= 1.0)
						{
							current.opac = 1.0;
							clearInterval(current.divOut);
							current.divOut = null; 
						}
					}, 10);
				},false);
			}
		}	
		else
		{
			x = document.createElement("div");
			x.className = "gridCell";
			x.style.width = (cellSizeH) - 2 + "px";		
			x.style.height = (cellSizeH) - 2 + "px";
			grid.appendChild(x);
			if(selectOption.value == "Random")
				x.addEventListener("mouseover", function (){
					this.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
				}, false);
			if(selectOption.value == "Alpha")
			{
				x.style.backgroundColor = "#000";
				x.style.opacity = "1.0";
				x.addEventListener("mouseover", function (){
					var opac = parseFloat(this.style.opacity);
					opac -= 0.1;
					this.style.opacity = opac.toString();
				}, false);
			}			
			if(selectOption.value == "Track")
			{

				x.opac = 1.0;
				x.divIn = null;
				x.divOut = null;
				x.style.backgroundColor = "#000";	
				x.style.opacity = "1.0";
				x.addEventListener("mouseenter", function (){
					var current = this;
					if(current.divOut)
					{
						clearInterval(current.divOut);
						current.divOut = null;
					}
					console.log(current.opac);
					current.divIn = setInterval(function(){
						current.opac -= 0.045; current.style.opacity = current.opac.toString();
						if(current.opac<=0.0)
						{
							current.opac = 0.0;
							clearInterval(current.divIn);
							current.divIn = null; 
						}
					},10);
				}, false);

				x.addEventListener("mouseout", function (){
					var current = this;
					if(current.divIn)
					{
						clearInterval(current.divIn);
						current.divIn = null;
					}
					console.log(current.opac);
					current.divOut = setInterval(function(){
						current.opac += 0.045; current.style.opacity = current.opac.toString();
						if(current.opac >= 1.0)
						{
							current.opac = 1.0;
							clearInterval(current.divOut);
							current.divOut = null; 
						}
					}, 10);
				},false);
			}	
		}
		
		for(var j=2;j<=gridSize;j++)
		{
			x = document.createElement("div");
			x.className = "gridCell";
			x.style.width = (cellSizeH) - 2 + "px";		
			x.style.height = (cellSizeH) - 2 + "px";
			grid.appendChild(x);	
			if(selectOption.value == "Random")
				x.addEventListener("mouseover", function (){
					this.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
				}, false);	
			if(selectOption.value == "Alpha")
			{
				x.style.backgroundColor = "#000";
				x.style.opacity = "1.0";
				x.addEventListener("mouseover", function (){
					var opac = parseFloat(this.style.opacity);
					opac -= 0.1;
					this.style.opacity = opac.toString();
				}, false);
		
			}
			if(selectOption.value == "Track")
			{

				x.opac = 1.0;
				x.divIn = null;
				x.divOut = null;
				x.style.backgroundColor = "#000";	
				x.style.opacity = "1.0";
				x.addEventListener("mouseenter", function (){
					var current = this;
					if(current.divOut)
					{
						clearInterval(current.divOut);
						current.divOut = null;
					}
					console.log(current.opac);
					current.divIn = setInterval(function(){
						current.opac -= 0.045; current.style.opacity = current.opac.toString();
						if(current.opac<=0.0)
						{
							current.opac = 0.0;
							clearInterval(current.divIn);
							current.divIn = null; 
						}
					},5);
				}, false);

				x.addEventListener("mouseout", function (){
					var current = this;
					if(current.divIn)
					{
						clearInterval(current.divIn);
						current.divIn = null;
					}
					console.log(current.opac);
					current.divOut = setInterval(function(){
						current.opac += 0.045; current.style.opacity = current.opac.toString();
						if(current.opac >= 1.0)
						{
							current.opac = 1.0;
							clearInterval(current.divOut);
							current.divOut = null; 
						}
					}, 150);
				},false);
			}			
		}
	
	}		
}	
