import base_view from "../../shared/base_view.js"
import template from "./template.js"
import movies from "../../models/movies.js"

export default class movies_view extends base_view {
	constructor (options) {
		super(options);
		this.model = movies;
		this.initialize();
	}
	initialize() {
		this.render();
	}
	render() {
		console.log(this.model);
		this.el = super.makeDoc(template(this.model));
		return this;
	}
	select(e) {
		console.log(e.target)
	}
}