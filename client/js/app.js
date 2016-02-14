import Presenter from "./prezenter.js";
// import { makeDocument } from "./prezenter.js";
import { makeTemplate } from "./loading_view.js";

App.onLaunch = function (options) {
	let alertString = makeTemplate({loading_text: "loading BEEF"})

	let doc = makeDocument(alertString)
	navigationDocument.pushDocument(doc);
}