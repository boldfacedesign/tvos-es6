import base_view from "../../shared/base_view.js"
import template from "./template.js"
import results_template from "./results_template.js"
import SearchModel from "../../models/search.js"

export default class search_view extends base_view {
	constructor (options) {
		super(options);
		let self = this;
		this.model = new SearchModel();
		this.model.on("sync", function() {
			self.renderResults()
		});
	}
	initialize() {
	}
	render() {
		this.el = super.makeDoc(template());
		this.emit("rendered");

		this.searchField = this.el.getElementsByTagName("searchField").item(0);
		this.keyboard = this.searchField.getFeature("Keyboard");

		this.keyboard.onTextChange = function() {
			this.search();
		}.bind(this);
	}
	search() {
		let original_query = this.keyboard.text,
		    query = encodeURIComponent(original_query);

		if (original_query.length > 2) {
			this.model.fetch({term: original_query})
		}
	}
	renderResults() {
		console.log(this.model);
		console.log(results_template(this.model));
		if (this.model.json.Search.length > 0) {
			this.updateDocument(results_template(this.model), this.el.getElementsByTagName("collectionList").item(0));
		}
	}
}