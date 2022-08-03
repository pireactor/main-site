import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderToString as renderToString$1, createComponent as createComponent$1, ssr, ssrHydrationKey, ssrAttribute, escape as escape$1 } from 'solid-js/web';
import serializeJavaScript from 'serialize-javascript';
/* empty css                         */import { s as styles } from './chunks/chunk.3826580f.mjs';
import { createSignal, createEffect, onMount } from 'solid-js';
/* empty css                        *//* empty css                        *//* empty css                        */import { s as styles$1 } from './chunks/chunk.67acf695.mjs';
/* empty css                        */import { s as styles$6 } from './chunks/chunk.2fcc1150.mjs';
import { createStore } from 'solid-js/store';
import { s as styles$2, a as styles$3, b as styles$4, c as styles$5 } from './chunks/chunk.037f97ae.mjs';
/* empty css                         *//* empty css                        *//* empty css                        *//* empty css                        */import { s as styles$7, a as styles$8, b as styles$9, c as styles$a, d as styles$b } from './chunks/chunk.dbf05238.mjs';
/* empty css                         *//* empty css                         */import { s as styles$c } from './chunks/chunk.90110aa4.mjs';
/* empty css                         *//* empty css                        *//* empty css                        *//* empty css                        *//* empty css                        *//* empty css                         *//* empty css                        *//* empty css                        *//* empty css                        *//* empty css                        *//* empty css                         *//* empty css                         *//* empty css                         *//* empty css                        *//* empty css                         *//* empty css                        *//* empty css                        *//* empty css                         *//* empty css                         *//* empty css                         *//* empty css                         *//* empty css                         *//* empty css                         *//* empty css                         *//* empty css                         */
function check(Component, props, children) {
	if (typeof Component !== 'function') return false;
	const { html } = renderToStaticMarkup(Component, props, children);
	return typeof html === 'string';
}

function renderToStaticMarkup(Component, props, children) {
	const html = renderToString$1(() =>
		createComponent$1(Component, {
			...props,
			// In Solid SSR mode, `ssr` creates the expected structure for `children`.
			// In Solid client mode, `ssr` is just a stub.
			children: children != null ? ssr(`<astro-fragment>${children}</astro-fragment>`) : children,
		})
	);
	return {
		html: html,
	};
}

var _renderer0 = {
	check,
	renderToStaticMarkup,
};

/**
 * Copyright (C) 2017-present by Andrea Giammarchi - @WebReflection
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const {replace} = '';
const ca = /[&<>'"]/g;

const esca = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
};
const pe = m => esca[m];

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} es the input to safely escape
 * @returns {string} the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
const escape = es => replace.call(es, ca, pe);

const escapeHTML = escape;
class HTMLString extends String {
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}
function hydrationSpecifier(hydrate) {
  return `astro/client/${hydrate}.js`;
}

function serializeProps(value) {
  return serializeJavaScript(value);
}
const HydrationDirectives = ["load", "idle", "media", "visible", "only"];
function extractDirectives(inputProps) {
  let extracted = {
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (HydrationDirectives.indexOf(extracted.hydration.directive) < 0) {
            throw new Error(`Error: invalid hydration directive "${key}". Supported hydration methods: ${HydrationDirectives.map((d) => `"client:${d}"`).join(", ")}`);
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error('Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"');
          }
          break;
        }
      }
    } else if (key === "class:list") {
      extracted.props[key.slice(0, -5)] = serializeListValue(value);
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport) {
    throw new Error(`Unable to resolve a componentExport for "${metadata.displayName}"! Please open an issue.`);
  }
  const hydrationSource = renderer.clientEntrypoint ? `const [{ ${componentExport.value}: Component }, { default: hydrate }] = await Promise.all([import("${await result.resolve(componentUrl)}"), import("${await result.resolve(renderer.clientEntrypoint)}")]);
  return (el, children) => hydrate(el)(Component, ${serializeProps(props)}, children, ${JSON.stringify({ client: hydrate })});
` : `await import("${await result.resolve(componentUrl)}");
  return () => {};
`;
  const hydrationScript = {
    props: { type: "module", "data-astro-component-hydration": true },
    children: `import setup from '${await result.resolve(hydrationSpecifier(hydrate))}';
${`import '${await result.resolve("astro:scripts/before-hydration.js")}';`}
setup("${astroId}", {name:"${metadata.displayName}",${metadata.hydrateArgs ? `value: ${JSON.stringify(metadata.hydrateArgs)}` : ""}}, async () => {
  ${hydrationSource}
});
`
  };
  return hydrationScript;
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

class Metadata {
  constructor(filePathname, opts) {
    this.modules = opts.modules;
    this.hoisted = opts.hoisted;
    this.hydratedComponents = opts.hydratedComponents;
    this.clientOnlyComponents = opts.clientOnlyComponents;
    this.hydrationDirectives = opts.hydrationDirectives;
    this.mockURL = new URL(filePathname, "http://example.com");
    this.metadataCache = /* @__PURE__ */ new Map();
  }
  resolvePath(specifier) {
    return specifier.startsWith(".") ? new URL(specifier, this.mockURL).pathname : specifier;
  }
  getPath(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentUrl) || null;
  }
  getExport(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentExport) || null;
  }
  *hydratedComponentPaths() {
    const found = /* @__PURE__ */ new Set();
    for (const metadata of this.deepMetadata()) {
      for (const component of metadata.hydratedComponents) {
        const path = metadata.getPath(component);
        if (path && !found.has(path)) {
          found.add(path);
          yield path;
        }
      }
    }
  }
  *clientOnlyComponentPaths() {
    const found = /* @__PURE__ */ new Set();
    for (const metadata of this.deepMetadata()) {
      for (const component of metadata.clientOnlyComponents) {
        const path = metadata.resolvePath(component);
        if (path && !found.has(path)) {
          found.add(path);
          yield path;
        }
      }
    }
  }
  *hydrationDirectiveSpecifiers() {
    const found = /* @__PURE__ */ new Set();
    for (const metadata of this.deepMetadata()) {
      for (const directive of metadata.hydrationDirectives) {
        if (!found.has(directive)) {
          found.add(directive);
          yield hydrationSpecifier(directive);
        }
      }
    }
  }
  *hoistedScriptPaths() {
    for (const metadata of this.deepMetadata()) {
      let i = 0, pathname = metadata.mockURL.pathname;
      while (i < metadata.hoisted.length) {
        yield `${pathname.replace("/@fs", "")}?astro&type=script&index=${i}`;
        i++;
      }
    }
  }
  *deepMetadata() {
    yield this;
    const seen = /* @__PURE__ */ new Set();
    for (const { module: mod } of this.modules) {
      if (typeof mod.$$metadata !== "undefined") {
        const md = mod.$$metadata;
        for (const childMetdata of md.deepMetadata()) {
          if (!seen.has(childMetdata)) {
            seen.add(childMetdata);
            yield childMetdata;
          }
        }
      }
    }
  }
  getComponentMetadata(Component) {
    if (this.metadataCache.has(Component)) {
      return this.metadataCache.get(Component);
    }
    const metadata = this.findComponentMetadata(Component);
    this.metadataCache.set(Component, metadata);
    return metadata;
  }
  findComponentMetadata(Component) {
    const isCustomElement = typeof Component === "string";
    for (const { module, specifier } of this.modules) {
      const id = this.resolvePath(specifier);
      for (const [key, value] of Object.entries(module)) {
        if (isCustomElement) {
          if (key === "tagName" && Component === value) {
            return {
              componentExport: key,
              componentUrl: id
            };
          }
        } else if (Component === value) {
          return {
            componentExport: key,
            componentUrl: id
          };
        }
      }
    }
    return null;
  }
}
function createMetadata(filePathname, options) {
  return new Metadata(filePathname, options);
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
async function _render(child) {
  child = await child;
  if (child instanceof HTMLString) {
    return child;
  } else if (Array.isArray(child)) {
    return markHTMLString((await Promise.all(child.map((value) => _render(value)))).join(""));
  } else if (typeof child === "function") {
    return _render(child());
  } else if (typeof child === "string") {
    return markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
    return markHTMLString(await renderAstroComponent(child));
  } else {
    return child;
  }
}
class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  *[Symbol.iterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield _render(expression);
    }
  }
}
function isAstroComponent(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object AstroComponent]";
}
async function render(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}
function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
async function renderSlot(_result, slotted, fallback) {
  if (slotted) {
    return await _render(slotted);
  }
  return fallback;
}
const Fragment = Symbol("Astro.Fragment");
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue", "@astrojs/svelte"];
  }
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
async function renderComponent(result, displayName, Component, _props, slots = {}) {
  var _a;
  Component = await Component;
  if (Component === Fragment) {
    const children2 = await renderSlot(result, slots == null ? void 0 : slots.default);
    if (children2 == null) {
      return children2;
    }
    return markHTMLString(children2);
  }
  if (Component && Component.isAstroComponentFactory) {
    const output = await renderToString(result, Component, _props, slots);
    return markHTMLString(output);
  }
  if (Component === null && !_props["client:only"]) {
    throw new Error(`Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`);
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, props } = extractDirectives(_props);
  let html = "";
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (Array.isArray(renderers) && renderers.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`;
    throw new Error(message);
  }
  const children = await renderSlot(result, slots == null ? void 0 : slots.default);
  let renderer;
  if (metadata.hydrate !== "only") {
    let error;
    for (const r of renderers) {
      try {
        if (await r.ssr.check(Component, props, children)) {
          renderer = r;
          break;
        }
      } catch (e) {
        error ?? (error = e);
      }
    }
    if (error) {
      throw error;
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const rendererName = metadata.hydrateArgs;
      renderer = renderers.filter(({ name }) => name === `@astrojs/${rendererName}` || name === rendererName)[0];
    }
    if (!renderer && renderers.length === 1) {
      renderer = renderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(({ name }) => name === `@astrojs/${extname}` || name === extname)[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers.filter((r) => probableRendererNames.includes(r.name));
      const plural = renderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html } = await renderer.ssr.renderToStaticMarkup(Component, props, children, metadata));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html } = await renderer.ssr.renderToStaticMarkup(Component, props, children, metadata));
    }
  }
  if (!html && typeof Component === "string") {
    html = await renderAstroComponent(await render`<${Component}${internalSpreadAttributes(props)}${markHTMLString((children == null || children == "") && voidElementNames.test(Component) ? `/>` : `>${children == null ? "" : children}</${Component}>`)}`);
  }
  if (!hydration) {
    return markHTMLString(html.replace(/\<\/?astro-fragment\>/g, ""));
  }
  const astroId = shorthash(`<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(props)}`);
  result.scripts.add(await generateHydrateScript({ renderer, result, astroId, props }, metadata));
  const needsAstroTemplate = children && !/<\/?astro-fragment\>/.test(html);
  const template = needsAstroTemplate ? `<template data-astro-template>${children}</template>` : "";
  return markHTMLString(`<astro-root ssr uid="${astroId}"${needsAstroTemplate ? " tmpl" : ""}>${html ?? ""}${template}</astro-root>`);
}
function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = new URL(_site);
  const url = new URL(filePathname, site);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), url).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    return markHTMLString(` ${key.slice(0, -5)}="${toAttributeString(serializeListValue(value))}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    const response = Component;
    throw response;
  }
  let template = await renderAstroComponent(Component);
  return template;
}
async function renderAstroComponent(component) {
  let template = [];
  for await (const value of component) {
    if (value || value === 0) {
      template.push(value);
    }
  }
  return markHTMLString(await _render(template));
}
function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(`<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`);
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

var __freeze = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp$1(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$metadata$S = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/index.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$S = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/index.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Index$6 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$S, $$props, $$slots);
  Astro2.self = $$Index$6;
  return render(_a || (_a = __template(["<script>\n	window.location.pathname = `/en/`;\n<\/script>"], ["<script>\n	window.location.pathname = \\`/en/\\`;\n<\/script>"])));
});

const $$file$S = "C:/work-projects/pireactor/main-site/client/src/pages/index.astro";
const $$url$S = "";

var _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$S,
	'default': $$Index$6,
	file: $$file$S,
	url: $$url$S
}, Symbol.toStringTag, { value: 'Module' }));

var ELangs = /* @__PURE__ */ ((ELangs2) => {
  ELangs2["en"] = "en";
  ELangs2["es"] = "es";
  ELangs2["ua"] = "ua";
  ELangs2["tr"] = "tr";
  ELangs2["pl"] = "pl";
  ELangs2["ru"] = "ru";
  return ELangs2;
})(ELangs || {});

var $$module4$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ELangs: ELangs
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$R = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/layouts/Container.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$R = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/layouts/Container.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Container = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$R, $$props, $$slots);
  Astro2.self = $$Container;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<div class="container astro-YYEPTAQJ">
  ${renderSlot($$result, $$slots["default"])}
</div>`;
});

const $$file$R = "C:/work-projects/pireactor/main-site/client/src/layouts/Container.astro";
const $$url$R = undefined;

var $$module5$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$R,
	'default': $$Container,
	file: $$file$R,
	url: $$url$R
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$Q = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/layouts/Footer.astro", { modules: [{ module: $$module5$3, specifier: "./Container.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$Q = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/layouts/Footer.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$Q, $$props, $$slots);
  Astro2.self = $$Footer;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<footer class="footer astro-HYTLXZK7">
  ${renderComponent($$result, "Container", $$Container, { "class": "astro-HYTLXZK7" }, { "default": () => render`<div class="footer__footer astro-HYTLXZK7">
      <small class="astro-HYTLXZK7">&copy; 2022 Pireactor - All Rights Reserved</small>
      <div class="footer__locations astro-HYTLXZK7">New York, Kyiv, Gdansk</div>
      <a href="mailto: info@pireactor.io" class="footer__mail astro-HYTLXZK7">
        <svg class="footer__mail-pic astro-HYTLXZK7" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19 18.981H5C4.46957 18.981 3.96086 18.7703 3.58579 18.3953C3.21071 18.0202 3 17.5115 3 16.981V7.01904C3 6.48861 3.21071 5.9799 3.58579 5.60483C3.96086 5.22976 4.46957 5.01904 5 5.01904H19C19.5304 5.01904 20.0391 5.22976 20.4142 5.60483C20.7893 5.9799 21 6.48861 21 7.01904V16.982C20.9997 17.5123 20.7889 18.0208 20.4139 18.3956C20.0388 18.7705 19.5303 18.981 19 18.981V18.981Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="astro-HYTLXZK7"></path>
          <path d="M17 9L12 12L7 9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="astro-HYTLXZK7"></path>
        </svg>
        info@pireactor.io
      </a>
      <ul class="footer__socials astro-HYTLXZK7">
        <li class="footer__socials-item astro-HYTLXZK7">
          <a class="footer__socials-link astro-HYTLXZK7" href="http://" aria-label="facebook">
            <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-HYTLXZK7">
              <path d="M10.9281 3.98438H13.1875V0.16875C12.7984 0.117187 11.4578 0 9.89688 0C6.63906 0 4.40781 1.9875 4.40781 5.63906V9H0.8125V13.2656H4.40781V24H8.81406V13.2656H12.2641L12.8125 9H8.81406V6.06094C8.81406 4.82812 9.15625 3.98438 10.9281 3.98438Z" fill="white" class="astro-HYTLXZK7"></path>
            </svg>
          </a>
        </li>
        <li class="footer__socials-item astro-HYTLXZK7">
          <a class="footer__socials-link astro-HYTLXZK7" href="http://" aria-label="twitter">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-HYTLXZK7">
              <path d="M21.533 7.11175C21.5482 7.32494 21.5482 7.53817 21.5482 7.75136C21.5482 14.2539 16.599 21.7463 7.5533 21.7463C4.76648 21.7463 2.17767 20.9391 0 19.5382C0.395953 19.5838 0.776625 19.5991 1.18781 19.5991C3.48727 19.5991 5.60405 18.8224 7.29441 17.4976C5.13197 17.4519 3.31978 16.0356 2.69541 14.0864C3 14.132 3.30455 14.1625 3.62438 14.1625C4.06598 14.1625 4.50764 14.1016 4.91878 13.995C2.66498 13.5381 0.974578 11.5585 0.974578 9.16759V9.1067C1.62938 9.47219 2.39086 9.70061 3.19791 9.73103C1.87303 8.84777 1.00505 7.34017 1.00505 5.63458C1.00505 4.72089 1.24866 3.88333 1.67508 3.15236C4.09641 6.13713 7.73602 8.08633 11.8172 8.29956C11.7411 7.93408 11.6954 7.55341 11.6954 7.17269C11.6954 4.462 13.8883 2.25391 16.6141 2.25391C18.0304 2.25391 19.3095 2.84781 20.208 3.8072C21.3197 3.59402 22.3857 3.18283 23.3299 2.61939C22.9643 3.76155 22.1877 4.72094 21.1674 5.33003C22.1573 5.22348 23.1167 4.94931 23.9999 4.56864C23.33 5.54322 22.4924 6.4112 21.533 7.11175Z" fill="white" class="astro-HYTLXZK7"></path>
            </svg>

          </a>
        </li>
        <li class="footer__socials-item astro-HYTLXZK7">
          <a class="footer__socials-link astro-HYTLXZK7" href="http://" aria-label="linkedin">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-HYTLXZK7">
              <path d="M6.20051 22.4953H1.8468V8.47813H6.20051V22.4953ZM4.02131 6.56606C2.62944 6.56606 1.5 5.41319 1.5 4.02131C1.5 2.62944 2.62944 1.5 4.02131 1.5C5.41319 1.5 6.54262 2.62944 6.54262 4.02131C6.54262 5.41319 5.41319 6.56606 4.02131 6.56606ZM22.4953 22.4953H18.151V15.6718C18.151 14.0456 18.1182 11.9602 15.8874 11.9602C13.6239 11.9602 13.2771 13.727 13.2771 15.5547V22.4953H8.92803V8.47813H13.1037V10.3902H13.1646C13.7457 9.28889 15.1657 8.12665 17.284 8.12665C21.6892 8.12665 22.5 11.0276 22.5 14.7955V22.4953H22.4953Z" fill="white" class="astro-HYTLXZK7"></path>
            </svg>
          </a>
        </li>
      </ul>
    </div>` })}
</footer>`;
});

const $$file$Q = "C:/work-projects/pireactor/main-site/client/src/layouts/Footer.astro";
const $$url$Q = undefined;

