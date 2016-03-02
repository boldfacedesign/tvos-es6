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
	<catalogTemplate>
		<list>
			<section>
				<listItemLockup>
					<title>All TV Shows</title>
					<relatedContent>
						<grid>
							<section>
								${json.results.map(item => tmplString`<lockup href="#tv_details/${item.id}">
									<img src="${'http://image.tmdb.org/t/p/w500' + item.poster_path}" width="300" height="450" />
									<title>$${item.name}</title>
								</lockup>`)}
							</section>
						</grid>
					</relatedContent>
				</listItemLockup>
			</section>
		</list>
	</catalogTemplate>
</document>`

export default tmpl;

