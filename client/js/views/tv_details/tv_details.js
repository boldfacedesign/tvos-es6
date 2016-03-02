import base_view from "../../shared/base_view.js"
import template from "./template.js"
import TVShowDetailsModel from "../../models/tv_show_details.js"

export default class tv_details_view extends base_view {
	constructor (options) {
		super(options);
		this.model = new TVShowDetailsModel({id: options.id});
		this.initialize();
	}
	initialize() {
		let self = this;
		this.model.on("sync", function() {
			self.render();
		});
		this.model.fetch()
	}
	render() {
		console.log(this.model.json);

		this.el = super.makeDoc(template(this.model.json));
		this.emit("rendered");
		return this;
	}
	select($target) {
		if ($target.getAttribute("id") === "play_trailer") {
			if (this.movie.Trailer) {
				this.playMedia(this.movie.Trailer);
			}
		}
		console.log("select");
	}
}