var $$module4$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$Q,
	'default': $$Footer,
	file: $$file$Q,
	url: $$url$Q
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$P = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/Logo.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$P = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/Logo.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Logo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$P, $$props, $$slots);
  Astro2.self = $$Logo;
  const { langHref } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<a${addAttribute("/" + langHref, "href")} class="header__logo logo astro-IPBBBIB3" aria-label="Logo">
  <svg class="logo__img astro-IPBBBIB3" width="36" height="64" viewBox="0 0 36 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="27.4291" height="42.2732" rx="5" transform="matrix(0.867831 0.49686 3.77346e-05 1 0.458984 7.2851)" fill="url(#paint0_linear_510_685)" class="astro-IPBBBIB3"></rect>
    <rect width="27.4291" height="42.2732" rx="5" transform="matrix(0.867831 0.49686 3.77346e-05 1 6.11133 4.0491)" fill="url(#paint1_linear_510_685)" class="astro-IPBBBIB3"></rect>
    <rect width="27.4291" height="42.2732" rx="5" transform="matrix(0.867831 0.49686 3.77346e-05 1 11.7637 0.813263)" fill="url(#paint2_linear_510_685)" class="astro-IPBBBIB3"></rect>
    <defs class="astro-IPBBBIB3">
      <linearGradient id="paint0_linear_510_685" x1="11.9475" y1="-14.9122" x2="31.2009" y2="43.7327" gradientUnits="userSpaceOnUse" class="astro-IPBBBIB3">
        <stop stop-color="#F100AE" class="astro-IPBBBIB3"></stop>
        <stop offset="1" stop-color="#FF0BF5" stop-opacity="0" class="astro-IPBBBIB3"></stop>
      </linearGradient>
      <linearGradient id="paint1_linear_510_685" x1="9.15457" y1="-12.4268" x2="45.3355" y2="24.5134" gradientUnits="userSpaceOnUse" class="astro-IPBBBIB3">
        <stop stop-color="#FF005C" class="astro-IPBBBIB3"></stop>
        <stop offset="1" stop-color="#666666" stop-opacity="0" class="astro-IPBBBIB3"></stop>
        <stop offset="1" stop-color="#FF005C" stop-opacity="0" class="astro-IPBBBIB3"></stop>
      </linearGradient>
      <linearGradient id="paint2_linear_510_685" x1="13.7145" y1="0" x2="13.7145" y2="42.2732" gradientUnits="userSpaceOnUse" class="astro-IPBBBIB3">
        <stop stop-color="#00DDEB" class="astro-IPBBBIB3"></stop>
        <stop offset="1" stop-color="#0057FF" stop-opacity="0" class="astro-IPBBBIB3"></stop>
      </linearGradient>
    </defs>
  </svg>
  <svg width="196" height="29" viewBox="0 0 196 29" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-IPBBBIB3">
    <path d="M0.131836 28.3492H2.92412V17.2368H8.9615C16.0177 17.2368 18.5836 13.0837 18.5836 8.968C18.5836 5.82511 17.1497 0.661785 8.9615 0.661785H0.131836V28.3492ZM2.92412 3.16861H8.99923C13.9801 3.16861 15.7913 6.01218 15.7913 8.968C15.7913 11.849 13.9801 14.73 8.99923 14.73H2.92412V3.16861Z" fill="white" class="astro-IPBBBIB3"></path>
    <path d="M22.5379 28.3492H25.3302V0.661785H22.5379V28.3492Z" fill="white" class="astro-IPBBBIB3"></path>
    <path d="M30.1772 28.3492H32.9695V3.16861H37.988C44.5914 3.16861 46.2894 6.49858 46.2894 9.4544C46.2894 15.7402 39.5728 15.815 37.988 15.815H35.7617L45.2329 28.3492H48.7044L40.8558 18.0225C45.8366 17.6858 49.0817 14.2062 49.0817 9.71631C49.0817 7.43397 48.478 0.661785 37.988 0.661785H30.1772V28.3492Z" fill="white" class="astro-IPBBBIB3"></path>
    <path d="M53.0974 28.3492H68.4172V25.8423H55.8897V15.6654H68.0022V13.1585H55.8897V3.16861H68.4172V0.661785H53.0974V28.3492Z" fill="white" class="astro-IPBBBIB3"></path>
    <path d="M70.9504 28.3492H73.9691L78.0066 19.0702H90.9869L95.0244 28.3492H98.0431L86.0816 0.661785H82.9874L70.9504 28.3492ZM79.1008 16.5633L84.5345 3.87951L89.8926 16.5633H79.1008Z" fill="white" class="astro-IPBBBIB3"></path>
    <path d="M126.34 7.73329C124.001 2.94412 119.284 0.175385 113.473 0.175385C105.398 0.175385 98.9832 6.19926 98.9832 14.4306C98.9832 22.8865 105.511 28.8356 113.699 28.8356C119.171 28.8356 123.85 25.9546 126.453 21.128H123.133C120.869 24.7199 117.095 26.3287 113.699 26.3287C107.058 26.3287 101.775 21.2402 101.775 14.4306C101.775 8.10745 106.492 2.68221 113.511 2.68221C119.51 2.68221 122.265 6.57341 123.019 7.73329H126.34Z" fill="white" class="astro-IPBBBIB3"></path>
    <path d="M134.735 28.3492H137.527V3.16861H143.904V0.661785H128.358V3.16861H134.735V28.3492Z" fill="white" class="astro-IPBBBIB3"></path>
    <path d="M157.883 0.175385C149.582 0.175385 143.092 6.27409 143.092 14.5803C143.092 22.8865 149.657 28.8356 157.883 28.8356C166.185 28.8356 172.675 22.662 172.675 14.3558C172.675 6.12443 166.222 0.175385 157.883 0.175385ZM157.921 26.3287C151.204 26.3287 145.884 21.5396 145.884 14.5803C145.884 7.69587 151.091 2.68221 157.921 2.68221C164.638 2.68221 169.883 7.47138 169.883 14.3558C169.883 21.2777 164.713 26.3287 157.921 26.3287Z" fill="white" class="astro-IPBBBIB3"></path>
    <path d="M177.095 28.3492H179.887V3.16861H184.906C191.509 3.16861 193.207 6.49858 193.207 9.4544C193.207 15.7402 186.491 15.815 184.906 15.815H182.68L192.151 28.3492H195.622L187.774 18.0225C192.754 17.6858 196 14.2062 196 9.71631C196 7.43397 195.396 0.661785 184.906 0.661785H177.095V28.3492Z" fill="white" class="astro-IPBBBIB3"></path>
  </svg>
</a>`;
});

const $$file$P = "C:/work-projects/pireactor/main-site/client/src/components/Logo.astro";
const $$url$P = undefined;

var $$module1$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$P,
	'default': $$Logo,
	file: $$file$P,
	url: $$url$P
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$g = ["<svg", ' width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="20" rx="2" fill="white"></rect><mask id="mask0_258_201" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20"><rect width="28" height="20" rx="2" fill="white"></rect></mask><g mask="url(#mask0_258_201)"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 10.6667H28V0H0V10.6667Z" fill="#156DD1"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0 20H28V10.6667H0V20Z" fill="#FFD948"></path></g></svg>'], _tmpl$2$7 = ["<svg", ' width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="20" rx="2" fill="white"></rect><mask id="mask0_258_206" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20"><rect width="28" height="20" rx="2" fill="white"></rect></mask><g mask="url(#mask0_258_206)"><path fill-rule="evenodd" clip-rule="evenodd" d="M28 0H0V1.33333H28V0ZM28 2.66667H0V4H28V2.66667ZM0 5.33333H28V6.66667H0V5.33333ZM28 8H0V9.33333H28V8ZM0 10.6667H28V12H0V10.6667ZM28 13.3333H0V14.6667H28V13.3333ZM0 16H28V17.3333H0V16ZM28 18.6667H0V20H28V18.6667Z" fill="#D02F44"></path><rect width="12" height="9.33333" fill="#46467F"></rect><g filter="url(#filter0_d_258_206)"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.66671 2.00001C2.66671 2.3682 2.36823 2.66668 2.00004 2.66668C1.63185 2.66668 1.33337 2.3682 1.33337 2.00001C1.33337 1.63182 1.63185 1.33334 2.00004 1.33334C2.36823 1.33334 2.66671 1.63182 2.66671 2.00001ZM5.33337 2.00001C5.33337 2.3682 5.0349 2.66668 4.66671 2.66668C4.29852 2.66668 4.00004 2.3682 4.00004 2.00001C4.00004 1.63182 4.29852 1.33334 4.66671 1.33334C5.0349 1.33334 5.33337 1.63182 5.33337 2.00001ZM7.33337 2.66668C7.70156 2.66668 8.00004 2.3682 8.00004 2.00001C8.00004 1.63182 7.70156 1.33334 7.33337 1.33334C6.96518 1.33334 6.66671 1.63182 6.66671 2.00001C6.66671 2.3682 6.96518 2.66668 7.33337 2.66668ZM10.6667 2.00001C10.6667 2.3682 10.3682 2.66668 10 2.66668C9.63185 2.66668 9.33337 2.3682 9.33337 2.00001C9.33337 1.63182 9.63185 1.33334 10 1.33334C10.3682 1.33334 10.6667 1.63182 10.6667 2.00001ZM3.33337 4.00001C3.70156 4.00001 4.00004 3.70153 4.00004 3.33334C4.00004 2.96515 3.70156 2.66668 3.33337 2.66668C2.96518 2.66668 2.66671 2.96515 2.66671 3.33334C2.66671 3.70153 2.96518 4.00001 3.33337 4.00001ZM6.66671 3.33334C6.66671 3.70153 6.36823 4.00001 6.00004 4.00001C5.63185 4.00001 5.33337 3.70153 5.33337 3.33334C5.33337 2.96515 5.63185 2.66668 6.00004 2.66668C6.36823 2.66668 6.66671 2.96515 6.66671 3.33334ZM8.66671 4.00001C9.0349 4.00001 9.33337 3.70153 9.33337 3.33334C9.33337 2.96515 9.0349 2.66668 8.66671 2.66668C8.29852 2.66668 8.00004 2.96515 8.00004 3.33334C8.00004 3.70153 8.29852 4.00001 8.66671 4.00001ZM10.6667 4.66668C10.6667 5.03487 10.3682 5.33334 10 5.33334C9.63185 5.33334 9.33337 5.03487 9.33337 4.66668C9.33337 4.29849 9.63185 4.00001 10 4.00001C10.3682 4.00001 10.6667 4.29849 10.6667 4.66668ZM7.33337 5.33334C7.70156 5.33334 8.00004 5.03487 8.00004 4.66668C8.00004 4.29849 7.70156 4.00001 7.33337 4.00001C6.96518 4.00001 6.66671 4.29849 6.66671 4.66668C6.66671 5.03487 6.96518 5.33334 7.33337 5.33334ZM5.33337 4.66668C5.33337 5.03487 5.0349 5.33334 4.66671 5.33334C4.29852 5.33334 4.00004 5.03487 4.00004 4.66668C4.00004 4.29849 4.29852 4.00001 4.66671 4.00001C5.0349 4.00001 5.33337 4.29849 5.33337 4.66668ZM2.00004 5.33334C2.36823 5.33334 2.66671 5.03487 2.66671 4.66668C2.66671 4.29849 2.36823 4.00001 2.00004 4.00001C1.63185 4.00001 1.33337 4.29849 1.33337 4.66668C1.33337 5.03487 1.63185 5.33334 2.00004 5.33334ZM4.00004 6.00001C4.00004 6.3682 3.70156 6.66668 3.33337 6.66668C2.96518 6.66668 2.66671 6.3682 2.66671 6.00001C2.66671 5.63182 2.96518 5.33334 3.33337 5.33334C3.70156 5.33334 4.00004 5.63182 4.00004 6.00001ZM6.00004 6.66668C6.36823 6.66668 6.66671 6.3682 6.66671 6.00001C6.66671 5.63182 6.36823 5.33334 6.00004 5.33334C5.63185 5.33334 5.33337 5.63182 5.33337 6.00001C5.33337 6.3682 5.63185 6.66668 6.00004 6.66668ZM9.33337 6.00001C9.33337 6.3682 9.0349 6.66668 8.66671 6.66668C8.29852 6.66668 8.00004 6.3682 8.00004 6.00001C8.00004 5.63182 8.29852 5.33334 8.66671 5.33334C9.0349 5.33334 9.33337 5.63182 9.33337 6.00001ZM10 8.00001C10.3682 8.00001 10.6667 7.70153 10.6667 7.33334C10.6667 6.96515 10.3682 6.66668 10 6.66668C9.63185 6.66668 9.33337 6.96515 9.33337 7.33334C9.33337 7.70153 9.63185 8.00001 10 8.00001ZM8.00004 7.33334C8.00004 7.70153 7.70156 8.00001 7.33337 8.00001C6.96518 8.00001 6.66671 7.70153 6.66671 7.33334C6.66671 6.96515 6.96518 6.66668 7.33337 6.66668C7.70156 6.66668 8.00004 6.96515 8.00004 7.33334ZM4.66671 8.00001C5.0349 8.00001 5.33337 7.70153 5.33337 7.33334C5.33337 6.96515 5.0349 6.66668 4.66671 6.66668C4.29852 6.66668 4.00004 6.96515 4.00004 7.33334C4.00004 7.70153 4.29852 8.00001 4.66671 8.00001ZM2.66671 7.33334C2.66671 7.70153 2.36823 8.00001 2.00004 8.00001C1.63185 8.00001 1.33337 7.70153 1.33337 7.33334C1.33337 6.96515 1.63185 6.66668 2.00004 6.66668C2.36823 6.66668 2.66671 6.96515 2.66671 7.33334Z" fill="url(#paint0_linear_258_206)"></path></g></g><defs><filter id="filter0_d_258_206" x="1.33337" y="1.33334" width="9.33337" height="7.66666" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="1"></feOffset><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_258_206"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_258_206" result="shape"></feBlend></filter><linearGradient id="paint0_linear_258_206" x1="1.33337" y1="1.33334" x2="1.33337" y2="8.00001" gradientUnits="userSpaceOnUse"><stop stop-color="white"></stop><stop offset="1" stop-color="#F0F0F0"></stop></linearGradient></defs></svg>'], _tmpl$3$4 = ["<svg", ' width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="20" rx="2" fill="white"></rect><mask id="mask0_258_255" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20"><rect width="28" height="20" rx="2" fill="white"></rect></mask><g mask="url(#mask0_258_255)"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.33333H28V0H0V5.33333Z" fill="#DD172C"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0 20H28V14.6667H0V20Z" fill="#DD172C"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0 14.6667H28V5.33334H0V14.6667Z" fill="#FFD133"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.33337 9.33333H8.66671V10H7.33337V9.33333Z" fill="#FFEDB1"></path><path d="M6.05898 9.36101C6.04278 9.16667 6.19615 8.99999 6.39116 8.99999H8.27543C8.47044 8.99999 8.6238 9.16666 8.60761 9.36101L8.43633 11.4164C8.39314 11.9347 7.95987 12.3333 7.43978 12.3333H7.2268C6.70671 12.3333 6.27345 11.9347 6.23026 11.4164L6.05898 9.36101Z" stroke="#A41517" stroke-width="0.666667"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6 10H8.66667V10.6667H8L7.33333 12L6.66667 10.6667H6V10Z" fill="#A41517"></path><rect x="4" y="8" width="1.33333" height="4.66667" rx="0.666667" fill="#A41517"></rect><rect x="9.33337" y="8" width="1.33333" height="4.66667" rx="0.666667" fill="#A41517"></rect><path d="M6 7.73332C6 7.14422 6.47756 6.66666 7.06667 6.66666H7.6C8.1891 6.66666 8.66667 7.14422 8.66667 7.73332C8.66667 7.8806 8.54728 7.99999 8.4 7.99999H6.26667C6.11939 7.99999 6 7.8806 6 7.73332Z" fill="#A41517"></path></g></svg>'], _tmpl$4$2 = ["<svg", ' width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.25" y="0.25" width="27.5" height="19.5" rx="1.75" fill="white" stroke="#F5F5F5" stroke-width="0.5"></rect><mask id="mask0_258_246" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20"><rect x="0.25" y="0.25" width="27.5" height="19.5" rx="1.75" fill="white" stroke="white" stroke-width="0.5"></rect></mask><g mask="url(#mask0_258_246)"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 20H28V9.33334H0V20Z" fill="#EB2A50"></path></g></svg>'], _tmpl$5$1 = ["<svg", ' width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.25" y="0.25" width="27.5" height="19.5" rx="1.75" fill="white" stroke="#F5F5F5" stroke-width="0.5"></rect><mask id="mask0_258_250" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20"><rect x="0.25" y="0.25" width="27.5" height="19.5" rx="1.75" fill="white" stroke="white" stroke-width="0.5"></rect></mask><g mask="url(#mask0_258_250)"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 13.3333H28V6.66666H0V13.3333Z" fill="#0C47B7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0 20H28V13.3333H0V20Z" fill="#E53B35"></path></g></svg>'], _tmpl$6$1 = ["<svg", ' width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="20" rx="2" fill="white"></rect><mask id="mask0_258_238" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20"><rect width="28" height="20" rx="2" fill="white"></rect></mask><g mask="url(#mask0_258_238)"><rect width="28" height="20" fill="#E92434"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M19.0209 10.7684L17.7961 12.2533L17.8795 10.3302L16.0887 9.62423L17.9435 9.1093L18.0615 7.18799L19.1244 8.79287L20.9882 8.31142L19.7903 9.81822L20.8241 11.442L19.0209 10.7684Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.4027 13.6841C16.3048 15.0935 14.5916 16 12.6666 16C9.35292 16 6.66663 13.3137 6.66663 10C6.66663 6.68629 9.35292 4 12.6666 4C14.5916 4 16.3048 4.90649 17.4027 6.31588C16.5555 5.70011 15.4903 5.33333 14.3333 5.33333C11.5719 5.33333 9.33329 7.42267 9.33329 10C9.33329 12.5773 11.5719 14.6667 14.3333 14.6667C15.4903 14.6667 16.5555 14.2999 17.4027 13.6841Z" fill="white"></path></g></svg>'];
function FlagUA() {
  return ssr(_tmpl$$g, ssrHydrationKey());
}
function FlagUS() {
  return ssr(_tmpl$2$7, ssrHydrationKey());
}
function FlagES() {
  return ssr(_tmpl$3$4, ssrHydrationKey());
}
function FlagPL() {
  return ssr(_tmpl$4$2, ssrHydrationKey());
}
function FlagRU() {
  return ssr(_tmpl$5$1, ssrHydrationKey());
}
function FlagTR() {
  return ssr(_tmpl$6$1, ssrHydrationKey());
}

const _tmpl$$f = ["<div", '><button type="button"', ' aria-label="open lang picker"><!--#-->', "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", '<!--/--></button><div class="', '"><a aria-label="choose Spanish" class="', '" href="', '">', '</a><a aria-label="choose Polish" class="', '" href="', '">', '</a><a aria-label="choose Russian" class="', '" href="', '">', '</a><a aria-label="choose Turkish" class="', '" href="', '">', '</a><a aria-label="choose Ukranian" class="', '" href="', '">', '</a><a aria-label="choose English" href="', '" class="', '">', "</a></div></div>"];
function LangPicker() {
  const [lang, setLang] = createSignal(ELangs.en);
  const [restPath, setrestPath] = createSignal("");
  const [isOpen, setIsOpen] = createSignal(false);
  createEffect(() => {
    const langPath = window.location.pathname.split("/");
    const restPath2 = window.location.pathname.split(langPath[1])[1];
    setLang("/" + langPath[1]);
    setrestPath(restPath2);
  });
  return ssr(_tmpl$$f, ssrHydrationKey() + ssrAttribute("class", escape$1(styles.langPicker, true), false), ssrAttribute("class", escape$1(styles.langPicker__button, true), false), lang().replace("/", "") === ELangs.es && escape$1(createComponent$1(FlagES, {})), lang().replace("/", "") === ELangs.pl && escape$1(createComponent$1(FlagPL, {})), lang().replace("/", "") === ELangs.ru && escape$1(createComponent$1(FlagRU, {})), lang().replace("/", "") === ELangs.tr && escape$1(createComponent$1(FlagTR, {})), lang().replace("/", "") === ELangs.ua && escape$1(createComponent$1(FlagUA, {})), lang().replace("/", "") === ELangs.en && escape$1(createComponent$1(FlagUS, {})), `${escape$1(styles.langPicker__picker, true) || ""} ${isOpen() ? escape$1(escape$1(styles.langPicker__picker_show, true), true) : ""}`, lang() === ELangs.es ? escape$1(styles.langPicker__pickerflag_active, true) : "", "/" + escape$1(ELangs.es, true) + escape$1(restPath(), true), escape$1(createComponent$1(FlagES, {})), lang() === ELangs.pl ? escape$1(styles.langPicker__pickerflag_active, true) : "", "/" + escape$1(ELangs.pl, true) + escape$1(restPath(), true), escape$1(createComponent$1(FlagPL, {})), lang() === ELangs.ru ? escape$1(styles.langPicker__pickerflag_active, true) : "", "/" + escape$1(ELangs.ru, true) + escape$1(restPath(), true), escape$1(createComponent$1(FlagRU, {})), lang() === ELangs.tr ? escape$1(styles.langPicker__pickerflag_active, true) : "", "/" + escape$1(ELangs.tr, true) + escape$1(restPath(), true), escape$1(createComponent$1(FlagTR, {})), lang() === ELangs.ua ? escape$1(styles.langPicker__pickerflag_active, true) : "", "/" + escape$1(ELangs.ua, true) + escape$1(restPath(), true), escape$1(createComponent$1(FlagUA, {})), "/" + escape$1(ELangs.en, true) + escape$1(restPath(), true), lang() === ELangs.en ? escape$1(styles.langPicker__pickerflag_active, true) : "", escape$1(createComponent$1(FlagUS, {})));
}

var $$module2$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	LangPicker: LangPicker
}, Symbol.toStringTag, { value: 'Module' }));

var $$module8$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

var $$module8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$O = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/layouts/Header.astro", { modules: [{ module: $$module1$4, specifier: "../components/Logo.astro", assert: {} }, { module: $$module2$7, specifier: "../components/solid/LangPicker", assert: {} }, { module: $$module4$2, specifier: "../enums/ELangs", assert: {} }, { module: $$module8$1, specifier: "../models/ContentModel", assert: {} }, { module: $$module8, specifier: "../models/ServicesModel", assert: {} }, { module: $$module5$3, specifier: "./Container.astro", assert: {} }], hydratedComponents: [LangPicker], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [{ type: "inline", value: `
  const burgerEl = document.querySelector(".burger");
  const menuEl = document.querySelector(".js-h-menu");
  const closeBtnEl = document.querySelector(".js-close")
  function handleClick() {
    menuEl.classList.toggle("header__menu_active");
  }
  burgerEl.addEventListener("click", handleClick)
  closeBtnEl.addEventListener("click", handleClick)
` }] });
const $$Astro$O = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/layouts/Header.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$O, $$props, $$slots);
  Astro2.self = $$Header;
  const { lang } = Astro2.props;
  const unsortServices = lang === ELangs.es ? await Astro2.glob(
    { "/public/assets/content/es/services/architecture.md": () => import('./chunks/chunk.ccbb07d8.mjs'), "/public/assets/content/es/services/automation.md": () => import('./chunks/chunk.938b4c4d.mjs'), "/public/assets/content/es/services/blockchain.md": () => import('./chunks/chunk.5f73559c.mjs'), "/public/assets/content/es/services/strategy.md": () => import('./chunks/chunk.9d579503.mjs'), "/public/assets/content/es/services/wallets.md": () => import('./chunks/chunk.000bd02f.mjs'),},
    () => "/public/assets/content/es/services/*.md"
  ) : lang === ELangs.pl ? await Astro2.glob(
    { "/public/assets/content/pl/services/architecture.md": () => import('./chunks/chunk.2186ae96.mjs'), "/public/assets/content/pl/services/automation.md": () => import('./chunks/chunk.b391d7bf.mjs'), "/public/assets/content/pl/services/blockchain.md": () => import('./chunks/chunk.f9b7a791.mjs'), "/public/assets/content/pl/services/strategy.md": () => import('./chunks/chunk.64fc4e6e.mjs'), "/public/assets/content/pl/services/wallets.md": () => import('./chunks/chunk.e49a8342.mjs'),},
    () => "/public/assets/content/pl/services/*.md"
  ) : lang === ELangs.ru ? await Astro2.glob(
    { "/public/assets/content/ru/services/architecture.md": () => import('./chunks/chunk.a7a267b0.mjs'), "/public/assets/content/ru/services/automation.md": () => import('./chunks/chunk.70e6007d.mjs'), "/public/assets/content/ru/services/blockchain.md": () => import('./chunks/chunk.2f9977d7.mjs'), "/public/assets/content/ru/services/strategy.md": () => import('./chunks/chunk.513b3675.mjs'), "/public/assets/content/ru/services/wallets.md": () => import('./chunks/chunk.a237989c.mjs'),},
    () => "/public/assets/content/ru/services/*.md"
  ) : lang === ELangs.tr ? await Astro2.glob(
    { "/public/assets/content/tr/services/architecture.md": () => import('./chunks/chunk.91c8893a.mjs'), "/public/assets/content/tr/services/automation.md": () => import('./chunks/chunk.acb3f924.mjs'), "/public/assets/content/tr/services/blockchain.md": () => import('./chunks/chunk.f1a695b8.mjs'), "/public/assets/content/tr/services/strategy.md": () => import('./chunks/chunk.520832bb.mjs'), "/public/assets/content/tr/services/wallets.md": () => import('./chunks/chunk.8508d622.mjs'),},
    () => "/public/assets/content/tr/services/*.md"
  ) : lang === ELangs.ua ? await Astro2.glob(
    { "/public/assets/content/ua/services/architecture.md": () => import('./chunks/chunk.0b834678.mjs'), "/public/assets/content/ua/services/automation.md": () => import('./chunks/chunk.dd708ad7.mjs'), "/public/assets/content/ua/services/blockchain.md": () => import('./chunks/chunk.28640239.mjs'), "/public/assets/content/ua/services/strategy.md": () => import('./chunks/chunk.6668f04f.mjs'), "/public/assets/content/ua/services/wallets.md": () => import('./chunks/chunk.e2320abe.mjs'),},
    () => "/public/assets/content/ua/services/*.md"
  ) : await Astro2.glob(
    { "/public/assets/content/en/services/architecture.md": () => import('./chunks/chunk.93527cb3.mjs'), "/public/assets/content/en/services/automation.md": () => import('./chunks/chunk.59824c95.mjs'), "/public/assets/content/en/services/blockchain.md": () => import('./chunks/chunk.7c3d0c0b.mjs'), "/public/assets/content/en/services/strategy.md": () => import('./chunks/chunk.33bb18a9.mjs'), "/public/assets/content/en/services/wallets.md": () => import('./chunks/chunk.ee134a3e.mjs'),},
    () => "/public/assets/content/en/services/*.md"
  );
  const [content] = lang === ELangs.es ? await Astro2.glob(
    { "/public/assets/content/es/content.md": () => import('./chunks/chunk.4896bd4a.mjs'),},
    () => "/public/assets/content/es/*.md"
  ) : lang === ELangs.pl ? await Astro2.glob(
    { "/public/assets/content/pl/content.md": () => import('./chunks/chunk.832d7e87.mjs'),},
    () => "/public/assets/content/pl/*.md"
  ) : lang === ELangs.ru ? await Astro2.glob(
    { "/public/assets/content/ru/content.md": () => import('./chunks/chunk.a999f7dd.mjs'),},
    () => "/public/assets/content/ru/*.md"
  ) : lang === ELangs.tr ? await Astro2.glob(
    { "/public/assets/content/tr/content.md": () => import('./chunks/chunk.70ae4c85.mjs'),},
    () => "/public/assets/content/tr/*.md"
  ) : lang === ELangs.ua ? await Astro2.glob(
    { "/public/assets/content/ua/content.md": () => import('./chunks/chunk.164f6447.mjs'),},
    () => "/public/assets/content/ua/*.md"
  ) : await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const services = unsortServices.sort((a, b) => a.frontmatter.id - b.frontmatter.id);
  const navLink = Astro2.canonicalURL?.pathname.split("/")[2];
  Astro2.canonicalURL?.origin;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<header class="header js-header astro-O2IIFYM7">
  ${renderComponent($$result, "Container", $$Container, { "class": "astro-O2IIFYM7" }, { "default": () => render`<div class="header__wrp astro-O2IIFYM7">
      ${renderComponent($$result, "Logo", $$Logo, { "langHref": lang, "class": "astro-O2IIFYM7" })}
      <div class="header__menu js-h-menu astro-O2IIFYM7">
        <button type="button" class="header__menu-close-btn js-close astro-O2IIFYM7" aria-label="close menu"></button>
        <nav class="header__nav nav astro-O2IIFYM7">
          <ul class="nav__list astro-O2IIFYM7">
            <li${addAttribute(`nav__list-item ${navLink === "about" ? "nav__list-item_active" : ""} astro-O2IIFYM7`, "class")}>
              <a${addAttribute(`/${lang}/about`, "href")} class="nav__link astro-O2IIFYM7">${content.frontmatter.nav.about}</a>
            </li>
            <li${addAttribute(`nav__list-item ${navLink === "work" ? "nav__list-item_active" : ""} astro-O2IIFYM7`, "class")}>
              <a${addAttribute(`/${lang}/work`, "href")} class="nav__link astro-O2IIFYM7">${content.frontmatter.nav.work}</a>
            </li>
            <li${addAttribute(`nav__list-item nav__list-item_services ${navLink === "services" ? "nav__list-item_active" : ""} astro-O2IIFYM7`, "class")}${addAttribute(0, "tabindex")}>
              <a${addAttribute(`/${lang}/#services`, "href")} class="nav__link astro-O2IIFYM7"${addAttribute(-1, "tabindex")}>${content.frontmatter.nav.services}</a>
              <ul class="nav__submenu submenu astro-O2IIFYM7">
                ${services.map((i) => render`<li class="submenu__item astro-O2IIFYM7">
                  <a${addAttribute(`/${lang}/services/${i.frontmatter.slug}`, "href")} class="submenu__link astro-O2IIFYM7">${i.frontmatter.title}</a>
                </li>`)}
              </ul>
            </li>
          </ul>
        </nav>
        ${renderComponent($$result, "LangPicker", LangPicker, { "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$O.getPath(LangPicker), "client:component-export": $$metadata$O.getExport(LangPicker), "class": "astro-O2IIFYM7" })}
        <a href="/#callback-form" class="header__btn astro-O2IIFYM7" type="button">${content.frontmatter.nav.btn}</a>
      </div>

      <button class="header__burger burger js-burger astro-O2IIFYM7" aria-label="open nav menu">
      </button>
    </div>` })}
</header>


`;
});

const $$file$O = "C:/work-projects/pireactor/main-site/client/src/layouts/Header.astro";
const $$url$O = undefined;

var $$module5$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$O,
	'default': $$Header,
	file: $$file$O,
	url: $$url$O
}, Symbol.toStringTag, { value: 'Module' }));

var ETags = /* @__PURE__ */ ((ETags2) => {
  ETags2[ETags2["all"] = 0] = "all";
  ETags2["automation"] = "Automation";
  ETags2["blockchain"] = "Blockchain";
  ETags2["srategy"] = "Global Strategy";
  ETags2["wallets"] = "Wallets and Exchanges";
  ETags2["architecture"] = "Architecture";
  return ETags2;
})(ETags || {});

var $$module2$6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ETags: ETags
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$N = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/layouts/Layout.astro", { modules: [{ module: $$module4$2, specifier: "../enums/ELangs", assert: {} }, { module: $$module2$6, specifier: "../enums/ETags", assert: {} }, { module: $$module8$1, specifier: "../models/ContentModel", assert: {} }, { module: $$module4$1, specifier: "./Footer.astro", assert: {} }, { module: $$module5$2, specifier: "./Header.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$N = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/layouts/Layout.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$N, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, lang } = Astro2.props;
  const [content] = lang === ELangs.es ? await Astro2.glob(
    { "/public/assets/content/es/content.md": () => import('./chunks/chunk.4896bd4a.mjs'),},
    () => "/public/assets/content/es/*.md"
  ) : lang === ELangs.pl ? await Astro2.glob(
    { "/public/assets/content/pl/content.md": () => import('./chunks/chunk.832d7e87.mjs'),},
    () => "/public/assets/content/pl/*.md"
  ) : lang === ELangs.ru ? await Astro2.glob(
    { "/public/assets/content/ru/content.md": () => import('./chunks/chunk.a999f7dd.mjs'),},
    () => "/public/assets/content/ru/*.md"
  ) : lang === ELangs.tr ? await Astro2.glob(
    { "/public/assets/content/tr/content.md": () => import('./chunks/chunk.70ae4c85.mjs'),},
    () => "/public/assets/content/tr/*.md"
  ) : lang === ELangs.ua ? await Astro2.glob(
    { "/public/assets/content/ua/content.md": () => import('./chunks/chunk.164f6447.mjs'),},
    () => "/public/assets/content/ua/*.md"
  ) : await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<!DOCTYPE html><html${addAttribute(content.frontmatter.lang, "lang")} class="astro-Y5DKIR4G">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <meta name="description"${addAttribute(content.frontmatter.description, "content")}>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="preload" href="/assets/fonts/AvantGardeCTT/AvantGardeCTT-Bold.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/AvantGardeCTT/AvantGardeCTT-Bold.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/PlusJakartaSans/PlusJakartaSans-Bold.woff2" as="font" type="font/woff2" crossorigin>
  <title>${title}</title>

<!--astro:head--></head>
<body>
  ${renderComponent($$result, "Header", $$Header, { "lang": lang, "class": "astro-Y5DKIR4G" })}
  <main class="astro-Y5DKIR4G">
    ${renderSlot($$result, $$slots["default"])}
  </main>
  ${renderComponent($$result, "Footer", $$Footer, { "class": "astro-Y5DKIR4G" })}
</body></html>`;
});

const $$file$N = "C:/work-projects/pireactor/main-site/client/src/layouts/Layout.astro";
const $$url$N = undefined;

var $$module6$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$N,
	'default': $$Layout,
	file: $$file$N,
	url: $$url$N
}, Symbol.toStringTag, { value: 'Module' }));

var $$module1$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$M = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/MainTitle.astro", { modules: [{ module: $$module1$3, specifier: "astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$M = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/MainTitle.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$MainTitle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$M, $$props, $$slots);
  Astro2.self = $$MainTitle;
  const { redLine, title } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<h1 class="astro-OAQUZD2W">
  <span class="redline astro-OAQUZD2W">${redLine}</span>
  <span class="title astro-OAQUZD2W">${title}</span>
</h1>`;
});

const $$file$M = "C:/work-projects/pireactor/main-site/client/src/components/MainTitle.astro";
const $$url$M = undefined;

var $$module1$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$M,
	'default': $$MainTitle,
	file: $$file$M,
	url: $$url$M
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$L = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/Button.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$L = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/Button.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$L, $$props, $$slots);
  Astro2.self = $$Button;
  const { title, path } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<a${addAttribute(path, "href")} class="astro-MRLPDWE2">${title}</a>`;
});

const $$file$L = "C:/work-projects/pireactor/main-site/client/src/components/shared/Button.astro";
const $$url$L = undefined;

var $$module2$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$L,
	'default': $$Button,
	file: $$file$L,
	url: $$url$L
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$K = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/Hero.astro", { modules: [{ module: $$module1$2, specifier: "../MainTitle.astro", assert: {} }, { module: $$module2$5, specifier: "../shared/Button.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$K = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/Hero.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$K, $$props, $$slots);
  Astro2.self = $$Hero;
  const { redLine, title, path, btnText } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<section class="hero astro-SKTS2BG5">
  ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": redLine, "title": title, "class": "astro-SKTS2BG5" })}
  <div class="btn-wrp astro-SKTS2BG5">
    ${renderComponent($$result, "Button", $$Button, { "title": btnText, "path": path, "class": "astro-SKTS2BG5" })}
  </div>
</section>`;
});

const $$file$K = "C:/work-projects/pireactor/main-site/client/src/components/main/Hero.astro";
const $$url$K = undefined;

var $$module2$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$K,
	'default': $$Hero,
	file: $$file$K,
	url: $$url$K
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$e = ["<div", "><span", ">", "</span><span", "><!--#-->", "<!--/--><!--#-->", "<!--/--></span></div>"];
function Counter$1(props) {
  let elem;
  const [number, setNumber] = createSignal(0);
  const step = props.countTo > 1e3 ? 100 : props.countTo > 100 ? 10 : 1;
  function start() {
    const int = setInterval(() => {
      if (number() < props.countTo) {
        setNumber(number() + step);
      } else
        clearInterval(int);
    }, 50);
  }
  onMount(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > elem.getBoundingClientRect().y) {
        start();
      } else
        setNumber(0);
    });
  });
  return ssr(_tmpl$$e, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$1.counter, true), false), ssrAttribute("class", escape$1(styles$1.counter__title, true), false), escape$1(props.title), ssrAttribute("class", escape$1(styles$1.counter__count, true), false), props.format && escape$1(props.format) + " ", escape$1(number()));
}

var $$module3$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Counter: Counter$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$J = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/About.astro", { modules: [{ module: $$module3$3, specifier: "../solid/Counter", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$J = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/About.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$About$6 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$J, $$props, $$slots);
  Astro2.self = $$About$6;
  const { desc, counters, title } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<section class="about astro-YLWAF5LM">
  <h2 class="about__title astro-YLWAF5LM"${addAttribute(title, "aria-label")}></h2>
  <p class="about__desc astro-YLWAF5LM">
    ${desc}
  </p>
  <div class="about__numbers astro-YLWAF5LM">
    ${counters.map((el) => render`${renderComponent($$result, "Counter", Counter$1, { "title": el.title, "countTo": el.value, "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$J.getPath(Counter$1), "client:component-export": $$metadata$J.getExport(Counter$1), "class": "astro-YLWAF5LM" })}`)}
  </div>
</section>`;
});

const $$file$J = "C:/work-projects/pireactor/main-site/client/src/components/main/About.astro";
const $$url$J = undefined;

var $$module3$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$J,
	'default': $$About$6,
	file: $$file$J,
	url: $$url$J
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$I = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/Section.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$I = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/Section.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Section = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$I, $$props, $$slots);
  Astro2.self = $$Section;
  const { title } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<section class="astro-Y4SDXZ7Z">
  <h2 class="astro-Y4SDXZ7Z">${title}</h2>
  ${renderSlot($$result, $$slots["default"])}
</section>`;
});

const $$file$I = "C:/work-projects/pireactor/main-site/client/src/components/shared/Section.astro";
const $$url$I = undefined;

var $$module2$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$I,
	'default': $$Section,
	file: $$file$I,
	url: $$url$I
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$H = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/Map.astro", { modules: [{ module: $$module2$3, specifier: "../shared/Section.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$H = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/Map.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Map = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$H, $$props, $$slots);
  Astro2.self = $$Map;
  const { title } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Section", $$Section, { "title": title, "class": "astro-6IJS25CO" }, { "default": () => render`<img src="/assets/img/main/map.webp" alt="" srcset="/assets/img/main/map.webp" class="astro-6IJS25CO">` })}`;
});

const $$file$H = "C:/work-projects/pireactor/main-site/client/src/components/main/Map.astro";
const $$url$H = undefined;

var $$module4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$H,
	'default': $$Map,
	file: $$file$H,
	url: $$url$H
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$G = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/How.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$G = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/How.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$How = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$G, $$props, $$slots);
  Astro2.self = $$How;
  const { content } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<section class="how-it-goes astro-M6GSX77H">
  <h2 class="astro-M6GSX77H">${content.title}</h2>
  <ul class="how-it-goes__list astro-M6GSX77H">
    ${content.list.map((i) => render`<li${addAttribute(`how-it-goes__item how-it-goes__item_${i.class.toLowerCase()} astro-M6GSX77H`, "class")}>
        <h3 class="how-it-goes__title astro-M6GSX77H">${i.title}</h3>
        <p class="how-it-goes__desc astro-M6GSX77H">
          ${i.desc}
        </p>
      </li>`)}
  </ul>
</section>`;
});

const $$file$G = "C:/work-projects/pireactor/main-site/client/src/components/main/How.astro";
const $$url$G = undefined;

var $$module5$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$G,
	'default': $$How,
	file: $$file$G,
	url: $$url$G
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$F = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/Services.astro", { modules: [{ module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module8, specifier: "../../models/ServicesModel", assert: {} }, { module: $$module2$3, specifier: "../shared/Section.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$F = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/Services.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Services = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$F, $$props, $$slots);
  Astro2.self = $$Services;
  const { title, lang } = Astro2.props;
  const unsortServices = lang === ELangs.es ? await Astro2.glob(
    { "/public/assets/content/es/services/architecture.md": () => import('./chunks/chunk.ccbb07d8.mjs'), "/public/assets/content/es/services/automation.md": () => import('./chunks/chunk.938b4c4d.mjs'), "/public/assets/content/es/services/blockchain.md": () => import('./chunks/chunk.5f73559c.mjs'), "/public/assets/content/es/services/strategy.md": () => import('./chunks/chunk.9d579503.mjs'), "/public/assets/content/es/services/wallets.md": () => import('./chunks/chunk.000bd02f.mjs'),},
    () => "/public/assets/content/es/services/*.md"
  ) : lang === ELangs.pl ? await Astro2.glob(
    { "/public/assets/content/pl/services/architecture.md": () => import('./chunks/chunk.2186ae96.mjs'), "/public/assets/content/pl/services/automation.md": () => import('./chunks/chunk.b391d7bf.mjs'), "/public/assets/content/pl/services/blockchain.md": () => import('./chunks/chunk.f9b7a791.mjs'), "/public/assets/content/pl/services/strategy.md": () => import('./chunks/chunk.64fc4e6e.mjs'), "/public/assets/content/pl/services/wallets.md": () => import('./chunks/chunk.e49a8342.mjs'),},
    () => "/public/assets/content/pl/services/*.md"
  ) : lang === ELangs.ru ? await Astro2.glob(
    { "/public/assets/content/ru/services/architecture.md": () => import('./chunks/chunk.a7a267b0.mjs'), "/public/assets/content/ru/services/automation.md": () => import('./chunks/chunk.70e6007d.mjs'), "/public/assets/content/ru/services/blockchain.md": () => import('./chunks/chunk.2f9977d7.mjs'), "/public/assets/content/ru/services/strategy.md": () => import('./chunks/chunk.513b3675.mjs'), "/public/assets/content/ru/services/wallets.md": () => import('./chunks/chunk.a237989c.mjs'),},
    () => "/public/assets/content/ru/services/*.md"
  ) : lang === ELangs.tr ? await Astro2.glob(
    { "/public/assets/content/tr/services/architecture.md": () => import('./chunks/chunk.91c8893a.mjs'), "/public/assets/content/tr/services/automation.md": () => import('./chunks/chunk.acb3f924.mjs'), "/public/assets/content/tr/services/blockchain.md": () => import('./chunks/chunk.f1a695b8.mjs'), "/public/assets/content/tr/services/strategy.md": () => import('./chunks/chunk.520832bb.mjs'), "/public/assets/content/tr/services/wallets.md": () => import('./chunks/chunk.8508d622.mjs'),},
    () => "/public/assets/content/tr/services/*.md"
  ) : lang === ELangs.ua ? await Astro2.glob(
    { "/public/assets/content/ua/services/architecture.md": () => import('./chunks/chunk.0b834678.mjs'), "/public/assets/content/ua/services/automation.md": () => import('./chunks/chunk.dd708ad7.mjs'), "/public/assets/content/ua/services/blockchain.md": () => import('./chunks/chunk.28640239.mjs'), "/public/assets/content/ua/services/strategy.md": () => import('./chunks/chunk.6668f04f.mjs'), "/public/assets/content/ua/services/wallets.md": () => import('./chunks/chunk.e2320abe.mjs'),},
    () => "/public/assets/content/ua/services/*.md"
  ) : await Astro2.glob(
    { "/public/assets/content/en/services/architecture.md": () => import('./chunks/chunk.93527cb3.mjs'), "/public/assets/content/en/services/automation.md": () => import('./chunks/chunk.59824c95.mjs'), "/public/assets/content/en/services/blockchain.md": () => import('./chunks/chunk.7c3d0c0b.mjs'), "/public/assets/content/en/services/strategy.md": () => import('./chunks/chunk.33bb18a9.mjs'), "/public/assets/content/en/services/wallets.md": () => import('./chunks/chunk.ee134a3e.mjs'),},
    () => "/public/assets/content/en/services/*.md"
  );
  const services = unsortServices.sort((a, b) => a.frontmatter.id - b.frontmatter.id);
  function setClass(id) {
    switch (id) {
      case 1:
        return "services__item_strategy";
      case 2:
        return "services__item_architecture";
      case 3:
        return "services__item_automation";
      case 4:
        return "services__item_blockchain";
      case 5:
        return "services__item_wallets";
      default:
        return "";
    }
  }
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Section", $$Section, { "title": title, "class": "astro-SFQ3TLW7" }, { "default": () => render`<div class="services__wrp astro-SFQ3TLW7">
    <ul class="services__list astro-SFQ3TLW7">
      ${services.map((i) => render`<li${addAttribute(`services__item ${setClass(i.frontmatter.id)} astro-SFQ3TLW7`, "class")}>
        <a${addAttribute(`/services/${i.frontmatter.slug}`, "href")} class="astro-SFQ3TLW7">
          <h3 class="services__title astro-SFQ3TLW7">${i.frontmatter.title}</h3>
        </a>
        <p class="services__desc astro-SFQ3TLW7">${i.frontmatter.desc}</p>
      </li>`)}
    </ul>
  </div>` })}`;
});

const $$file$F = "C:/work-projects/pireactor/main-site/client/src/components/main/Services.astro";
const $$url$F = undefined;

var $$module6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$F,
	'default': $$Services,
	file: $$file$F,
	url: $$url$F
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$E = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/Technologies.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$E = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/main/Technologies.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Technologies = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$E, $$props, $$slots);
  Astro2.self = $$Technologies;
  const { title, desc } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<section class="astro-VBTKETK4">
  <h2 class="title astro-VBTKETK4">${title}</h2>
  <p class="subtitle astro-VBTKETK4">${desc}</p>
  <ul class="techs__list astro-VBTKETK4">
    <li class="techs__item techs__item_frontend astro-VBTKETK4">
      <h3 class="techs__title astro-VBTKETK4">Front end</h3>
      <p class="techs__desc astro-VBTKETK4">Typescript, GraphQL, Flutter, React, Angular</p>
    </li>
    <li class="techs__item techs__item_backend astro-VBTKETK4">
      <h3 class="techs__title astro-VBTKETK4">Backend</h3>
      <p class="techs__desc astro-VBTKETK4">Go, Rust, C</p>
    </li>
    <li class="techs__item techs__item_design astro-VBTKETK4">
      <h3 class="techs__title astro-VBTKETK4">UX/UI Design</h3>
      <p class="techs__desc astro-VBTKETK4">Figma, Adobe Ilustrator</p>
    </li>
    <li class="techs__item techs__item_data astro-VBTKETK4">
      <h3 class="techs__title astro-VBTKETK4">Databses</h3>
      <p class="techs__desc astro-VBTKETK4">PostgreSQL, MarkLogic, MongoDB, Reddis</p>
    </li>
    <li class="techs__item techs__item_ml astro-VBTKETK4">
      <h3 class="techs__title astro-VBTKETK4">ML and Big Data</h3>
      <p class="techs__desc astro-VBTKETK4">TensorFlow, PyTorch</p>
    </li>
    <li class="techs__item techs__item_cloud astro-VBTKETK4">
      <h3 class="techs__title astro-VBTKETK4">Cloud + Containers</h3>
      <p class="techs__desc astro-VBTKETK4">AWS, Docker, Kubernetes</p>
    </li>
  </ul>
