import base_model from "../shared/base_model.js"

export default class BooksModel extends base_model {
	constructor() {
		super();
		this.url = "https://api.themoviedb.org/3/tv/popular?api_key=cad193d8b6b642176344ffe8d4219062";
		this.type = "books";
		this.initialize();
	}
	initialize() {
	}
	fetch(options) {
		let self = this;
		var callback = function(err, data) {
			console.log("options.callback was missing for this request");
		};
		if (options) {
			var headers = options.headers || {};
			var callback = options.callback;
		}
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.onreadystatechange = function() {
			try {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						self.json = JSON.parse(xhr.responseText);
						self.emit("sync");
					} else {
						// callback(new Error("Error [" + xhr.status + "] making http request: " + this.url));
					}
				}
			} catch (err) {
				console.error('Aborting request ' + this.url + '. Error: ' + err);
				xhr.abort();
				// callback(new Error("Error making request to: " + this.url + " error: " + err));
			}
		};
		xhr.open("GET", this.url, true);
		xhr.send();

		return xhr;
	}
}