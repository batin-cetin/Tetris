var table = document.createElement("table");
table.id = "tetris-grid";
table.style.borderCollapse = "collapse";
table.align = "center";
table.setAttribute('border', '1');
table.style.borderColor = "gray";
for(var row=0; row<20; row++){
	var line = document.createElement("tr");
	for(var col=0; col<10; col++){
		var square = document.createElement("td");
        square.style.width="20px";
        square.style.height="20px";
        square.style.textAlign="center";
        square.style.backgroundColor = "black";
		square.style.fontSize = 0;
		square.innerHTML = ' ';
		square.style.color = "white";
		line.appendChild(square);
	}
	table.appendChild(line);
}
document.body.appendChild(table);