</section>`;
});

const $$file$E = "C:/work-projects/pireactor/main-site/client/src/components/main/Technologies.astro";
const $$url$E = undefined;

var $$module7$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$E,
	'default': $$Technologies,
	file: $$file$E,
	url: $$url$E
}, Symbol.toStringTag, { value: 'Module' }));

const [store, setStore] = createStore({
  validation: {
    name: {
      touched: false,
      errMsg: "This field is required"
    },
    email: {
      touched: false,
      errMsg: "This field is required"
    }
  },
  frameworks: [
    {
      name: "Vue.js",
      value: 0,
      tooltip: ""
    },
    {
      name: "Angular",
      value: 0,
      tooltip: ""
    },
    {
      name: "React.js",
      value: 0,
      tooltip: ""
    },
    {
      name: "JavaScript",
      value: 0,
      tooltip: ""
    }
  ],
  langs: [
    {
      name: ".NET",
      value: 0,
      tooltip: ""
    },
    {
      name: "Java",
      value: 0,
      tooltip: ""
    },
    {
      name: "Python",
      value: 0,
      tooltip: ""
    },
    {
      name: "Scala",
      value: 0,
      tooltip: ""
    },
    {
      name: "Ruby",
      value: 0,
      tooltip: ""
    },
    {
      name: "C++",
      value: 0,
      tooltip: ""
    },
    {
      name: "Node.js",
      value: 0,
      tooltip: ""
    },
    {
      name: "Golang",
      value: 0,
      tooltip: ""
    },
    {
      name: "PHP",
      value: 0,
      tooltip: ""
    }
  ],
  mobiles: [
    {
      name: "Android",
      value: 0,
      tooltip: ""
    },
    {
      name: "React Native",
      value: 0,
      tooltip: ""
    },
    {
      name: "iOS",
      value: 0,
      tooltip: ""
    },
    {
      name: "Xamarin",
      value: 0,
      tooltip: ""
    },
    {
      name: "Ionic",
      value: 0,
      tooltip: ""
    },
    {
      name: "Flutter",
      value: 0,
      tooltip: ""
    }
  ],
  db: [
    {
      name: "PostgreSQL",
      value: 0,
      tooltip: ""
    },
    {
      name: "MySQL",
      value: 0,
      tooltip: ""
    },
    {
      name: "Oracle",
      value: 0,
      tooltip: ""
    },
    {
      name: "MS Azure SQL DB",
      value: 0,
      tooltip: ""
    },
    {
      name: "MsSQL",
      value: 0,
      tooltip: ""
    },
    {
      name: "NoSQL",
      value: 0,
      tooltip: ""
    }
  ],
  specs: [
    {
      name: "Project Manager",
      value: 0
    },
    {
      name: "UI/UX Designer",
      value: 0
    },
    {
      name: "Business Analyst",
      value: 0
    },
    {
      name: "DevOps Specialist",
      value: 0
    },
    {
      name: "QA/QA Automation Engineer",
      value: 0
    },
    {
      name: "Support Specialist",
      value: 0
    },
    {
      name: "IT Security Specialist",
      value: 0
    },
    {
      name: "Solution Architects",
      value: 0
    }
  ]
});

const _tmpl$$d = ["<div", "><label", "><!--#-->", '<!--/--><input name="Email" class="', '" type="email"></label><!--#-->', "<!--/--></div>"], _tmpl$2$6 = ["<span", ">", "</span>"];
function EmailInput(props) {
  const [isError, setIsError] = createSignal(false);
  createEffect(() => {
    if (store.validation.email.errMsg && store.validation.email.touched) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  });
  return ssr(_tmpl$$d, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$2.input__wrp, true), false), ssrAttribute("class", escape$1(styles$2.label, true), false), escape$1(props.name) ?? "Email", `${escape$1(styles$2.input, true) || ""} ${isError() ? escape$1(escape$1(styles$2.error, true), true) : ""}`, isError() && escape$1(ssr(_tmpl$2$6, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$2.errMsg, true), false), escape$1(store.validation.email.errMsg))));
}

const _tmpl$$c = ["<div", "><label", "><!--#-->", '<!--/--><input name="Name" class="', '" type="text"></label><!--#-->', "<!--/--></div>"], _tmpl$2$5 = ["<span", ">", "</span>"];
function NameInput(props) {
  const [isError, setIsError] = createSignal(false);
  createEffect(() => {
    if (store.validation.name.errMsg && store.validation.name.touched) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  });
  return ssr(_tmpl$$c, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$3.input__wrp, true), false), ssrAttribute("class", escape$1(styles$3.label, true), false), escape$1(props.name) ?? "Name", `${escape$1(styles$3.input, true) || ""} ${isError() ? escape$1(escape$1(styles$3.error, true), true) : ""}`, isError() && escape$1(ssr(_tmpl$2$5, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$3.errMsg, true), false), escape$1(store.validation.name.errMsg))));
}

const _tmpl$$b = ["<label", "><!--#-->", "<!--/--><textarea", ' placeholder="Describe your project" rows="10"></textarea></label>'];
function Textarea(props) {
  return ssr(_tmpl$$b, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$4.label, true), false), escape$1(props.label), ssrAttribute("class", escape$1(styles$4.input, true), false));
}

const _tmpl$$a = ["<label", "><!--#-->", "<!--/--><input", ' type="text"></label>'];
function TextInput(props) {
  return ssr(_tmpl$$a, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$5.label, true), false), escape$1(props.label), ssrAttribute("name", escape$1(props.label, true), false) + ssrAttribute("class", escape$1(styles$5.input, true), false));
}

const _tmpl$$9 = ["<form", "><div", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></div><!--#-->", "<!--/--><input", ' name="form-link" type="text"', "><button", "><!--#-->", "<!--/--><!--#-->", "<!--/--></button><!--#-->", "<!--/--><!--#-->", "<!--/--></form>"], _tmpl$2$4 = ["<div", ">", "</div>"];
function FormSubmit(props) {
  const [location, setLocation] = createSignal({});
  const [isLoading, setIsLoading] = createSignal(false);
  const [isFormSended, setIsFormSended] = createSignal(false);
  const [err, setErr] = createSignal("");
  createEffect(() => {
    setLocation(window.location.origin);
  });
  return ssr(_tmpl$$9, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$6.form, true), false), ssrAttribute("class", escape$1(styles$6.form__wrp, true), false), escape$1(createComponent$1(NameInput, {
    get name() {
      return props.fields.name;
    }
  })), escape$1(createComponent$1(EmailInput, {
    get name() {
      return props.fields.email;
    }
  })), escape$1(createComponent$1(TextInput, {
    get label() {
      return props.fields.phone;
    }
  })), escape$1(createComponent$1(TextInput, {
    get label() {
      return props.fields.subj;
    }
  })), escape$1(createComponent$1(Textarea, {
    get label() {
      return props.fields.textArea;
    }
  })), ssrAttribute("tabindex", -1, false) + ssrAttribute("class", escape$1(styles$6.hiddenInput, true), false), ssrAttribute("value", escape$1(location().toString(), true), false), ssrAttribute("class", escape$1(styles$6.form__SubmitBtn, true), false), !isLoading() && escape$1(props.fields.btnText), isLoading() && escape$1(props.fields.loading), isFormSended() && escape$1(ssr(_tmpl$2$4, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$6.success, true), false), escape$1(props.fields.sucMsg))), err() && escape$1(ssr(_tmpl$2$4, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$6.error, true), false), escape$1(props.fields.fetchErr))));
}

var $$module1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	FormSubmit: FormSubmit
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$D = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/FormSection.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$D = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/FormSection.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$FormSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$D, $$props, $$slots);
  Astro2.self = $$FormSection;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<section class="form__wrp astro-ZVU2EJ5F">
  ${renderSlot($$result, $$slots["default"])}
</section>`;
});

const $$file$D = "C:/work-projects/pireactor/main-site/client/src/components/shared/FormSection.astro";
const $$url$D = undefined;

var $$module2$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$D,
	'default': $$FormSection,
	file: $$file$D,
	url: $$url$D
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$C = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/CallbackForm.astro", { modules: [{ module: $$module1$1, specifier: "../solid/FormSubmit", assert: {} }, { module: $$module2$2, specifier: "./FormSection.astro", assert: {} }], hydratedComponents: [FormSubmit], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$C = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/CallbackForm.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$CallbackForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$C, $$props, $$slots);
  Astro2.self = $$CallbackForm;
  const props = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<div class="container_mvp astro-4XMJONMF">
  ${renderComponent($$result, "FormSection", $$FormSection, { "class": "astro-4XMJONMF" }, { "default": () => render`<div class="mvp astro-4XMJONMF">
      <h2 class="title astro-4XMJONMF">${props.title}</h2>
      <p class="subtitle astro-4XMJONMF">${props.desc}</p>
          ${renderComponent($$result, "FormSubmit", FormSubmit, { "client:load": true, "fields": props.fields, "client:component-hydration": "load", "client:component-path": $$metadata$C.getPath(FormSubmit), "client:component-export": $$metadata$C.getExport(FormSubmit), "class": "astro-4XMJONMF" })}
      </div>` })}
</div>`;
});

const $$file$C = "C:/work-projects/pireactor/main-site/client/src/components/shared/CallbackForm.astro";
const $$url$C = undefined;

var $$module1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$C,
	'default': $$CallbackForm,
	file: $$file$C,
	url: $$url$C
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$B = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/index.astro", { modules: [{ module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module2$4, specifier: "../../components/main/Hero.astro", assert: {} }, { module: $$module3$2, specifier: "../../components/main/About.astro", assert: {} }, { module: $$module4, specifier: "../../components/main/Map.astro", assert: {} }, { module: $$module5$1, specifier: "../../components/main/How.astro", assert: {} }, { module: $$module6, specifier: "../../components/main/Services.astro", assert: {} }, { module: $$module7$1, specifier: "../../components/main/Technologies.astro", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module1, specifier: "../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$B = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/index.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Index$5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$B, $$props, $$slots);
  Astro2.self = $$Index$5;
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": content.frontmatter.title, "lang": ELangs.en, "class": "astro-REHVHBA2" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-REHVHBA2" }, { "default": () => render`${renderComponent($$result, "Hero", $$Hero, { "redLine": content.frontmatter?.index.hero.redline, "title": content.frontmatter.index.hero.title, "path": "#callback-form", "btnText": content.frontmatter.index.hero.btnText, "class": "astro-REHVHBA2" })}${renderComponent($$result, "About", $$About$6, { "counters": content.frontmatter.counters, "desc": content.frontmatter.index.desc, "title": "About", "class": "astro-REHVHBA2" })}${renderComponent($$result, "Map", $$Map, { "title": content.frontmatter.index.mapTitle, "class": "astro-REHVHBA2" })}` })}${renderComponent($$result, "How", $$How, { "content": content.frontmatter.howSection, "class": "astro-REHVHBA2" })}${renderComponent($$result, "Container", $$Container, { "class": "astro-REHVHBA2" }, { "default": () => render`<div class="services-wrp astro-REHVHBA2" id="services">
      ${renderComponent($$result, "Services", $$Services, { "title": content.frontmatter.services.title, "lang": ELangs.en, "class": "astro-REHVHBA2" })}
    </div>${renderComponent($$result, "Technologies", $$Technologies, { "title": content?.frontmatter.tech.title, "desc": content?.frontmatter.tech.desc, "class": "astro-REHVHBA2" })}<div id="callback-form" class="astro-REHVHBA2">
      ${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-REHVHBA2" })}
    </div>` })}` })}`;
});

const $$file$B = "C:/work-projects/pireactor/main-site/client/src/pages/en/index.astro";
const $$url$B = "/en";

var _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$B,
	'default': $$Index$5,
	file: $$file$B,
	url: $$url$B
}, Symbol.toStringTag, { value: 'Module' }));

async function getStaticPaths$b() {
  const services = await Astro$b.glob(
    { "/public/assets/content/en/services/architecture.md": () => import('./chunks/chunk.93527cb3.mjs'), "/public/assets/content/en/services/automation.md": () => import('./chunks/chunk.59824c95.mjs'), "/public/assets/content/en/services/blockchain.md": () => import('./chunks/chunk.7c3d0c0b.mjs'), "/public/assets/content/en/services/strategy.md": () => import('./chunks/chunk.33bb18a9.mjs'), "/public/assets/content/en/services/wallets.md": () => import('./chunks/chunk.ee134a3e.mjs'),},
    () => "/public/assets/content/en/services/*.md"
  );
  return services.map((service) => {
    return {
      params: { slug: service.frontmatter.slug },
      props: {
        content: service.Content,
        title: service.frontmatter.title,
        titleDesc: service.frontmatter.titleDesc,
        desc: service.frontmatter.desc,
        values: service.frontmatter.values,
        content: service.Content,
        articles: service.frontmatter.articles,
        heroBtn: service.frontmatter.heroBtn,
        viewBtn: service.frontmatter.viewBtn
      }
    };
  });
}
const $$metadata$A = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/services/[slug].astro", { modules: [{ module: $$module1$2, specifier: "../../../components/MainTitle.astro", assert: {} }, { module: $$module2$5, specifier: "../../../components/shared/Button.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8, specifier: "../../../models/ServicesModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$A = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/services/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro$b = $$Astro$A;
const $$slug$b = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$A, $$props, $$slots);
  Astro2.self = $$slug$b;
  const props = Astro2.props;
  const uri = encodeURI(`/en/work/?${props.title}`);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.en, "class": "astro-WWB66DLJ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-WWB66DLJ" }, { "default": () => render`<section class="hero astro-WWB66DLJ">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": props.title, "class": "astro-WWB66DLJ" })}
        <p class="astro-WWB66DLJ">
          ${props.titleDesc}
        </p>
        ${renderComponent($$result, "Button", $$Button, { "title": props.heroBtn, "path": "/en/#callback-form", "class": "astro-WWB66DLJ" })}
    </section><section class="desc astro-WWB66DLJ">
      <h2 class="astro-WWB66DLJ">About</h2>
      <div class="desc__wrp astro-WWB66DLJ">
        <p class="astro-WWB66DLJ">${props.desc}</p>
        <div class="desc__counter astro-WWB66DLJ">
          ${props.values.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "client:component-hydration": "load", "client:component-path": $$metadata$A.getPath(Counter$1), "client:component-export": $$metadata$A.getExport(Counter$1), "class": "astro-WWB66DLJ" })}`)}
        </div>
      </div>
    </section>${props.articles.map((i) => render`<section class="article astro-WWB66DLJ">
      <h3 class="article__title astro-WWB66DLJ">${i.title}</h3>
      <div class="article__wrp astro-WWB66DLJ">
        <img class="article__img astro-WWB66DLJ"${addAttribute(i.img, "src")}${addAttribute(i.title, "alt")}>
        <p class="article__desc astro-WWB66DLJ">${i.desc}</p>
      </div>
    </section>`)}<div class="article__view astro-WWB66DLJ">
      ${renderComponent($$result, "Button", $$Button, { "path": uri, "title": props.viewBtn, "class": "astro-WWB66DLJ" })}
    </div>` })}` })}`;
});

const $$file$A = "C:/work-projects/pireactor/main-site/client/src/pages/en/services/[slug].astro";
const $$url$A = "/en/services/[slug]";

var _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getStaticPaths: getStaticPaths$b,
	$$metadata: $$metadata$A,
	'default': $$slug$b,
	file: $$file$A,
	url: $$url$A
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$z = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/AboutCard.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$z = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/AboutCard.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$AboutCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$z, $$props, $$slots);
  Astro2.self = $$AboutCard;
  const { desc, name, linkT, linkLI, imgSource, info } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<li class="leads-card astro-4BYQG4UF">
  <div class="leads-card__img-wrp astro-4BYQG4UF">
    <img class="leads-card__img astro-4BYQG4UF"${addAttribute(imgSource, "src")} alt="John Vermazen">
    <span class="leads-card__desc astro-4BYQG4UF">${desc}</span>
  </div>
  <div class="leads-card__info-wrp astro-4BYQG4UF">
    <div class="leads-card__header astro-4BYQG4UF">
      <h3 class="leads-card__name astro-4BYQG4UF">${name}</h3>
      <ul class="leads-card__socials astro-4BYQG4UF">
        <li class="astro-4BYQG4UF">
          <a class="leads-card__link astro-4BYQG4UF"${addAttribute(linkT, "href")} target="_blank" rel="noopener noreferrer">
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-4BYQG4UF">
              <path d="M17.9441 4.92638C17.9568 5.10403 17.9568 5.28173 17.9568 5.45938C17.9568 10.8781 13.8325 17.1218 6.29441 17.1218C3.97207 17.1218 1.81473 16.4492 0 15.2817C0.329961 15.3198 0.647187 15.3325 0.989844 15.3325C2.90605 15.3325 4.67004 14.6853 6.07867 13.5812C4.27664 13.5431 2.76648 12.3629 2.24617 10.7386C2.5 10.7766 2.75379 10.802 3.02031 10.802C3.38832 10.802 3.75637 10.7512 4.09898 10.6624C2.22082 10.2817 0.812148 8.63196 0.812148 6.63958V6.58884C1.35781 6.89341 1.99238 7.08376 2.66492 7.10911C1.56086 6.37306 0.837539 5.11673 0.837539 3.6954C0.837539 2.93399 1.04055 2.23603 1.3959 1.62688C3.41367 4.11419 6.44668 5.73853 9.84766 5.91622C9.78422 5.61165 9.74613 5.29442 9.74613 4.97716C9.74613 2.71825 11.5736 0.878174 13.8451 0.878174C15.0253 0.878174 16.0913 1.3731 16.84 2.17259C17.7664 1.99493 18.6547 1.65228 19.4416 1.18274C19.137 2.13454 18.4898 2.93403 17.6395 3.44161C18.4644 3.35282 19.2639 3.12435 19.9999 2.80712C19.4416 3.61927 18.7436 4.34259 17.9441 4.92638Z" fill="#FF35C7" class="astro-4BYQG4UF"></path>
            </svg>
          </a>
        </li>
        <li class="astro-4BYQG4UF">
          <a class="leads-card__link astro-4BYQG4UF"${addAttribute(linkLI, "href")} target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-4BYQG4UF">
              <path d="M4.16709 17.7461H0.538998V6.06511H4.16709V17.7461ZM2.35109 4.47171C1.1912 4.47171 0.25 3.51099 0.25 2.35109C0.25 1.1912 1.1912 0.25 2.35109 0.25C3.51099 0.25 4.45219 1.1912 4.45219 2.35109C4.45219 3.51099 3.51099 4.47171 2.35109 4.47171ZM17.7461 17.7461H14.1258V12.0599C14.1258 10.7047 14.0985 8.96681 12.2395 8.96681C10.3532 8.96681 10.0642 10.4391 10.0642 11.9622V17.7461H6.44002V6.06511H9.91972V7.6585H9.97049C10.4548 6.74074 11.6381 5.77221 13.4033 5.77221C17.0744 5.77221 17.75 8.18964 17.75 11.3296V17.7461H17.7461Z" fill="#FF35C7" class="astro-4BYQG4UF"></path>
            </svg>
          </a>
        </li>
      </ul>
    </div>
    <p class="astro-4BYQG4UF">${info}</p>
  </div>
</li>`;
});

const $$file$z = "C:/work-projects/pireactor/main-site/client/src/components/shared/AboutCard.astro";
const $$url$z = undefined;

var $$module2$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$z,
	'default': $$AboutCard,
	file: $$file$z,
	url: $$url$z
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$y = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/Breadcrums.astro", { modules: [{ module: $$module1$3, specifier: "astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$y = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/components/shared/Breadcrums.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Breadcrums = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$y, $$props, $$slots);
  Astro2.self = $$Breadcrums;
  const { currentPath } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`<div class="breacrums astro-5DLJLZES">
  <a href="/" class="breacrums__main-link astro-5DLJLZES">Homepage</a>
  <span class="breacrums__current astro-5DLJLZES">${currentPath}</span>
</div>`;
});

const $$file$y = "C:/work-projects/pireactor/main-site/client/src/components/shared/Breadcrums.astro";
const $$url$y = undefined;

var $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$y,
	'default': $$Breadcrums,
	file: $$file$y,
	url: $$url$y
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$x = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/about.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2$1, specifier: "../../components/shared/AboutCard.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$3, specifier: "../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$x = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/about.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$About$5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$x, $$props, $$slots);
  Astro2.self = $$About$5;
  const leads = await Astro2.glob(
    { "/public/assets/content/en/leads/AlexAlejandre.md": () => import('./chunks/chunk.a5de9f52.mjs'), "/public/assets/content/en/leads/JohnVermazenSt.md": () => import('./chunks/chunk.198b97c3.mjs'), "/public/assets/content/en/leads/JustynaBorwik.md": () => import('./chunks/chunk.2f992be1.mjs'), "/public/assets/content/en/leads/StevenVermazen.md": () => import('./chunks/chunk.d08d6e4f.mjs'),},
    () => "/public/assets/content/en/leads/*.md"
  );
  const sortLeads = leads.sort((a, b) => a.frontmatter.id - b.frontmatter.id);
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "About Us", "lang": ELangs.en, "class": "astro-KVNL2NNH" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-KVNL2NNH" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "About Us", "class": "astro-KVNL2NNH" })}<section class="hero astro-KVNL2NNH">
      ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": content?.frontmatter.about.hero.redline, "title": content?.frontmatter.about.hero.title, "class": "astro-KVNL2NNH" })}
      <p class="about__desc astro-KVNL2NNH">
        ${content?.frontmatter.about.desc}
      </p>
    </section>${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.counterTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="about__counter astro-KVNL2NNH">
        ${content.frontmatter.counters.map((el) => render`${renderComponent($$result, "Counter", Counter$1, { "title": el.title, "countTo": el.value, "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$x.getPath(Counter$1), "client:component-export": $$metadata$x.getExport(Counter$1), "class": "astro-KVNL2NNH" })}`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content.frontmatter.about.whoWeAreTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="about__who astro-KVNL2NNH">
        ${content.frontmatter.about.text.map((i) => render`<p class="astro-KVNL2NNH">${i}</p>`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.leadsTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="leads astro-KVNL2NNH">
        <ul class="leads-list astro-KVNL2NNH">
          ${sortLeads.map((lead) => render`${renderComponent($$result, "AboutCard", $$AboutCard, { "desc": lead.frontmatter.desc, "imgSource": lead.frontmatter.imgSource, "name": lead.frontmatter.name, "info": lead.frontmatter.info, "linkLI": lead.frontmatter.linkLI, "linkT": lead.frontmatter.linkT, "class": "astro-KVNL2NNH" })}`)}
        </ul>
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.locationsTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<ul class="location astro-KVNL2NNH">
        ${content.frontmatter.about.locations.map((i) => render`<li class="location__item astro-KVNL2NNH">
          <img${addAttribute(i.img, "src")}${addAttribute(i.name, "alt")} class="location__img astro-KVNL2NNH">
          ${i.name}
        </li>`)}
      </ul>` })}` })}` })}`;
});

const $$file$x = "C:/work-projects/pireactor/main-site/client/src/pages/en/about.astro";
const $$url$x = "/en/about";

var _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$x,
	'default': $$About$5,
	file: $$file$x,
	url: $$url$x
}, Symbol.toStringTag, { value: 'Module' }));

var EForms = /* @__PURE__ */ ((EForms2) => {
  EForms2["custom"] = "custom";
  EForms2["team"] = "team";
  EForms2["dontKnow"] = "dontKnow";
  return EForms2;
})(EForms || {});

const _tmpl$$8 = ["<div", ">no data</div>"], _tmpl$2$3 = ["<div", "><div", "><span", ">", "</span><!--#-->", "<!--/--></div><div", "><button", ' type="button"', '><svg width="12" height="3" viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5H11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button><input size="2"', ' type="number"', "><button", ' type="button"><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1.5V11.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 6.5H11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div></div>'], _tmpl$3$3 = ["<div", '><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99974 14.5027C11.3149 14.5027 14.0024 11.8152 14.0024 8.50001C14.0024 5.18483 11.3149 2.49734 7.99974 2.49734C4.68456 2.49734 1.99707 5.18483 1.99707 8.50001C1.99707 11.8152 4.68456 14.5027 7.99974 14.5027Z" stroke="#FF79DA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.33301 10.834H8.87301" stroke="#FF79DA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.1062 10.8347V8H7.33887" stroke="#FF79DA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.06673 5.99668C8.06673 6.02965 8.05696 6.06187 8.03864 6.08928C8.02033 6.11669 7.9943 6.13805 7.96385 6.15066C7.93339 6.16328 7.89988 6.16658 7.86755 6.16015C7.83522 6.15372 7.80552 6.13784 7.78221 6.11454C7.75891 6.09123 7.74303 6.06153 7.7366 6.0292C7.73017 5.99687 7.73347 5.96336 7.74609 5.9329C7.7587 5.90245 7.78006 5.87642 7.80747 5.85811C7.83488 5.83979 7.8671 5.83002 7.90007 5.83002" stroke="#FF79DA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.89941 5.83002C7.94362 5.83002 7.98601 5.84758 8.01726 5.87883C8.04852 5.91009 8.06608 5.95248 8.06608 5.99668" stroke="#FF79DA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><div', ">", "</div></div>"];
function Counter(props) {
  const name = props.label;
  if (!Array.isArray(store[props.group]))
    return ssr(_tmpl$$8, ssrHydrationKey());
  const [curEl] = store[props.group].filter((i) => i.name === name) ?? [];
  return ssr(_tmpl$2$3, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$7.counter, true), false), ssrAttribute("class", escape$1(styles$7.counter__label, true), false), ssrAttribute("class", escape$1(styles$7.counter__labelText, true), false), escape$1(props.label), props.tooltipInfo && escape$1(ssr(_tmpl$3$3, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$7.label__tooltip, true), false), ssrAttribute("class", escape$1(styles$7.label__tooltipInfo, true), false), escape$1(props.tooltipInfo))), ssrAttribute("class", escape$1(styles$7.counter__counter, true), false), ssrAttribute("class", escape$1(styles$7.counter__btn, true), false), ssrAttribute("disabled", !curEl?.value, true), ssrAttribute("class", escape$1(styles$7.counter__input, true), false), ssrAttribute("name", escape$1(props.label, true), false) + ssrAttribute("value", escape$1(curEl?.value, true), false), ssrAttribute("class", escape$1(styles$7.counter__btn, true), false));
}

const _tmpl$$7 = ["<label", '><input type="radio"', "><svg", ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle', ' cx="10" cy="10" r="9.5" fill="#1D1F1F" stroke="#F100AE"></circle><circle', ' cx="10" cy="10" r="8" fill="#F100AE"></circle></svg><!--#-->', "<!--/--></label>"];
function Radio(props) {
  return ssr(_tmpl$$7, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$8.radio__label, true), false), ssrAttribute("class", escape$1(styles$8.radio__input, true), false) + ssrAttribute("name", escape$1(props.name, true), false) + ssrAttribute("value", escape$1(props.label, true), false), ssrAttribute("class", escape$1(styles$8.radio__box, true), false), ssrAttribute("class", escape$1(styles$8.radio__focus, true), false), ssrAttribute("class", escape$1(styles$8.radio__mark, true), false), escape$1(props.label));
}

function* range(stop, step = 1) {
  for (let i = 0; i < stop; i += step) {
    yield i;
  }
}

const _tmpl$$6 = ["<div", ' class="timerange"><div class="timerange__scale">', '</div><div class="timerange__legend">', "</div></div>"], _tmpl$2$2 = ["<div", ' class="', '"><div class="timerange__tooltip">', '</div><label><input type="radio" class="timerange__input" name="duration" value="', '"><svg class="timerange__box" viewBox="0 0 16 16" fill="none"><circle class="timerange__focus" cx="8" cy="8.00098" r="7.5" fill="white"></circle></svg></label></div>'], _tmpl$3$2 = ["<span", ' class="timerange__label">', "</span>"], _tmpl$4$1 = ["<span", ' class="timerange__label timerange__label_mob">', "</span>"];
function mounthValue(n, isMob) {
  let text = n === 0 ? `${n + 1} month` : `${n + 1} months`;
  isMob ? text = `${n + 1} m` : text;
  return text;
}
function TimeRange({
  duration = 24,
  ...props
}) {
  const [checked, setChecked] = createSignal();
  return ssr(_tmpl$$6, ssrHydrationKey(), escape$1(Array.from(range(duration)).map((n) => {
    return ssr(_tmpl$2$2, ssrHydrationKey(), `timerange__item ${(n + 1) % 6 === 0 ? "timerange__item_every" : ""} ${checked() > n ? "timerange__item_checked" : ""}`, escape$1(mounthValue(n)), escape$1(n, true) + 1);
  })), escape$1(Array.from(range(duration)).map((n) => {
    const isNotEverySix = (n + 1) % 6;
    if (isNotEverySix && n !== 0)
      return;
    let monthString;
    let monthStringMob;
    if (n === 0 || !isNotEverySix) {
      monthString = mounthValue(n);
      monthStringMob = mounthValue(n, true);
    }
    return [ssr(_tmpl$3$2, ssrHydrationKey(), escape$1(monthString)), ssr(_tmpl$4$1, ssrHydrationKey(), escape$1(monthStringMob))];
  })));
}

const _tmpl$$5 = ["<div", "><div", "><h3", '>1. Specify the tech stack and the number of developers you need per each technology</h3><button type="button"', ">Clear all</button></div><fieldset", "><div", ">", "</div><div", ">", "</div><div", ">", "</div><div", ">", "</div></fieldset><div", "><h3", '>2. Extra specialists you need to add to the team</h3><button type="button"', '>Clear all</button></div><fieldset class="', '">', "</fieldset><div", "><h3", '>3. Please, specify your business industry</h3><button type="button"', '>Clear all</button></div><fieldset id="industry"', "><div", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></div><div", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></div><div", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></div><div", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></div></fieldset><div", "><h3", '>4. What is the expected duration of your project?</h3><button type="button"', ">Clear all</button></div><div", ">", "</div><div", "><h3", ">5. Contacts</h3></div><fieldset", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></fieldset></div>"];
function Team(props) {
  return ssr(_tmpl$$5, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$9.formSection, true), false), ssrAttribute("class", escape$1(styles$9.formSection__header, true), false), ssrAttribute("class", escape$1(styles$9.formSection__caption, true), false), ssrAttribute("class", escape$1(styles$9.formSection__clear, true), false), ssrAttribute("class", escape$1(styles$9.formSection__fieldset, true), false), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(store.frameworks.map((i) => createComponent$1(Counter, {
    get label() {
      return i.name;
    },
    get tooltipInfo() {
      return i.tooltip;
    },
    get value() {
      return i.value;
    },
    group: "frameworks"
  }))), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(store.langs.map((i) => createComponent$1(Counter, {
    get label() {
      return i.name;
    },
    get tooltipInfo() {
      return i.tooltip;
    },
    get value() {
      return i.value;
    },
    group: "langs"
  }))), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(store.mobiles.map((i) => createComponent$1(Counter, {
    get label() {
      return i.name;
    },
    get tooltipInfo() {
      return i.tooltip;
    },
    get value() {
      return i.value;
    },
    group: "mobiles"
  }))), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(store.db.map((i) => createComponent$1(Counter, {
    get label() {
      return i.name;
    },
    get tooltipInfo() {
      return i.tooltip;
    },
    get value() {
      return i.value;
    },
    group: "db"
  }))), ssrAttribute("class", escape$1(styles$9.formSection__header, true), false), ssrAttribute("class", escape$1(styles$9.formSection__caption, true), false), ssrAttribute("class", escape$1(styles$9.formSection__clear, true), false), `${escape$1(styles$9.formSection__fieldset, true)} ${escape$1(styles$9.formSection__fieldsetGrid, true)}`, escape$1(store.specs.map((i) => createComponent$1(Counter, {
    get label() {
      return i.name;
    },
    get value() {
      return i.value;
    },
    group: "specs"
  }))), ssrAttribute("class", escape$1(styles$9.formSection__header, true), false), ssrAttribute("class", escape$1(styles$9.formSection__caption, true), false), ssrAttribute("class", escape$1(styles$9.formSection__clear, true), false), ssrAttribute("class", escape$1(styles$9.formSection__fieldset, true), false), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Financial Services"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Media & Entertainment"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "iGaming"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Automotive"
  })), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "eCommerce"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Enterprise"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Logistics"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Manufacturing"
  })), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Travel & Hospitality"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Real Estate"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "eLearning"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Aviation"
  })), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Telecom"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Healthcare"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Retail"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Other"
  })), ssrAttribute("class", escape$1(styles$9.formSection__header, true), false), ssrAttribute("class", escape$1(styles$9.formSection__caption, true), false), ssrAttribute("class", escape$1(styles$9.formSection__clear, true), false), ssrAttribute("class", escape$1(styles$9.formSection__duration, true), false), escape$1(createComponent$1(TimeRange, {})), ssrAttribute("class", escape$1(styles$9.formSection__header, true), false), ssrAttribute("class", escape$1(styles$9.formSection__caption, true), false), ssrAttribute("class", escape$1(styles$9.formSection__contacts, true), false), escape$1(createComponent$1(NameInput, {})), escape$1(createComponent$1(EmailInput, {})), escape$1(createComponent$1(TextInput, {
    label: "Phone number"
  })));
}

const _tmpl$$4 = ["<label", '><input type="checkbox"', "><svg", ' width="20" height="20" viewBox="0 0 20 20"><rect', ' width="20" height="20" rx="4"></rect><path', ' d="M15.3337 6.33331L8.00033 13.6666L4.66699 10.3333" stroke-linecap="round" stroke-linejoin="round"></path></svg><!--#-->', "<!--/--></label>"];
function Checkbox(props) {
  return ssr(_tmpl$$4, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$a.checkbox__label, true), false), ssrAttribute("class", escape$1(styles$a.checkbox__input, true), false) + ssrAttribute("name", escape$1(props.category, true), false) + ssrAttribute("value", escape$1(props.label, true), false), ssrAttribute("class", escape$1(styles$a.checkbox__box, true), false), ssrAttribute("class", escape$1(styles$a.checkbox__focus, true), false), ssrAttribute("class", escape$1(styles$a.checkbox__mark, true), false), escape$1(props.label));
}

