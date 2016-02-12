export function makeTemplate (json) {
	return `<?xml version="1.0" encoding="UTF-8" ?>
	<document>
		<loadingTemplate>
			<activityIndicator>
				<text>${json.loading_text}</text>
			</activityIndicator>
		</loadingTemplate>
	</document>`
}