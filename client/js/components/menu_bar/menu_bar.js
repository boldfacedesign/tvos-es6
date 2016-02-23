import base_view from "../../shared/base_view.js"
import template from "./template.js"
import Presenter from "../../presenter.js"

let presenter = new Presenter();

export default class menu_bar extends base_view {
	constructor (options) {
		super(options);
		this.initialize();
	}
	initialize() {
		this.render();
	}
	render() {
		this.el = super.makeDoc(template());

		if (presenter.loading_indicator && navigationDocument.documents.indexOf(presenter.loading_indicator) != -1) {
			console.log("menu bar replace");
			navigationDocument.replaceDocument(this.el, presenter.loading_indicator);
		} else {
			console.log("menu bar push");
			navigationDocument.pushDocument(this.el);
		}

		return this;
	}
	onSelect(event) {
		console.log("menu_bar select");
	}
}