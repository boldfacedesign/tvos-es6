function makeDocument(resource) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(resource, "application/xml");

	return doc;
}

App.onLaunch = function (options) {
	var alertString = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t\t<document>\n\t\t\t<alertTemplate>\n\t\t\t\t<title>ALERT</title>\n\t\t\t\t<description>this is the alert template</description>\n\t\t\t</alertTemplate>\n\t\t</document>";

	var doc = makeDocument(alertString);
	navigationDocument.pushDocument(doc);
};