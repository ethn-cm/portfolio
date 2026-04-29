import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "./projects.js";

const ROOT = dirname(fileURLToPath(import.meta.url));

const escHtml = (s) =>
  String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const escAttr = (s) => String(s).replace(/"/g, "&quot;");
const paragraphs = (body) =>
  String(body)
    .split(/\n{2,}/)
    .map((p) => `<p>${escHtml(p.trim())}</p>`)
    .join("");

const renderers = {
  image: ({ src, alt = "", caption, fullBleed, framed, naturalSize }) => `
    <figure class="block block-image${fullBleed ? " full-bleed" : ""}${framed ? " framed" : ""}${naturalSize ? " natural" : ""}">
      <img src="../../${src}" alt="${escAttr(alt)}" />
      ${caption ? `<figcaption>${escHtml(caption)}</figcaption>` : ""}
    </figure>`,

  text: ({ body }) => `
    <div class="block block-text">${paragraphs(body)}</div>`,

  twoUp: ({ left, right }) => `
    <div class="block block-two-up">
      <img src="../../${left.src}" alt="${escAttr(left.alt || "")}" />
      <img src="../../${right.src}" alt="${escAttr(right.alt || "")}" />
    </div>`,

  video: ({ src, poster, autoplay = true, loop = true, muted = true, controls = false, framed = false }) => `
    <div class="block block-video${framed ? " framed" : ""}">
      <video src="../../${src}"${poster ? ` poster="../../${poster}"` : ""}${autoplay ? " autoplay" : ""}${loop ? " loop" : ""}${muted ? " muted playsinline" : ""}${controls ? " controls" : ""}></video>
    </div>`,

  placeholder: ({ aspect = "16/9" }) =>
    `<div class="block block-placeholder" style="aspect-ratio:${aspect}"></div>`,

  placeholders: ({ count = 2, aspect = "1/1" }) =>
    `<div class="block block-placeholders" style="--cols:${count}">
      ${Array.from({ length: count }, () =>
        `<div class="placeholder-cell" style="aspect-ratio:${aspect}"></div>`
      ).join("")}
    </div>`,

  html: ({ html }) => html,

  split: ({ left, right }) => `
    <div class="block block-split">
      <figure class="block-split-left">
        <img src="../../${escAttr(left.src)}" alt="${escAttr(left.alt || "")}" />
      </figure>
      <div class="block-split-right">
        ${right.media ? `<img src="../../${escAttr(right.media.src)}" alt="${escAttr(right.media.alt || "")}" />` : ""}
        ${right.title ? `<h3 class="block-split-title">${escHtml(right.title)}</h3>` : ""}
        ${right.body ? `<div class="block-split-body">${paragraphs(right.body)}</div>` : ""}
      </div>
    </div>`
};

function renderBlocks(blocks = []) {
  return blocks
    .map((b) => {
      const r = renderers[b.type];
      if (!r) throw new Error(`Unknown block type "${b.type}"`);
      return r(b);
    })
    .join("\n");
}

function renderSection(name, label, data = {}) {
  const body = data.body
    ? `<p class="section-body">${escHtml(data.body)}</p>`
    : "";
  const blocks = data.blocks && data.blocks.length
    ? `<div class="section-blocks">${renderBlocks(data.blocks)}</div>`
    : "";
  return `
    <section class="project-section section-${name}">
      <header class="section-head"><h2>${label}</h2></header>
      ${body}
      ${blocks}
    </section>`;
}

const template = await readFile(join(ROOT, "project-template.html"), "utf8");

for (let i = 0; i < projects.length; i++) {
  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  const contextBody = p.context
    ? `<p class="section-body">${escHtml(p.context)}</p>`
    : "";

  const html = template
    .replaceAll("{{TITLE}}", escHtml(p.title))
    .replaceAll("{{STATUS}}", escHtml(p.status ?? ""))
    .replaceAll("{{DURATION}}", escHtml(p.duration ?? p.status ?? ""))
    .replaceAll("{{DISCIPLINES}}", escHtml(p.disciplines ?? ""))
    .replaceAll("{{ROLE}}", escHtml(p.role ?? ""))
    .replaceAll("{{CONTEXT_BODY}}", contextBody)
    .replaceAll(
      "{{HERO}}",
      p.hero?.src
        ? /\.(mp4|webm|mov)$/i.test(p.hero.src)
          ? `<video src="../../${escAttr(p.hero.src)}" autoplay muted playsinline></video>`
          : `<img src="../../${escAttr(p.hero.src)}" alt="${escAttr(p.hero.alt ?? "")}" />`
        : `<div class="hero-placeholder"></div>`
    )
    .replaceAll("{{PROBLEM_SECTION}}", renderSection("problem", "Problem", p.problem))
    .replaceAll("{{STRATEGY_SECTION}}", renderSection("strategy", "Strategy", p.strategy))
    .replaceAll("{{SOLUTION_SECTION}}", renderSection("solution", "Solution", p.solution))
    .replaceAll("{{PREV_HREF}}", `projects/${prev.slug}/`)
    .replaceAll("{{PREV_TITLE}}", escHtml(prev.title))
    .replaceAll("{{NEXT_HREF}}", `projects/${next.slug}/`)
    .replaceAll("{{NEXT_TITLE}}", escHtml(next.title))
    .replaceAll("{{BODY_CLASS}}", `project-page${p.bodyClass ? ` ${p.bodyClass}` : ""}`);

  const out = join(ROOT, "projects", p.slug, "index.html");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`built /projects/${p.slug}/`);
}
