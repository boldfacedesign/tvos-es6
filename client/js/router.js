import Presenter from "./presenter.js"

import HomeView from "./views/home/home.js"
import DescriptiveAlertView from "./modals/descriptive_alert/descriptive_alert.js"

export default class router {
	constructor(options) {
		if (!options.baseurl) {
			throw("router: baseurl is required.");
		}

		this.BASEURL = options.baseurl;
		this.menuBar = options.menu_bar;
		this.presenter = new Presenter(options.baseurl)
	}
	navigate(url) {
		let self = this;
		url = url.replace(/#/, "");

		switch (url) {
			case "descriptiveAlert":
				self.descriptiveAlert();
				break;
			case "home":
				self.home();
				break;
		}
	}
	home() {
		let homeView = new HomeView(this.BASEURL);
		console.log(new XMLSerializer().serializeToString(homeView.el));
		console.log(new XMLSerializer().serializeToString(this.menuBar.el.getElementById("home_link")))
		this.presenter.menuBarItemPresenter(homeView.el, this.menuBar.el.getElementById("home_link"))
	}
	descriptiveAlert() {
		let descriptiveAlertView = new DescriptiveAlertView({test: "123"});
	}
}