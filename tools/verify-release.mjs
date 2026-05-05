import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export function verifyRelease(tag, deps = defaultDeps) {
  deps = { ...defaultDeps, ...deps };
  if (!tag) {
    fail('Release tag is required. Pass vX.Y.Z as an argument or via GITHUB_REF_NAME.');
  }

  if (!/^v\d+\.\d+\.\d+$/.test(tag)) {
    fail(`Release tag must match vX.Y.Z. Received: ${tag}`);
  }

  const version = tag.slice(1);
  const pkg = JSON.parse(deps.readFile(new URL('../package.json', import.meta.url), 'utf8'));
  if (pkg.version !== version) {
    fail(`package.json version ${pkg.version} does not match release tag ${tag}.`);
  }

  verifyChangelog(version, deps.readFile(new URL('../CHANGELOG.md', import.meta.url), 'utf8'));

  const status = deps.git(['status', '--porcelain']).trimEnd();
  if (status.trim()) {
    fail(`Working tree must be clean before release. Uncommitted changes:\n${status}`);
  }

  const commit = deps.git(['rev-list', '-n', '1', tag]).trim();
  if (!commit) {
    fail(`Unable to resolve a commit for ${tag}.`);
  }

  const head = deps.git(['rev-parse', 'HEAD']).trim();
  if (commit !== head) {
    fail(`Release tag ${tag} (${commit}) does not point to HEAD (${head}). Checkout the tag before verifying.`);
  }

  const changedFiles = deps.git(['diff-tree', '--root', '--no-commit-id', '--name-only', '-r', commit])
    .split(/\r?\n/)
    .filter(Boolean);
  for (const required of ['package.json', 'CHANGELOG.md']) {
    if (!changedFiles.includes(required)) {
      fail(`${tag} must point to a commit that includes ${required}. Current commit files: ${changedFiles.join(', ') || '(none)'}`);
    }
  }

  verifyPackagedFiles(deps.packageFiles(), deps);

  return { tag, version, commit, changedFiles };
}

export function verifyChangelog(version, changelog) {
  const lines = changelog.split(/\r?\n/);
  const heading = `## ${version}`;
  const start = lines.findIndex((line) => line.trim() === heading);
  if (start === -1) {
    fail(`CHANGELOG.md is missing the heading "${heading}".`);
  }

  const sectionLines = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^##\s+/.test(line)) break;
    sectionLines.push(line);
  }

  const bodyLines = sectionLines.map((line) => line.trim()).filter(Boolean);
  if (bodyLines.length === 0) {
    fail(`CHANGELOG.md section ${heading} must not be empty.`);
  }

  if (!bodyLines.some((line) => /^-\s+\S+/.test(line))) {
    fail(`CHANGELOG.md section ${heading} must include at least one bullet item.`);
  }
}

const PACKAGE_REQUIRED_FILES = [
  'package.json',
  'README.md',
  'LICENSE',
  'dist/extension.js',
  'dist/webview.js',
  'dist/webview.css',
  'assets/icon.png',
];

const PACKAGE_DENYLIST = [
  '.local/',
  '.vscode/',
  '.claude/',
  '.github/',
  'docs/',
  'evidence/',
  'ref/',
  'samples/',
  'src/',
  'tools/',
  'webview/',
  'node_modules/',
  'dist/evidence-baseline.',
  'dist/pptx-autofind-',
  'dist/dump-slide.',
  'dist/generate-shape-gallery.',
];

export function verifyPackagedFiles(files, deps = defaultDeps) {
  deps = { ...defaultDeps, ...deps };
  const normalized = files.map(normalizePackagePath).filter(Boolean);

  for (const required of PACKAGE_REQUIRED_FILES) {
    if (!normalized.includes(required)) {
      fail(`VSIX package is missing required file: ${required}`);
    }
  }

  const denied = normalized.filter((file) => PACKAGE_DENYLIST.some((prefix) => file.startsWith(prefix)));
  if (denied.length > 0) {
    fail(`VSIX package includes denied files: ${denied.join(', ')}`);
  }

  if (deps.readFile) {
    const vscodeIgnore = deps.readFile(new URL('../.vscodeignore', import.meta.url), 'utf8');
    for (const requiredIgnore of ['.local/**', 'ref/**', 'dist/evidence-baseline.*', 'dist/pptx-autofind-*']) {
      if (!vscodeIgnore.includes(requiredIgnore)) {
        fail(`.vscodeignore must include ${requiredIgnore}`);
      }
    }
  }

  return normalized;
}

const defaultDeps = {
  readFile(url, encoding) {
    return readFileSync(url, encoding);
  },
  git(args) {
    return execFileSync('git', args, { encoding: 'utf8' });
  },
  packageFiles() {
    return execFileSync('npx', ['--yes', '@vscode/vsce', 'ls', '--no-dependencies'], { encoding: 'utf8' })
      .split(/\r?\n/)
      .filter(Boolean);
  },
};

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const tag = process.argv[2] || process.env.GITHUB_REF_NAME;
  verifyRelease(tag);
  console.log(`Release verification passed for ${tag}.`);
}

function fail(message) {
  throw new Error(message);
}

function normalizePackagePath(path) {
  return String(path).trim().replace(/\\/g, '/').replace(/^\.\//, '');
}
