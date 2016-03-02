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
			let actor = null;
			if ($target.getAttribute("actor")) {
				actor = $target.getAttribute("actor");
			}
			router.navigate($target.getAttribute("href"), actor)
		} else {
			console.log("base view select delgate")
			this.select($target);
		}
	}
	select($target) {
		console.log("No method defined for select event on " + $target)
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
	on(event, fn) {
		this._callbacks = this._callbacks || {};
		(this._callbacks['$' + event] = this._callbacks['$' + event] || [])
		.push(fn);
		return this;
	}
	emit(event) {
		this._callbacks = this._callbacks || {};
		var args = [].slice.call(arguments, 1),
		    callbacks = this._callbacks['$' + event];

		if (callbacks) {
			callbacks = callbacks.slice(0);
			for (var i = 0, len = callbacks.length; i < len; ++i) {
				callbacks[i].apply(this, args);
			}
		}

		return this;
	}
	listeners(event) {
		this._callbacks = this._callbacks || {};
		return this._callbacks['$' + event] || [];
	}
}