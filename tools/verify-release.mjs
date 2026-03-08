import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export function verifyRelease(tag, deps = defaultDeps) {
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

  const commit = deps.git(['rev-list', '-n', '1', tag]).trim();
  if (!commit) {
    fail(`Unable to resolve a commit for ${tag}.`);
  }

  const changedFiles = deps.git(['diff-tree', '--root', '--no-commit-id', '--name-only', '-r', commit])
    .split(/\r?\n/)
    .filter(Boolean);
  for (const required of ['package.json', 'CHANGELOG.md']) {
    if (!changedFiles.includes(required)) {
      fail(`${tag} must point to a commit that includes ${required}. Current commit files: ${changedFiles.join(', ') || '(none)'}`);
    }
  }

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

const defaultDeps = {
  readFile(url, encoding) {
    return readFileSync(url, encoding);
  },
  git(args) {
    return execFileSync('git', args, { encoding: 'utf8' }).trim();
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