const _tmpl$$3 = ["<div", "><div", "><h3", '>1. What type of software solution would you like to develop with Andersen?</h3><button type="button"', ">Clear all</button></div><fieldset", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></fieldset><div", "><h3", '>2. What is the current stage of your software development process?</h3><button type="button"', '>Clear all</button></div><fieldset id="stage"', "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></fieldset><div", "><h3", '>3. Do you need a professional consultation from any of the specialists below?</h3><button type="button"', ">Clear all</button></div><fieldset", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></fieldset><div", "><h3", '>4. Please, specify your business industry</h3><button type="button"', '>Clear all</button></div><fieldset id="industry"', "><div", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></div><div", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></div><div", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></div><div", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></div></fieldset><div", "><h3", '>5. What is the expected duration of your project?</h3><button type="button"', ">Clear all</button></div><div", ">", "</div><div", "><h3>6. Contacts</h3></div><fieldset", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></fieldset></div>"];
function Custom(props) {
  return ssr(_tmpl$$3, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$9.formSection, true), false), ssrAttribute("class", escape$1(styles$9.formSection__header, true), false), ssrAttribute("class", escape$1(styles$9.formSection__caption, true), false), ssrAttribute("class", escape$1(styles$9.formSection__clear, true), false), ssrAttribute("class", escape$1(styles$9.formSection__fieldset, true), false), escape$1(createComponent$1(Checkbox, {
    category: "develop-solution",
    label: "Desktop"
  })), escape$1(createComponent$1(Checkbox, {
    category: "develop-solution",
    label: "Mobile"
  })), escape$1(createComponent$1(Checkbox, {
    category: "develop-solution",
    label: "Web"
  })), escape$1(createComponent$1(Checkbox, {
    category: "develop-solution",
    label: "Consultancy needed"
  })), ssrAttribute("class", escape$1(styles$9.formSection__header, true), false), ssrAttribute("class", escape$1(styles$9.formSection__caption, true), false), ssrAttribute("class", escape$1(styles$9.formSection__clear, true), false), ssrAttribute("class", escape$1(styles$9.formSection__fieldset, true), false), escape$1(createComponent$1(Radio, {
    name: "stage",
    label: "Idea"
  })), escape$1(createComponent$1(Radio, {
    name: "stage",
    label: "Prototype/Specification"
  })), escape$1(createComponent$1(Radio, {
    name: "stage",
    label: "Designed solution"
  })), escape$1(createComponent$1(Radio, {
    name: "stage",
    label: "MVP"
  })), ssrAttribute("class", escape$1(styles$9.formSection__header, true), false), ssrAttribute("class", escape$1(styles$9.formSection__caption, true), false), ssrAttribute("class", escape$1(styles$9.formSection__clear, true), false), ssrAttribute("class", escape$1(styles$9.formSection__fieldset, true), false), escape$1(createComponent$1(Checkbox, {
    category: "specialist",
    label: "Project Manager"
  })), escape$1(createComponent$1(Checkbox, {
    category: "specialist",
    label: "Business Analyst"
  })), escape$1(createComponent$1(Checkbox, {
    category: "specialist",
    label: "UI/UX Designer"
  })), escape$1(createComponent$1(Checkbox, {
    category: "specialist",
    label: "Architect"
  })), ssrAttribute("class", escape$1(styles$9.formSection__header, true), false), ssrAttribute("class", escape$1(styles$9.formSection__caption, true), false), ssrAttribute("class", escape$1(styles$9.formSection__clear, true), false), ssrAttribute("class", escape$1(styles$9.formSection__fieldset, true), false), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Financial Services"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Media & Entertainment"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "iGaming"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Automotive"
  })), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "eCommerce"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Enterprise"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Logistics"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Manufacturing"
  })), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Travel & Hospitality"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Real Estate"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "eLearning"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Aviation"
  })), ssrAttribute("class", escape$1(styles$9.formSection__itemsBlock, true), false), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Telecom"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Healthcare"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Retail"
  })), escape$1(createComponent$1(Radio, {
    name: "industry",
    label: "Other"
  })), ssrAttribute("class", escape$1(styles$9.formSection__header, true), false), ssrAttribute("class", escape$1(styles$9.formSection__caption, true), false), ssrAttribute("class", escape$1(styles$9.formSection__clear, true), false), ssrAttribute("class", escape$1(styles$9.formSection__duration, true), false), escape$1(createComponent$1(TimeRange, {})), ssrAttribute("class", escape$1(styles$9.formSection__header, true), false), ssrAttribute("class", escape$1(styles$9.formSection__contacts, true), false), escape$1(createComponent$1(NameInput, {})), escape$1(createComponent$1(EmailInput, {})), escape$1(createComponent$1(TextInput, {
    label: "Phone number"
  })));
}

const _tmpl$$2 = ["<div", "><fieldset", "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></fieldset><!--#-->", "<!--/--></div>"];
function DontKnow(props) {
  return ssr(_tmpl$$2, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$9.formSection, true), false), ssrAttribute("class", escape$1(styles$9.fieldset_textInput, true), false), escape$1(createComponent$1(NameInput, {})), escape$1(createComponent$1(EmailInput, {})), escape$1(createComponent$1(TextInput, {
    label: "Phone number"
  })), escape$1(createComponent$1(TextInput, {
    label: "Subject"
  })), escape$1(createComponent$1(Textarea, {
    label: "Message (optional)"
  })));
}

const _tmpl$$1 = ["<div", "><div", "><div", "><h2", ">Request an IT project cost estimate</h2><div", '><button class="', '">custom software development</button><button class="', '">team augmentation</button><button class="', `">i don't know what I need</button></div></div></div><form`, ' enctype="multipart/form-data" method="post"><!--#-->', "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><button", ' type="submit"><!--#-->', "<!--/--><!--#-->", "<!--/--></button><!--#-->", "<!--/--><!--#-->", "<!--/--></form></div>"], _tmpl$2$1 = ["<div", ">", "</div>"], _tmpl$3$1 = ["<div", ">The form was sent successfully</div>"];
function Form() {
  const [tab, setTab] = createSignal(EForms.custom);
  const [isLoading, setIsLoading] = createSignal(false);
  const [err, setErr] = createSignal("");
  const [location, setLocation] = createSignal({});
  const [isFormSended, setIsFormSended] = createSignal(false);
  createEffect(() => {
    setLocation(window.location.origin);
    console.log("location", location());
  });
  const emailRefCallback = (el) => {
  };
  return ssr(_tmpl$$1, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$b.form, true), false), ssrAttribute("class", escape$1(styles$b.form__header, true), false), ssrAttribute("class", escape$1(styles$b.form__headerWrp, true), false), ssrAttribute("class", escape$1(styles$b.form__headerTitle, true), false), ssrAttribute("class", escape$1(styles$b.form__selectors, true), false), `${escape$1(styles$b.form__selectBtn, true) || ""} ${tab() === EForms.custom ? escape$1(escape$1(styles$b.form__selectBtn_active, true), true) : ""}`, `${escape$1(styles$b.form__selectBtn, true) || ""} ${tab() === EForms.team ? escape$1(escape$1(styles$b.form__selectBtn_active, true), true) : ""}`, `${escape$1(styles$b.form__selectBtn, true) || ""} ${tab() === EForms.dontKnow ? escape$1(escape$1(styles$b.form__selectBtn_active, true), true) : ""}`, ssrAttribute("class", escape$1(styles$b.form__form, true), false), tab() === EForms.custom && escape$1(createComponent$1(Custom, {
    emailRefCallback
  })), tab() === EForms.team && escape$1(createComponent$1(Team, {
    emailRefCallback
  })), tab() === EForms.dontKnow && escape$1(createComponent$1(DontKnow, {
    emailRefCallback
  })), ssrAttribute("class", escape$1(styles$b.form__SubmitBtn, true), false), !isLoading() && "Get price", isLoading() && "Sending...", err() && escape$1(ssr(_tmpl$2$1, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$b.error, true), false), escape$1(err()))), isFormSended() && escape$1(ssr(_tmpl$3$1, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$b.success, true), false))));
}

var $$module3$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Form: Form
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$w = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/brief.astro", { modules: [{ module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$2, specifier: "../../components/shared/FormSection.astro", assert: {} }, { module: $$module3$1, specifier: "../../components/solid/Form", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }], hydratedComponents: [Form], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$w = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/brief.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Brief$5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$w, $$props, $$slots);
  Astro2.self = $$Brief$5;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Brief", "lang": ELangs.en, "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Brief", "class": "astro-ERY3GRSQ" })}${renderComponent($$result, "FormSection", $$FormSection, { "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Form", Form, { "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$w.getPath(Form), "client:component-export": $$metadata$w.getExport(Form), "class": "astro-ERY3GRSQ" })}` })}` })}` })}`;
});

const $$file$w = "C:/work-projects/pireactor/main-site/client/src/pages/en/brief.astro";
const $$url$w = "/en/brief";

var _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$w,
	'default': $$Brief$5,
	file: $$file$w,
	url: $$url$w
}, Symbol.toStringTag, { value: 'Module' }));

var EPhases = /* @__PURE__ */ ((EPhases2) => {
  EPhases2["dev"] = "Development phase";
  EPhases2["rel"] = "Project\u2019s release";
  EPhases2["sup"] = "Support & Improvements";
  return EPhases2;
})(EPhases || {});

var $$module5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	EPhases: EPhases
}, Symbol.toStringTag, { value: 'Module' }));

var $$module7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$v = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/work/[slug].astro", { modules: [{ module: $$module1, specifier: "../../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module2$3, specifier: "../../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5, specifier: "../../../enums/EPhases", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../../models/ContentModel", assert: {} }, { module: $$module7, specifier: "../../../models/ProjectModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$v = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/work/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro$a = $$Astro$v;
async function getStaticPaths$a() {
  const projects = await Astro$a.glob(
    { "/public/assets/content/en/projects/Brewery.md": () => import('./chunks/chunk.29bcfbb2.mjs'), "/public/assets/content/en/projects/NewHope copy.md": () => import('./chunks/chunk.dbd11095.mjs'), "/public/assets/content/en/projects/NewHope.md": () => import('./chunks/chunk.79884e51.mjs'), "/public/assets/content/en/projects/NewHope2.md": () => import('./chunks/chunk.787538be.mjs'), "/public/assets/content/en/projects/NewHope3.md": () => import('./chunks/chunk.09debec5.mjs'),},
    () => "/public/assets/content/en/projects/*.md"
  );
  return projects.map((project) => {
    return {
      params: { slug: project.frontmatter.slug },
      props: {
        content: project.Content,
        title: project.frontmatter.title,
        img: project.frontmatter.img,
        phases: project.frontmatter.phases,
        bullets: project.frontmatter.bullets,
        result: project.frontmatter.result
      }
    };
  });
}
const $$slug$a = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$slug$a;
  const props = Astro2.props;
  function phasesClass(item) {
    switch (item) {
      case EPhases.dev:
        return "stages__item_dev";
      case EPhases.rel:
        return "stages__item_rel";
      case EPhases.sup:
        return "stages__item_sup";
    }
  }
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.en, "class": "astro-2CQBPXFM" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="hero astro-2CQBPXFM"${addAttribute(`--url: url("${props.img}")`, "style")}>
      <h1 class="astro-2CQBPXFM">${props.title}</h1>
    </div>${renderComponent($$result, "Section", $$Section, { "title": "Stages of project", "class": "astro-2CQBPXFM" }, { "default": () => render`<ul class="stages__list astro-2CQBPXFM">
        ${props.phases.map((i) => render`<li${addAttribute(`stages__item ${phasesClass(i.icon)} astro-2CQBPXFM`, "class")}>
          <div class="stages__title astro-2CQBPXFM">${i.name}</div>
          <div class="stages__period astro-2CQBPXFM">${i.period}</div>
        </li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Application functionality", "class": "astro-2CQBPXFM" }, { "default": () => render`<ul class="bullets astro-2CQBPXFM">
        ${props.bullets.map((i) => render`<li class="bullets__item astro-2CQBPXFM">${i}</li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Solution", "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="solution astro-2CQBPXFM">
        ${renderComponent($$result, "props.content", props.content, { "class": "astro-2CQBPXFM" })}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": "Results", "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="counter astro-2CQBPXFM">
        ${props.result.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "format": i.format, "client:component-hydration": "load", "client:component-path": $$metadata$v.getPath(Counter$1), "client:component-export": $$metadata$v.getExport(Counter$1), "class": "astro-2CQBPXFM" })}`)}
      </div>` })}${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-2CQBPXFM" })}` })}` })}`;
});

const $$file$v = "C:/work-projects/pireactor/main-site/client/src/pages/en/work/[slug].astro";
const $$url$v = "/en/work/[slug]";

var _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$v,
	getStaticPaths: getStaticPaths$a,
	'default': $$slug$a,
	file: $$file$v,
	url: $$url$v
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$ = ["<div", "><div", "><div", '><button class="', '"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00003 4.50001C12.418 6.71001 17.79 12.082 20 16.5C22.209 20.918 20.418 22.71 16 20.5C11.582 18.29 6.20903 12.918 4.00003 8.50001C1.79003 4.08201 3.58203 2.29101 8.00003 4.50001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 4.50001C20.418 2.29101 22.209 4.08201 20 8.50001C17.79 12.918 12.418 18.29 8.00003 20.5C3.58203 22.709 1.79003 20.918 4.00003 16.5C6.20903 12.082 11.582 6.71001 16 4.50001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.2502 12.625C12.2502 12.5918 12.2371 12.5601 12.2136 12.5366C12.1902 12.5132 12.1584 12.5 12.1252 12.5C12.0921 12.5 12.0603 12.5132 12.0369 12.5366C12.0134 12.5601 12.0002 12.5918 12.0002 12.625C12.0002 12.6582 12.0134 12.6899 12.0369 12.7134C12.0603 12.7368 12.0921 12.75 12.1252 12.75C12.1584 12.75 12.1902 12.7368 12.2136 12.7134C12.2371 12.6899 12.2502 12.6582 12.2502 12.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><!--#-->', "<!--/--></button><!--#-->", "<!--/--></div></div><div", "><ul", ">", "</ul></div></div>"], _tmpl$2 = ["<button", ' class="', '"><svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99809 17.503C6.33496 17.503 5.69897 17.2397 5.22997 16.7708C4.76097 16.302 4.49736 15.6661 4.49709 15.003V12C4.49683 11.3369 4.23321 10.701 3.76421 10.2322C3.29521 9.76337 2.65923 9.50001 1.99609 9.50001C2.65923 9.49974 3.29511 9.23613 3.76392 8.76713C4.23273 8.29813 4.49609 7.66214 4.49609 6.99901V3.99801C4.49609 3.66949 4.56082 3.34419 4.68657 3.04069C4.81232 2.73719 4.99663 2.46143 5.22897 2.22918C5.46132 1.99693 5.73714 1.81273 6.0407 1.6871C6.34425 1.56147 6.66957 1.49688 6.99809 1.49701" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.002 1.49701C17.6651 1.49701 18.3011 1.76037 18.7701 2.22918C19.2391 2.69799 19.5027 3.33388 19.503 3.99701V7.00001C19.5032 7.66314 19.7668 8.29903 20.2358 8.76784C20.7048 9.23665 21.3408 9.50001 22.004 9.50001C21.3408 9.50027 20.7049 9.76389 20.2361 10.2329C19.7673 10.7019 19.504 11.3379 19.504 12.001V15.002C19.504 15.3305 19.4392 15.6558 19.3135 15.9593C19.1877 16.2628 19.0034 16.5386 18.7711 16.7708C18.5387 17.0031 18.2629 17.1873 17.9594 17.3129C17.6558 17.4385 17.3305 17.5031 17.002 17.503" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.0502 9.57301C12.0502 9.56644 12.0489 9.55994 12.0464 9.55388C12.0439 9.54781 12.0402 9.5423 12.0356 9.53765C12.0309 9.53301 12.0254 9.52933 12.0193 9.52682C12.0133 9.5243 12.0068 9.52301 12.0002 9.52301C11.9936 9.52301 11.9871 9.5243 11.9811 9.52682C11.975 9.52933 11.9695 9.53301 11.9648 9.53765C11.9602 9.5423 11.9565 9.54781 11.954 9.55388C11.9515 9.55994 11.9502 9.56644 11.9502 9.57301C11.9502 9.58627 11.9555 9.59899 11.9648 9.60837C11.9742 9.61774 11.9869 9.62301 12.0002 9.62301C12.0135 9.62301 12.0262 9.61774 12.0356 9.60837C12.0449 9.59899 12.0502 9.58627 12.0502 9.57301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.6 9.57301C8.6 9.56644 8.59871 9.55994 8.59619 9.55388C8.59368 9.54781 8.59 9.5423 8.58536 9.53765C8.58071 9.53301 8.5752 9.52933 8.56913 9.52682C8.56307 9.5243 8.55657 9.52301 8.55 9.52301C8.54343 9.52301 8.53693 9.5243 8.53087 9.52682C8.5248 9.52933 8.51929 9.53301 8.51464 9.53765C8.51 9.5423 8.50632 9.54781 8.50381 9.55388C8.50129 9.55994 8.5 9.56644 8.5 9.57301C8.5 9.58627 8.50527 9.59899 8.51464 9.60837C8.52402 9.61774 8.53674 9.62301 8.55 9.62301C8.56326 9.62301 8.57598 9.61774 8.58536 9.60837C8.59473 9.59899 8.6 9.58627 8.6 9.57301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.0512 9.57301C15.0512 9.55975 15.0459 9.54703 15.0365 9.53765C15.0271 9.52828 15.0144 9.52301 15.0012 9.52301C14.9879 9.52301 14.9752 9.52828 14.9658 9.53765C14.9564 9.54703 14.9512 9.55975 14.9512 9.57301C14.9512 9.58627 14.9564 9.59899 14.9658 9.60837C14.9752 9.61774 14.9879 9.62301 15.0012 9.62301C15.0144 9.62301 15.0271 9.61774 15.0365 9.60837C15.0459 9.59899 15.0512 9.58627 15.0512 9.57301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><!--#-->', "<!--/--></button>"], _tmpl$3 = ["<li", "><!--#-->", "<!--/--><div", '><a href="', '"', "><h3>", "</h3></a><div", '><span class="', '">', '</span><span class="', '">', "</span></div></div><ul", ">", "</ul><p", ">", "</p><a", ' href="', '">', "</a></li>"], _tmpl$4 = ["<img", ">"], _tmpl$5 = ["<img", ' src="https://via.placeholder.com/150/000000/808080?text=NoImage"', ">"], _tmpl$6 = ["<li", ">", "</li>"];
function Projects(props) {
  const [sort, setSort] = createSignal(props.projects);
  const [active, setActive] = createSignal(ETags.all);
  const [path, setPath] = createSignal();
  createEffect(() => {
    const url = decodeURI(window.location.search).replace("?", "");
    setPath(url);
    if (!path()) {
      setSort(props.projects);
      setActive(ETags.all);
    } else {
      setSort(props.projects.filter((i) => i.tags.some((el) => el === path())));
      setActive(path());
    }
  });
  return ssr(_tmpl$, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$c.project, true), false), ssrAttribute("class", escape$1(styles$c.project__controlsWrp, true), false), ssrAttribute("class", escape$1(styles$c.project__controls, true), false), `${escape$1(styles$c.project__control, true) || ""} ${active() === ETags.all ? escape$1(escape$1(styles$c.project__control_active, true), true) : ""}`, escape$1(props.allBtnTitle), escape$1(props.servicesNames.map((i) => ssr(_tmpl$2, ssrHydrationKey(), `${escape$1(styles$c.project__control, true) || ""} ${active() === i.name ? escape$1(escape$1(styles$c.project__control_active, true), true) : ""}`, escape$1(i.name)))), ssrAttribute("class", escape$1(styles$c.project__projects, true), false), ssrAttribute("class", escape$1(styles$c.project__list, true), false), escape$1(sort().map((i) => ssr(_tmpl$3, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$c.project__item, true), false), i.img ? escape$1(ssr(_tmpl$4, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$c.item__img, true), false) + ssrAttribute("src", escape$1(i.img, true), false) + ssrAttribute("alt", escape$1(i.title, true), false))) : escape$1(ssr(_tmpl$5, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$c.item__img, true), false), ssrAttribute("alt", escape$1(i.title, true), false))), ssrAttribute("class", escape$1(styles$c.item__header, true), false), `/${escape$1(props.langHref, true)}/work/${escape$1(i.slug, true)}`, ssrAttribute("class", escape$1(styles$c.item__link, true), false), escape$1(i.title), ssrAttribute("class", escape$1(styles$c.list__countsWrp, true), false), `${escape$1(styles$c.list__counts, true)} ${escape$1(styles$c.list__counts_devs, true)}`, `${escape$1(i.developers)} developers`, `${escape$1(styles$c.list__counts, true)} ${escape$1(styles$c.list__counts_time, true)}`, `${escape$1(i.months)} months`, ssrAttribute("class", escape$1(styles$c.item__tags, true), false), escape$1(i.tags.map((t) => {
    return ssr(_tmpl$6, ssrHydrationKey() + ssrAttribute("class", escape$1(styles$c.tag, true), false), escape$1(t));
  })), ssrAttribute("class", escape$1(styles$c.item__desc, true), false), escape$1(i.desc), ssrAttribute("class", escape$1(styles$c.item__link_mob, true), false), `/${escape$1(props.langHref, true)}/work/${escape$1(i.slug, true)}`, escape$1(props.learnMoreText)))));
}

var $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Projects: Projects
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$u = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/work.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module3, specifier: "../../components/solid/Projects", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module7, specifier: "../../models/ProjectModel", assert: {} }, { module: $$module8, specifier: "../../models/ServicesModel", assert: {} }], hydratedComponents: [Projects], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$u = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/en/work.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Work$5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$Work$5;
  const projectsRaw = await Astro2.glob(
    { "/public/assets/content/en/projects/Brewery.md": () => import('./chunks/chunk.29bcfbb2.mjs'), "/public/assets/content/en/projects/NewHope copy.md": () => import('./chunks/chunk.dbd11095.mjs'), "/public/assets/content/en/projects/NewHope.md": () => import('./chunks/chunk.79884e51.mjs'), "/public/assets/content/en/projects/NewHope2.md": () => import('./chunks/chunk.787538be.mjs'), "/public/assets/content/en/projects/NewHope3.md": () => import('./chunks/chunk.09debec5.mjs'),},
    () => "/public/assets/content/en/projects/*.md"
  );
  const projects = projectsRaw.map((i) => {
    return {
      desc: i.frontmatter.desc,
      developers: i.frontmatter.developers,
      months: i.frontmatter.months,
      phases: i.frontmatter.phases,
      slug: i.frontmatter.slug,
      title: i.frontmatter.title,
      tags: i.frontmatter.tags,
      img: i.frontmatter.img
    };
  });
  const url = Astro2.request.url;
  const services = await Astro2.glob(
    { "/public/assets/content/en/services/architecture.md": () => import('./chunks/chunk.93527cb3.mjs'), "/public/assets/content/en/services/automation.md": () => import('./chunks/chunk.59824c95.mjs'), "/public/assets/content/en/services/blockchain.md": () => import('./chunks/chunk.7c3d0c0b.mjs'), "/public/assets/content/en/services/strategy.md": () => import('./chunks/chunk.33bb18a9.mjs'), "/public/assets/content/en/services/wallets.md": () => import('./chunks/chunk.ee134a3e.mjs'),},
    () => "/public/assets/content/en/services/*.md"
  );
  const servicesNames = services.map((i) => ({
    name: i.frontmatter.title
  }));
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Portfolio", "lang": ELangs.en, "class": "astro-SMR3IJSC" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-SMR3IJSC" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Portfolio", "class": "astro-SMR3IJSC" })}<section class="hero astro-SMR3IJSC">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": "Explore", "title": "our Work", "class": "astro-SMR3IJSC" })}
        <p class="hero__desc astro-SMR3IJSC">
          We apply modern technologies to unlock new markets, expand your business opportunities and bring you one step closer to success. We combine developpers with designers,
          translators with copywriters, all subject matter experts in their fields, implementing what works. 
        </p>
    </section>${renderComponent($$result, "Projects", Projects, { "client:load": true, "servicesNames": servicesNames, "projects": projects, "url": url, "allBtnTitle": "All Projects", "learnMoreText": "More Information", "langHref": ELangs.en, "client:component-hydration": "load", "client:component-path": $$metadata$u.getPath(Projects), "client:component-export": $$metadata$u.getExport(Projects), "class": "astro-SMR3IJSC" })}` })}` })}

`;
});

const $$file$u = "C:/work-projects/pireactor/main-site/client/src/pages/en/work.astro";
const $$url$u = "/en/work";

var _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$u,
	'default': $$Work$5,
	file: $$file$u,
	url: $$url$u
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$t = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/index.astro", { modules: [{ module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module2$4, specifier: "../../components/main/Hero.astro", assert: {} }, { module: $$module3$2, specifier: "../../components/main/About.astro", assert: {} }, { module: $$module4, specifier: "../../components/main/Map.astro", assert: {} }, { module: $$module5$1, specifier: "../../components/main/How.astro", assert: {} }, { module: $$module6, specifier: "../../components/main/Services.astro", assert: {} }, { module: $$module7$1, specifier: "../../components/main/Technologies.astro", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module1, specifier: "../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$t = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/index.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$Index$4;
  const [content] = await Astro2.glob(
    { "/public/assets/content/es/content.md": () => import('./chunks/chunk.4896bd4a.mjs'),},
    () => "/public/assets/content/es/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": content.frontmatter.title, "lang": ELangs.es, "class": "astro-RUN2PSDZ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-RUN2PSDZ" }, { "default": () => render`${renderComponent($$result, "Hero", $$Hero, { "redLine": content.frontmatter?.index.hero.redline, "title": content.frontmatter.index.hero.title, "path": "#callback-form", "btnText": content.frontmatter.index.hero.btnText, "class": "astro-RUN2PSDZ" })}${renderComponent($$result, "About", $$About$6, { "counters": content.frontmatter.counters, "desc": content.frontmatter.index.desc, "title": "About", "class": "astro-RUN2PSDZ" })}${renderComponent($$result, "Map", $$Map, { "title": content.frontmatter.index.mapTitle, "class": "astro-RUN2PSDZ" })}` })}${renderComponent($$result, "How", $$How, { "content": content.frontmatter.howSection, "class": "astro-RUN2PSDZ" })}${renderComponent($$result, "Container", $$Container, { "class": "astro-RUN2PSDZ" }, { "default": () => render`<div class="services-wrp astro-RUN2PSDZ" id="services">
      ${renderComponent($$result, "Services", $$Services, { "title": content.frontmatter.services.title, "lang": ELangs.es, "class": "astro-RUN2PSDZ" })}
    </div>${renderComponent($$result, "Technologies", $$Technologies, { "title": content?.frontmatter.tech.title, "desc": content?.frontmatter.tech.desc, "class": "astro-RUN2PSDZ" })}<div id="callback-form" class="astro-RUN2PSDZ">
      ${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-RUN2PSDZ" })}
    </div>` })}` })}`;
});

const $$file$t = "C:/work-projects/pireactor/main-site/client/src/pages/es/index.astro";
const $$url$t = "/es";

var _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$t,
	'default': $$Index$4,
	file: $$file$t,
	url: $$url$t
}, Symbol.toStringTag, { value: 'Module' }));

async function getStaticPaths$9() {
  const services = await Astro$9.glob(
    { "/public/assets/content/es/services/architecture.md": () => import('./chunks/chunk.ccbb07d8.mjs'), "/public/assets/content/es/services/automation.md": () => import('./chunks/chunk.938b4c4d.mjs'), "/public/assets/content/es/services/blockchain.md": () => import('./chunks/chunk.5f73559c.mjs'), "/public/assets/content/es/services/strategy.md": () => import('./chunks/chunk.9d579503.mjs'), "/public/assets/content/es/services/wallets.md": () => import('./chunks/chunk.000bd02f.mjs'),},
    () => "/public/assets/content/es/services/*.md"
  );
  return services.map((service) => {
    return {
      params: { slug: service.frontmatter.slug },
      props: {
        content: service.Content,
        title: service.frontmatter.title,
        titleDesc: service.frontmatter.titleDesc,
        desc: service.frontmatter.desc,
        values: service.frontmatter.values,
        content: service.Content,
        articles: service.frontmatter.articles,
        heroBtn: service.frontmatter.heroBtn,
        viewBtn: service.frontmatter.viewBtn
      }
    };
  });
}
const $$metadata$s = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/services/[slug].astro", { modules: [{ module: $$module1$2, specifier: "../../../components/MainTitle.astro", assert: {} }, { module: $$module2$5, specifier: "../../../components/shared/Button.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8, specifier: "../../../models/ServicesModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$s = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/services/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro$9 = $$Astro$s;
const $$slug$9 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$slug$9;
  const props = Astro2.props;
  const uri = encodeURI(`/es/work/?${props.title}`);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.en, "class": "astro-QKCWXLNO" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-QKCWXLNO" }, { "default": () => render`<section class="hero astro-QKCWXLNO">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": props.title, "class": "astro-QKCWXLNO" })}
        <p class="astro-QKCWXLNO">
          ${props.titleDesc}
        </p>
        ${renderComponent($$result, "Button", $$Button, { "title": props.heroBtn, "path": "/es/#callback-form", "class": "astro-QKCWXLNO" })}
    </section><section class="desc astro-QKCWXLNO">
      <h2 class="astro-QKCWXLNO">About</h2>
      <div class="desc__wrp astro-QKCWXLNO">
        <p class="astro-QKCWXLNO">${props.desc}</p>
        <div class="desc__counter astro-QKCWXLNO">
          ${props.values.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "client:component-hydration": "load", "client:component-path": $$metadata$s.getPath(Counter$1), "client:component-export": $$metadata$s.getExport(Counter$1), "class": "astro-QKCWXLNO" })}`)}
        </div>
      </div>
    </section>${props.articles.map((i) => render`<section class="article astro-QKCWXLNO">
      <h3 class="article__title astro-QKCWXLNO">${i.title}</h3>
      <div class="article__wrp astro-QKCWXLNO">
        <img class="article__img astro-QKCWXLNO"${addAttribute(i.img, "src")}${addAttribute(i.title, "alt")}>
        <p class="article__desc astro-QKCWXLNO">${i.desc}</p>
      </div>
    </section>`)}<div class="article__view astro-QKCWXLNO">
      ${renderComponent($$result, "Button", $$Button, { "path": uri, "title": props.viewBtn, "class": "astro-QKCWXLNO" })}
    </div>` })}` })}`;
});

const $$file$s = "C:/work-projects/pireactor/main-site/client/src/pages/es/services/[slug].astro";
const $$url$s = "/es/services/[slug]";

