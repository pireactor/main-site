// Static
						const frontmatter = {"id":4,"desc":"Product Ownership","name":"Justyna Borwik","imgSource":"/assets/img/about/team/4.webp","linkT":"#","linkLI":"https://www.linkedin.com/in/justynaborwik/","info":" Responsible for effort allocations, workflow control and coordinating discrete business lines, Justyna uses advanced actuarial tools and project management expertiese to price new ventures and allocate comesmurate resources to them. \n \nShe is a key mentor to product managers and actively develops resources and engineering relationships throughout Central Europe."};
						const file = "C:/work-projects/pireactor/main-site/client/public/assets/content/es/leads/JustynaBorwik.md";
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
							return (await import('./chunk.a02fee95.mjs'));
						}
						function Content(...args) {
							return load().then((m) => m.default(...args));
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers);
						}

export { $$loadMetadata, Content, compiledContent, load as default, file, frontmatter, getHeaders, rawContent, url };
