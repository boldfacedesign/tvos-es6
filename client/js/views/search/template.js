import { tmplString } from "../../shared/util.js"

let tmpl = json => tmplString`<?xml version="1.0" encoding="UTF-8" ?>
<document>
	<head>
		<style>
			.suggestionListLayout {
				margin: -150 0;
			}
			.shelf {
				tv-interitem-spacing: 60;
			}
		</style>
	</head>
	<searchTemplate>
		<searchField>Search</searchField>
		<collectionList>
			<list>
				<section>
					<header>
						<title>Type to Search</title>
					</header>
				</section>
			</list>
		</collectionList>
	</searchTemplate>
</document>`

export default tmpl;