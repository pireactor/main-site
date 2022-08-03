// Static
						const frontmatter = {"slug":"Crowd-Sourced-Brewing","title":"Crowd Sourced Brewing","developers":12,"months":55,"tags":["Automation","Product Developpment","Architecture"],"desc":"A Croatian-Belgian craftbrewer wanted a webshop and marketing campaign to bring customers to the new platform. He got much more.","img":"https://api.time.com/wp-content/uploads/2017/05/star-wars_1024.jpg","phases":[{"name":"development","period":"December 2017","icon":"Development phase"},{"name":"release","period":"March 2018","icon":"Development phase"},{"name":"support","period":"April 2018 — May 2021","icon":"Development phase"}],"bullets":["Mobile App","Web App","UI/UX","Analytics "],"result":[{"name":"Profitability Index","value":1350,"format":"%"},{"name":"Time to Delivery","value":4,"format":"Months"},{"name":"New users","value":40000,"format":"+"}]};
						const file = "C:/work-projects/pireactor/main-site/client/public/assets/projects/en/Brewery.md";
						const url = undefined;
						function rawContent() {
							return "We brainstormed, then developped a crowsourcing system for users to vote on recipes, labeling, art etc. of (concurrent) batches of beer. This caused them to invite friends onto the platform to vote and debate, causing increased feelings of ownership and brand loyalty, resulting in above market sales and retention per customer, while avoiding the need for market research, A/B testing of designs etc.\r\n \r\nWithin a year of implementation, the new approach increased total sales by over 600%, brought the repeat customer rate to 72% and net promoter score to 63.\r\n\r\nAs the client's core competency lied outside of the tech space, we were further engaged to maintain and host the system. We handled maitenance and expanded functionality when necessary, including more secure authentification, necessary vulnerability patching, optimizations to decrease server load etc.\r\n\r\n\r\n\r\n";
						}
						async function compiledContent() {
							return load().then((m) => m.compiledContent());
						}
						function $$loadMetadata() {
							return load().then((m) => m.$$metadata);
						}
						
						// Deferred
						async function load() {
							return (await import('./chunk.aee19a71.mjs'));
						}
						function Content(...args) {
							return load().then((m) => m.default(...args));
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers);
						}

export { $$loadMetadata, Content, compiledContent, load as default, file, frontmatter, getHeaders, rawContent, url };
