// Static
						const frontmatter = {"lang":"ru","title":"Pireactor","description":"Global Resource Solutions","href":"ru","nav":{"about":"О нас","work":"Портфоли","services":"Услуги","btn":"Связаться"},"index":{"hero":{"redline":"Катализатор","title":"продутов и стартапов","btnText":"Прокачайте мой проект"},"desc":"We help clients explore requirements and work out what they really need today and to plan for tomorrow tomorrow. Instead of reiterating every week, we architect space for modular features and functionality expansions. Wepractice discipline to keep all parties on track and avoid scope creep. Only after the core project is complete do we start a new cycle","mapTitle":"We develop projects for clients from all over the world"},"about":{"hero":{"redline":"About","title":"pireactor"},"counterTitle":"We develop projects for clients from all over the world","desc":"Have you ever wondered what all the PMPs, the Fifth Degree Process Kata Thai Judo certified experts in project... actually do? Even with decades of aggregate experience, we couldn't answer that question. So we made a better way.","whoWeAreTitle":"Who we are","leadsTitle":"Our Global Leads","text":["  [pi┃reactor] is reinventing straight through quality at speed global solutions from resourcing to delivery—enabled by our proven & proprietary, Micro-Agile to Beyond-Agile, specialized end-to-end methodologies & our fully global talent management built atop of thirty years of combined industry experience across our core team. In short, we are a startup & product catalyzer, accelerating delivery of top quality at fractional cost for: product design, implementation and scaling, thereby unchaining funded founders and established businesses with our unparalleled leanmax global resourcing system. "," We do not seek equity and. We accept select, funded member engagements: ranging from feature addition to functionality extension to full product development, from initial conception/scoping through release-to-market. We also provide venture transformation including visioning, planning, implementation and handoff. "],"locationsTitle":"Locations","locations":[{"name":"Kyiv","img":"/assets/img/about/location/k.webp"},{"name":"New York","img":"/assets/img/about/location/ny.webp"},{"name":"Gdansk","img":"/assets/img/about/location/g.webp"}]},"counters":[{"value":72,"title":"Projects Completed"},{"value":12,"title":"Unique Industries"},{"value":32,"title":"Number of employees"},{"value":5,"title":"Years on the market"}],"howSection":{"title":"How We Work","list":[{"title":"Planning","desc":"Our team examines your requirements and expectations, takes account of your needs and creates a preliminary plan.","class":"Planning"},{"title":"Designing","desc":"Everything from an efficient framework to an easy-to-use interface is drawn up, examined, evaluated and approved during the design phase.","class":"Designing"},{"title":"Defining","desc":"We run due diligence checks, we have you approve features, we agree on timelines, run feasibility tests and finalize the design.","class":"Defining"},{"title":"Testing","desc":"We apply all kinds of tests to both check the function of the software and test its security. We follow test-driven development.","class":"Testing"},{"title":"Building","desc":"Our developpers, graphic designers and development management team get hard to work ensuring that your software is as efficient as possible.","class":"Building"},{"title":"Deployment","desc":"With your approval, the software is deployed to the needed environment. All rights to the custom solution are transferred to you.","class":"Deployment"},{"title":"Maintenance","desc":"We ensure all maintenance can be done easily by your own staff, but we also offer ongoing maintenance for highly complex and/or larger projects.","class":"Maintenance"}]},"services":{"title":"Our Services"},"tech":{"title":"Technologies We Love","desc":"Our technology expertise includes but not limited to:"},"form":{"title":"Need an MVP?","desc":"Let's arrange a call where we can discuss your project and determine if you're a good fit.","fields":{"name":"Name","email":"Email","phone":"Phone","subj":"Subject","textArea":"Message (optional)","fetchErr":"Something wrong! Please reload the page and try again","sucMsg":"The form was sent successfully","loading":"Sending...","btnText":"Get a free consultation"}}};
						const file = "C:/work-projects/pireactor/main-site/public/assets/content/ru/content.md";
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
							return (await import('./chunk.0caf9a02.mjs'));
						}
						function Content(...args) {
							return load().then((m) => m.default(...args));
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers);
						}

export { $$loadMetadata, Content, compiledContent, load as default, file, frontmatter, getHeaders, rawContent, url };
