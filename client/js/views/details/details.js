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

		let rating_badge = "resource://bbfc-u";

		switch(this.movie.Rated) {
			case "R":
				rating_badge = "resource://bbfc-18";
				break;
			case "PG-13":
				rating_badge = "resource://bbfc-12a";
				break;
			case "PG":
				rating_badge = "resource://bbfc-pg";
				break;
			case "PG":
				rating_badge = "resource://bbfc-pg";
				break;
		}

		this.movie.Badge = rating_badge;

		this.movie.Alternatives = [];
		let alternatives = null;

		switch(this.options.actor) {
			case "arnie":
				alternatives = movies.arnie;
				break;
			case "cage":
				alternatives = movies.cage;
				break;
		}

		for (let key in alternatives) {
			let item = alternatives[key];
			if (alternatives[key].imdbID !== this.options.id) {
				this.movie.Alternatives.push(alternatives[key])
			}
		}

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