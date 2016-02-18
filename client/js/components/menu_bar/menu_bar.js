import base_view from "../../shared/base_view.js"
import template from "./template.js"

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
		return this;
	}
	onSelect(event) {
		console.log("menu_bar select");
	}
}