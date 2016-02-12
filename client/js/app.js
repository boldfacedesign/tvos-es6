import { makeDocument } from "./prezenter.js";
import { makeTemplate } from "./loading_view.js";

App.onLaunch = function (options) {
	// let alertString = `<?xml version="1.0" encoding="UTF-8" ?>
	// 	<document>
	// 		<alertTemplate>
	// 			<title>ALERT</title>
	// 			<description>this is the alert template</description>
	// 		</alertTemplate>
	// 	</document>`
	
	let alertString = makeTemplate({loading_text: "loading"})

	let doc = makeDocument(alertString)
	navigationDocument.pushDocument(doc);
}