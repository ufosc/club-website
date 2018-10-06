// Function for setting the drop down menu css
function dropDownMenu() {
	var x = document.getElementsByClassName("topnav");
	if (x[0].className === "topnav") {
		x[0].className += " drop-down-menu";
	} else {
		x[0].className = "topnav";
	}
}
