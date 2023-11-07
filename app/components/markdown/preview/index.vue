<script setup lang="ts">
import { createMarkdownExit } from "markdown-exit";

defineProps<{
  content?: string
}>()

const md = createMarkdownExit({
  html: true,
});
</script>

<template>
  <div v-html="md.render(content || '')" class="!font-sans min-h-[25vh]" bg="![var(--bg-color)]"
    id="markdown-preview" />
</template>

<style lang="less">
#markdown-preview {
  --md-color-card-bg: rgba(255, 255, 255, 0.92);
  --md-color-card-border: rgba(226, 232, 240, 0.9);
  --md-color-card-shadow: rgba(15, 23, 42, 0.08);
  --md-color-text: #334155;
  --md-color-heading: #0f172a;
  --md-color-muted: #64748b;
  --md-color-quote: #475569;
  --md-color-link: #db2777;
  --md-color-link-hover: #be185d;
  --md-color-link-border: rgba(219, 39, 119, 0.25);
  --md-color-link-border-hover: rgba(219, 39, 119, 0.55);
  --md-color-border: #e2e8f0;
  --md-color-border-strong: #f9a8d4;
  --md-color-surface: rgba(248, 250, 252, 0.92);
  --md-color-surface-soft: rgba(241, 245, 249, 0.95);
  --md-color-quote-bg: linear-gradient(135deg, rgba(253, 242, 248, 0.92), rgba(248, 250, 252, 0.92));
  --md-color-table-head-bg: rgba(253, 242, 248, 0.95);
  --md-color-table-row-hover: rgba(253, 242, 248, 0.55);
  --md-color-code-block-bg: #111827;
  --md-color-code-block-text: #e5e7eb;
  --md-font-code: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --md-line-height: 1.85;
  --md-letter-spacing: 0.01em;
  --md-radius-sm: 0.45rem;
  --md-radius-md: 0.75rem;
  --md-radius-lg: 0.95rem;
  --md-radius-xl: 1rem;
  --md-space-xs: 0.35rem;
  --md-space-sm: 0.5rem;
  --md-space-md: 1rem;
  --md-space-lg: 1.2rem;
  --md-space-xl: 1.5rem;
  --md-space-2xl: 1.6rem;
  --md-space-3xl: 2rem;

  color: var(--md-color-text);
  line-height: var(--md-line-height);
  font-size: 1rem;
  letter-spacing: var(--md-letter-spacing);
  background: var(--md-color-card-bg) !important;
  // background: var(--bg-color);
  border: 1px solid var(--md-color-card-border);
  // border-radius: var(--md-radius-xl);
  border-radius: 4px;
  box-shadow: 0 16px 40px var(--md-color-card-shadow);
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

[data-theme="dark"] #markdown-preview {
  // --md-color-card-bg: rgba(28, 23, 27, 0.88);
  --md-color-card-bg: var(--bg-color);
  --md-color-card-border: rgba(207, 191, 139, 0.22);
  --md-color-card-shadow: rgba(0, 0, 0, 0.28);
  --md-color-text: #dbe3ef;
  --md-color-heading: #fff7ed;
  --md-color-muted: #9ca3af;
  --md-color-quote: #e9d5ff;
  --md-color-link: #f9a8d4;
  --md-color-link-hover: #fbcfe8;
  --md-color-link-border: rgba(249, 168, 212, 0.32);
  --md-color-link-border-hover: rgba(251, 207, 232, 0.72);
  --md-color-border: rgba(207, 191, 139, 0.22);
  --md-color-border-strong: rgba(255, 105, 180, 0.72);
  --md-color-surface: rgba(255, 255, 255, 0.06);
  --md-color-surface-soft: rgba(255, 255, 255, 0.09);
  --md-color-quote-bg: linear-gradient(135deg, rgba(255, 105, 180, 0.14), rgba(207, 191, 139, 0.08));
  --md-color-table-head-bg: rgba(255, 105, 180, 0.12);
  --md-color-table-row-hover: rgba(255, 255, 255, 0.05);
  --md-color-code-block-bg: rgba(8, 10, 16, 0.9);
  --md-color-code-block-text: #f8fafc;
}