var _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getStaticPaths: getStaticPaths$9,
	$$metadata: $$metadata$s,
	'default': $$slug$9,
	file: $$file$s,
	url: $$url$s
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$r = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/about.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2$1, specifier: "../../components/shared/AboutCard.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$3, specifier: "../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$r = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/about.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$About$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$About$4;
  const leads = await Astro2.glob(
    { "/public/assets/content/es/leads/AlexAlejandre.md": () => import('./chunks/chunk.9316eb1e.mjs'), "/public/assets/content/es/leads/JohnVermazenSt.md": () => import('./chunks/chunk.521dead4.mjs'), "/public/assets/content/es/leads/JustynaBorwik.md": () => import('./chunks/chunk.35d644fe.mjs'), "/public/assets/content/es/leads/StevenVermazen.md": () => import('./chunks/chunk.3899904f.mjs'),},
    () => "/public/assets/content/es/leads/*.md"
  );
  const sortLeads = leads.sort((a, b) => a.frontmatter.id - b.frontmatter.id);
  const [content] = await Astro2.glob(
    { "/public/assets/content/es/content.md": () => import('./chunks/chunk.4896bd4a.mjs'),},
    () => "/public/assets/content/es/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "About Us", "lang": ELangs.es, "class": "astro-T4H4SLQZ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-T4H4SLQZ" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "About Us", "class": "astro-T4H4SLQZ" })}<section class="hero astro-T4H4SLQZ">
      ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": content?.frontmatter.about.hero.redline, "title": content?.frontmatter.about.hero.title, "class": "astro-T4H4SLQZ" })}
      <p class="about__desc astro-T4H4SLQZ">
        ${content?.frontmatter.about.desc}
      </p>
    </section>${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.counterTitle, "class": "astro-T4H4SLQZ" }, { "default": () => render`<div class="about__counter astro-T4H4SLQZ">
        ${content.frontmatter.counters.map((el) => render`${renderComponent($$result, "Counter", Counter$1, { "title": el.title, "countTo": el.value, "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$r.getPath(Counter$1), "client:component-export": $$metadata$r.getExport(Counter$1), "class": "astro-T4H4SLQZ" })}`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content.frontmatter.about.whoWeAreTitle, "class": "astro-T4H4SLQZ" }, { "default": () => render`<div class="about__who astro-T4H4SLQZ">
        ${content.frontmatter.about.text.map((i) => render`<p class="astro-T4H4SLQZ">${i}</p>`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.leadsTitle, "class": "astro-T4H4SLQZ" }, { "default": () => render`<div class="leads astro-T4H4SLQZ">
        <ul class="leads-list astro-T4H4SLQZ">
          ${sortLeads.map((lead) => render`${renderComponent($$result, "AboutCard", $$AboutCard, { "desc": lead.frontmatter.desc, "imgSource": lead.frontmatter.imgSource, "name": lead.frontmatter.name, "info": lead.frontmatter.info, "linkLI": lead.frontmatter.linkLI, "linkT": lead.frontmatter.linkT, "class": "astro-T4H4SLQZ" })}`)}
        </ul>
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.locationsTitle, "class": "astro-T4H4SLQZ" }, { "default": () => render`<ul class="location astro-T4H4SLQZ">
        ${content.frontmatter.about.locations.map((i) => render`<li class="location__item astro-T4H4SLQZ">
          <img${addAttribute(i.img, "src")}${addAttribute(i.name, "alt")} class="location__img astro-T4H4SLQZ">
          ${i.name}
        </li>`)}
      </ul>` })}` })}` })}`;
});

const $$file$r = "C:/work-projects/pireactor/main-site/client/src/pages/es/about.astro";
const $$url$r = "/es/about";

var _page9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$r,
	'default': $$About$4,
	file: $$file$r,
	url: $$url$r
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$q = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/brief.astro", { modules: [{ module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$2, specifier: "../../components/shared/FormSection.astro", assert: {} }, { module: $$module3$1, specifier: "../../components/solid/Form", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }], hydratedComponents: [Form], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$q = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/brief.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Brief$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$Brief$4;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Brief", "lang": ELangs.es, "class": "astro-O43VOKX4" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-O43VOKX4" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Brief", "class": "astro-O43VOKX4" })}${renderComponent($$result, "FormSection", $$FormSection, { "class": "astro-O43VOKX4" }, { "default": () => render`${renderComponent($$result, "Form", Form, { "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$q.getPath(Form), "client:component-export": $$metadata$q.getExport(Form), "class": "astro-O43VOKX4" })}` })}` })}` })}`;
});

const $$file$q = "C:/work-projects/pireactor/main-site/client/src/pages/es/brief.astro";
const $$url$q = "/es/brief";

var _page10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$q,
	'default': $$Brief$4,
	file: $$file$q,
	url: $$url$q
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$p = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/work/[slug].astro", { modules: [{ module: $$module1, specifier: "../../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module2$3, specifier: "../../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5, specifier: "../../../enums/EPhases", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../../models/ContentModel", assert: {} }, { module: $$module7, specifier: "../../../models/ProjectModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$p = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/work/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro$8 = $$Astro$p;
async function getStaticPaths$8() {
  const projects = await Astro$8.glob(
    { "/public/assets/content/es/projects/Brewery.md": () => import('./chunks/chunk.f075a1b0.mjs'), "/public/assets/content/es/projects/NewHope copy.md": () => import('./chunks/chunk.c40d7ba2.mjs'), "/public/assets/content/es/projects/NewHope.md": () => import('./chunks/chunk.474beff1.mjs'), "/public/assets/content/es/projects/NewHope2.md": () => import('./chunks/chunk.c534737f.mjs'), "/public/assets/content/es/projects/NewHope3.md": () => import('./chunks/chunk.0d4b752c.mjs'),},
    () => "/public/assets/content/es/projects/*.md"
  );
  return projects.map((project) => {
    return {
      params: { slug: project.frontmatter.slug },
      props: {
        content: project.Content,
        title: project.frontmatter.title,
        img: project.frontmatter.img,
        phases: project.frontmatter.phases,
        bullets: project.frontmatter.bullets,
        result: project.frontmatter.result
      }
    };
  });
}
const $$slug$8 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$slug$8;
  const props = Astro2.props;
  function phasesClass(item) {
    switch (item) {
      case EPhases.dev:
        return "stages__item_dev";
      case EPhases.rel:
        return "stages__item_rel";
      case EPhases.sup:
        return "stages__item_sup";
    }
  }
  const [content] = await Astro2.glob(
    { "/public/assets/content/es/content.md": () => import('./chunks/chunk.4896bd4a.mjs'),},
    () => "/public/assets/content/es/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.en, "class": "astro-HA6RLDHZ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-HA6RLDHZ" }, { "default": () => render`<div class="hero astro-HA6RLDHZ"${addAttribute(`--url: url("${props.img}")`, "style")}>
      <h1 class="astro-HA6RLDHZ">${props.title}</h1>
    </div>${renderComponent($$result, "Section", $$Section, { "title": "Stages of project", "class": "astro-HA6RLDHZ" }, { "default": () => render`<ul class="stages__list astro-HA6RLDHZ">
        ${props.phases.map((i) => render`<li${addAttribute(`stages__item ${phasesClass(i.icon)} astro-HA6RLDHZ`, "class")}>
          <div class="stages__title astro-HA6RLDHZ">${i.name}</div>
          <div class="stages__period astro-HA6RLDHZ">${i.period}</div>
        </li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Application functionality", "class": "astro-HA6RLDHZ" }, { "default": () => render`<ul class="bullets astro-HA6RLDHZ">
        ${props.bullets.map((i) => render`<li class="bullets__item astro-HA6RLDHZ">${i}</li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Solution", "class": "astro-HA6RLDHZ" }, { "default": () => render`<div class="solution astro-HA6RLDHZ">
        ${renderComponent($$result, "props.content", props.content, { "class": "astro-HA6RLDHZ" })}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": "Results", "class": "astro-HA6RLDHZ" }, { "default": () => render`<div class="counter astro-HA6RLDHZ">
        ${props.result.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "format": i.format, "client:component-hydration": "load", "client:component-path": $$metadata$p.getPath(Counter$1), "client:component-export": $$metadata$p.getExport(Counter$1), "class": "astro-HA6RLDHZ" })}`)}
      </div>` })}${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-HA6RLDHZ" })}` })}` })}`;
});

const $$file$p = "C:/work-projects/pireactor/main-site/client/src/pages/es/work/[slug].astro";
const $$url$p = "/es/work/[slug]";

var _page11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$p,
	getStaticPaths: getStaticPaths$8,
	'default': $$slug$8,
	file: $$file$p,
	url: $$url$p
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$o = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/work.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module3, specifier: "../../components/solid/Projects", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module7, specifier: "../../models/ProjectModel", assert: {} }, { module: $$module8, specifier: "../../models/ServicesModel", assert: {} }], hydratedComponents: [Projects], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$o = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/es/work.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Work$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Work$4;
  const projectsRaw = await Astro2.glob(
    { "/public/assets/content/es/projects/Brewery.md": () => import('./chunks/chunk.f075a1b0.mjs'), "/public/assets/content/es/projects/NewHope copy.md": () => import('./chunks/chunk.c40d7ba2.mjs'), "/public/assets/content/es/projects/NewHope.md": () => import('./chunks/chunk.474beff1.mjs'), "/public/assets/content/es/projects/NewHope2.md": () => import('./chunks/chunk.c534737f.mjs'), "/public/assets/content/es/projects/NewHope3.md": () => import('./chunks/chunk.0d4b752c.mjs'),},
    () => "/public/assets/content/es/projects/*.md"
  );
  const projects = projectsRaw.map((i) => {
    return {
      desc: i.frontmatter.desc,
      developers: i.frontmatter.developers,
      months: i.frontmatter.months,
      phases: i.frontmatter.phases,
      slug: i.frontmatter.slug,
      title: i.frontmatter.title,
      tags: i.frontmatter.tags,
      img: i.frontmatter.img
    };
  });
  const url = Astro2.request.url;
  const services = await Astro2.glob(
    { "/public/assets/content/es/services/architecture.md": () => import('./chunks/chunk.ccbb07d8.mjs'), "/public/assets/content/es/services/automation.md": () => import('./chunks/chunk.938b4c4d.mjs'), "/public/assets/content/es/services/blockchain.md": () => import('./chunks/chunk.5f73559c.mjs'), "/public/assets/content/es/services/strategy.md": () => import('./chunks/chunk.9d579503.mjs'), "/public/assets/content/es/services/wallets.md": () => import('./chunks/chunk.000bd02f.mjs'),},
    () => "/public/assets/content/es/services/*.md"
  );
  const servicesNames = services.map((i) => ({
    name: i.frontmatter.title
  }));
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Portfolio", "lang": ELangs.es, "class": "astro-MFHWZIZR" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-MFHWZIZR" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Portfolio", "class": "astro-MFHWZIZR" })}<section class="hero astro-MFHWZIZR">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": "Explore", "title": "our Work", "class": "astro-MFHWZIZR" })}
        <p class="hero__desc astro-MFHWZIZR">
          We apply modern technologies to unlock new markets, expand your business opportunities and bring you one step closer to success. We combine developpers with designers,
          translators with copywriters, all subject matter experts in their fields, implementing what works. 
        </p>
    </section>${renderComponent($$result, "Projects", Projects, { "client:load": true, "servicesNames": servicesNames, "projects": projects, "url": url, "allBtnTitle": "All Projects", "learnMoreText": "More Information", "langHref": ELangs.en, "client:component-hydration": "load", "client:component-path": $$metadata$o.getPath(Projects), "client:component-export": $$metadata$o.getExport(Projects), "class": "astro-MFHWZIZR" })}` })}` })}

`;
});

const $$file$o = "C:/work-projects/pireactor/main-site/client/src/pages/es/work.astro";
const $$url$o = "/es/work";

var _page12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$o,
	'default': $$Work$4,
	file: $$file$o,
	url: $$url$o
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$n = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/index.astro", { modules: [{ module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module2$4, specifier: "../../components/main/Hero.astro", assert: {} }, { module: $$module3$2, specifier: "../../components/main/About.astro", assert: {} }, { module: $$module4, specifier: "../../components/main/Map.astro", assert: {} }, { module: $$module5$1, specifier: "../../components/main/How.astro", assert: {} }, { module: $$module6, specifier: "../../components/main/Services.astro", assert: {} }, { module: $$module7$1, specifier: "../../components/main/Technologies.astro", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module1, specifier: "../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$n = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/index.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Index$3;
  const [content] = await Astro2.glob(
    { "/public/assets/content/pl/content.md": () => import('./chunks/chunk.832d7e87.mjs'),},
    () => "/public/assets/content/pl/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": content.frontmatter.title, "lang": ELangs.pl, "class": "astro-JR5A7WNZ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-JR5A7WNZ" }, { "default": () => render`${renderComponent($$result, "Hero", $$Hero, { "redLine": content.frontmatter?.index.hero.redline, "title": content.frontmatter.index.hero.title, "path": "pl/#callback-form", "btnText": content.frontmatter.index.hero.btnText, "class": "astro-JR5A7WNZ" })}${renderComponent($$result, "About", $$About$6, { "counters": content.frontmatter.counters, "desc": content.frontmatter.index.desc, "title": "About", "class": "astro-JR5A7WNZ" })}${renderComponent($$result, "Map", $$Map, { "title": content.frontmatter.index.mapTitle, "class": "astro-JR5A7WNZ" })}` })}${renderComponent($$result, "How", $$How, { "content": content.frontmatter.howSection, "class": "astro-JR5A7WNZ" })}${renderComponent($$result, "Container", $$Container, { "class": "astro-JR5A7WNZ" }, { "default": () => render`<div class="services-wrp astro-JR5A7WNZ" id="services">
      ${renderComponent($$result, "Services", $$Services, { "title": content.frontmatter.services.title, "lang": ELangs.en, "class": "astro-JR5A7WNZ" })}
    </div>${renderComponent($$result, "Technologies", $$Technologies, { "title": content?.frontmatter.tech.title, "desc": content?.frontmatter.tech.desc, "class": "astro-JR5A7WNZ" })}<div id="callback-form" class="astro-JR5A7WNZ">
      ${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-JR5A7WNZ" })}
    </div>` })}` })}`;
});

const $$file$n = "C:/work-projects/pireactor/main-site/client/src/pages/pl/index.astro";
const $$url$n = "/pl";

var _page13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$n,
	'default': $$Index$3,
	file: $$file$n,
	url: $$url$n
}, Symbol.toStringTag, { value: 'Module' }));

async function getStaticPaths$7() {
  const services = await Astro$7.glob(
    { "/public/assets/content/pl/services/architecture.md": () => import('./chunks/chunk.2186ae96.mjs'), "/public/assets/content/pl/services/automation.md": () => import('./chunks/chunk.b391d7bf.mjs'), "/public/assets/content/pl/services/blockchain.md": () => import('./chunks/chunk.f9b7a791.mjs'), "/public/assets/content/pl/services/strategy.md": () => import('./chunks/chunk.64fc4e6e.mjs'), "/public/assets/content/pl/services/wallets.md": () => import('./chunks/chunk.e49a8342.mjs'),},
    () => "/public/assets/content/pl/services/*.md"
  );
  return services.map((service) => {
    return {
      params: { slug: service.frontmatter.slug },
      props: {
        content: service.Content,
        title: service.frontmatter.title,
        titleDesc: service.frontmatter.titleDesc,
        desc: service.frontmatter.desc,
        values: service.frontmatter.values,
        content: service.Content,
        articles: service.frontmatter.articles,
        heroBtn: service.frontmatter.heroBtn,
        viewBtn: service.frontmatter.viewBtn
      }
    };
  });
}
const $$metadata$m = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/services/[slug].astro", { modules: [{ module: $$module1$2, specifier: "../../../components/MainTitle.astro", assert: {} }, { module: $$module2$5, specifier: "../../../components/shared/Button.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8, specifier: "../../../models/ServicesModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$m = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/services/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro$7 = $$Astro$m;
const $$slug$7 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$slug$7;
  const props = Astro2.props;
  const uri = encodeURI(`/pl/work/?${props.title}`);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.en, "class": "astro-RBKQJOES" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-RBKQJOES" }, { "default": () => render`<section class="hero astro-RBKQJOES">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": props.title, "class": "astro-RBKQJOES" })}
        <p class="astro-RBKQJOES">
          ${props.titleDesc}
        </p>
        ${renderComponent($$result, "Button", $$Button, { "title": props.heroBtn, "path": "/pl/#callback-form", "class": "astro-RBKQJOES" })}
    </section><section class="desc astro-RBKQJOES">
      <h2 class="astro-RBKQJOES">About</h2>
      <div class="desc__wrp astro-RBKQJOES">
        <p class="astro-RBKQJOES">${props.desc}</p>
        <div class="desc__counter astro-RBKQJOES">
          ${props.values.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "client:component-hydration": "load", "client:component-path": $$metadata$m.getPath(Counter$1), "client:component-export": $$metadata$m.getExport(Counter$1), "class": "astro-RBKQJOES" })}`)}
        </div>
      </div>
    </section>${props.articles.map((i) => render`<section class="article astro-RBKQJOES">
      <h3 class="article__title astro-RBKQJOES">${i.title}</h3>
      <div class="article__wrp astro-RBKQJOES">
        <img class="article__img astro-RBKQJOES"${addAttribute(i.img, "src")}${addAttribute(i.title, "alt")}>
        <p class="article__desc astro-RBKQJOES">${i.desc}</p>
      </div>
    </section>`)}<div class="article__view astro-RBKQJOES">
      ${renderComponent($$result, "Button", $$Button, { "path": uri, "title": props.viewBtn, "class": "astro-RBKQJOES" })}
    </div>` })}` })}`;
});

const $$file$m = "C:/work-projects/pireactor/main-site/client/src/pages/pl/services/[slug].astro";
const $$url$m = "/pl/services/[slug]";

var _page14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getStaticPaths: getStaticPaths$7,
	$$metadata: $$metadata$m,
	'default': $$slug$7,
	file: $$file$m,
	url: $$url$m
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$l = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/about.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2$1, specifier: "../../components/shared/AboutCard.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$3, specifier: "../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$l = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/about.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$About$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$About$3;
  const leads = await Astro2.glob(
    { "/public/assets/content/pl/leads/AlexAlejandre.md": () => import('./chunks/chunk.cfba225e.mjs'), "/public/assets/content/pl/leads/JohnVermazenSt.md": () => import('./chunks/chunk.45b86101.mjs'), "/public/assets/content/pl/leads/JustynaBorwik.md": () => import('./chunks/chunk.b711c874.mjs'), "/public/assets/content/pl/leads/StevenVermazen.md": () => import('./chunks/chunk.ba210a2f.mjs'),},
    () => "/public/assets/content/pl/leads/*.md"
  );
  const sortLeads = leads.sort((a, b) => a.frontmatter.id - b.frontmatter.id);
  const [content] = await Astro2.glob(
    { "/public/assets/content/pl/content.md": () => import('./chunks/chunk.832d7e87.mjs'),},
    () => "/public/assets/content/pl/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "About Us", "lang": ELangs.en, "class": "astro-4D4O3JD4" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-4D4O3JD4" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "About Us", "class": "astro-4D4O3JD4" })}<section class="hero astro-4D4O3JD4">
      ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": content?.frontmatter.about.hero.redline, "title": content?.frontmatter.about.hero.title, "class": "astro-4D4O3JD4" })}
      <p class="about__desc astro-4D4O3JD4">
        ${content?.frontmatter.about.desc}
      </p>
    </section>${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.counterTitle, "class": "astro-4D4O3JD4" }, { "default": () => render`<div class="about__counter astro-4D4O3JD4">
        ${content.frontmatter.counters.map((el) => render`${renderComponent($$result, "Counter", Counter$1, { "title": el.title, "countTo": el.value, "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$l.getPath(Counter$1), "client:component-export": $$metadata$l.getExport(Counter$1), "class": "astro-4D4O3JD4" })}`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content.frontmatter.about.whoWeAreTitle, "class": "astro-4D4O3JD4" }, { "default": () => render`<div class="about__who astro-4D4O3JD4">
        ${content.frontmatter.about.text.map((i) => render`<p class="astro-4D4O3JD4">${i}</p>`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.leadsTitle, "class": "astro-4D4O3JD4" }, { "default": () => render`<div class="leads astro-4D4O3JD4">
        <ul class="leads-list astro-4D4O3JD4">
          ${sortLeads.map((lead) => render`${renderComponent($$result, "AboutCard", $$AboutCard, { "desc": lead.frontmatter.desc, "imgSource": lead.frontmatter.imgSource, "name": lead.frontmatter.name, "info": lead.frontmatter.info, "linkLI": lead.frontmatter.linkLI, "linkT": lead.frontmatter.linkT, "class": "astro-4D4O3JD4" })}`)}
        </ul>
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.locationsTitle, "class": "astro-4D4O3JD4" }, { "default": () => render`<ul class="location astro-4D4O3JD4">
        ${content.frontmatter.about.locations.map((i) => render`<li class="location__item astro-4D4O3JD4">
          <img${addAttribute(i.img, "src")}${addAttribute(i.name, "alt")} class="location__img astro-4D4O3JD4">
          ${i.name}
        </li>`)}
      </ul>` })}` })}` })}`;
});

const $$file$l = "C:/work-projects/pireactor/main-site/client/src/pages/pl/about.astro";
const $$url$l = "/pl/about";

var _page15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$l,
	'default': $$About$3,
	file: $$file$l,
	url: $$url$l
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$k = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/brief.astro", { modules: [{ module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$2, specifier: "../../components/shared/FormSection.astro", assert: {} }, { module: $$module3$1, specifier: "../../components/solid/Form", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }], hydratedComponents: [Form], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$k = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/brief.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Brief$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Brief$3;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Brief", "lang": ELangs.pl, "class": "astro-E3BCZCCX" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-E3BCZCCX" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Brief", "class": "astro-E3BCZCCX" })}${renderComponent($$result, "FormSection", $$FormSection, { "class": "astro-E3BCZCCX" }, { "default": () => render`${renderComponent($$result, "Form", Form, { "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$k.getPath(Form), "client:component-export": $$metadata$k.getExport(Form), "class": "astro-E3BCZCCX" })}` })}` })}` })}`;
});

const $$file$k = "C:/work-projects/pireactor/main-site/client/src/pages/pl/brief.astro";
const $$url$k = "/pl/brief";

var _page16 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$k,
	'default': $$Brief$3,
	file: $$file$k,
	url: $$url$k
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$j = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/work/[slug].astro", { modules: [{ module: $$module1, specifier: "../../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module2$3, specifier: "../../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5, specifier: "../../../enums/EPhases", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../../models/ContentModel", assert: {} }, { module: $$module7, specifier: "../../../models/ProjectModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$j = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/work/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro$6 = $$Astro$j;
async function getStaticPaths$6() {
  const projects = await Astro$6.glob(
    { "/public/assets/content/pl/projects/Brewery.md": () => import('./chunks/chunk.6d7ffc88.mjs'), "/public/assets/content/pl/projects/NewHope copy.md": () => import('./chunks/chunk.dcec0156.mjs'), "/public/assets/content/pl/projects/NewHope.md": () => import('./chunks/chunk.02d4d6c8.mjs'), "/public/assets/content/pl/projects/NewHope2.md": () => import('./chunks/chunk.9053395b.mjs'), "/public/assets/content/pl/projects/NewHope3.md": () => import('./chunks/chunk.ae655f4f.mjs'),},
    () => "/public/assets/content/pl/projects/*.md"
  );
  return projects.map((project) => {
    return {
      params: { slug: project.frontmatter.slug },
      props: {
        content: project.Content,
        title: project.frontmatter.title,
        img: project.frontmatter.img,
        phases: project.frontmatter.phases,
        bullets: project.frontmatter.bullets,
        result: project.frontmatter.result
      }
    };
  });
}
const $$slug$6 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$slug$6;
  const props = Astro2.props;
  function phasesClass(item) {
    switch (item) {
      case EPhases.dev:
        return "stages__item_dev";
      case EPhases.rel:
        return "stages__item_rel";
      case EPhases.sup:
        return "stages__item_sup";
    }
  }
  const [content] = await Astro2.glob(
    { "/public/assets/content/pl/content.md": () => import('./chunks/chunk.832d7e87.mjs'),},
    () => "/public/assets/content/pl/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.pl, "class": "astro-KIAHOJOA" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-KIAHOJOA" }, { "default": () => render`<div class="hero astro-KIAHOJOA"${addAttribute(`--url: url("${props.img}")`, "style")}>
      <h1 class="astro-KIAHOJOA">${props.title}</h1>
    </div>${renderComponent($$result, "Section", $$Section, { "title": "Stages of project", "class": "astro-KIAHOJOA" }, { "default": () => render`<ul class="stages__list astro-KIAHOJOA">
        ${props.phases.map((i) => render`<li${addAttribute(`stages__item ${phasesClass(i.icon)} astro-KIAHOJOA`, "class")}>
          <div class="stages__title astro-KIAHOJOA">${i.name}</div>
          <div class="stages__period astro-KIAHOJOA">${i.period}</div>
        </li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Application functionality", "class": "astro-KIAHOJOA" }, { "default": () => render`<ul class="bullets astro-KIAHOJOA">
        ${props.bullets.map((i) => render`<li class="bullets__item astro-KIAHOJOA">${i}</li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Solution", "class": "astro-KIAHOJOA" }, { "default": () => render`<div class="solution astro-KIAHOJOA">
        ${renderComponent($$result, "props.content", props.content, { "class": "astro-KIAHOJOA" })}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": "Results", "class": "astro-KIAHOJOA" }, { "default": () => render`<div class="counter astro-KIAHOJOA">
        ${props.result.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "format": i.format, "client:component-hydration": "load", "client:component-path": $$metadata$j.getPath(Counter$1), "client:component-export": $$metadata$j.getExport(Counter$1), "class": "astro-KIAHOJOA" })}`)}
      </div>` })}${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-KIAHOJOA" })}` })}` })}`;
});

const $$file$j = "C:/work-projects/pireactor/main-site/client/src/pages/pl/work/[slug].astro";
const $$url$j = "/pl/work/[slug]";

var _page17 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$j,
	getStaticPaths: getStaticPaths$6,
	'default': $$slug$6,
	file: $$file$j,
	url: $$url$j
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$i = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/work.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module3, specifier: "../../components/solid/Projects", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module7, specifier: "../../models/ProjectModel", assert: {} }, { module: $$module8, specifier: "../../models/ServicesModel", assert: {} }], hydratedComponents: [Projects], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$i = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/pl/work.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Work$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Work$3;
  const projectsRaw = await Astro2.glob(
    { "/public/assets/content/en/projects/Brewery.md": () => import('./chunks/chunk.29bcfbb2.mjs'), "/public/assets/content/en/projects/NewHope copy.md": () => import('./chunks/chunk.dbd11095.mjs'), "/public/assets/content/en/projects/NewHope.md": () => import('./chunks/chunk.79884e51.mjs'), "/public/assets/content/en/projects/NewHope2.md": () => import('./chunks/chunk.787538be.mjs'), "/public/assets/content/en/projects/NewHope3.md": () => import('./chunks/chunk.09debec5.mjs'),},
    () => "/public/assets/content/en/projects/*.md"
  );
  const projects = projectsRaw.map((i) => {
    return {
      desc: i.frontmatter.desc,
      developers: i.frontmatter.developers,
      months: i.frontmatter.months,
      phases: i.frontmatter.phases,
      slug: i.frontmatter.slug,
      title: i.frontmatter.title,
      tags: i.frontmatter.tags,
      img: i.frontmatter.img
    };
  });
  const url = Astro2.request.url;
  const services = await Astro2.glob(
    { "/public/assets/content/en/services/architecture.md": () => import('./chunks/chunk.93527cb3.mjs'), "/public/assets/content/en/services/automation.md": () => import('./chunks/chunk.59824c95.mjs'), "/public/assets/content/en/services/blockchain.md": () => import('./chunks/chunk.7c3d0c0b.mjs'), "/public/assets/content/en/services/strategy.md": () => import('./chunks/chunk.33bb18a9.mjs'), "/public/assets/content/en/services/wallets.md": () => import('./chunks/chunk.ee134a3e.mjs'),},
    () => "/public/assets/content/en/services/*.md"
  );
  const servicesNames = services.map((i) => ({
    name: i.frontmatter.title
  }));
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Portfolio", "lang": ELangs.en, "class": "astro-SMR3IJSC" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-SMR3IJSC" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Portfolio", "class": "astro-SMR3IJSC" })}<section class="hero astro-SMR3IJSC">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": "Explore", "title": "our Work", "class": "astro-SMR3IJSC" })}
        <p class="hero__desc astro-SMR3IJSC">
          We apply modern technologies to unlock new markets, expand your business opportunities and bring you one step closer to success. We combine developpers with designers,
          translators with copywriters, all subject matter experts in their fields, implementing what works. 
        </p>
    </section>${renderComponent($$result, "Projects", Projects, { "client:load": true, "servicesNames": servicesNames, "projects": projects, "url": url, "allBtnTitle": "All Projects", "learnMoreText": "More Information", "langHref": ELangs.en, "client:component-hydration": "load", "client:component-path": $$metadata$i.getPath(Projects), "client:component-export": $$metadata$i.getExport(Projects), "class": "astro-SMR3IJSC" })}` })}` })}

`;
});

const $$file$i = "C:/work-projects/pireactor/main-site/client/src/pages/pl/work.astro";
const $$url$i = "/pl/work";

var _page18 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$i,
	'default': $$Work$3,
	file: $$file$i,
	url: $$url$i
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$h = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/index.astro", { modules: [{ module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module2$4, specifier: "../../components/main/Hero.astro", assert: {} }, { module: $$module3$2, specifier: "../../components/main/About.astro", assert: {} }, { module: $$module4, specifier: "../../components/main/Map.astro", assert: {} }, { module: $$module5$1, specifier: "../../components/main/How.astro", assert: {} }, { module: $$module6, specifier: "../../components/main/Services.astro", assert: {} }, { module: $$module7$1, specifier: "../../components/main/Technologies.astro", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module1, specifier: "../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$h = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/index.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Index$2;
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": content.frontmatter.title, "lang": ELangs.en, "class": "astro-REHVHBA2" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-REHVHBA2" }, { "default": () => render`${renderComponent($$result, "Hero", $$Hero, { "redLine": content.frontmatter?.index.hero.redline, "title": content.frontmatter.index.hero.title, "path": "#callback-form", "btnText": content.frontmatter.index.hero.btnText, "class": "astro-REHVHBA2" })}${renderComponent($$result, "About", $$About$6, { "counters": content.frontmatter.counters, "desc": content.frontmatter.index.desc, "title": "About", "class": "astro-REHVHBA2" })}${renderComponent($$result, "Map", $$Map, { "title": content.frontmatter.index.mapTitle, "class": "astro-REHVHBA2" })}` })}${renderComponent($$result, "How", $$How, { "content": content.frontmatter.howSection, "class": "astro-REHVHBA2" })}${renderComponent($$result, "Container", $$Container, { "class": "astro-REHVHBA2" }, { "default": () => render`<div class="services-wrp astro-REHVHBA2" id="services">
      ${renderComponent($$result, "Services", $$Services, { "title": content.frontmatter.services.title, "lang": ELangs.en, "class": "astro-REHVHBA2" })}
    </div>${renderComponent($$result, "Technologies", $$Technologies, { "title": content?.frontmatter.tech.title, "desc": content?.frontmatter.tech.desc, "class": "astro-REHVHBA2" })}<div id="callback-form" class="astro-REHVHBA2">
      ${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-REHVHBA2" })}
    </div>` })}` })}`;
});

const $$file$h = "C:/work-projects/pireactor/main-site/client/src/pages/ru/index.astro";
const $$url$h = "/ru";

var _page19 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$h,
	'default': $$Index$2,
	file: $$file$h,
	url: $$url$h
}, Symbol.toStringTag, { value: 'Module' }));

async function getStaticPaths$5() {
  const services = await Astro$5.glob(
    { "/public/assets/content/en/services/architecture.md": () => import('./chunks/chunk.93527cb3.mjs'), "/public/assets/content/en/services/automation.md": () => import('./chunks/chunk.59824c95.mjs'), "/public/assets/content/en/services/blockchain.md": () => import('./chunks/chunk.7c3d0c0b.mjs'), "/public/assets/content/en/services/strategy.md": () => import('./chunks/chunk.33bb18a9.mjs'), "/public/assets/content/en/services/wallets.md": () => import('./chunks/chunk.ee134a3e.mjs'),},
    () => "/public/assets/content/en/services/*.md"
  );
  return services.map((service) => {
    return {
      params: { slug: service.frontmatter.slug },
      props: {
        content: service.Content,
        title: service.frontmatter.title,
        titleDesc: service.frontmatter.titleDesc,
        desc: service.frontmatter.desc,
        values: service.frontmatter.values,
        content: service.Content,
        articles: service.frontmatter.articles,
        heroBtn: service.frontmatter.heroBtn,
        viewBtn: service.frontmatter.viewBtn
      }
    };
  });
}
const $$metadata$g = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/services/[slug].astro", { modules: [{ module: $$module1$2, specifier: "../../../components/MainTitle.astro", assert: {} }, { module: $$module2$5, specifier: "../../../components/shared/Button.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8, specifier: "../../../models/ServicesModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$g = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/services/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro$5 = $$Astro$g;
const $$slug$5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$slug$5;
  const props = Astro2.props;
  const uri = encodeURI(`/en/work/?${props.title}`);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.en, "class": "astro-WWB66DLJ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-WWB66DLJ" }, { "default": () => render`<section class="hero astro-WWB66DLJ">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": props.title, "class": "astro-WWB66DLJ" })}
        <p class="astro-WWB66DLJ">
          ${props.titleDesc}
        </p>
        ${renderComponent($$result, "Button", $$Button, { "title": props.heroBtn, "path": "/en/#callback-form", "class": "astro-WWB66DLJ" })}
    </section><section class="desc astro-WWB66DLJ">
      <h2 class="astro-WWB66DLJ">About</h2>
      <div class="desc__wrp astro-WWB66DLJ">
        <p class="astro-WWB66DLJ">${props.desc}</p>
        <div class="desc__counter astro-WWB66DLJ">
          ${props.values.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "client:component-hydration": "load", "client:component-path": $$metadata$g.getPath(Counter$1), "client:component-export": $$metadata$g.getExport(Counter$1), "class": "astro-WWB66DLJ" })}`)}
        </div>
      </div>
    </section>${props.articles.map((i) => render`<section class="article astro-WWB66DLJ">
      <h3 class="article__title astro-WWB66DLJ">${i.title}</h3>
      <div class="article__wrp astro-WWB66DLJ">
        <img class="article__img astro-WWB66DLJ"${addAttribute(i.img, "src")}${addAttribute(i.title, "alt")}>
        <p class="article__desc astro-WWB66DLJ">${i.desc}</p>
      </div>
    </section>`)}<div class="article__view astro-WWB66DLJ">
      ${renderComponent($$result, "Button", $$Button, { "path": uri, "title": props.viewBtn, "class": "astro-WWB66DLJ" })}
    </div>` })}` })}`;
});

const $$file$g = "C:/work-projects/pireactor/main-site/client/src/pages/ru/services/[slug].astro";
const $$url$g = "/ru/services/[slug]";

