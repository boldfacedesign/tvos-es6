import DescriptiveAlertView from "../templates/views/descriptiveAlert.js"

export default class router {
	constructor(baseurl) {
		if (!baseurl) {
			throw("router: baseurl is required.");
		}

		this.BASEURL = baseurl;
	}
	navigate(url) {
		let self = this;
		url = url.replace(/#/, "");

		switch (url) {
			case "descriptiveAlert":
				self.descriptiveAlert();
				break;
		}
	}
	descriptiveAlert() {
		let descriptiveAlertView = new DescriptiveAlertView({test: "123"});
	}
}