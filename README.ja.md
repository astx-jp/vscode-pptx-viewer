# PPTX Viewer

VS Code 上で PowerPoint（`.pptx`）をそのまま閲覧するための拡張です。

English: `README.md`

## 機能

- `.pptx` をカスタムの読み取り専用エディタで表示
- スライド移動（次/前、番号ジャンプ）
- サムネイル

## 使い方

1. VS Code で `.pptx` を開く
2. **PPTX Viewer** のカスタムエディタが自動で開く

## 既知の制約

- 可能な限り PowerPoint に寄せますが、表示が一致しないケースがあります
- 暗号化/パスワード付き `.pptx` には対応していません

## 開発

```bash
npm ci
npm run compile
```

- VS Code で `F5` を押すと Extension Development Host が起動します

## ライセンス

利用は無償ですが、OSSではありません。`LICENSE` を参照してください。

## プライバシー / セキュリティ

- プライバシー: `PRIVACY.md`
- プライバシー（日本語）: `PRIVACY.ja.md`
- セキュリティ: `SECURITY.md`
- セキュリティ（日本語）: `SECURITY.ja.md`
