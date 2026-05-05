# Changelog

## 0.0.12

- Fix rendering issues in some decks, including centered titles, wrapped labels,
  table text alignment, and inline text fields.
- Improve rendering of rotated/flipped groups, cropped image opacity, and chart
  series colors that use theme colors.
- Fix an issue where slides could fail to appear in some PPTX files.
- Open supported hyperlinks from shapes, pictures, and text through VS Code.
- Improve viewer stability when closing PPTX tabs during parsing or opening
  unusually large files.

## 0.0.11

- Improve text rendering compatibility with PowerPoint.
- Fix font size and bold styling in some presentations.

## 0.0.10

- Display placeholder overlays for unsupported elements on slides.
- Add issue reporting shortcut and automatic unsupported element detection.
- Unify warning system (SlideWarning): font warnings, macro detection,
  AI-generated metadata, and structural warnings.

## 0.0.9

- Add support for `.pptm`, `.ppsm`, `.potx`, `.potm` formats.

## 0.0.8

- Render all PowerPoint preset shapes with appropriate geometry.
  - Stars, ribbons, callouts, flowcharts, etc.
- Add shadow rendering from theme styles.

## 0.0.7

- Fix table rendering: merged cells, vertical text alignment in cells.
- Internal: renderer refactoring for concurrent-safe rendering.

## 0.0.6

- Add zoom and pan support for slide view (Ctrl+scroll, Ctrl+/-, drag to pan).
- Fix vertical text offset caused by CSS default line-height adding extra leading.

## 0.0.5

- Add bar chart rendering.

## 0.0.4

- Fix paragraph alignment lost when a paragraph contains multiple text runs.
- Add chart placeholder display for unsupported chart elements with type detection.

## 0.0.3

- Fix custom editor reload after tab switching so the slide view does not become
  blank and the counter does not reset to `0 / 0`.

## 0.0.2

- Add extension icon to Marketplace listing.
- Sync icon asset to public repo.

## 0.0.1

- Initial release.
