import app_config from "./shared/app_config.js"
import Presenter from "./presenter.js"

import MenuBar from "./components/menu_bar/menu_bar.js"

import HomeView from "./views/home/home.js"
import DetailsView from "./views/details/details.js"
import DescriptiveAlertView from "./modals/descriptive_alert/descriptive_alert.js"

export default class router {
	constructor() {
		this.menuBar = new MenuBar();
		this.presenter = new Presenter()
	}
	navigate(url) {
		let self = this;
		url = url.replace(/#/, "");
		let fragment = url.split("/")[0]

		switch (fragment) {
			case "descriptiveAlert":
				self.descriptiveAlert();
				break;
			case "home":
				self.home();
				break;
			case "details":
				self.details(url);
				break;
		}
	}
	home() {
		let homeView = new HomeView();
		// console.log(new XMLSerializer().serializeToString(homeView.el));

		// let menu_home = this.menuBar.el.getElementById("home");
		// console.log(new XMLSerializer().serializeToString(menu_home));

		this.presenter.menuBarItemPresenter(homeView.el, this.menuBar.el.getElementById("home"))
	}
	details(url) {
		let id = url.split("/")[1];
		let detailsView = new DetailsView({id: id});
		this.presenter.defaultPresenter(detailsView.el);
	}
	descriptiveAlert() {
		let descriptiveAlertView = new DescriptiveAlertView({test: "123"});
	}
}