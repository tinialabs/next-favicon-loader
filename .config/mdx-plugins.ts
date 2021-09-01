import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkEmoji from 'remark-emoji'
import remarkImages from 'remark-images'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
import remarkUnrapImages from 'remark-unwrap-images'
import remarkFrontMatter from 'remark-frontmatter'

/** 
 * This file provides the remark and rehype plugins that are used in the 
 * processing of MDX files
 * 
 * It executes on the server-side but can contain valid typescript
 */
export default {
    remarkPlugins: [
        rehypeAutolinkHeadings,
        remarkEmoji,
        remarkImages,
        remarkSlug,
        remarkToc,
        remarkUnrapImages,
        remarkFrontMatter
    ],
    rehypePlugins: []
}
