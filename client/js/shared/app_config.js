class config {
	constructor() {
		this.base_url = null;
	}
	get baseURL() {
		return this.base_url;
	}
	set baseURL(url) {
		this.base_url = url; 
	}
}

const app_config = new config();

export default app_config;