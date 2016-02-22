import { tmplString } from "../../shared/util.js"

let tmpl = json => tmplString`<?xml version="1.0" encoding="UTF-8" ?>
<document>
	<head>
		<style>
			.shelf {
				tv-interitem-spacing: 60;
			}
		</style>
	</head>
	<stackTemplate>
		<collectionList>
			<shelf>
				<header>
					<title>Schwarzenegger</title>
				</header>
				<section>
					${json.arnie.map(item => tmplString`<lockup>
						<img src="${item.Poster}" width="300" height="450" />
						<title>$${item.Title}</title>
					</lockup>`)}
				</section>
			</shelf>
			<shelf>
				<header>
					<title>Cage</title>
				</header>
				<section>
					${json.cage.map(item => tmplString`<lockup>
						<img src="${item.Poster}" width="300" height="450" />
						<title>$${item.Title}</title>
					</lockup>`)}
				</section>
			</shelf>
		</collectionList>
	</stackTemplate>
</document>`

export default tmpl;

