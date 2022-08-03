// Static
						const frontmatter = {"id":1,"slug":"global-strategy","title":"Global Strategy","titleDesc":"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo sint dicta nihil fugit deserunt repudiandae ullam inventore assumenda molestiae? Exercitationem quidem autem voluptate repudiandae dolorum nihil voluptas impedit. Vero, enim.","heroBtn":"Boost my project","viewBtn":"View projects","aboutTiltle":"About","desc":"Powered by worldclass doers familiar with the bleeding edge, we help businesses achieve better business outcomes with honesty. Analyzing your usecase, we will choose the best technology, not the most popular.","values":[{"name":"Projects done","value":32},{"name":"Unique Industries","value":12}],"articles":[{"title":"Section title 1","img":"http://mywishlist.ru/pic/i/wish/300x300/007/917/281.png","desc":"Porttitor mattis morbi a, condimentum vitae sit adipiscing. Tempor, diam porttitor at justo in. Non eu malesuada mauris in velit adipiscing et, neque. Iaculis a est elementum, neque orci cursus eget praesent massa. Non lectus enim et vitae. Sed aenean magna vel sed non. Euismod tristique pulvinar at ipsum lectus tempus. Tellus nisl facilisis dui id varius suspendisse est. Adipiscing urna nunc velit faucibus interdum pretium malesuada. Lobortis leo sit sed morbi. Interdum sit risus sapien habitant in. Adipiscing nisl sagittis, proin vivamus tellus sit amet orci elit. Posuere lacus diam, ut pellentesque. Lorem cursus ornare non venenatis. Enim malesuada netus ut urna blandit eget praesent porttitor euismod. Sed turpis et odio orci massa ultrices est."},{"title":"Section title 2","img":"http://mywishlist.ru/pic/i/wish/300x300/007/917/281.png","desc":"Porttitor mattis morbi a, condimentum vitae sit adipiscing. Tempor, diam porttitor at justo in. Non eu malesuada mauris in velit adipiscing et, neque. Iaculis a est elementum, neque orci cursus eget praesent massa. Non lectus enim et vitae. Sed aenean magna vel sed non. Euismod tristique pulvinar at ipsum lectus tempus. Tellus nisl facilisis dui id varius suspendisse est. Adipiscing urna nunc velit faucibus interdum pretium malesuada. Lobortis leo sit sed morbi. Interdum sit risus sapien habitant in. Adipiscing nisl sagittis, proin vivamus tellus sit amet orci elit. Posuere lacus diam, ut pellentesque. Lorem cursus ornare non venenatis. Enim malesuada netus ut urna blandit eget praesent porttitor euismod. Sed turpis et odio orci massa ultrices est."},{"title":"Section title 3","img":"http://mywishlist.ru/pic/i/wish/300x300/007/917/281.png","desc":"Porttitor mattis morbi a, condimentum vitae sit adipiscing. Tempor, diam porttitor at justo in. Non eu malesuada mauris in velit adipiscing et, neque. Iaculis a est elementum, neque orci cursus eget praesent massa. Non lectus enim et vitae. Sed aenean magna vel sed non. Euismod tristique pulvinar at ipsum lectus tempus. Tellus nisl facilisis dui id varius suspendisse est. Adipiscing urna nunc velit faucibus interdum pretium malesuada. Lobortis leo sit sed morbi. Interdum sit risus sapien habitant in. Adipiscing nisl sagittis, proin vivamus tellus sit amet orci elit. Posuere lacus diam, ut pellentesque. Lorem cursus ornare non venenatis. Enim malesuada netus ut urna blandit eget praesent porttitor euismod. Sed turpis et odio orci massa ultrices est."}]};
						const file = "C:/work-projects/pireactor/main-site/client/public/assets/services/es/strategy.md";
						const url = undefined;
						function rawContent() {
							return "\r\n\r\n\r\n";
						}
						async function compiledContent() {
							return load().then((m) => m.compiledContent());
						}
						function $$loadMetadata() {
							return load().then((m) => m.$$metadata);
						}
						
						// Deferred
						async function load() {
							return (await import('./chunk.1de80d8f.mjs'));
						}
						function Content(...args) {
							return load().then((m) => m.default(...args));
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers);
						}

export { $$loadMetadata, Content, compiledContent, load as default, file, frontmatter, getHeaders, rawContent, url };
