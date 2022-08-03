// Static
						const frontmatter = {"id":4,"desc":"Product Ownership","name":"Justyna Borwik","imgSource":"/assets/img/about/team/4.webp","linkT":"#","linkLI":"#","info":" Responsible for all of the company’s effort allocations and workflow control, coordinating discrete business lines, Justyna uses advanced actuarial tools and project management expertiese to price new ventures and allocate comesmurate resources to them. \n \nShe is a key mentor to product managers and actively develops resources in Central Europe."};
						const file = "C:/work-projects/pireactor/main-site/client/public/assets/leads/en/JustynaBorwik.md";
						const url = undefined;
						function rawContent() {
							return "";
						}
						async function compiledContent() {
							return load().then((m) => m.compiledContent());
						}
						function $$loadMetadata() {
							return load().then((m) => m.$$metadata);
						}
						
						// Deferred
						async function load() {
							return (await import('./chunk.41440f47.mjs'));
						}
						function Content(...args) {
							return load().then((m) => m.default(...args));
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers);
						}

export { $$loadMetadata, Content, compiledContent, load as default, file, frontmatter, getHeaders, rawContent, url };
