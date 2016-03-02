import base_view from "../../shared/base_view.js"
import template from "./template.js"
import TVShowsModel from "../../models/tv_shows.js"

export default class tv_shows_view extends base_view {
	constructor (options) {
		super(options);
		this.model = new TVShowsModel();
		this.initialize();
	}
	initialize() {
		let self = this;
		this.model.on("sync", function() {
			self.render();
		});
		this.model.fetch();
	}
	render() {
		console.log(this.model.json);
		this.el = super.makeDoc(template(this.model.json));
		// console.log(new XMLSerializer().serializeToString(this.el))
		this.emit("rendered")
	}
	select(e) {
		console.log(e.target)
	}
}