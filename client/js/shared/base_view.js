import Presenter from "../presenter.js"
import router from "./shared_router.js"

export default class base_view {
	constructor (options) {
		this.options = options;
		this.parser = new DOMParser();
		this.presenter = new Presenter();
	}
	makeDoc(xml) {
		let doc = this.parser.parseFromString(xml, "application/xml");
		doc.addEventListener("select", this.onSelect.bind(this));
		return doc;
		// return this.presenter.makeDocument(xml)
	}
	onSelect(e) {
		let $target = e.target;
		if ($target.getAttribute("href")) {
			router.navigate($target.getAttribute("href"))
		} else {
			console.log("base view select delgate")
			this.select($target);
		}
	}
	playMedia(url) {
		let player = new Player();
		let playlist = new Playlist();
		let mediaItem = new MediaItem("video", url);

		player.playlist = playlist;
		player.playlist.push(mediaItem);
		player.present();

		navigationDocument.dismissModal();
	}
}