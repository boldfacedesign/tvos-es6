import template from "./template.js"

export default class descriptiveAlertView {
	constructor (options) {
		this.options = options;
		this.initialize()
	}
	initialize() {
		this.render()
	}
	render() {
		var json = this.options;
		console.log(json);
		this.doc = this.makeDocument(template(json));
		this.doc.addEventListener("select", function(event) {
			var ele = event.target,
			    videoURL = ele.getAttribute("videoURL");

			if(videoURL) {
				var player = new Player();
				var playlist = new Playlist();
				var mediaItem = new MediaItem("video", videoURL);

				player.playlist = playlist;
				player.playlist.push(mediaItem);
				player.present();

				navigationDocument.dismissModal();
			}
		});

		navigationDocument.presentModal(this.doc);
	}
	makeDocument(resource) {
		if (!this.parser) {
			this.parser = new DOMParser();
		}

		return this.parser.parseFromString(resource, "application/xml");
	}
}