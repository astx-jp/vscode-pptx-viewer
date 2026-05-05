# PPTX Viewer

VS Code および互換エディター（Cursor, Windsurf 等）上で PowerPoint ファイルをそのまま開けます。PowerPoint、LibreOffice、外部変換ツールは不要です。

[English](README.md) | [Marketplace](https://marketplace.visualstudio.com/items?itemName=astx-jp.vscode-pptx-viewer) | [GitHub](https://github.com/astx-jp/vscode-pptx-viewer)

![PPTX Viewer Demo](assets/demo-shape-gallery.png)

## こんなときに

- **AI が生成したスライドをすぐ確認** — Claude Code や GPT が作った `.pptx` を、エディターから離れずにプレビュー
- **PowerPoint なしでデッキをざっと見る** — VS Code / Cursor 上でスライドを流し読み。アプリ切り替え不要
- **ローカル完結で安全** — すべてローカルで処理。ファイルが外部に送信されることはありません

## 機能

- PPTX 直接描画 — PDF や画像への変換ではなく、PowerPoint XML をパースして表示
- 全 OOXML プレゼンテーション形式に対応: `.pptx`, `.ppsx`, `.pptm`, `.ppsm`, `.potx`, `.potm`
- スライド移動（次/前、番号ジャンプ）
- サムネイルサイドバー
- 棒グラフ描画
- キーボード操作対応、軽量、外部通信なし

## 比較

| 選択肢 | VS Code 内で `.pptx` を開ける | 外部アプリが必要 | PPTX 直接描画 | 向いている用途 |
|---|---:|---:|---:|---|
| PPTX Viewer | はい | いいえ | はい | エディター内での素早いローカル確認 |
| PowerPoint デスクトップ版 | いいえ | はい | はい | 編集と最終確認 |
| PDF / 画像変換ワークフロー | 一部 | はい | いいえ | 固定された見た目の共有 |
| 汎用ファイルプレビュー | 一部 | いいえ | いいえ | ファイルの存在確認 |

## 使い方

1. エディターで PowerPoint ファイルを開く
2. **PPTX Viewer** のカスタムエディタが自動で開く

## 既知の制約

- 可能な限り PowerPoint に寄せますが、表示が一致しないケースがあります
- 暗号化 / パスワード付きファイルには対応していません
- `.pptm` / `.ppsm` / `.potm` のマクロは無視されます（表示のみ）

## 開発

```bash
npm ci
npm run compile
```

`F5` を押すと Extension Development Host が起動します。

## ライセンス

利用は無償ですが、OSS ではありません。[LICENSE](LICENSE) を参照してください。

## プライバシー / セキュリティ

- [プライバシーポリシー](PRIVACY.md)
- [プライバシーポリシー（日本語）](PRIVACY.ja.md)
- [セキュリティポリシー](SECURITY.md)
- [セキュリティポリシー（日本語）](SECURITY.ja.md)
