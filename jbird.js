function move(object, xPos, yPos) {
	try {
		object.setAttribute("style", "left: " + xPos + "px; top: " + yPos + "px;");
		return true;
	} catch (err) {
		console.log("ERROR: " + err);
		return false;
	}
}