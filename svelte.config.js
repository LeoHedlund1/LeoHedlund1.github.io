import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex'
import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';



/** @type {import('@sveltejs/kit').Config} */
const config = {

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), mdsvex({
		extensions: ['.md', '.svx'],
		layout: { blog: 'C:/Users/leohed02/Documents/GitHub/leohedlund1.github.io/src/routes/blog/post.svelte' },
	})],

	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
		})
	},

	vitePlugin: {
		experimental: {
			inspector: {
				toggleKeyCombo: 'meta-shift',
				holdMode: true,
				showToggleButton: 'always',
				toggleButtonPos: 'bottom-right'
			}
		}
	},

	extensions: ['.svelte', '.md', '.svx'],
	remarkPlugins: [
		[
			remarkGithub,
			{
				// Use your own repository
				repository: 'https://github.com/LeoHedlund1/leohedlund1.github.io.git'
			}
		],
		remarkAbbr
	],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	]

};

export default config;