var _page20 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getStaticPaths: getStaticPaths$5,
	$$metadata: $$metadata$g,
	'default': $$slug$5,
	file: $$file$g,
	url: $$url$g
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$f = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/about.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2$1, specifier: "../../components/shared/AboutCard.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$3, specifier: "../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$f = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/about.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$About$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$About$2;
  const leads = await Astro2.glob(
    { "/public/assets/content/en/leads/AlexAlejandre.md": () => import('./chunks/chunk.a5de9f52.mjs'), "/public/assets/content/en/leads/JohnVermazenSt.md": () => import('./chunks/chunk.198b97c3.mjs'), "/public/assets/content/en/leads/JustynaBorwik.md": () => import('./chunks/chunk.2f992be1.mjs'), "/public/assets/content/en/leads/StevenVermazen.md": () => import('./chunks/chunk.d08d6e4f.mjs'),},
    () => "/public/assets/content/en/leads/*.md"
  );
  const sortLeads = leads.sort((a, b) => a.frontmatter.id - b.frontmatter.id);
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "About Us", "lang": ELangs.en, "class": "astro-KVNL2NNH" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-KVNL2NNH" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "About Us", "class": "astro-KVNL2NNH" })}<section class="hero astro-KVNL2NNH">
      ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": content?.frontmatter.about.hero.redline, "title": content?.frontmatter.about.hero.title, "class": "astro-KVNL2NNH" })}
      <p class="about__desc astro-KVNL2NNH">
        ${content?.frontmatter.about.desc}
      </p>
    </section>${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.counterTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="about__counter astro-KVNL2NNH">
        ${content.frontmatter.counters.map((el) => render`${renderComponent($$result, "Counter", Counter$1, { "title": el.title, "countTo": el.value, "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$f.getPath(Counter$1), "client:component-export": $$metadata$f.getExport(Counter$1), "class": "astro-KVNL2NNH" })}`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content.frontmatter.about.whoWeAreTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="about__who astro-KVNL2NNH">
        ${content.frontmatter.about.text.map((i) => render`<p class="astro-KVNL2NNH">${i}</p>`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.leadsTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="leads astro-KVNL2NNH">
        <ul class="leads-list astro-KVNL2NNH">
          ${sortLeads.map((lead) => render`${renderComponent($$result, "AboutCard", $$AboutCard, { "desc": lead.frontmatter.desc, "imgSource": lead.frontmatter.imgSource, "name": lead.frontmatter.name, "info": lead.frontmatter.info, "linkLI": lead.frontmatter.linkLI, "linkT": lead.frontmatter.linkT, "class": "astro-KVNL2NNH" })}`)}
        </ul>
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.locationsTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<ul class="location astro-KVNL2NNH">
        ${content.frontmatter.about.locations.map((i) => render`<li class="location__item astro-KVNL2NNH">
          <img${addAttribute(i.img, "src")}${addAttribute(i.name, "alt")} class="location__img astro-KVNL2NNH">
          ${i.name}
        </li>`)}
      </ul>` })}` })}` })}`;
});

const $$file$f = "C:/work-projects/pireactor/main-site/client/src/pages/ru/about.astro";
const $$url$f = "/ru/about";

var _page21 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$f,
	'default': $$About$2,
	file: $$file$f,
	url: $$url$f
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$e = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/brief.astro", { modules: [{ module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$2, specifier: "../../components/shared/FormSection.astro", assert: {} }, { module: $$module3$1, specifier: "../../components/solid/Form", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }], hydratedComponents: [Form], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$e = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/brief.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Brief$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Brief$2;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Brief", "lang": ELangs.en, "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Brief", "class": "astro-ERY3GRSQ" })}${renderComponent($$result, "FormSection", $$FormSection, { "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Form", Form, { "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$e.getPath(Form), "client:component-export": $$metadata$e.getExport(Form), "class": "astro-ERY3GRSQ" })}` })}` })}` })}`;
});

const $$file$e = "C:/work-projects/pireactor/main-site/client/src/pages/ru/brief.astro";
const $$url$e = "/ru/brief";

var _page22 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$e,
	'default': $$Brief$2,
	file: $$file$e,
	url: $$url$e
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$d = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/work/[slug].astro", { modules: [{ module: $$module1, specifier: "../../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module2$3, specifier: "../../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5, specifier: "../../../enums/EPhases", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../../models/ContentModel", assert: {} }, { module: $$module7, specifier: "../../../models/ProjectModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$d = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/work/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro$4 = $$Astro$d;
async function getStaticPaths$4() {
  const projects = await Astro$4.glob(
    { "/public/assets/content/en/projects/Brewery.md": () => import('./chunks/chunk.29bcfbb2.mjs'), "/public/assets/content/en/projects/NewHope copy.md": () => import('./chunks/chunk.dbd11095.mjs'), "/public/assets/content/en/projects/NewHope.md": () => import('./chunks/chunk.79884e51.mjs'), "/public/assets/content/en/projects/NewHope2.md": () => import('./chunks/chunk.787538be.mjs'), "/public/assets/content/en/projects/NewHope3.md": () => import('./chunks/chunk.09debec5.mjs'),},
    () => "/public/assets/content/en/projects/*.md"
  );
  return projects.map((project) => {
    return {
      params: { slug: project.frontmatter.slug },
      props: {
        content: project.Content,
        title: project.frontmatter.title,
        img: project.frontmatter.img,
        phases: project.frontmatter.phases,
        bullets: project.frontmatter.bullets,
        result: project.frontmatter.result
      }
    };
  });
}
const $$slug$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$slug$4;
  const props = Astro2.props;
  function phasesClass(item) {
    switch (item) {
      case EPhases.dev:
        return "stages__item_dev";
      case EPhases.rel:
        return "stages__item_rel";
      case EPhases.sup:
        return "stages__item_sup";
    }
  }
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.en, "class": "astro-2CQBPXFM" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="hero astro-2CQBPXFM"${addAttribute(`--url: url("${props.img}")`, "style")}>
      <h1 class="astro-2CQBPXFM">${props.title}</h1>
    </div>${renderComponent($$result, "Section", $$Section, { "title": "Stages of project", "class": "astro-2CQBPXFM" }, { "default": () => render`<ul class="stages__list astro-2CQBPXFM">
        ${props.phases.map((i) => render`<li${addAttribute(`stages__item ${phasesClass(i.icon)} astro-2CQBPXFM`, "class")}>
          <div class="stages__title astro-2CQBPXFM">${i.name}</div>
          <div class="stages__period astro-2CQBPXFM">${i.period}</div>
        </li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Application functionality", "class": "astro-2CQBPXFM" }, { "default": () => render`<ul class="bullets astro-2CQBPXFM">
        ${props.bullets.map((i) => render`<li class="bullets__item astro-2CQBPXFM">${i}</li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Solution", "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="solution astro-2CQBPXFM">
        ${renderComponent($$result, "props.content", props.content, { "class": "astro-2CQBPXFM" })}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": "Results", "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="counter astro-2CQBPXFM">
        ${props.result.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "format": i.format, "client:component-hydration": "load", "client:component-path": $$metadata$d.getPath(Counter$1), "client:component-export": $$metadata$d.getExport(Counter$1), "class": "astro-2CQBPXFM" })}`)}
      </div>` })}${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-2CQBPXFM" })}` })}` })}`;
});

const $$file$d = "C:/work-projects/pireactor/main-site/client/src/pages/ru/work/[slug].astro";
const $$url$d = "/ru/work/[slug]";

var _page23 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$d,
	getStaticPaths: getStaticPaths$4,
	'default': $$slug$4,
	file: $$file$d,
	url: $$url$d
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$c = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/work.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module3, specifier: "../../components/solid/Projects", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module7, specifier: "../../models/ProjectModel", assert: {} }, { module: $$module8, specifier: "../../models/ServicesModel", assert: {} }], hydratedComponents: [Projects], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$c = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ru/work.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Work$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Work$2;
  const projectsRaw = await Astro2.glob(
    { "/public/assets/content/en/projects/Brewery.md": () => import('./chunks/chunk.29bcfbb2.mjs'), "/public/assets/content/en/projects/NewHope copy.md": () => import('./chunks/chunk.dbd11095.mjs'), "/public/assets/content/en/projects/NewHope.md": () => import('./chunks/chunk.79884e51.mjs'), "/public/assets/content/en/projects/NewHope2.md": () => import('./chunks/chunk.787538be.mjs'), "/public/assets/content/en/projects/NewHope3.md": () => import('./chunks/chunk.09debec5.mjs'),},
    () => "/public/assets/content/en/projects/*.md"
  );
  const projects = projectsRaw.map((i) => {
    return {
      desc: i.frontmatter.desc,
      developers: i.frontmatter.developers,
      months: i.frontmatter.months,
      phases: i.frontmatter.phases,
      slug: i.frontmatter.slug,
      title: i.frontmatter.title,
      tags: i.frontmatter.tags,
      img: i.frontmatter.img
    };
  });
  const url = Astro2.request.url;
  const services = await Astro2.glob(
    { "/public/assets/content/en/services/architecture.md": () => import('./chunks/chunk.93527cb3.mjs'), "/public/assets/content/en/services/automation.md": () => import('./chunks/chunk.59824c95.mjs'), "/public/assets/content/en/services/blockchain.md": () => import('./chunks/chunk.7c3d0c0b.mjs'), "/public/assets/content/en/services/strategy.md": () => import('./chunks/chunk.33bb18a9.mjs'), "/public/assets/content/en/services/wallets.md": () => import('./chunks/chunk.ee134a3e.mjs'),},
    () => "/public/assets/content/en/services/*.md"
  );
  const servicesNames = services.map((i) => ({
    name: i.frontmatter.title
  }));
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Portfolio", "lang": ELangs.en, "class": "astro-SMR3IJSC" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-SMR3IJSC" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Portfolio", "class": "astro-SMR3IJSC" })}<section class="hero astro-SMR3IJSC">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": "Explore", "title": "our Work", "class": "astro-SMR3IJSC" })}
        <p class="hero__desc astro-SMR3IJSC">
          We apply modern technologies to unlock new markets, expand your business opportunities and bring you one step closer to success. We combine developpers with designers,
          translators with copywriters, all subject matter experts in their fields, implementing what works. 
        </p>
    </section>${renderComponent($$result, "Projects", Projects, { "client:load": true, "servicesNames": servicesNames, "projects": projects, "url": url, "allBtnTitle": "All Projects", "learnMoreText": "More Information", "langHref": ELangs.en, "client:component-hydration": "load", "client:component-path": $$metadata$c.getPath(Projects), "client:component-export": $$metadata$c.getExport(Projects), "class": "astro-SMR3IJSC" })}` })}` })}

`;
});

const $$file$c = "C:/work-projects/pireactor/main-site/client/src/pages/ru/work.astro";
const $$url$c = "/ru/work";

var _page24 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$c,
	'default': $$Work$2,
	file: $$file$c,
	url: $$url$c
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$b = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/index.astro", { modules: [{ module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module2$4, specifier: "../../components/main/Hero.astro", assert: {} }, { module: $$module3$2, specifier: "../../components/main/About.astro", assert: {} }, { module: $$module4, specifier: "../../components/main/Map.astro", assert: {} }, { module: $$module5$1, specifier: "../../components/main/How.astro", assert: {} }, { module: $$module6, specifier: "../../components/main/Services.astro", assert: {} }, { module: $$module7$1, specifier: "../../components/main/Technologies.astro", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module1, specifier: "../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$b = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/index.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Index$1;
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": content.frontmatter.title, "lang": ELangs.en, "class": "astro-REHVHBA2" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-REHVHBA2" }, { "default": () => render`${renderComponent($$result, "Hero", $$Hero, { "redLine": content.frontmatter?.index.hero.redline, "title": content.frontmatter.index.hero.title, "path": "#callback-form", "btnText": content.frontmatter.index.hero.btnText, "class": "astro-REHVHBA2" })}${renderComponent($$result, "About", $$About$6, { "counters": content.frontmatter.counters, "desc": content.frontmatter.index.desc, "title": "About", "class": "astro-REHVHBA2" })}${renderComponent($$result, "Map", $$Map, { "title": content.frontmatter.index.mapTitle, "class": "astro-REHVHBA2" })}` })}${renderComponent($$result, "How", $$How, { "content": content.frontmatter.howSection, "class": "astro-REHVHBA2" })}${renderComponent($$result, "Container", $$Container, { "class": "astro-REHVHBA2" }, { "default": () => render`<div class="services-wrp astro-REHVHBA2" id="services">
      ${renderComponent($$result, "Services", $$Services, { "title": content.frontmatter.services.title, "lang": ELangs.en, "class": "astro-REHVHBA2" })}
    </div>${renderComponent($$result, "Technologies", $$Technologies, { "title": content?.frontmatter.tech.title, "desc": content?.frontmatter.tech.desc, "class": "astro-REHVHBA2" })}<div id="callback-form" class="astro-REHVHBA2">
      ${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-REHVHBA2" })}
    </div>` })}` })}`;
});

const $$file$b = "C:/work-projects/pireactor/main-site/client/src/pages/tr/index.astro";
const $$url$b = "/tr";

var _page25 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$b,
	'default': $$Index$1,
	file: $$file$b,
	url: $$url$b
}, Symbol.toStringTag, { value: 'Module' }));

async function getStaticPaths$3() {
  const services = await Astro$3.glob(
    { "/public/assets/content/en/services/architecture.md": () => import('./chunks/chunk.93527cb3.mjs'), "/public/assets/content/en/services/automation.md": () => import('./chunks/chunk.59824c95.mjs'), "/public/assets/content/en/services/blockchain.md": () => import('./chunks/chunk.7c3d0c0b.mjs'), "/public/assets/content/en/services/strategy.md": () => import('./chunks/chunk.33bb18a9.mjs'), "/public/assets/content/en/services/wallets.md": () => import('./chunks/chunk.ee134a3e.mjs'),},
    () => "/public/assets/content/en/services/*.md"
  );
  return services.map((service) => {
    return {
      params: { slug: service.frontmatter.slug },
      props: {
        content: service.Content,
        title: service.frontmatter.title,
        titleDesc: service.frontmatter.titleDesc,
        desc: service.frontmatter.desc,
        values: service.frontmatter.values,
        content: service.Content,
        articles: service.frontmatter.articles,
        heroBtn: service.frontmatter.heroBtn,
        viewBtn: service.frontmatter.viewBtn
      }
    };
  });
}
const $$metadata$a = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/services/[slug].astro", { modules: [{ module: $$module1$2, specifier: "../../../components/MainTitle.astro", assert: {} }, { module: $$module2$5, specifier: "../../../components/shared/Button.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8, specifier: "../../../models/ServicesModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$a = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/services/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro$3 = $$Astro$a;
const $$slug$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$slug$3;
  const props = Astro2.props;
  const uri = encodeURI(`/en/work/?${props.title}`);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.en, "class": "astro-WWB66DLJ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-WWB66DLJ" }, { "default": () => render`<section class="hero astro-WWB66DLJ">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": props.title, "class": "astro-WWB66DLJ" })}
        <p class="astro-WWB66DLJ">
          ${props.titleDesc}
        </p>
        ${renderComponent($$result, "Button", $$Button, { "title": props.heroBtn, "path": "/en/#callback-form", "class": "astro-WWB66DLJ" })}
    </section><section class="desc astro-WWB66DLJ">
      <h2 class="astro-WWB66DLJ">About</h2>
      <div class="desc__wrp astro-WWB66DLJ">
        <p class="astro-WWB66DLJ">${props.desc}</p>
        <div class="desc__counter astro-WWB66DLJ">
          ${props.values.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "client:component-hydration": "load", "client:component-path": $$metadata$a.getPath(Counter$1), "client:component-export": $$metadata$a.getExport(Counter$1), "class": "astro-WWB66DLJ" })}`)}
        </div>
      </div>
    </section>${props.articles.map((i) => render`<section class="article astro-WWB66DLJ">
      <h3 class="article__title astro-WWB66DLJ">${i.title}</h3>
      <div class="article__wrp astro-WWB66DLJ">
        <img class="article__img astro-WWB66DLJ"${addAttribute(i.img, "src")}${addAttribute(i.title, "alt")}>
        <p class="article__desc astro-WWB66DLJ">${i.desc}</p>
      </div>
    </section>`)}<div class="article__view astro-WWB66DLJ">
      ${renderComponent($$result, "Button", $$Button, { "path": uri, "title": props.viewBtn, "class": "astro-WWB66DLJ" })}
    </div>` })}` })}`;
});

const $$file$a = "C:/work-projects/pireactor/main-site/client/src/pages/tr/services/[slug].astro";
const $$url$a = "/tr/services/[slug]";

var _page26 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getStaticPaths: getStaticPaths$3,
	$$metadata: $$metadata$a,
	'default': $$slug$3,
	file: $$file$a,
	url: $$url$a
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$9 = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/about.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2$1, specifier: "../../components/shared/AboutCard.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$3, specifier: "../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$9 = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/about.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$About$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$About$1;
  const leads = await Astro2.glob(
    { "/public/assets/content/en/leads/AlexAlejandre.md": () => import('./chunks/chunk.a5de9f52.mjs'), "/public/assets/content/en/leads/JohnVermazenSt.md": () => import('./chunks/chunk.198b97c3.mjs'), "/public/assets/content/en/leads/JustynaBorwik.md": () => import('./chunks/chunk.2f992be1.mjs'), "/public/assets/content/en/leads/StevenVermazen.md": () => import('./chunks/chunk.d08d6e4f.mjs'),},
    () => "/public/assets/content/en/leads/*.md"
  );
  const sortLeads = leads.sort((a, b) => a.frontmatter.id - b.frontmatter.id);
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "About Us", "lang": ELangs.en, "class": "astro-KVNL2NNH" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-KVNL2NNH" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "About Us", "class": "astro-KVNL2NNH" })}<section class="hero astro-KVNL2NNH">
      ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": content?.frontmatter.about.hero.redline, "title": content?.frontmatter.about.hero.title, "class": "astro-KVNL2NNH" })}
      <p class="about__desc astro-KVNL2NNH">
        ${content?.frontmatter.about.desc}
      </p>
    </section>${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.counterTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="about__counter astro-KVNL2NNH">
        ${content.frontmatter.counters.map((el) => render`${renderComponent($$result, "Counter", Counter$1, { "title": el.title, "countTo": el.value, "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$9.getPath(Counter$1), "client:component-export": $$metadata$9.getExport(Counter$1), "class": "astro-KVNL2NNH" })}`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content.frontmatter.about.whoWeAreTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="about__who astro-KVNL2NNH">
        ${content.frontmatter.about.text.map((i) => render`<p class="astro-KVNL2NNH">${i}</p>`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.leadsTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="leads astro-KVNL2NNH">
        <ul class="leads-list astro-KVNL2NNH">
          ${sortLeads.map((lead) => render`${renderComponent($$result, "AboutCard", $$AboutCard, { "desc": lead.frontmatter.desc, "imgSource": lead.frontmatter.imgSource, "name": lead.frontmatter.name, "info": lead.frontmatter.info, "linkLI": lead.frontmatter.linkLI, "linkT": lead.frontmatter.linkT, "class": "astro-KVNL2NNH" })}`)}
        </ul>
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.locationsTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<ul class="location astro-KVNL2NNH">
        ${content.frontmatter.about.locations.map((i) => render`<li class="location__item astro-KVNL2NNH">
          <img${addAttribute(i.img, "src")}${addAttribute(i.name, "alt")} class="location__img astro-KVNL2NNH">
          ${i.name}
        </li>`)}
      </ul>` })}` })}` })}`;
});

const $$file$9 = "C:/work-projects/pireactor/main-site/client/src/pages/tr/about.astro";
const $$url$9 = "/tr/about";

var _page27 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$9,
	'default': $$About$1,
	file: $$file$9,
	url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$8 = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/brief.astro", { modules: [{ module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$2, specifier: "../../components/shared/FormSection.astro", assert: {} }, { module: $$module3$1, specifier: "../../components/solid/Form", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }], hydratedComponents: [Form], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$8 = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/brief.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Brief$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Brief$1;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Brief", "lang": ELangs.en, "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Brief", "class": "astro-ERY3GRSQ" })}${renderComponent($$result, "FormSection", $$FormSection, { "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Form", Form, { "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$8.getPath(Form), "client:component-export": $$metadata$8.getExport(Form), "class": "astro-ERY3GRSQ" })}` })}` })}` })}`;
});

const $$file$8 = "C:/work-projects/pireactor/main-site/client/src/pages/tr/brief.astro";
const $$url$8 = "/tr/brief";

var _page28 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$8,
	'default': $$Brief$1,
	file: $$file$8,
	url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$7 = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/work/[slug].astro", { modules: [{ module: $$module1, specifier: "../../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module2$3, specifier: "../../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5, specifier: "../../../enums/EPhases", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../../models/ContentModel", assert: {} }, { module: $$module7, specifier: "../../../models/ProjectModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$7 = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/work/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro$2 = $$Astro$7;
async function getStaticPaths$2() {
  const projects = await Astro$2.glob(
    { "/public/assets/content/en/projects/Brewery.md": () => import('./chunks/chunk.29bcfbb2.mjs'), "/public/assets/content/en/projects/NewHope copy.md": () => import('./chunks/chunk.dbd11095.mjs'), "/public/assets/content/en/projects/NewHope.md": () => import('./chunks/chunk.79884e51.mjs'), "/public/assets/content/en/projects/NewHope2.md": () => import('./chunks/chunk.787538be.mjs'), "/public/assets/content/en/projects/NewHope3.md": () => import('./chunks/chunk.09debec5.mjs'),},
    () => "/public/assets/content/en/projects/*.md"
  );
  return projects.map((project) => {
    return {
      params: { slug: project.frontmatter.slug },
      props: {
        content: project.Content,
        title: project.frontmatter.title,
        img: project.frontmatter.img,
        phases: project.frontmatter.phases,
        bullets: project.frontmatter.bullets,
        result: project.frontmatter.result
      }
    };
  });
}
const $$slug$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$slug$2;
  const props = Astro2.props;
  function phasesClass(item) {
    switch (item) {
      case EPhases.dev:
        return "stages__item_dev";
      case EPhases.rel:
        return "stages__item_rel";
      case EPhases.sup:
        return "stages__item_sup";
    }
  }
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.en, "class": "astro-2CQBPXFM" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="hero astro-2CQBPXFM"${addAttribute(`--url: url("${props.img}")`, "style")}>
      <h1 class="astro-2CQBPXFM">${props.title}</h1>
    </div>${renderComponent($$result, "Section", $$Section, { "title": "Stages of project", "class": "astro-2CQBPXFM" }, { "default": () => render`<ul class="stages__list astro-2CQBPXFM">
        ${props.phases.map((i) => render`<li${addAttribute(`stages__item ${phasesClass(i.icon)} astro-2CQBPXFM`, "class")}>
          <div class="stages__title astro-2CQBPXFM">${i.name}</div>
          <div class="stages__period astro-2CQBPXFM">${i.period}</div>
        </li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Application functionality", "class": "astro-2CQBPXFM" }, { "default": () => render`<ul class="bullets astro-2CQBPXFM">
        ${props.bullets.map((i) => render`<li class="bullets__item astro-2CQBPXFM">${i}</li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Solution", "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="solution astro-2CQBPXFM">
        ${renderComponent($$result, "props.content", props.content, { "class": "astro-2CQBPXFM" })}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": "Results", "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="counter astro-2CQBPXFM">
        ${props.result.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "format": i.format, "client:component-hydration": "load", "client:component-path": $$metadata$7.getPath(Counter$1), "client:component-export": $$metadata$7.getExport(Counter$1), "class": "astro-2CQBPXFM" })}`)}
      </div>` })}${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-2CQBPXFM" })}` })}` })}`;
});

const $$file$7 = "C:/work-projects/pireactor/main-site/client/src/pages/tr/work/[slug].astro";
const $$url$7 = "/tr/work/[slug]";

var _page29 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$7,
	getStaticPaths: getStaticPaths$2,
	'default': $$slug$2,
	file: $$file$7,
	url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$6 = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/work.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module3, specifier: "../../components/solid/Projects", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module7, specifier: "../../models/ProjectModel", assert: {} }, { module: $$module8, specifier: "../../models/ServicesModel", assert: {} }], hydratedComponents: [Projects], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$6 = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/tr/work.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Work$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Work$1;
  const projectsRaw = await Astro2.glob(
    { "/public/assets/content/en/projects/Brewery.md": () => import('./chunks/chunk.29bcfbb2.mjs'), "/public/assets/content/en/projects/NewHope copy.md": () => import('./chunks/chunk.dbd11095.mjs'), "/public/assets/content/en/projects/NewHope.md": () => import('./chunks/chunk.79884e51.mjs'), "/public/assets/content/en/projects/NewHope2.md": () => import('./chunks/chunk.787538be.mjs'), "/public/assets/content/en/projects/NewHope3.md": () => import('./chunks/chunk.09debec5.mjs'),},
    () => "/public/assets/content/en/projects/*.md"
  );
  const projects = projectsRaw.map((i) => {
    return {
      desc: i.frontmatter.desc,
      developers: i.frontmatter.developers,
      months: i.frontmatter.months,
      phases: i.frontmatter.phases,
      slug: i.frontmatter.slug,
      title: i.frontmatter.title,
      tags: i.frontmatter.tags,
      img: i.frontmatter.img
    };
  });
  const url = Astro2.request.url;
  const services = await Astro2.glob(
    { "/public/assets/content/en/services/architecture.md": () => import('./chunks/chunk.93527cb3.mjs'), "/public/assets/content/en/services/automation.md": () => import('./chunks/chunk.59824c95.mjs'), "/public/assets/content/en/services/blockchain.md": () => import('./chunks/chunk.7c3d0c0b.mjs'), "/public/assets/content/en/services/strategy.md": () => import('./chunks/chunk.33bb18a9.mjs'), "/public/assets/content/en/services/wallets.md": () => import('./chunks/chunk.ee134a3e.mjs'),},
    () => "/public/assets/content/en/services/*.md"
  );
  const servicesNames = services.map((i) => ({
    name: i.frontmatter.title
  }));
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Portfolio", "lang": ELangs.en, "class": "astro-SMR3IJSC" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-SMR3IJSC" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Portfolio", "class": "astro-SMR3IJSC" })}<section class="hero astro-SMR3IJSC">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": "Explore", "title": "our Work", "class": "astro-SMR3IJSC" })}
        <p class="hero__desc astro-SMR3IJSC">
          We apply modern technologies to unlock new markets, expand your business opportunities and bring you one step closer to success. We combine developpers with designers,
          translators with copywriters, all subject matter experts in their fields, implementing what works. 
        </p>
    </section>${renderComponent($$result, "Projects", Projects, { "client:load": true, "servicesNames": servicesNames, "projects": projects, "url": url, "allBtnTitle": "All Projects", "learnMoreText": "More Information", "langHref": ELangs.en, "client:component-hydration": "load", "client:component-path": $$metadata$6.getPath(Projects), "client:component-export": $$metadata$6.getExport(Projects), "class": "astro-SMR3IJSC" })}` })}` })}

`;
});

const $$file$6 = "C:/work-projects/pireactor/main-site/client/src/pages/tr/work.astro";
const $$url$6 = "/tr/work";

var _page30 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$6,
	'default': $$Work$1,
	file: $$file$6,
	url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$5 = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/index.astro", { modules: [{ module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module2$4, specifier: "../../components/main/Hero.astro", assert: {} }, { module: $$module3$2, specifier: "../../components/main/About.astro", assert: {} }, { module: $$module4, specifier: "../../components/main/Map.astro", assert: {} }, { module: $$module5$1, specifier: "../../components/main/How.astro", assert: {} }, { module: $$module6, specifier: "../../components/main/Services.astro", assert: {} }, { module: $$module7$1, specifier: "../../components/main/Technologies.astro", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module1, specifier: "../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$5 = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/index.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index;
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": content.frontmatter.title, "lang": ELangs.en, "class": "astro-REHVHBA2" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-REHVHBA2" }, { "default": () => render`${renderComponent($$result, "Hero", $$Hero, { "redLine": content.frontmatter?.index.hero.redline, "title": content.frontmatter.index.hero.title, "path": "#callback-form", "btnText": content.frontmatter.index.hero.btnText, "class": "astro-REHVHBA2" })}${renderComponent($$result, "About", $$About$6, { "counters": content.frontmatter.counters, "desc": content.frontmatter.index.desc, "title": "About", "class": "astro-REHVHBA2" })}${renderComponent($$result, "Map", $$Map, { "title": content.frontmatter.index.mapTitle, "class": "astro-REHVHBA2" })}` })}${renderComponent($$result, "How", $$How, { "content": content.frontmatter.howSection, "class": "astro-REHVHBA2" })}${renderComponent($$result, "Container", $$Container, { "class": "astro-REHVHBA2" }, { "default": () => render`<div class="services-wrp astro-REHVHBA2" id="services">
      ${renderComponent($$result, "Services", $$Services, { "title": content.frontmatter.services.title, "lang": ELangs.en, "class": "astro-REHVHBA2" })}
    </div>${renderComponent($$result, "Technologies", $$Technologies, { "title": content?.frontmatter.tech.title, "desc": content?.frontmatter.tech.desc, "class": "astro-REHVHBA2" })}<div id="callback-form" class="astro-REHVHBA2">
      ${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-REHVHBA2" })}
    </div>` })}` })}`;
});

const $$file$5 = "C:/work-projects/pireactor/main-site/client/src/pages/ua/index.astro";
const $$url$5 = "/ua";

var _page31 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$5,
	'default': $$Index,
	file: $$file$5,
	url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

async function getStaticPaths$1() {
  const services = await Astro$1.glob(
    { "/public/assets/content/en/services/architecture.md": () => import('./chunks/chunk.93527cb3.mjs'), "/public/assets/content/en/services/automation.md": () => import('./chunks/chunk.59824c95.mjs'), "/public/assets/content/en/services/blockchain.md": () => import('./chunks/chunk.7c3d0c0b.mjs'), "/public/assets/content/en/services/strategy.md": () => import('./chunks/chunk.33bb18a9.mjs'), "/public/assets/content/en/services/wallets.md": () => import('./chunks/chunk.ee134a3e.mjs'),},
    () => "/public/assets/content/en/services/*.md"
  );
  return services.map((service) => {
    return {
      params: { slug: service.frontmatter.slug },
      props: {
        content: service.Content,
        title: service.frontmatter.title,
        titleDesc: service.frontmatter.titleDesc,
        desc: service.frontmatter.desc,
        values: service.frontmatter.values,
        content: service.Content,
        articles: service.frontmatter.articles,
        heroBtn: service.frontmatter.heroBtn,
        viewBtn: service.frontmatter.viewBtn
      }
    };
  });
}
const $$metadata$4 = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/services/[slug].astro", { modules: [{ module: $$module1$2, specifier: "../../../components/MainTitle.astro", assert: {} }, { module: $$module2$5, specifier: "../../../components/shared/Button.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8, specifier: "../../../models/ServicesModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$4 = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/services/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro$1 = $$Astro$4;
const $$slug$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$slug$1;
  const props = Astro2.props;
  const uri = encodeURI(`/en/work/?${props.title}`);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.en, "class": "astro-WWB66DLJ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-WWB66DLJ" }, { "default": () => render`<section class="hero astro-WWB66DLJ">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": props.title, "class": "astro-WWB66DLJ" })}
        <p class="astro-WWB66DLJ">
          ${props.titleDesc}
        </p>
        ${renderComponent($$result, "Button", $$Button, { "title": props.heroBtn, "path": "/en/#callback-form", "class": "astro-WWB66DLJ" })}
    </section><section class="desc astro-WWB66DLJ">
      <h2 class="astro-WWB66DLJ">About</h2>
      <div class="desc__wrp astro-WWB66DLJ">
        <p class="astro-WWB66DLJ">${props.desc}</p>
        <div class="desc__counter astro-WWB66DLJ">
          ${props.values.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "client:component-hydration": "load", "client:component-path": $$metadata$4.getPath(Counter$1), "client:component-export": $$metadata$4.getExport(Counter$1), "class": "astro-WWB66DLJ" })}`)}
        </div>
      </div>
    </section>${props.articles.map((i) => render`<section class="article astro-WWB66DLJ">
      <h3 class="article__title astro-WWB66DLJ">${i.title}</h3>
      <div class="article__wrp astro-WWB66DLJ">
        <img class="article__img astro-WWB66DLJ"${addAttribute(i.img, "src")}${addAttribute(i.title, "alt")}>
        <p class="article__desc astro-WWB66DLJ">${i.desc}</p>
      </div>
    </section>`)}<div class="article__view astro-WWB66DLJ">
      ${renderComponent($$result, "Button", $$Button, { "path": uri, "title": props.viewBtn, "class": "astro-WWB66DLJ" })}
    </div>` })}` })}`;
});

const $$file$4 = "C:/work-projects/pireactor/main-site/client/src/pages/ua/services/[slug].astro";
const $$url$4 = "/ua/services/[slug]";

var _page32 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getStaticPaths: getStaticPaths$1,
	$$metadata: $$metadata$4,
	'default': $$slug$1,
	file: $$file$4,
	url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$3 = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/about.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2$1, specifier: "../../components/shared/AboutCard.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$3, specifier: "../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../models/ContentModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$3 = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/about.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$About;
  const leads = await Astro2.glob(
    { "/public/assets/content/en/leads/AlexAlejandre.md": () => import('./chunks/chunk.a5de9f52.mjs'), "/public/assets/content/en/leads/JohnVermazenSt.md": () => import('./chunks/chunk.198b97c3.mjs'), "/public/assets/content/en/leads/JustynaBorwik.md": () => import('./chunks/chunk.2f992be1.mjs'), "/public/assets/content/en/leads/StevenVermazen.md": () => import('./chunks/chunk.d08d6e4f.mjs'),},
    () => "/public/assets/content/en/leads/*.md"
  );
  const sortLeads = leads.sort((a, b) => a.frontmatter.id - b.frontmatter.id);
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "About Us", "lang": ELangs.en, "class": "astro-KVNL2NNH" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-KVNL2NNH" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "About Us", "class": "astro-KVNL2NNH" })}<section class="hero astro-KVNL2NNH">
      ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": content?.frontmatter.about.hero.redline, "title": content?.frontmatter.about.hero.title, "class": "astro-KVNL2NNH" })}
      <p class="about__desc astro-KVNL2NNH">
        ${content?.frontmatter.about.desc}
      </p>
    </section>${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.counterTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="about__counter astro-KVNL2NNH">
        ${content.frontmatter.counters.map((el) => render`${renderComponent($$result, "Counter", Counter$1, { "title": el.title, "countTo": el.value, "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$3.getPath(Counter$1), "client:component-export": $$metadata$3.getExport(Counter$1), "class": "astro-KVNL2NNH" })}`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content.frontmatter.about.whoWeAreTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="about__who astro-KVNL2NNH">
        ${content.frontmatter.about.text.map((i) => render`<p class="astro-KVNL2NNH">${i}</p>`)}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.leadsTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<div class="leads astro-KVNL2NNH">
        <ul class="leads-list astro-KVNL2NNH">
          ${sortLeads.map((lead) => render`${renderComponent($$result, "AboutCard", $$AboutCard, { "desc": lead.frontmatter.desc, "imgSource": lead.frontmatter.imgSource, "name": lead.frontmatter.name, "info": lead.frontmatter.info, "linkLI": lead.frontmatter.linkLI, "linkT": lead.frontmatter.linkT, "class": "astro-KVNL2NNH" })}`)}
        </ul>
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": content?.frontmatter.about.locationsTitle, "class": "astro-KVNL2NNH" }, { "default": () => render`<ul class="location astro-KVNL2NNH">
        ${content.frontmatter.about.locations.map((i) => render`<li class="location__item astro-KVNL2NNH">
          <img${addAttribute(i.img, "src")}${addAttribute(i.name, "alt")} class="location__img astro-KVNL2NNH">
          ${i.name}
        </li>`)}
      </ul>` })}` })}` })}`;
});

