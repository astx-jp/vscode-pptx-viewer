# PPTX Viewer

VS Code 上で PowerPoint（`.pptx`）をそのまま開けます。LibreOffice や外部変換ツールは不要です。

Claude Code などの AI エージェントが生成した `.pptx` を、エディタから離れずに手軽にプレビューすることを想定しています。

[English](README.md) | [Marketplace](https://marketplace.visualstudio.com/items?itemName=astx-jp.vscode-pptx-viewer) | [GitHub](https://github.com/astx-jp/vscode-pptx-viewer)

## 機能

- PPTX 直接描画 — PDF や画像への変換ではなく、`.pptx` をパースして表示
- スライド移動（次/前、番号ジャンプ）
- サムネイルサイドバー
- 棒グラフ描画
- キーボード操作対応、軽量、外部依存ゼロ

## 使い方

1. VS Code で `.pptx` を開く
2. **PPTX Viewer** のカスタムエディタが自動で開く

## 既知の制約

- 可能な限り PowerPoint に寄せますが、表示が一致しないケースがあります
- 暗号化 / パスワード付き `.pptx` には対応していません

## 開発

```bash
npm ci
npm run compile
```

VS Code で `F5` を押すと Extension Development Host が起動します。

## ライセンス

利用は無償ですが、OSS ではありません。[LICENSE](LICENSE) を参照してください。

## プライバシー / セキュリティ

- [プライバシーポリシー](PRIVACY.md)
- [プライバシーポリシー（日本語）](PRIVACY.ja.md)
- [セキュリティポリシー](SECURITY.md)
- [セキュリティポリシー（日本語）](SECURITY.ja.md)
