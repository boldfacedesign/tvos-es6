import { tmplString } from "../../shared/util.js"

let tmpl = model => tmplString`<shelf class="shelf">
	<header>
		<title>Search results for ${model.term}</title>
	</header>
	<section id="results">
		${model.json.Search.map(item => tmplString`<lockup href="#details/${item.imdbID}">
				<img src="${item.Poster}" width="300" height="399" />
				<title>${item.Title}</title>
			</lockup>`)}
	</section>
</shelf>`

export default tmpl;