#markdown-preview p {
  margin: var(--md-space-lg) 0;
}

#markdown-preview h1,
#markdown-preview h2,
#markdown-preview h3,
#markdown-preview h4,
#markdown-preview h5,
#markdown-preview h6 {
  margin: 2.2rem 0 var(--md-space-md);
  font-weight: 700;
  line-height: 1.25;
  color: var(--md-color-heading);
}

#markdown-preview h1 {
  font-size: 2.1rem;
  letter-spacing: -0.04em;
}

#markdown-preview h2 {
  font-size: 1.75rem;
}

#markdown-preview h3 {
  font-size: 1.35rem;
}

#markdown-preview a {
  color: var(--md-color-link);
  text-decoration: none;
  border-bottom: 1px solid var(--md-color-link-border);
  transition: color 0.2s ease, border-color 0.2s ease;
}

#markdown-preview a:hover {
  color: var(--md-color-link-hover);
  border-color: var(--md-color-link-border-hover);
}

#markdown-preview strong {
  color: var(--md-color-heading);
}

#markdown-preview em {
  font-style: italic;
}

#markdown-preview blockquote {
  margin: var(--md-space-2xl) 0;
  padding: var(--md-space-md) 1.25rem;
  border-left: 4px solid var(--md-color-border-strong);
  color: var(--md-color-quote);
  background: var(--md-color-quote-bg);
  border-radius: var(--md-radius-md);
}

#markdown-preview code {
  display: inline-block;
  padding: 0.2rem var(--md-space-xs);
  border-radius: var(--md-radius-sm);
  background: var(--md-color-surface-soft);
  color: var(--md-color-heading);
  font-size: 0.95em;
  font-family: var(--md-font-code);
}

#markdown-preview pre {
  margin: var(--md-space-2xl) 0;
  padding: var(--md-space-md);
  overflow-x: auto;
  border: 1px solid var(--md-color-border);
  border-radius: var(--md-radius-xl);
  background: var(--md-color-code-block-bg);
  color: var(--md-color-code-block-text);
}

#markdown-preview pre code {
  background: transparent;
  color: inherit;
  padding: 0;
  display: block;
}

#markdown-preview ul,
#markdown-preview ol {
  margin: var(--md-space-lg) 0;
  padding-left: 1.4rem;
}

#markdown-preview li {
  margin: var(--md-space-xs) 0;
}

#markdown-preview img {
  display: block;
  max-width: 100%;
  border-radius: var(--md-radius-xl);
  margin: var(--md-space-xl) 0;
}

#markdown-preview table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--md-space-xl) 0;
  overflow: hidden;
  border-radius: var(--md-radius-md);
  font-size: 0.95rem;
}

#markdown-preview th,
#markdown-preview td {
  border: 1px solid var(--md-color-border);
  padding: 0.85rem var(--md-space-md);
}

#markdown-preview th {
  background: var(--md-color-table-head-bg);
  color: var(--md-color-heading);
  text-align: left;
}

#markdown-preview tbody tr:hover {
  background: var(--md-color-table-row-hover);
}

#markdown-preview hr {
  border: none;
  height: 1px;
  background: var(--md-color-border);
  margin: var(--md-space-3xl) 0;
}

#markdown-preview details {
  margin: var(--md-space-xl) 0;
  padding: var(--md-space-md);
  border: 1px solid var(--md-color-border);
  border-radius: var(--md-radius-lg);
  background: var(--md-color-surface);
}

#markdown-preview summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--md-color-heading);
}

#markdown-preview .task-list-item {
  list-style: none;
}

#markdown-preview .task-list-item label {
  display: inline-flex;
  align-items: center;
  gap: var(--md-space-sm);
}

#markdown-preview .footnotes {
  margin-top: var(--md-space-xl);
  padding-top: var(--md-space-md);
  border-top: 1px solid var(--md-color-border);
  color: var(--md-color-muted);
  font-size: 0.92rem;
}
</style>
