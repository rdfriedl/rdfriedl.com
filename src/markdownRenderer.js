import unified from "unified";
import remarkParse from "remark-parse";
import remarkIframes from "remark-iframes";
import remarkAutoLinkHeading from "remark-autolink-headings";
import remark2rehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import remarkSlug from "remark-slug";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import rehypeStringify from "rehype-stringify";

const compiler = unified()
	.use(remarkParse)
	.use(remarkIframes, {
		"www.youtube.com": {
			tag: "iframe",
			width: 560,
			height: 315,
			disabled: false,
			replace: [["watch?v=", "embed/"], ["http://", "https://"]],
			thumbnail: {
				format: "http://img.youtube.com/vi/{id}/0.jpg",
				id: ".+/(.+)$"
			},
			removeAfter: "&"
		}
	})
	.use(remarkSlug)
	.use(remarkAutoLinkHeading)
	// convert markdown to html
	.use(remark2rehype, { allowDangerousHTML: true })
	// re-parse the html and look for html elements that were not converted
	.use(rehypeRaw)
	// remove a lot of the white spaces between elements
	.use(rehypeMinifyWhitespace)
	// convert html to string
	.use(rehypeStringify);

export function renderMarkdown(markdown) {
	return compiler.processSync(markdown).contents;
}
