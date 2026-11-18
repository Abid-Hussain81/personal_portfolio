import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function loadData(name) {
  const source = fs.readFileSync(path.join(root, "data", name + ".ts"), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const compiledModule = { exports: {} };
  new Function("exports", "module", compiled)(compiledModule.exports, compiledModule);
  return compiledModule.exports;
}
const { profile } = loadData("profile");
const { resume } = loadData("resume");
const { skillCategories } = loadData("skills");
const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const link = (url, label) => '<a href="' + escape(url) + '">' + escape(label) + "</a>";
const work = resume.experience.map(job => '<article><h3>' + escape(job.role + " | " + job.company) + '</h3><p class="detail">' + escape(job.period + " | " + job.location) + "</p><ul>" + job.highlights.map(item => "<li>" + escape(item) + "</li>").join("") + "</ul></article>").join("");
const education = resume.education.map(item => "<article><h3>" + escape(item.degree) + '</h3><p class="detail">' + escape(item.institution + " | " + item.period) + "</p><p>" + escape(item.description) + "</p></article>").join("");
const skills = skillCategories.map(item => "<p><strong>" + escape(item.title) + ":</strong> " + item.skills.map(skill => escape(skill.name)).join(", ") + "</p>").join("");
const certs = resume.certifications.map(item => "<li>" + (item.url ? link(item.url, item.name) : escape(item.name)) + " | " + escape(item.issuer + " | " + item.year) + "</li>").join("");
const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Abid Hussain - Resume</title><style>@page{size:A4;margin:15mm}*{box-sizing:border-box}body{font:10pt/1.4 Arial,sans-serif;color:#25231f;margin:0}h1{font-size:25pt;letter-spacing:-.6pt;margin:0}header{border-bottom:2px solid #25231f;padding-bottom:10pt}header p{margin:5pt 0}.role{font-size:12pt}a{color:inherit;text-decoration:none}h2{font-size:11pt;text-transform:uppercase;letter-spacing:.7pt;border-bottom:1px solid #d8d3ca;padding-bottom:4pt;margin:15pt 0 7pt;break-after:avoid}h3{font-size:10.5pt;margin:9pt 0 2pt}p{margin:4pt 0}.detail{font-size:9pt;color:#555}ul{margin:5pt 0;padding-left:15pt}li{margin-bottom:4pt}article{break-inside:avoid}.skills p{margin:5pt 0}footer{margin-top:14pt;font-size:8.5pt;color:#666}</style></head><body><header><h1>' + escape(profile.name) + '</h1><p class="role">' + escape(profile.role) + "</p><p>" + escape(profile.location) + " | " + link("mailto:" + profile.email, profile.email) + "</p><p>" + link(profile.linkedin, "linkedin.com/in/abid-hussain-6853043a1") + " | " + link(profile.github, "github.com/Abid-Hussain81") + "</p></header><section><h2>Professional summary</h2><p>" + escape(resume.summary) + '</p></section><section class="skills"><h2>Technical skills</h2>' + skills + "</section><section><h2>Professional experience</h2>" + work + "</section><section><h2>Education</h2>" + education + "</section><section><h2>Certifications</h2><ul>" + certs + "</ul></section></body></html>";
const candidates = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome", "/usr/bin/chromium"].filter(Boolean);
const browser = candidates.find(candidate => fs.existsSync(candidate));
if (!browser) throw new Error("Set CHROME_PATH to an installed Chrome or Chromium executable.");
const tempRoot = path.resolve(os.tmpdir());
const tempDir = fs.mkdtempSync(path.join(tempRoot, "portfolio-resume-"));
const htmlPath = path.join(tempDir, "resume.html");
const output = path.join(root, "public", "resume.pdf");
try {
  fs.writeFileSync(htmlPath, html);
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-pdf-header-footer", "--user-data-dir=" + path.join(tempDir, "browser"), "--print-to-pdf=" + output, pathToFileURL(htmlPath).href], { timeout: 45000, windowsHide: true, stdio: "pipe" });
  const pdf = fs.readFileSync(output);
  if (pdf.subarray(0, 5).toString() !== "%PDF-" || pdf.length < 10000) throw new Error("Resume PDF was not generated correctly.");
  console.log("Generated public-safe resume.pdf (" + pdf.length + " bytes) from portfolio data.");
} finally {
  const resolved = path.resolve(tempDir);
  if (resolved.startsWith(tempRoot + path.sep) && path.basename(resolved).startsWith("portfolio-resume-")) {
    try { fs.rmSync(resolved, { recursive: true, force: true }); } catch { /* Chrome may briefly retain temporary profile files on Windows. */ }
  }
}
