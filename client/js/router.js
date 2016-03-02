import app_config from "./shared/app_config.js"
import Presenter from "./presenter.js"

import MenuBar from "./components/menu_bar/menu_bar.js"

import TVShowsView from "./views/tv_shows/tv_shows.js"
import MoviesView from "./views/movies/movies.js"
import DetailsView from "./views/details/details.js"
import TVDetailsView from "./views/tv_details/tv_details.js"
import DescriptiveAlertView from "./modals/descriptive_alert/descriptive_alert.js"

export default class router {
	constructor() {
		this.menuBar = new MenuBar();
		this.presenter = new Presenter()
	}
	navigate(url, actor) {
		let self = this;
		url = url.replace(/#/, "");
		let fragment = url.split("/")[0]

		switch (fragment) {
			case "descriptiveAlert":
				self.descriptiveAlert();
				break;
			case "movies":
				self.movies();
				break;
			case "tv_shows":
				self.tv_shows();
				break;
			case "details":
				self.details(url, actor);
				break;
			case "tv_details":
				self.tv_details(url);
				break;
		}
	}
	movies() {
		let moviesView = new MoviesView();
		// console.log(new XMLSerializer().serializeToString(homeView.el));

		// let menu_home = this.menuBar.el.getElementById("home");
		// console.log(new XMLSerializer().serializeToString(menu_home));

		this.presenter.menuBarItemPresenter(moviesView.el, this.menuBar.el.getElementById("movies"))
	}
	tv_shows() {
		let self = this;
		let tvShowsView = new TVShowsView();
		tvShowsView.on("rendered", function() {
			// console.log(tvShowsView);
			// console.log(new XMLSerializer().serializeToString(tvShowsView.el));
			self.presenter.menuBarItemPresenter(tvShowsView.el, self.menuBar.el.getElementById("tv_shows"))
		});
	}
	details(url, actor) {
		let id = url.split("/")[1];
		let detailsView = new DetailsView({id: id, actor: actor});
		this.presenter.defaultPresenter(detailsView.el);
	}
	tv_details(url) {
		let self = this;
		let id = url.split("/")[1];
		let tvDetailsView = new TVDetailsView({id: id});
		tvDetailsView.on("rendered", function() {
			console.log(new XMLSerializer().serializeToString(tvDetailsView.el));
			self.presenter.defaultPresenter(tvDetailsView.el);
		});
	}
	descriptiveAlert() {
		let descriptiveAlertView = new DescriptiveAlertView({test: "123"});
	}
}