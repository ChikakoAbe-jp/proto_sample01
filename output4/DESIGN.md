# デザイン仕様書 — HACCO（ハッコー）クラフトビールEC

## 1. デザインコンセプト

- **トーン・世界観**: ナチュラル・クラフト・温かみ。生産者のストーリーと素材の質感を前面に出す。高級感はありつつ、敷居を下げる親しみやすさも持つ。
- **ターゲットとの関係性**: ビールを「楽しみ」として選ぶ30〜40代。知識の深さに依らず、味・物語・体験で選べる設計。
- **参考方向性**: WHISKY TOKAI / NISHIKI MARKET 的な余白重視・写真主役・日本的な丁寧さ。
- **記憶に残る要素**: 年齢確認モーダルのデザイン品質（最初の印象でブランドトーンを確立）と、ヒーローの大きなセリフ体見出し。

---

## 2. カラーシステム

| 変数名 | HEX値 | 用途 |
|---|---|---|
| `--color-bg` | `#F6F3ED` | ページ背景（生成り・オフホワイト） |
| `--color-surface` | `#FFFFFF` | カード・パネル背景 |
| `--color-surface-alt` | `#EDE8DF` | 帯状セクション・グループ背景 |
| `--color-primary` | `#1A0E06` | ブランドカラー・テキスト |
| `--color-secondary` | `#5C3D2E` | セカンダリテキスト・ロゴ補色 |
| `--color-accent` | `#BF7B2E` | 琥珀色アクセント・リンク・タグ |
| `--color-accent-dark` | `#9E6320` | アクセントホバー状態 |
| `--color-cta` | `#A94528` | テラコッタ（メインCTAボタン） |
| `--color-cta-dark` | `#8C3519` | CTAホバー状態 |
| `--color-text` | `#1A0E06` | 本文テキスト |
| `--color-text-muted` | `#7A6354` | 補助テキスト・ラベル・プレースホルダー |
| `--color-border` | `#D8D1C6` | ボーダー・区切り線 |
| `--color-border-light` | `#E8E4DC` | 薄いボーダー |
| `--color-error` | `#B33A2A` | エラー状態 |
| `--color-success` | `#2D6A4F` | 成功状態 |

---

## 3. タイポグラフィ

- **ディスプレイフォント**: `Playfair Display` — ヒーロー・大見出しのみ使用（Google Fonts）
- **本文・UIフォント**: `Noto Serif JP` — 全UIテキスト・ラベル・ボタン（Google Fonts）

| 用途 | サイズ | ウェイト | line-height | 備考 |
|---|---|---|---|---|
| ヒーロー見出し | 48–72px | 700 | 1.1 | Playfair Display |
| h1 (ページ見出し) | 32px | 700 | 1.25 | Noto Serif JP |
| h2 (セクション見出し) | 24px | 600 | 1.3 | Noto Serif JP |
| h3 (カード見出し) | 18px | 600 | 1.4 | Noto Serif JP |
| 本文 | 15px | 400 | 1.7 | Noto Serif JP |
| 小テキスト | 13px | 400 | 1.5 | |
| ラベル/タグ | 11px | 500 | — | letter-spacing: 0.06em; uppercase |
| 価格 | 20px | 700 | — | tabular-nums |

---

## 4. スペーシング・グリッド

- **ベーススペーシング**: 8px単位
- **コンテンツ最大幅**: 1200px
- **ページ余白(PC)**: 横 40px
- **ページ余白(スマホ)**: 横 20px
- **セクション縦余白(PC)**: 80px
- **セクション縦余白(スマホ)**: 56px
- **カード内パディング**: 20–24px

---

## 5. コンポーネント仕様

### ボタン
- **Primary (CTA)**: 背景 `--color-cta` / テキスト白 / 角丸 4px / padding 12px 28px / letter-spacing 0.04em
  - hover: 背景 `--color-cta-dark` / shadow 1層
- **Secondary**: 背景透明 / ボーダー `--color-primary` 1px / テキスト `--color-primary`
  - hover: 背景 rgba(26,14,6,0.05)
- **Ghost/Link**: テキスト `--color-accent` / アンダーライン
- **Size**: height 44px (min touch target)

### フォーム
- **input高さ**: 44px (touch target)
- **フォーカス時**: border `--color-accent` 1.5px / shadow 0 0 0 3px rgba(191,123,46,0.15)
- **エラー時**: border `--color-error` / エラーテキスト下部
- **角丸**: 4px

### カード
- **背景**: `--color-surface` (#FFFFFF)
- **ボーダー**: `--color-border-light` 1px solid
- **シャドウ**: `0 2px 8px rgba(26,14,6,0.06)` (1層のみ)
- **角丸**: 6px
- **hover**: shadow深化 `0 4px 16px rgba(26,14,6,0.10)`

### ナビゲーション
- **形式**: ヘッダー固定 (sticky top)
- **高さ**: 64px (PC) / 56px (スマホ)
- **背景**: `--color-bg` / bottom-border `--color-border-light`
- **アクティブ状態**: `--color-accent` テキスト + underline

### タグ/バッジ
- **テイストタグ**: 背景 rgba(191,123,46,0.12) / テキスト `--color-accent-dark` / 角丸 3px / padding 3px 8px
- **スタイルタグ**: 背景 `--color-surface-alt` / テキスト `--color-secondary`

---

## 6. アニメーション・トランジション

- **標準トランジション**: `transition: all 0.22s ease`
- **ホバー時**: 色変化・シャドウ強化のみ（translateYによる浮き上がりは禁止）
- **モーダル開閉**: `opacity + transform scale(0.97→1)` / `0.25s ease`
- **ドロワー**: `transform: translateX` / `0.3s ease`
- **フィルタードロワー(モバイル)**: `translateX(-100%→0)` 

---

## 7. 画面一覧と主要UI要素

| 画面名 | ファイル名 | 主要コンポーネント |
|---|---|---|
| トップページ | index.html | 年齢確認モーダル・ヒーロー・商品カード・診断バナー |
| 商品一覧 | products.html | フィルターサイドバー・商品グリッド・ソートバー |
| 商品詳細 | product-detail.html | 画像ギャラリー・テイストメーター・購入エリア |
| カート | cart.html | 商品リスト・ギフトオプション・金額サマリー |
| チェックアウト | checkout.html | 4ステップフォーム・注文サマリー |
| 注文完了 | order-complete.html | 完了メッセージ・注文番号 |
| テイスト診断 | taste-quiz.html | 進捗バー・選択肢カード |
| 診断結果 | taste-result.html | 結果タイプ・おすすめ商品 |
| ブルワリー一覧 | breweries.html | ブルワリーカードグリッド |
| ログイン | login.html | メール+PWフォーム |
| 会員登録 | register.html | 登録フォーム・同意チェック |
| マイページ | mypage.html | サイドナビ・注文履歴・お気に入り |

---

## 8. 実装上の注意点

- **モバイルファースト**: 375px基準で設計。PCは1280px。ブレークポイントは 768px / 1024px。
- **アイコン**: 絵文字禁止。SVGインラインアイコン（Heroicons系）を使用。
- **画像**: 本番ではWebP/AVIF。プロトタイプでは amber グラデーション CSS プレースホルダー。
- **日本語フォント**: Noto Serif JP の 400/500/600/700 の4ウェイトのみ読み込む。
- **アクセシビリティ**: `aria-label` をインタラクティブ要素に付与。フォームに `<label for>` 必須。
- **フォーカス**: キーボードナビゲーション用のフォーカスリングを維持（消さない）。
- **年齢確認**: セッション中再表示しない（`sessionStorage` 利用）。
