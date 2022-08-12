# Welcome

- continuous integration - if new content isn't up instantly, the build failed. Check netlify logs with Ilya
- uses https://docs.astro.build

## 🚀 Project Structure

<<<<<<< HEAD
<<<<<<< HEAD
```
=======
>>>>>>> 277de74 (changed readme)
=======
```
>>>>>>> 11adb19 (Update readme again)
/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name. There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components or layouts. Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands -  run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:3000`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |



edit content here: pireactor/main-site/tree/dev/client/public/assets
in /content for all main pages (in the same file)
the other folders are for modular content, the descriptions posted on the main pages are found in individiual page files

to do:
- change work/project tags (currently architecture, automatization, blockchain, global strategy, wallets and exchanges)
- fix lang bug, put flag back

where
add language options
flag choices: pireactor/main-site/blob/dev/client/src/components/solid/LangPicker/Flags