const $$file$3 = "C:/work-projects/pireactor/main-site/client/src/pages/ua/about.astro";
const $$url$3 = "/ua/about";

var _page33 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$3,
	'default': $$About,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$2 = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/brief.astro", { modules: [{ module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module2$2, specifier: "../../components/shared/FormSection.astro", assert: {} }, { module: $$module3$1, specifier: "../../components/solid/Form", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }], hydratedComponents: [Form], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$2 = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/brief.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Brief = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Brief;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Brief", "lang": ELangs.en, "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Brief", "class": "astro-ERY3GRSQ" })}${renderComponent($$result, "FormSection", $$FormSection, { "class": "astro-ERY3GRSQ" }, { "default": () => render`${renderComponent($$result, "Form", Form, { "client:load": true, "client:component-hydration": "load", "client:component-path": $$metadata$2.getPath(Form), "client:component-export": $$metadata$2.getExport(Form), "class": "astro-ERY3GRSQ" })}` })}` })}` })}`;
});

const $$file$2 = "C:/work-projects/pireactor/main-site/client/src/pages/ua/brief.astro";
const $$url$2 = "/ua/brief";

var _page34 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$2,
	'default': $$Brief,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$1 = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/work/[slug].astro", { modules: [{ module: $$module1, specifier: "../../../components/shared/CallbackForm.astro", assert: {} }, { module: $$module2$3, specifier: "../../../components/shared/Section.astro", assert: {} }, { module: $$module3$3, specifier: "../../../components/solid/Counter", assert: {} }, { module: $$module4$2, specifier: "../../../enums/ELangs", assert: {} }, { module: $$module5, specifier: "../../../enums/EPhases", assert: {} }, { module: $$module5$3, specifier: "../../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../../layouts/Layout.astro", assert: {} }, { module: $$module8$1, specifier: "../../../models/ContentModel", assert: {} }, { module: $$module7, specifier: "../../../models/ProjectModel", assert: {} }], hydratedComponents: [Counter$1], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$1 = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/work/[slug].astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const Astro = $$Astro$1;
async function getStaticPaths() {
  const projects = await Astro.glob(
    { "/public/assets/content/en/projects/Brewery.md": () => import('./chunks/chunk.29bcfbb2.mjs'), "/public/assets/content/en/projects/NewHope copy.md": () => import('./chunks/chunk.dbd11095.mjs'), "/public/assets/content/en/projects/NewHope.md": () => import('./chunks/chunk.79884e51.mjs'), "/public/assets/content/en/projects/NewHope2.md": () => import('./chunks/chunk.787538be.mjs'), "/public/assets/content/en/projects/NewHope3.md": () => import('./chunks/chunk.09debec5.mjs'),},
    () => "/public/assets/content/en/projects/*.md"
  );
  return projects.map((project) => {
    return {
      params: { slug: project.frontmatter.slug },
      props: {
        content: project.Content,
        title: project.frontmatter.title,
        img: project.frontmatter.img,
        phases: project.frontmatter.phases,
        bullets: project.frontmatter.bullets,
        result: project.frontmatter.result
      }
    };
  });
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$slug;
  const props = Astro2.props;
  function phasesClass(item) {
    switch (item) {
      case EPhases.dev:
        return "stages__item_dev";
      case EPhases.rel:
        return "stages__item_rel";
      case EPhases.sup:
        return "stages__item_sup";
    }
  }
  const [content] = await Astro2.glob(
    { "/public/assets/content/en/content.md": () => import('./chunks/chunk.440c98c3.mjs'),},
    () => "/public/assets/content/en/*.md"
  );
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": props.title, "lang": ELangs.en, "class": "astro-2CQBPXFM" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="hero astro-2CQBPXFM"${addAttribute(`--url: url("${props.img}")`, "style")}>
      <h1 class="astro-2CQBPXFM">${props.title}</h1>
    </div>${renderComponent($$result, "Section", $$Section, { "title": "Stages of project", "class": "astro-2CQBPXFM" }, { "default": () => render`<ul class="stages__list astro-2CQBPXFM">
        ${props.phases.map((i) => render`<li${addAttribute(`stages__item ${phasesClass(i.icon)} astro-2CQBPXFM`, "class")}>
          <div class="stages__title astro-2CQBPXFM">${i.name}</div>
          <div class="stages__period astro-2CQBPXFM">${i.period}</div>
        </li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Application functionality", "class": "astro-2CQBPXFM" }, { "default": () => render`<ul class="bullets astro-2CQBPXFM">
        ${props.bullets.map((i) => render`<li class="bullets__item astro-2CQBPXFM">${i}</li>`)}
      </ul>` })}${renderComponent($$result, "Section", $$Section, { "title": "Solution", "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="solution astro-2CQBPXFM">
        ${renderComponent($$result, "props.content", props.content, { "class": "astro-2CQBPXFM" })}
      </div>` })}${renderComponent($$result, "Section", $$Section, { "title": "Results", "class": "astro-2CQBPXFM" }, { "default": () => render`<div class="counter astro-2CQBPXFM">
        ${props.result.map((i) => render`${renderComponent($$result, "Counter", Counter$1, { "client:load": true, "countTo": i.value, "title": i.name, "format": i.format, "client:component-hydration": "load", "client:component-path": $$metadata$1.getPath(Counter$1), "client:component-export": $$metadata$1.getExport(Counter$1), "class": "astro-2CQBPXFM" })}`)}
      </div>` })}${renderComponent($$result, "CallbackForm", $$CallbackForm, { "desc": content.frontmatter?.form.desc, "title": content.frontmatter?.form.title, "fields": content.frontmatter?.form.fields, "class": "astro-2CQBPXFM" })}` })}` })}`;
});

const $$file$1 = "C:/work-projects/pireactor/main-site/client/src/pages/ua/work/[slug].astro";
const $$url$1 = "/ua/work/[slug]";

var _page35 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$1,
	getStaticPaths: getStaticPaths,
	'default': $$slug,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata = createMetadata("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/work.astro", { modules: [{ module: $$module1$2, specifier: "../../components/MainTitle.astro", assert: {} }, { module: $$module2, specifier: "../../components/shared/Breadcrums.astro", assert: {} }, { module: $$module3, specifier: "../../components/solid/Projects", assert: {} }, { module: $$module4$2, specifier: "../../enums/ELangs", assert: {} }, { module: $$module5$3, specifier: "../../layouts/Container.astro", assert: {} }, { module: $$module6$1, specifier: "../../layouts/Layout.astro", assert: {} }, { module: $$module7, specifier: "../../models/ProjectModel", assert: {} }, { module: $$module8, specifier: "../../models/ServicesModel", assert: {} }], hydratedComponents: [Projects], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro = createAstro("/@fs/C:/work-projects/pireactor/main-site/client/src/pages/ua/work.astro", "http://localhost:3000/", "file:///C:/work-projects/pireactor/main-site/client/");
const $$Work = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Work;
  const projectsRaw = await Astro2.glob(
    { "/public/assets/content/en/projects/Brewery.md": () => import('./chunks/chunk.29bcfbb2.mjs'), "/public/assets/content/en/projects/NewHope copy.md": () => import('./chunks/chunk.dbd11095.mjs'), "/public/assets/content/en/projects/NewHope.md": () => import('./chunks/chunk.79884e51.mjs'), "/public/assets/content/en/projects/NewHope2.md": () => import('./chunks/chunk.787538be.mjs'), "/public/assets/content/en/projects/NewHope3.md": () => import('./chunks/chunk.09debec5.mjs'),},
    () => "/public/assets/content/en/projects/*.md"
  );
  const projects = projectsRaw.map((i) => {
    return {
      desc: i.frontmatter.desc,
      developers: i.frontmatter.developers,
      months: i.frontmatter.months,
      phases: i.frontmatter.phases,
      slug: i.frontmatter.slug,
      title: i.frontmatter.title,
      tags: i.frontmatter.tags,
      img: i.frontmatter.img
    };
  });
  const url = Astro2.request.url;
  const services = await Astro2.glob(
    { "/public/assets/content/en/services/architecture.md": () => import('./chunks/chunk.93527cb3.mjs'), "/public/assets/content/en/services/automation.md": () => import('./chunks/chunk.59824c95.mjs'), "/public/assets/content/en/services/blockchain.md": () => import('./chunks/chunk.7c3d0c0b.mjs'), "/public/assets/content/en/services/strategy.md": () => import('./chunks/chunk.33bb18a9.mjs'), "/public/assets/content/en/services/wallets.md": () => import('./chunks/chunk.ee134a3e.mjs'),},
    () => "/public/assets/content/en/services/*.md"
  );
  const servicesNames = services.map((i) => ({
    name: i.frontmatter.title
  }));
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return render`${renderComponent($$result, "Layout", $$Layout, { "title": "Portfolio", "lang": ELangs.en, "class": "astro-SMR3IJSC" }, { "default": () => render`${renderComponent($$result, "Container", $$Container, { "class": "astro-SMR3IJSC" }, { "default": () => render`${renderComponent($$result, "Breadcrums", $$Breadcrums, { "currentPath": "Portfolio", "class": "astro-SMR3IJSC" })}<section class="hero astro-SMR3IJSC">
        ${renderComponent($$result, "MainTitle", $$MainTitle, { "redLine": "Explore", "title": "our Work", "class": "astro-SMR3IJSC" })}
        <p class="hero__desc astro-SMR3IJSC">
          We apply modern technologies to unlock new markets, expand your business opportunities and bring you one step closer to success. We combine developpers with designers,
          translators with copywriters, all subject matter experts in their fields, implementing what works. 
        </p>
    </section>${renderComponent($$result, "Projects", Projects, { "client:load": true, "servicesNames": servicesNames, "projects": projects, "url": url, "allBtnTitle": "All Projects", "learnMoreText": "More Information", "langHref": ELangs.en, "client:component-hydration": "load", "client:component-path": $$metadata.getPath(Projects), "client:component-export": $$metadata.getExport(Projects), "class": "astro-SMR3IJSC" })}` })}` })}

`;
});

const $$file = "C:/work-projects/pireactor/main-site/client/src/pages/ua/work.astro";
const $$url = "/ua/work";

var _page36 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata,
	'default': $$Work,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([['src/pages/index.astro', _page0],['src/pages/en/index.astro', _page1],['src/pages/en/services/[slug].astro', _page2],['src/pages/en/about.astro', _page3],['src/pages/en/brief.astro', _page4],['src/pages/en/work/[slug].astro', _page5],['src/pages/en/work.astro', _page6],['src/pages/es/index.astro', _page7],['src/pages/es/services/[slug].astro', _page8],['src/pages/es/about.astro', _page9],['src/pages/es/brief.astro', _page10],['src/pages/es/work/[slug].astro', _page11],['src/pages/es/work.astro', _page12],['src/pages/pl/index.astro', _page13],['src/pages/pl/services/[slug].astro', _page14],['src/pages/pl/about.astro', _page15],['src/pages/pl/brief.astro', _page16],['src/pages/pl/work/[slug].astro', _page17],['src/pages/pl/work.astro', _page18],['src/pages/ru/index.astro', _page19],['src/pages/ru/services/[slug].astro', _page20],['src/pages/ru/about.astro', _page21],['src/pages/ru/brief.astro', _page22],['src/pages/ru/work/[slug].astro', _page23],['src/pages/ru/work.astro', _page24],['src/pages/tr/index.astro', _page25],['src/pages/tr/services/[slug].astro', _page26],['src/pages/tr/about.astro', _page27],['src/pages/tr/brief.astro', _page28],['src/pages/tr/work/[slug].astro', _page29],['src/pages/tr/work.astro', _page30],['src/pages/ua/index.astro', _page31],['src/pages/ua/services/[slug].astro', _page32],['src/pages/ua/about.astro', _page33],['src/pages/ua/brief.astro', _page34],['src/pages/ua/work/[slug].astro', _page35],['src/pages/ua/work.astro', _page36],]);
const renderers = [Object.assign({"name":"@astrojs/solid-js","clientEntrypoint":"@astrojs/solid-js/client.js","serverEntrypoint":"@astrojs/solid-js/server.js","jsxImportSource":"solid-js"}, { ssr: _renderer0 }),];

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime$1() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (let i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime$1.prototype.define = function(typeMap, force) {
  for (let type in typeMap) {
    let extensions = typeMap[type].map(function(t) {
      return t.toLowerCase();
    });
    type = type.toLowerCase();

    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] === '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      const ext = extensions[0];
      this._extensions[type] = (ext[0] !== '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime$1.prototype.getType = function(path) {
  path = String(path);
  let last = path.replace(/^.*[/\\]/, '').toLowerCase();
  let ext = last.replace(/^.*\./, '').toLowerCase();

  let hasPath = last.length < path.length;
  let hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime$1.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime$1;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["es","ecma"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/express":["exp"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/trig":["trig"],"application/ttml+xml":["ttml"],"application/ubjson":["ubj"],"application/urc-ressheet+xml":["rsheet"],"application/urc-targetdesc+xml":["td"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["*xsl","xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/amr":["amr"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx","opus"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/avif":["avif"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/ktx2":["ktx2"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/step+xml":["stpx"],"model/step+zip":["stpz"],"model/step-xml+zip":["stpxz"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/spdx":["spdx"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/iso.segment":["m4s"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var other = {"application/prs.cww":["cww"],"application/vnd.1000minds.decision-model+xml":["1km"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.keynote":["key"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.apple.numbers":["numbers"],"application/vnd.apple.pages":["pages"],"application/vnd.apple.pkpass":["pkpass"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.balsamiq.bmml+xml":["bmml"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.citationstyles.style+xml":["csl"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dbf":["dbf"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-apps.document":["gdoc"],"application/vnd.google-apps.presentation":["gslides"],"application/vnd.google-apps.spreadsheet":["gsheet"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.hydrostatix.sof-data":["sfd-hdstx"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mapbox-vector-tile":["mvt"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-outlook":["msg"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["*stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.ac+xml":["*ac"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.n-gage.symbian.install":["n-gage"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openblox.game+xml":["obgx"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openstreetmap.data+xml":["osm"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.rar":["rar"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.software602.filler.form+xml":["fo"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.wadl+xml":["wadl"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.syncml.dmddf+xml":["ddf"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["*dmg"],"application/x-arj":["arj"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bdoc":["*bdoc"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-cocoa":["cco"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["*deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-httpd-php":["php"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["*iso"],"application/x-iwork-keynote-sffkey":["*key"],"application/x-iwork-numbers-sffnumbers":["*numbers"],"application/x-iwork-pages-sffpages":["*pages"],"application/x-java-archive-diff":["jardiff"],"application/x-java-jnlp-file":["jnlp"],"application/x-keepass2":["kdbx"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-makeself":["run"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdos-program":["*exe"],"application/x-msdownload":["*exe","*dll","com","bat","*msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["*wmf","*wmz","*emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-ns-proxy-autoconfig":["pac"],"application/x-nzb":["nzb"],"application/x-perl":["pl","pm"],"application/x-pilot":["*prc","*pdb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["*rar"],"application/x-redhat-package-manager":["rpm"],"application/x-research-info-systems":["ris"],"application/x-sea":["sea"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl","tk"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["*obj"],"application/x-ustar":["ustar"],"application/x-virtualbox-hdd":["hdd"],"application/x-virtualbox-ova":["ova"],"application/x-virtualbox-ovf":["ovf"],"application/x-virtualbox-vbox":["vbox"],"application/x-virtualbox-vbox-extpack":["vbox-extpack"],"application/x-virtualbox-vdi":["vdi"],"application/x-virtualbox-vhd":["vhd"],"application/x-virtualbox-vmdk":["vmdk"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt","pem"],"application/x-xfig":["fig"],"application/x-xliff+xml":["*xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-m4a":["*m4a"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-realaudio":["*ra"],"audio/x-wav":["*wav"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"image/prs.btif":["btif"],"image/prs.pti":["pti"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.airzip.accelerator.azv":["azv"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["*sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.microsoft.icon":["ico"],"image/vnd.ms-dds":["dds"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.pco.b16":["b16"],"image/vnd.tencent.tap":["tap"],"image/vnd.valve.source.texture":["vtf"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/vnd.zbrush.pcx":["pcx"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["*ico"],"image/x-jng":["jng"],"image/x-mrsid-image":["sid"],"image/x-ms-bmp":["*bmp"],"image/x-pcx":["*pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/vnd.wfa.wsc":["wsc"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.opengex":["ogex"],"model/vnd.parasolid.transmit.binary":["x_b"],"model/vnd.parasolid.transmit.text":["x_t"],"model/vnd.sap.vds":["vds"],"model/vnd.usdz+zip":["usdz"],"model/vnd.valve.source.compiled-map":["bsp"],"model/vnd.vtu":["vtu"],"text/prs.lines.tag":["dsc"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-org":["*org"],"text/x-pascal":["p","pas"],"text/x-processing":["pde"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-suse-ymp":["ymp"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]};

let Mime = Mime_1;
new Mime(standard, other);

if (typeof process !== 'undefined') {
	(process.env);
	process.stdout && process.stdout.isTTY;
}

var eastasianwidth = {exports: {}};

(function (module) {
var eaw = {};

{
  module.exports = eaw;
}

eaw.eastAsianWidth = function(character) {
  var x = character.charCodeAt(0);
  var y = (character.length == 2) ? character.charCodeAt(1) : 0;
  var codePoint = x;
  if ((0xD800 <= x && x <= 0xDBFF) && (0xDC00 <= y && y <= 0xDFFF)) {
    x &= 0x3FF;
    y &= 0x3FF;
    codePoint = (x << 10) | y;
    codePoint += 0x10000;
  }

  if ((0x3000 == codePoint) ||
      (0xFF01 <= codePoint && codePoint <= 0xFF60) ||
      (0xFFE0 <= codePoint && codePoint <= 0xFFE6)) {
    return 'F';
  }
  if ((0x20A9 == codePoint) ||
      (0xFF61 <= codePoint && codePoint <= 0xFFBE) ||
      (0xFFC2 <= codePoint && codePoint <= 0xFFC7) ||
      (0xFFCA <= codePoint && codePoint <= 0xFFCF) ||
      (0xFFD2 <= codePoint && codePoint <= 0xFFD7) ||
      (0xFFDA <= codePoint && codePoint <= 0xFFDC) ||
      (0xFFE8 <= codePoint && codePoint <= 0xFFEE)) {
    return 'H';
  }
  if ((0x1100 <= codePoint && codePoint <= 0x115F) ||
      (0x11A3 <= codePoint && codePoint <= 0x11A7) ||
      (0x11FA <= codePoint && codePoint <= 0x11FF) ||
      (0x2329 <= codePoint && codePoint <= 0x232A) ||
      (0x2E80 <= codePoint && codePoint <= 0x2E99) ||
      (0x2E9B <= codePoint && codePoint <= 0x2EF3) ||
      (0x2F00 <= codePoint && codePoint <= 0x2FD5) ||
      (0x2FF0 <= codePoint && codePoint <= 0x2FFB) ||
      (0x3001 <= codePoint && codePoint <= 0x303E) ||
      (0x3041 <= codePoint && codePoint <= 0x3096) ||
      (0x3099 <= codePoint && codePoint <= 0x30FF) ||
      (0x3105 <= codePoint && codePoint <= 0x312D) ||
      (0x3131 <= codePoint && codePoint <= 0x318E) ||
      (0x3190 <= codePoint && codePoint <= 0x31BA) ||
      (0x31C0 <= codePoint && codePoint <= 0x31E3) ||
      (0x31F0 <= codePoint && codePoint <= 0x321E) ||
      (0x3220 <= codePoint && codePoint <= 0x3247) ||
      (0x3250 <= codePoint && codePoint <= 0x32FE) ||
      (0x3300 <= codePoint && codePoint <= 0x4DBF) ||
      (0x4E00 <= codePoint && codePoint <= 0xA48C) ||
      (0xA490 <= codePoint && codePoint <= 0xA4C6) ||
      (0xA960 <= codePoint && codePoint <= 0xA97C) ||
      (0xAC00 <= codePoint && codePoint <= 0xD7A3) ||
      (0xD7B0 <= codePoint && codePoint <= 0xD7C6) ||
      (0xD7CB <= codePoint && codePoint <= 0xD7FB) ||
      (0xF900 <= codePoint && codePoint <= 0xFAFF) ||
      (0xFE10 <= codePoint && codePoint <= 0xFE19) ||
      (0xFE30 <= codePoint && codePoint <= 0xFE52) ||
      (0xFE54 <= codePoint && codePoint <= 0xFE66) ||
      (0xFE68 <= codePoint && codePoint <= 0xFE6B) ||
      (0x1B000 <= codePoint && codePoint <= 0x1B001) ||
      (0x1F200 <= codePoint && codePoint <= 0x1F202) ||
      (0x1F210 <= codePoint && codePoint <= 0x1F23A) ||
      (0x1F240 <= codePoint && codePoint <= 0x1F248) ||
      (0x1F250 <= codePoint && codePoint <= 0x1F251) ||
      (0x20000 <= codePoint && codePoint <= 0x2F73F) ||
      (0x2B740 <= codePoint && codePoint <= 0x2FFFD) ||
      (0x30000 <= codePoint && codePoint <= 0x3FFFD)) {
    return 'W';
  }
  if ((0x0020 <= codePoint && codePoint <= 0x007E) ||
      (0x00A2 <= codePoint && codePoint <= 0x00A3) ||
      (0x00A5 <= codePoint && codePoint <= 0x00A6) ||
      (0x00AC == codePoint) ||
      (0x00AF == codePoint) ||
      (0x27E6 <= codePoint && codePoint <= 0x27ED) ||
      (0x2985 <= codePoint && codePoint <= 0x2986)) {
    return 'Na';
  }
  if ((0x00A1 == codePoint) ||
      (0x00A4 == codePoint) ||
      (0x00A7 <= codePoint && codePoint <= 0x00A8) ||
      (0x00AA == codePoint) ||
      (0x00AD <= codePoint && codePoint <= 0x00AE) ||
      (0x00B0 <= codePoint && codePoint <= 0x00B4) ||
      (0x00B6 <= codePoint && codePoint <= 0x00BA) ||
      (0x00BC <= codePoint && codePoint <= 0x00BF) ||
      (0x00C6 == codePoint) ||
      (0x00D0 == codePoint) ||
      (0x00D7 <= codePoint && codePoint <= 0x00D8) ||
      (0x00DE <= codePoint && codePoint <= 0x00E1) ||
      (0x00E6 == codePoint) ||
      (0x00E8 <= codePoint && codePoint <= 0x00EA) ||
      (0x00EC <= codePoint && codePoint <= 0x00ED) ||
      (0x00F0 == codePoint) ||
      (0x00F2 <= codePoint && codePoint <= 0x00F3) ||
      (0x00F7 <= codePoint && codePoint <= 0x00FA) ||
      (0x00FC == codePoint) ||
      (0x00FE == codePoint) ||
      (0x0101 == codePoint) ||
      (0x0111 == codePoint) ||
      (0x0113 == codePoint) ||
      (0x011B == codePoint) ||
      (0x0126 <= codePoint && codePoint <= 0x0127) ||
      (0x012B == codePoint) ||
      (0x0131 <= codePoint && codePoint <= 0x0133) ||
      (0x0138 == codePoint) ||
      (0x013F <= codePoint && codePoint <= 0x0142) ||
      (0x0144 == codePoint) ||
      (0x0148 <= codePoint && codePoint <= 0x014B) ||
      (0x014D == codePoint) ||
      (0x0152 <= codePoint && codePoint <= 0x0153) ||
      (0x0166 <= codePoint && codePoint <= 0x0167) ||
      (0x016B == codePoint) ||
      (0x01CE == codePoint) ||
      (0x01D0 == codePoint) ||
      (0x01D2 == codePoint) ||
      (0x01D4 == codePoint) ||
      (0x01D6 == codePoint) ||
      (0x01D8 == codePoint) ||
      (0x01DA == codePoint) ||
      (0x01DC == codePoint) ||
      (0x0251 == codePoint) ||
      (0x0261 == codePoint) ||
      (0x02C4 == codePoint) ||
      (0x02C7 == codePoint) ||
      (0x02C9 <= codePoint && codePoint <= 0x02CB) ||
      (0x02CD == codePoint) ||
      (0x02D0 == codePoint) ||
      (0x02D8 <= codePoint && codePoint <= 0x02DB) ||
      (0x02DD == codePoint) ||
      (0x02DF == codePoint) ||
      (0x0300 <= codePoint && codePoint <= 0x036F) ||
      (0x0391 <= codePoint && codePoint <= 0x03A1) ||
      (0x03A3 <= codePoint && codePoint <= 0x03A9) ||
      (0x03B1 <= codePoint && codePoint <= 0x03C1) ||
      (0x03C3 <= codePoint && codePoint <= 0x03C9) ||
      (0x0401 == codePoint) ||
      (0x0410 <= codePoint && codePoint <= 0x044F) ||
      (0x0451 == codePoint) ||
      (0x2010 == codePoint) ||
      (0x2013 <= codePoint && codePoint <= 0x2016) ||
      (0x2018 <= codePoint && codePoint <= 0x2019) ||
      (0x201C <= codePoint && codePoint <= 0x201D) ||
      (0x2020 <= codePoint && codePoint <= 0x2022) ||
      (0x2024 <= codePoint && codePoint <= 0x2027) ||
      (0x2030 == codePoint) ||
      (0x2032 <= codePoint && codePoint <= 0x2033) ||
      (0x2035 == codePoint) ||
      (0x203B == codePoint) ||
      (0x203E == codePoint) ||
      (0x2074 == codePoint) ||
      (0x207F == codePoint) ||
      (0x2081 <= codePoint && codePoint <= 0x2084) ||
      (0x20AC == codePoint) ||
      (0x2103 == codePoint) ||
      (0x2105 == codePoint) ||
      (0x2109 == codePoint) ||
      (0x2113 == codePoint) ||
      (0x2116 == codePoint) ||
      (0x2121 <= codePoint && codePoint <= 0x2122) ||
      (0x2126 == codePoint) ||
      (0x212B == codePoint) ||
      (0x2153 <= codePoint && codePoint <= 0x2154) ||
      (0x215B <= codePoint && codePoint <= 0x215E) ||
      (0x2160 <= codePoint && codePoint <= 0x216B) ||
      (0x2170 <= codePoint && codePoint <= 0x2179) ||
      (0x2189 == codePoint) ||
      (0x2190 <= codePoint && codePoint <= 0x2199) ||
      (0x21B8 <= codePoint && codePoint <= 0x21B9) ||
      (0x21D2 == codePoint) ||
      (0x21D4 == codePoint) ||
      (0x21E7 == codePoint) ||
      (0x2200 == codePoint) ||
      (0x2202 <= codePoint && codePoint <= 0x2203) ||
      (0x2207 <= codePoint && codePoint <= 0x2208) ||
      (0x220B == codePoint) ||
      (0x220F == codePoint) ||
      (0x2211 == codePoint) ||
      (0x2215 == codePoint) ||
      (0x221A == codePoint) ||
      (0x221D <= codePoint && codePoint <= 0x2220) ||
      (0x2223 == codePoint) ||
      (0x2225 == codePoint) ||
      (0x2227 <= codePoint && codePoint <= 0x222C) ||
      (0x222E == codePoint) ||
      (0x2234 <= codePoint && codePoint <= 0x2237) ||
      (0x223C <= codePoint && codePoint <= 0x223D) ||
      (0x2248 == codePoint) ||
      (0x224C == codePoint) ||
      (0x2252 == codePoint) ||
      (0x2260 <= codePoint && codePoint <= 0x2261) ||
      (0x2264 <= codePoint && codePoint <= 0x2267) ||
      (0x226A <= codePoint && codePoint <= 0x226B) ||
      (0x226E <= codePoint && codePoint <= 0x226F) ||
      (0x2282 <= codePoint && codePoint <= 0x2283) ||
      (0x2286 <= codePoint && codePoint <= 0x2287) ||
      (0x2295 == codePoint) ||
      (0x2299 == codePoint) ||
      (0x22A5 == codePoint) ||
      (0x22BF == codePoint) ||
      (0x2312 == codePoint) ||
      (0x2460 <= codePoint && codePoint <= 0x24E9) ||
      (0x24EB <= codePoint && codePoint <= 0x254B) ||
      (0x2550 <= codePoint && codePoint <= 0x2573) ||
      (0x2580 <= codePoint && codePoint <= 0x258F) ||
      (0x2592 <= codePoint && codePoint <= 0x2595) ||
      (0x25A0 <= codePoint && codePoint <= 0x25A1) ||
      (0x25A3 <= codePoint && codePoint <= 0x25A9) ||
      (0x25B2 <= codePoint && codePoint <= 0x25B3) ||
      (0x25B6 <= codePoint && codePoint <= 0x25B7) ||
      (0x25BC <= codePoint && codePoint <= 0x25BD) ||
      (0x25C0 <= codePoint && codePoint <= 0x25C1) ||
      (0x25C6 <= codePoint && codePoint <= 0x25C8) ||
      (0x25CB == codePoint) ||
      (0x25CE <= codePoint && codePoint <= 0x25D1) ||
      (0x25E2 <= codePoint && codePoint <= 0x25E5) ||
      (0x25EF == codePoint) ||
      (0x2605 <= codePoint && codePoint <= 0x2606) ||
      (0x2609 == codePoint) ||
      (0x260E <= codePoint && codePoint <= 0x260F) ||
      (0x2614 <= codePoint && codePoint <= 0x2615) ||
      (0x261C == codePoint) ||
      (0x261E == codePoint) ||
      (0x2640 == codePoint) ||
      (0x2642 == codePoint) ||
      (0x2660 <= codePoint && codePoint <= 0x2661) ||
      (0x2663 <= codePoint && codePoint <= 0x2665) ||
      (0x2667 <= codePoint && codePoint <= 0x266A) ||
      (0x266C <= codePoint && codePoint <= 0x266D) ||
      (0x266F == codePoint) ||
      (0x269E <= codePoint && codePoint <= 0x269F) ||
      (0x26BE <= codePoint && codePoint <= 0x26BF) ||
      (0x26C4 <= codePoint && codePoint <= 0x26CD) ||
      (0x26CF <= codePoint && codePoint <= 0x26E1) ||
      (0x26E3 == codePoint) ||
      (0x26E8 <= codePoint && codePoint <= 0x26FF) ||
      (0x273D == codePoint) ||
      (0x2757 == codePoint) ||
      (0x2776 <= codePoint && codePoint <= 0x277F) ||
      (0x2B55 <= codePoint && codePoint <= 0x2B59) ||
      (0x3248 <= codePoint && codePoint <= 0x324F) ||
      (0xE000 <= codePoint && codePoint <= 0xF8FF) ||
      (0xFE00 <= codePoint && codePoint <= 0xFE0F) ||
      (0xFFFD == codePoint) ||
      (0x1F100 <= codePoint && codePoint <= 0x1F10A) ||
      (0x1F110 <= codePoint && codePoint <= 0x1F12D) ||
      (0x1F130 <= codePoint && codePoint <= 0x1F169) ||
      (0x1F170 <= codePoint && codePoint <= 0x1F19A) ||
      (0xE0100 <= codePoint && codePoint <= 0xE01EF) ||
      (0xF0000 <= codePoint && codePoint <= 0xFFFFD) ||
      (0x100000 <= codePoint && codePoint <= 0x10FFFD)) {
    return 'A';
  }

  return 'N';
};

eaw.characterLength = function(character) {
  var code = this.eastAsianWidth(character);
  if (code == 'F' || code == 'W' || code == 'A') {
    return 2;
  } else {
    return 1;
  }
};

// Split a string considering surrogate-pairs.
function stringToArray(string) {
  return string.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
}

eaw.length = function(string) {
  var characters = stringToArray(string);
  var len = 0;
  for (var i = 0; i < characters.length; i++) {
    len = len + this.characterLength(characters[i]);
  }
  return len;
};

eaw.slice = function(text, start, end) {
  textLen = eaw.length(text);
  start = start ? start : 0;
  end = end ? end : 1;
  if (start < 0) {
      start = textLen + start;
  }
  if (end < 0) {
      end = textLen + end;
  }
  var result = '';
  var eawLen = 0;
  var chars = stringToArray(text);
  for (var i = 0; i < chars.length; i++) {
    var char = chars[i];
    var charLen = eaw.length(char);
    if (eawLen >= start - (charLen == 2 ? 1 : 0)) {
        if (eawLen + charLen <= end) {
            result += char;
        } else {
            break;
        }
    }
    eawLen += charLen;
  }
  return result;
};
}(eastasianwidth));

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(`\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`);

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) ; else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(`\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`);

var util$1 = {};

var types = {};

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams$1 = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

var hasSymbols$2 = shams$1;

var shams = function hasToStringTagShams() {
	return hasSymbols$2() && !!Symbol.toStringTag;
};

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = shams$1;

var hasSymbols$1 = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr$3 = Object.prototype.toString;
var funcType = '[object Function]';

var implementation$1 = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr$3.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var implementation = implementation$1;

var functionBind = Function.prototype.bind || implementation;

var bind$1 = functionBind;

var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);

var undefined$1;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD$1 = Object.getOwnPropertyDescriptor;
if ($gOPD$1) {
	try {
		$gOPD$1({}, '');
	} catch (e) {
		$gOPD$1 = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD$1
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD$1(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = hasSymbols$1();

var getProto$1 = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto$1(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto$1([][Symbol.iterator]()) : undefined$1,
	'%AsyncFromSyncIteratorPrototype%': undefined$1,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto$1(getProto$1([][Symbol.iterator]())) : undefined$1,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined$1 : getProto$1(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined$1 : getProto$1(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto$1(''[Symbol.iterator]()) : undefined$1,
	'%Symbol%': hasSymbols ? Symbol : undefined$1,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto$1(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = functionBind;
var hasOwn = src;
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

var getIntrinsic = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/g, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined$1;
			}
			if ($gOPD$1 && (i + 1) >= parts.length) {
				var desc = $gOPD$1(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

var callBind$1 = {exports: {}};

(function (module) {

var bind = functionBind;
var GetIntrinsic = getIntrinsic;

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}
}(callBind$1));

var GetIntrinsic$1 = getIntrinsic;

var callBind = callBind$1.exports;

var $indexOf$1 = callBind(GetIntrinsic$1('String.prototype.indexOf'));

var callBound$3 = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic$1(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf$1(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

var hasToStringTag$4 = shams();
var callBound$2 = callBound$3;

var $toString$2 = callBound$2('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag$4 && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString$2(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString$2(value) !== '[object Array]' &&
		$toString$2(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

var isArguments = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

var toStr$2 = Object.prototype.toString;
var fnToStr$1 = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag$3 = shams();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag$3) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

var isGeneratorFunction = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr$1.call(fn))) {
		return true;
	}
	if (!hasToStringTag$3) {
		var str = toStr$2.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr$1 = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag$2 = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`
