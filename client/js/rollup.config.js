import json from "rollup-plugin-json";
import babel from 'rollup-plugin-babel';

export default {
	entry: "Appleecation.js",
	plugins: [json(), babel()],
	dest: "bundle.js"
}