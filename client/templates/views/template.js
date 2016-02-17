export default function template (json) {
	return `<?xml version="1.0" encoding="UTF-8" ?>
	<document>
		<alertTemplate>
			<title>${json.test}</title>
			<description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
			<button videoURL="http://techslides.com/demos/sample-videos/small.mp4">
				<text>Button 1</text>
			</button>
			<button>
				<text>Button 2</text>
			</button>
		</alertTemplate>
	</document>`
}