/* globals document: false */
var documentDotAll = typeof document === 'object' && typeof document.all === 'undefined' && document.all !== undefined ? document.all : {};

var isCallable$1 = reflectApply
	? function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag$2) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr$1.call(value);
		return strClass === fnClass || strClass === genClass;
	};

var isCallable = isCallable$1;

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach$2 = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

var forEach_1 = forEach$2;

var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g$2 = typeof globalThis === 'undefined' ? commonjsGlobal : globalThis;

var availableTypedArrays$2 = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g$2[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};

var GetIntrinsic = getIntrinsic;

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

var getOwnPropertyDescriptor = $gOPD;

var forEach$1 = forEach_1;
var availableTypedArrays$1 = availableTypedArrays$2;
var callBound$1 = callBound$3;

var $toString$1 = callBound$1('Object.prototype.toString');
var hasToStringTag$1 = shams();

var g$1 = typeof globalThis === 'undefined' ? commonjsGlobal : globalThis;
var typedArrays$1 = availableTypedArrays$1();

var $indexOf = callBound$1('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice$1 = callBound$1('String.prototype.slice');
var toStrTags$1 = {};
var gOPD$1 = getOwnPropertyDescriptor;
var getPrototypeOf$1 = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag$1 && gOPD$1 && getPrototypeOf$1) {
	forEach$1(typedArrays$1, function (typedArray) {
		var arr = new g$1[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf$1(arr);
			var descriptor = gOPD$1(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf$1(proto);
				descriptor = gOPD$1(superProto, Symbol.toStringTag);
			}
			toStrTags$1[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays$1 = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach$1(toStrTags$1, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

var isTypedArray$1 = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag$1 || !(Symbol.toStringTag in value)) {
		var tag = $slice$1($toString$1(value), 8, -1);
		return $indexOf(typedArrays$1, tag) > -1;
	}
	if (!gOPD$1) { return false; }
	return tryTypedArrays$1(value);
};

var forEach = forEach_1;
var availableTypedArrays = availableTypedArrays$2;
var callBound = callBound$3;

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = shams();

var g = typeof globalThis === 'undefined' ? commonjsGlobal : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof g[typedArray] === 'function') {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = isTypedArray$1;

var whichTypedArray = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};

(function (exports) {

var isArgumentsObject = isArguments;
var isGeneratorFunction$1 = isGeneratorFunction;
var whichTypedArray$1 = whichTypedArray;
var isTypedArray = isTypedArray$1;

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction$1;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray$1(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray$1(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray$1(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray$1(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray$1(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray$1(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray$1(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray$1(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray$1(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray$1(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray$1(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});
}(types));

var isBuffer = function isBuffer(arg) {
  return arg instanceof Buffer;
};

var inherits = {exports: {}};

var inherits_browser = {exports: {}};

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

try {
  var util = require('util');
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  inherits.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  inherits.exports = inherits_browser.exports;
}

(function (exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    if (cur.indexOf('\n') >= 0) ;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = types;

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = inherits.exports;

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
};

exports.promisify.custom = kCustomPromisifiedSymbol;

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)); },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)); });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;
}(util$1));

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return segment[0].spread ? `/:${segment[0].content.slice(3)}(.*)?` : "/" + segment.map((part) => {
      if (part)
        return part.dynamic ? `:${part.content}` : part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
  }).join("");
  const trailing = addTrailingSlash !== "never" && segments.length ? "/" : "";
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push(__spreadProps(__spreadValues({}, serializedRoute), {
      routeData: deserializeRouteData(serializedRoute.routeData)
    }));
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return __spreadProps(__spreadValues({}, serializedManifest), {
    assets,
    routes
  });
}

const _manifest = Object.assign(deserializeManifest({"routes":[{"file":"","links":[],"scripts":[],"routeData":{"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.5de63fd1.css","assets/asset.946172d9.css","assets/asset.de888fcd.css","assets/asset.29a60217.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css","assets/asset.86927366.css","assets/asset.81951261.css","assets/asset.dffeaebb.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.5de63fd1.css","assets/asset.de888fcd.css","assets/asset.370b5f3f.css","assets/asset.86927366.css","assets/asset.ebc11f33.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/en\\/services\\/([^/]+?)\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/en/services/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.e2319853.css","assets/asset.946172d9.css","assets/asset.de888fcd.css","assets/asset.505750ae.css","assets/asset.0ed8ad27.css","assets/asset.370b5f3f.css","assets/asset.86927366.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/en\\/about\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/about.astro","pathname":"/en/about","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.0ed8ad27.css","assets/asset.e52801f0.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/en\\/brief\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"brief","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/brief.astro","pathname":"/en/brief","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.16bb9790.css","assets/asset.946172d9.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css","assets/asset.86927366.css","assets/asset.dffeaebb.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/en\\/work\\/([^/]+?)\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/en/work/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.1bede975.css","assets/asset.de888fcd.css","assets/asset.0ed8ad27.css","assets/asset.370b5f3f.css","assets/asset.6640baa9.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/en\\/work\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/work.astro","pathname":"/en/work","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.5de63fd1.css","assets/asset.946172d9.css","assets/asset.81951261.css","assets/asset.de888fcd.css","assets/asset.29a60217.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css","assets/asset.86927366.css","assets/asset.dffeaebb.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/es\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/index.astro","pathname":"/es","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.5de63fd1.css","assets/asset.de888fcd.css","assets/asset.370b5f3f.css","assets/asset.8ad5c0dd.css","assets/asset.86927366.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/es\\/services\\/([^/]+?)\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/es/services/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.946172d9.css","assets/asset.de888fcd.css","assets/asset.5f24efe3.css","assets/asset.505750ae.css","assets/asset.0ed8ad27.css","assets/asset.370b5f3f.css","assets/asset.86927366.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/es\\/about\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/about.astro","pathname":"/es/about","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.0ed8ad27.css","assets/asset.e52801f0.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/es\\/brief\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"brief","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/brief.astro","pathname":"/es/brief","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.946172d9.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css","assets/asset.86927366.css","assets/asset.dffeaebb.css","assets/asset.e86106df.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/es\\/work\\/([^/]+?)\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/es/work/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.de888fcd.css","assets/asset.0ed8ad27.css","assets/asset.aa027a5b.css","assets/asset.370b5f3f.css","assets/asset.6640baa9.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/es\\/work\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/work.astro","pathname":"/es/work","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.5de63fd1.css","assets/asset.946172d9.css","assets/asset.de888fcd.css","assets/asset.29a60217.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css","assets/asset.81951261.css","assets/asset.86927366.css","assets/asset.dffeaebb.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/pl\\/?$","segments":[[{"content":"pl","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pl/index.astro","pathname":"/pl","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.5de63fd1.css","assets/asset.de888fcd.css","assets/asset.6cc92049.css","assets/asset.370b5f3f.css","assets/asset.86927366.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/pl\\/services\\/([^/]+?)\\/?$","segments":[[{"content":"pl","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/pl/services/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.946172d9.css","assets/asset.de888fcd.css","assets/asset.505750ae.css","assets/asset.914cdb31.css","assets/asset.0ed8ad27.css","assets/asset.370b5f3f.css","assets/asset.86927366.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/pl\\/about\\/?$","segments":[[{"content":"pl","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pl/about.astro","pathname":"/pl/about","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.0ed8ad27.css","assets/asset.e52801f0.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/pl\\/brief\\/?$","segments":[[{"content":"pl","dynamic":false,"spread":false}],[{"content":"brief","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pl/brief.astro","pathname":"/pl/brief","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.194f94a1.css","assets/asset.946172d9.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css","assets/asset.86927366.css","assets/asset.dffeaebb.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/pl\\/work\\/([^/]+?)\\/?$","segments":[[{"content":"pl","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/pl/work/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.1bede975.css","assets/asset.de888fcd.css","assets/asset.0ed8ad27.css","assets/asset.370b5f3f.css","assets/asset.6640baa9.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/pl\\/work\\/?$","segments":[[{"content":"pl","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pl/work.astro","pathname":"/pl/work","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.5de63fd1.css","assets/asset.946172d9.css","assets/asset.de888fcd.css","assets/asset.81951261.css","assets/asset.29a60217.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css","assets/asset.86927366.css","assets/asset.dffeaebb.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ru\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ru/index.astro","pathname":"/ru","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.5de63fd1.css","assets/asset.ebc11f33.css","assets/asset.de888fcd.css","assets/asset.370b5f3f.css","assets/asset.86927366.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ru\\/services\\/([^/]+?)\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/ru/services/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.946172d9.css","assets/asset.de888fcd.css","assets/asset.e2319853.css","assets/asset.505750ae.css","assets/asset.0ed8ad27.css","assets/asset.370b5f3f.css","assets/asset.86927366.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ru\\/about\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ru/about.astro","pathname":"/ru/about","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.0ed8ad27.css","assets/asset.e52801f0.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ru\\/brief\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}],[{"content":"brief","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ru/brief.astro","pathname":"/ru/brief","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.16bb9790.css","assets/asset.946172d9.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css","assets/asset.86927366.css","assets/asset.dffeaebb.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ru\\/work\\/([^/]+?)\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/ru/work/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.de888fcd.css","assets/asset.1bede975.css","assets/asset.0ed8ad27.css","assets/asset.370b5f3f.css","assets/asset.6640baa9.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ru\\/work\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ru/work.astro","pathname":"/ru/work","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.5de63fd1.css","assets/asset.81951261.css","assets/asset.946172d9.css","assets/asset.de888fcd.css","assets/asset.29a60217.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css","assets/asset.86927366.css","assets/asset.dffeaebb.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/tr\\/?$","segments":[[{"content":"tr","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tr/index.astro","pathname":"/tr","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.ebc11f33.css","assets/asset.5de63fd1.css","assets/asset.de888fcd.css","assets/asset.370b5f3f.css","assets/asset.86927366.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/tr\\/services\\/([^/]+?)\\/?$","segments":[[{"content":"tr","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/tr/services/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.946172d9.css","assets/asset.e2319853.css","assets/asset.de888fcd.css","assets/asset.505750ae.css","assets/asset.0ed8ad27.css","assets/asset.370b5f3f.css","assets/asset.86927366.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/tr\\/about\\/?$","segments":[[{"content":"tr","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tr/about.astro","pathname":"/tr/about","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.0ed8ad27.css","assets/asset.e52801f0.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/tr\\/brief\\/?$","segments":[[{"content":"tr","dynamic":false,"spread":false}],[{"content":"brief","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tr/brief.astro","pathname":"/tr/brief","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.946172d9.css","assets/asset.370b5f3f.css","assets/asset.16bb9790.css","assets/asset.96c92a49.css","assets/asset.86927366.css","assets/asset.dffeaebb.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/tr\\/work\\/([^/]+?)\\/?$","segments":[[{"content":"tr","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/tr/work/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.de888fcd.css","assets/asset.0ed8ad27.css","assets/asset.370b5f3f.css","assets/asset.6640baa9.css","assets/asset.1bede975.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/tr\\/work\\/?$","segments":[[{"content":"tr","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tr/work.astro","pathname":"/tr/work","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.5de63fd1.css","assets/asset.946172d9.css","assets/asset.de888fcd.css","assets/asset.81951261.css","assets/asset.29a60217.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css","assets/asset.86927366.css","assets/asset.dffeaebb.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ua\\/?$","segments":[[{"content":"ua","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ua/index.astro","pathname":"/ua","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.5de63fd1.css","assets/asset.de888fcd.css","assets/asset.370b5f3f.css","assets/asset.ebc11f33.css","assets/asset.86927366.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ua\\/services\\/([^/]+?)\\/?$","segments":[[{"content":"ua","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/ua/services/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.946172d9.css","assets/asset.de888fcd.css","assets/asset.e2319853.css","assets/asset.505750ae.css","assets/asset.0ed8ad27.css","assets/asset.370b5f3f.css","assets/asset.86927366.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ua\\/about\\/?$","segments":[[{"content":"ua","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ua/about.astro","pathname":"/ua/about","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.0ed8ad27.css","assets/asset.e52801f0.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ua\\/brief\\/?$","segments":[[{"content":"ua","dynamic":false,"spread":false}],[{"content":"brief","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ua/brief.astro","pathname":"/ua/brief","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.946172d9.css","assets/asset.16bb9790.css","assets/asset.370b5f3f.css","assets/asset.96c92a49.css","assets/asset.86927366.css","assets/asset.dffeaebb.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ua\\/work\\/([^/]+?)\\/?$","segments":[[{"content":"ua","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/ua/work/[slug].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/asset.de888fcd.css","assets/asset.1bede975.css","assets/asset.0ed8ad27.css","assets/asset.370b5f3f.css","assets/asset.6640baa9.css"],"scripts":["entry.a7bbb060.js"],"routeData":{"type":"page","pattern":"^\\/ua\\/work\\/?$","segments":[[{"content":"ua","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ua/work.astro","pathname":"/ua/work","_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"mode":"mdx","drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[]},"pageMap":null,"renderers":[],"entryModules":{"@astrojs/solid-js/client.js":"entry.9c9d1692.js","/@fs/C:/work-projects/pireactor/main-site/client/src/components/solid/LangPicker":"entry.36ad41d9.js","/@fs/C:/work-projects/pireactor/main-site/client/src/components/solid/Counter":"entry.581459f7.js","/@fs/C:/work-projects/pireactor/main-site/client/src/components/solid/FormSubmit":"entry.e5802460.js","astro/client/load.js":"entry.316778ed.js","/astro/hoisted.js?q=0":"entry.a7bbb060.js","/@fs/C:/work-projects/pireactor/main-site/client/src/components/solid/Form":"entry.872f2add.js","/@fs/C:/work-projects/pireactor/main-site/client/src/components/solid/Projects":"entry.844c19e3.js","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/content.md?mdImport":"chunks/chunk.440c98c3.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/services/architecture.md?mdImport":"chunks/chunk.93527cb3.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/services/automation.md?mdImport":"chunks/chunk.59824c95.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/services/blockchain.md?mdImport":"chunks/chunk.7c3d0c0b.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/services/strategy.md?mdImport":"chunks/chunk.33bb18a9.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/services/wallets.md?mdImport":"chunks/chunk.ee134a3e.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/leads/AlexAlejandre.md?mdImport":"chunks/chunk.a5de9f52.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/leads/JohnVermazenSt.md?mdImport":"chunks/chunk.198b97c3.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/leads/JustynaBorwik.md?mdImport":"chunks/chunk.2f992be1.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/leads/StevenVermazen.md?mdImport":"chunks/chunk.d08d6e4f.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/projects/Brewery.md?mdImport":"chunks/chunk.29bcfbb2.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/projects/NewHope copy.md?mdImport":"chunks/chunk.dbd11095.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/projects/NewHope.md?mdImport":"chunks/chunk.79884e51.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/projects/NewHope2.md?mdImport":"chunks/chunk.787538be.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/projects/NewHope3.md?mdImport":"chunks/chunk.09debec5.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/content.md?mdImport":"chunks/chunk.4896bd4a.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/services/architecture.md?mdImport":"chunks/chunk.ccbb07d8.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/services/automation.md?mdImport":"chunks/chunk.938b4c4d.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/services/blockchain.md?mdImport":"chunks/chunk.5f73559c.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/services/strategy.md?mdImport":"chunks/chunk.9d579503.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/services/wallets.md?mdImport":"chunks/chunk.000bd02f.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/leads/AlexAlejandre.md?mdImport":"chunks/chunk.9316eb1e.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/leads/JohnVermazenSt.md?mdImport":"chunks/chunk.521dead4.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/leads/JustynaBorwik.md?mdImport":"chunks/chunk.35d644fe.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/leads/StevenVermazen.md?mdImport":"chunks/chunk.3899904f.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/projects/Brewery.md?mdImport":"chunks/chunk.f075a1b0.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/projects/NewHope copy.md?mdImport":"chunks/chunk.c40d7ba2.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/projects/NewHope.md?mdImport":"chunks/chunk.474beff1.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/projects/NewHope2.md?mdImport":"chunks/chunk.c534737f.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/projects/NewHope3.md?mdImport":"chunks/chunk.0d4b752c.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/content.md?mdImport":"chunks/chunk.832d7e87.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/services/architecture.md?mdImport":"chunks/chunk.2186ae96.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/services/automation.md?mdImport":"chunks/chunk.b391d7bf.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/services/blockchain.md?mdImport":"chunks/chunk.f9b7a791.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/services/strategy.md?mdImport":"chunks/chunk.64fc4e6e.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/services/wallets.md?mdImport":"chunks/chunk.e49a8342.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/leads/AlexAlejandre.md?mdImport":"chunks/chunk.cfba225e.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/leads/JohnVermazenSt.md?mdImport":"chunks/chunk.45b86101.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/leads/JustynaBorwik.md?mdImport":"chunks/chunk.b711c874.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/leads/StevenVermazen.md?mdImport":"chunks/chunk.ba210a2f.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/projects/Brewery.md?mdImport":"chunks/chunk.6d7ffc88.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/projects/NewHope copy.md?mdImport":"chunks/chunk.dcec0156.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/projects/NewHope.md?mdImport":"chunks/chunk.02d4d6c8.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/projects/NewHope2.md?mdImport":"chunks/chunk.9053395b.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/projects/NewHope3.md?mdImport":"chunks/chunk.ae655f4f.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/content.md?mdImport":"chunks/chunk.a999f7dd.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/content.md?mdImport":"chunks/chunk.70ae4c85.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/content.md?mdImport":"chunks/chunk.164f6447.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/services/architecture.md?mdImport":"chunks/chunk.a7a267b0.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/services/automation.md?mdImport":"chunks/chunk.70e6007d.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/services/blockchain.md?mdImport":"chunks/chunk.2f9977d7.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/services/strategy.md?mdImport":"chunks/chunk.513b3675.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/services/wallets.md?mdImport":"chunks/chunk.a237989c.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/services/architecture.md?mdImport":"chunks/chunk.91c8893a.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/services/automation.md?mdImport":"chunks/chunk.acb3f924.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/services/blockchain.md?mdImport":"chunks/chunk.f1a695b8.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/services/strategy.md?mdImport":"chunks/chunk.520832bb.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/services/wallets.md?mdImport":"chunks/chunk.8508d622.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/services/architecture.md?mdImport":"chunks/chunk.0b834678.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/services/automation.md?mdImport":"chunks/chunk.dd708ad7.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/services/blockchain.md?mdImport":"chunks/chunk.28640239.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/services/strategy.md?mdImport":"chunks/chunk.6668f04f.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/services/wallets.md?mdImport":"chunks/chunk.e2320abe.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/content.md":"chunks/chunk.9148dd73.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/services/architecture.md":"chunks/chunk.40339654.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/services/automation.md":"chunks/chunk.592cf9ca.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/services/blockchain.md":"chunks/chunk.8b79ead7.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/services/strategy.md":"chunks/chunk.955107b1.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/services/wallets.md":"chunks/chunk.da6f6002.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/leads/AlexAlejandre.md":"chunks/chunk.337dcf97.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/leads/JohnVermazenSt.md":"chunks/chunk.210d7145.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/leads/JustynaBorwik.md":"chunks/chunk.2e3faddc.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/leads/StevenVermazen.md":"chunks/chunk.56aa5c38.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/projects/Brewery.md":"chunks/chunk.1ed83c9e.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/projects/NewHope copy.md":"chunks/chunk.cf3b0f36.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/projects/NewHope.md":"chunks/chunk.d0dc6056.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/projects/NewHope2.md":"chunks/chunk.b898967b.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/en/projects/NewHope3.md":"chunks/chunk.01a883c1.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/content.md":"chunks/chunk.843cb283.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/services/architecture.md":"chunks/chunk.53ca1e11.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/services/automation.md":"chunks/chunk.14a278d8.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/services/blockchain.md":"chunks/chunk.8b39fb73.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/services/strategy.md":"chunks/chunk.6b999d7a.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/services/wallets.md":"chunks/chunk.7c41bc2f.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/leads/AlexAlejandre.md":"chunks/chunk.ba487c41.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/leads/JohnVermazenSt.md":"chunks/chunk.8dfa4ea3.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/leads/JustynaBorwik.md":"chunks/chunk.a02fee95.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/leads/StevenVermazen.md":"chunks/chunk.a9d93241.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/projects/Brewery.md":"chunks/chunk.44333d5b.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/projects/NewHope copy.md":"chunks/chunk.6e258234.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/projects/NewHope.md":"chunks/chunk.df9968b2.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/projects/NewHope2.md":"chunks/chunk.f5cd10f6.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/es/projects/NewHope3.md":"chunks/chunk.5a15de34.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/content.md":"chunks/chunk.ab0ec2c9.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/services/architecture.md":"chunks/chunk.84b6de18.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/services/automation.md":"chunks/chunk.dc608a9d.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/services/blockchain.md":"chunks/chunk.81379615.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/services/strategy.md":"chunks/chunk.522dfacb.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/services/wallets.md":"chunks/chunk.833713da.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/leads/AlexAlejandre.md":"chunks/chunk.32dd9d62.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/leads/JohnVermazenSt.md":"chunks/chunk.68a7fe72.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/leads/JustynaBorwik.md":"chunks/chunk.2eac3f9f.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/leads/StevenVermazen.md":"chunks/chunk.9742bdb7.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/projects/Brewery.md":"chunks/chunk.2862ed70.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/projects/NewHope copy.md":"chunks/chunk.51600d94.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/projects/NewHope.md":"chunks/chunk.c0bb1557.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/projects/NewHope2.md":"chunks/chunk.8b88baf6.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/pl/projects/NewHope3.md":"chunks/chunk.7f127e2f.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/content.md":"chunks/chunk.188bfe80.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/content.md":"chunks/chunk.8eafa584.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/content.md":"chunks/chunk.e3988815.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/services/architecture.md":"chunks/chunk.a78df52a.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/services/automation.md":"chunks/chunk.51e6b3ea.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/services/blockchain.md":"chunks/chunk.42f094b5.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/services/strategy.md":"chunks/chunk.08e2f895.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ru/services/wallets.md":"chunks/chunk.6587d0fa.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/services/architecture.md":"chunks/chunk.8215cebf.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/services/automation.md":"chunks/chunk.437a3593.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/services/blockchain.md":"chunks/chunk.3a1fbd9f.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/services/strategy.md":"chunks/chunk.736bd8d5.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/tr/services/wallets.md":"chunks/chunk.d92e366a.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/services/architecture.md":"chunks/chunk.d7c3ac20.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/services/automation.md":"chunks/chunk.48b4ff2a.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/services/blockchain.md":"chunks/chunk.b84d5e43.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/services/strategy.md":"chunks/chunk.c43dd886.mjs","C:/work-projects/pireactor/main-site/client/public/assets/content/ua/services/wallets.md":"chunks/chunk.73df7017.mjs","astro:scripts/before-hydration.js":"data:text/javascript;charset=utf-8,//[no before-hydration script]"},"assets":["/entry.316778ed.js","/entry.36ad41d9.js","/entry.581459f7.js","/entry.844c19e3.js","/entry.872f2add.js","/entry.9c9d1692.js","/entry.a7bbb060.js","/entry.e5802460.js","/favicon.ico","/assets/asset.9cf15e46.css","/chunks/chunk.031f193a.js","/chunks/chunk.779f1add.js","/chunks/chunk.cfb46bdd.js","/assets/content/en/content.md","/assets/content/es/content.md","/assets/content/pl/content.md","/assets/content/ru/content.md","/assets/content/tr/content.md","/assets/content/ua/content.md","/assets/fonts/AvantGardeCTT/AvantGardeCTT-Bold.woff","/assets/fonts/AvantGardeCTT/AvantGardeCTT-Bold.woff2","/assets/fonts/Inter/Inter-Bold.woff","/assets/fonts/Inter/Inter-Bold.woff2","/assets/fonts/Inter/Inter-Regular.woff","/assets/fonts/Inter/Inter-Regular.woff2","/assets/fonts/Inter/Inter-SemiBold.woff","/assets/fonts/Inter/Inter-SemiBold.woff2","/assets/fonts/PlusJakartaSans/PlusJakartaSans-Bold.woff","/assets/fonts/PlusJakartaSans/PlusJakartaSans-Bold.woff2","/assets/fonts/PlusJakartaSans/PlusJakartaSans-Medium.woff","/assets/fonts/PlusJakartaSans/PlusJakartaSans-Medium.woff2","/assets/fonts/PlusJakartaSans/PlusJakartaSans-Regular.woff","/assets/fonts/PlusJakartaSans/PlusJakartaSans-Regular.woff2","/assets/fonts/PlusJakartaSans/PlusJakartaSans-SemiBold.woff","/assets/fonts/PlusJakartaSans/PlusJakartaSans-SemiBold.woff2","/assets/img/about/about.svg","/assets/img/footer/f.svg","/assets/img/footer/in.svg","/assets/img/footer/mail.svg","/assets/img/footer/pin.svg","/assets/img/footer/t.svg","/assets/img/header/arrow.svg","/assets/img/header/close.svg","/assets/img/header/menu_btn.svg","/assets/img/main/architecture.svg","/assets/img/main/automation.svg","/assets/img/main/backend.svg","/assets/img/main/blockchain.svg","/assets/img/main/building.svg","/assets/img/main/cloud.svg","/assets/img/main/data.svg","/assets/img/main/defining.svg","/assets/img/main/deployment.svg","/assets/img/main/design.svg","/assets/img/main/designing.svg","/assets/img/main/frontend.svg","/assets/img/main/how.webp","/assets/img/main/how_mob.webp","/assets/img/main/main.webp","/assets/img/main/mainPage.svg","/assets/img/main/maintenance.svg","/assets/img/main/map.webp","/assets/img/main/ml.svg","/assets/img/main/planning.svg","/assets/img/main/strategy.svg","/assets/img/main/testing.svg","/assets/img/main/wallets.svg","/assets/img/project/check.svg","/assets/img/project/d.svg","/assets/img/works/clocks.svg","/assets/img/works/des.svg","/assets/img/works/dev.svg","/assets/img/works/devs.svg","/assets/img/works/star.svg","/assets/img/works/star.webp","/assets/img/works/strat.svg","/assets/content/en/leads/AlexAlejandre.md","/assets/content/en/leads/JohnVermazenSt.md","/assets/content/en/leads/JustynaBorwik.md","/assets/content/en/leads/StevenVermazen.md","/assets/content/en/projects/Brewery.md","/assets/content/en/projects/NewHope copy.md","/assets/content/en/projects/NewHope.md","/assets/content/en/projects/NewHope2.md","/assets/content/en/projects/NewHope3.md","/assets/content/en/services/architecture.md","/assets/content/en/services/automation.md","/assets/content/en/services/blockchain.md","/assets/content/en/services/strategy.md","/assets/content/en/services/wallets.md","/assets/content/es/leads/AlexAlejandre.md","/assets/content/es/leads/JohnVermazenSt.md","/assets/content/es/leads/JustynaBorwik.md","/assets/content/es/leads/StevenVermazen.md","/assets/content/es/projects/Brewery.md","/assets/content/es/projects/NewHope copy.md","/assets/content/es/projects/NewHope.md","/assets/content/es/projects/NewHope2.md","/assets/content/es/projects/NewHope3.md","/assets/content/es/services/architecture.md","/assets/content/es/services/automation.md","/assets/content/es/services/blockchain.md","/assets/content/es/services/strategy.md","/assets/content/es/services/wallets.md","/assets/content/pl/leads/AlexAlejandre.md","/assets/content/pl/leads/JohnVermazenSt.md","/assets/content/pl/leads/JustynaBorwik.md","/assets/content/pl/leads/StevenVermazen.md","/assets/content/pl/projects/Brewery.md","/assets/content/pl/projects/NewHope copy.md","/assets/content/pl/projects/NewHope.md","/assets/content/pl/projects/NewHope2.md","/assets/content/pl/projects/NewHope3.md","/assets/content/pl/services/architecture.md","/assets/content/pl/services/automation.md","/assets/content/pl/services/blockchain.md","/assets/content/pl/services/strategy.md","/assets/content/pl/services/wallets.md","/assets/content/ru/leads/AlexAlejandre.md","/assets/content/ru/leads/JohnVermazenSt.md","/assets/content/ru/leads/JustynaBorwik.md","/assets/content/ru/leads/StevenVermazen.md","/assets/content/ru/projects/Brewery.md","/assets/content/ru/projects/NewHope copy.md","/assets/content/ru/projects/NewHope.md","/assets/content/ru/projects/NewHope2.md","/assets/content/ru/projects/NewHope3.md","/assets/content/ru/services/architecture.md","/assets/content/ru/services/automation.md","/assets/content/ru/services/blockchain.md","/assets/content/ru/services/strategy.md","/assets/content/ru/services/wallets.md","/assets/content/tr/leads/AlexAlejandre.md","/assets/content/tr/leads/JohnVermazenSt.md","/assets/content/tr/leads/JustynaBorwik.md","/assets/content/tr/leads/StevenVermazen.md","/assets/content/tr/projects/Brewery.md","/assets/content/tr/projects/NewHope copy.md","/assets/content/tr/projects/NewHope.md","/assets/content/tr/projects/NewHope2.md","/assets/content/tr/projects/NewHope3.md","/assets/content/tr/services/architecture.md","/assets/content/tr/services/automation.md","/assets/content/tr/services/blockchain.md","/assets/content/tr/services/strategy.md","/assets/content/tr/services/wallets.md","/assets/content/ua/leads/AlexAlejandre.md","/assets/content/ua/leads/JohnVermazenSt.md","/assets/content/ua/leads/JustynaBorwik.md","/assets/content/ua/leads/StevenVermazen.md","/assets/content/ua/projects/Brewery.md","/assets/content/ua/projects/NewHope copy.md","/assets/content/ua/projects/NewHope.md","/assets/content/ua/projects/NewHope2.md","/assets/content/ua/projects/NewHope3.md","/assets/content/ua/services/architecture.md","/assets/content/ua/services/automation.md","/assets/content/ua/services/blockchain.md","/assets/content/ua/services/strategy.md","/assets/content/ua/services/wallets.md","/assets/img/about/location/g.webp","/assets/img/about/location/k.webp","/assets/img/about/location/ny.webp","/assets/img/about/team/1.webp","/assets/img/about/team/2.webp","/assets/img/about/team/3.webp","/assets/img/about/team/4.webp","/assets/asset.ebc11f33.css","/assets/asset.e2319853.css","/assets/asset.194f94a1.css","/assets/asset.16bb9790.css","/assets/asset.5de63fd1.css","/assets/asset.1bede975.css","/assets/asset.81951261.css","/assets/asset.946172d9.css","/assets/asset.de888fcd.css","/assets/asset.5f24efe3.css","/assets/asset.6cc92049.css","/assets/asset.505750ae.css","/assets/asset.914cdb31.css","/assets/asset.0ed8ad27.css","/assets/asset.aa027a5b.css","/assets/asset.29a60217.css","/assets/asset.e52801f0.css","/assets/asset.370b5f3f.css","/assets/asset.6640baa9.css","/assets/asset.8ad5c0dd.css","/assets/asset.96c92a49.css","/assets/asset.86927366.css","/assets/asset.dffeaebb.css","/assets/asset.e86106df.css"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { createAstro as a, createComponent as b, createMetadata as c, handler, render as r };
