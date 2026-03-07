# PPTX Viewer

View PowerPoint (`.pptx`) presentations directly in VS Code.

日本語: `README.ja.md`

## Features

- Opens `.pptx` files in a custom readonly editor
- Slide navigation (next/prev, jump to slide)
- Thumbnails

## Usage

1. Open a `.pptx` file in VS Code
2. The **PPTX Viewer** custom editor opens automatically

## Known limitations

- Rendering is best-effort and may differ from PowerPoint in edge cases
- Encrypted / password-protected `.pptx` is not supported

## Development

```bash
npm ci
npm run compile
```

- Press `F5` in VS Code to launch the Extension Development Host

## License

Free to use, but not open source. See `LICENSE`.

## Privacy & Security

- Privacy: `PRIVACY.md`
- Privacy (日本語): `PRIVACY.ja.md`
- Security: `SECURITY.md`
- Security (日本語): `SECURITY.ja.md`
