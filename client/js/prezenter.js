


export function makeDocument(resource) {
	const parser = new DOMParser();
	let doc = parser.parseFromString(resource, "application/xml");

	return doc;
}