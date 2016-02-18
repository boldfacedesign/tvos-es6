import Presenter from "../presenter.js"

export default class base_view {
	constructor (options) {
		this.options = options;
		console.log(options);
		this.parser = new DOMParser();
		this.presenter = new Presenter(options.BASEURL);
	}
	makeDoc(xml) {
		return this.parser.parseFromString(xml, "application/xml")
		// return this.presenter.makeDocument(xml)
	}
	defaultPresent(doc) {
		this.presenter.defaultPresenter(doc)
	}
}