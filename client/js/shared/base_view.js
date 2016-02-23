import Presenter from "../presenter.js"
// import router from "./shared_router.js"

export default class base_view {
	constructor (options) {
		this.options = options;
		this.parser = new DOMParser();
		this.presenter = new Presenter();
	}
	makeDoc(xml) {
		let doc = this.parser.parseFromString(xml, "application/xml");
		doc.addEventListener("select", this.onSelect.bind(this));
		return doc;
		// return this.presenter.makeDocument(xml)
	}
	onSelect(e) {
		if (e.target.getAttribute("href")) {
			// Router
		} else {

		}
	}
}