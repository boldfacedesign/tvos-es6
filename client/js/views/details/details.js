import base_view from "../../shared/base_view.js"
import template from "./template.js"
import movies from "../../models/movies.js"
import find from "../../node_modules/lodash-es/find.js"
import concat from "../../node_modules/lodash-es/concat.js"

export default class details_view extends base_view {
	constructor (options) {
		super(options);
		this.model = movies;
		this.initialize();
	}
	initialize() {
		this.render();
	}
	render() {
		let all_movies = concat(movies.arnie, movies.cage);
		this.movie = find(all_movies, {imdbID: this.options.id});

		this.movie.Actors = this.movie.Actors.split(",");

		this.el = super.makeDoc(template(this.movie));
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