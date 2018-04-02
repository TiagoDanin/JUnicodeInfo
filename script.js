function unicodeCharacter () {
	var text = document.getElementsByClassName("StringText")[0].value;
	var html = "";
	var char = "";
	text = text.toString();
	var urlFileFormat = "http://www.fileformat.info/info/unicode/char/";
	for (var i=0; i < text.length; i++) {
		char = ((text.charCodeAt(i)).toString(16)).toString();
		html += "<a href=\"" + urlFileFormat + char + "/index.htm\"><i class=\"ti-align-justify\">" + (text[i]).toString() + "(" + char + ")</i></a>  ";
		text.charCodeAt(i).toString(16);
	}
	document.getElementsByClassName("Unicodes")[0].innerHTML = html;
	return false;
}
