// Static
						const frontmatter = {"id":3,"desc":"Resourcing and Insights","name":"Steven Vermazen","imgSource":"/assets/img/about/team/3.webp","linkT":"#","linkLI":"#","info":" In today's rapidly changing industry, Steven would have arguably graduated as a data scientist, but in the world of yesterday he made himself an engineer with a bent for high-load algorithmic mathematics. \n \nHe chose to travel light and selected projects that kept his work and life balanced and his intellect clear. In effect, he practiced field triage as a delivery trauma surgery for software projects found flipped with all 6 axels spinning. He brings the bottom-up post mortem of the contemporary software industry."};
						const file = "C:/work-projects/pireactor/main-site/public/assets/content/en/leads/StevenVermazen.md";
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
							return (await import('./chunk.4195bd29.mjs'));
						}
						function Content(...args) {
							return load().then((m) => m.default(...args));
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers);
						}

export { $$loadMetadata, Content, compiledContent, load as default, file, frontmatter, getHeaders, rawContent, url };
