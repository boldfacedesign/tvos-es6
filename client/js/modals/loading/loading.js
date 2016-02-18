import base_view from "../../shared/base_view.js"
import template from "./template.js"

export default class loading_modal extends base_view {
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
}