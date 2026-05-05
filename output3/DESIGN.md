# デザイン仕様書 - HACCO クラフトビールECサイト

## 1. デザインコンセプト

- **トーン・世界観**: 「クラフトの温度、精度の美しさ」— 手仕事の温かさと、選び抜かれた品質の緊張感の共存
- **ターゲットユーザーとの関係性**: 週末にゆっくり良いビールを楽しみたい30〜45歳。押しつけがましくなく、でも選ぶ楽しさをサポートする案内役
- **参考デザイン方向性**: WHISKY TOKAI / NISHIKI MARKET — 余白多め、写真主役、タイポグラフィで格を出す

### デザインの記憶に残る1要素
**琥珀×ネイビーのコントラスト**: #1350b2（ネイビー）のCTAと #c4832a（琥珀）のテイストタグが、生成り背景の上で「精度と温もり」を視覚的に表現する。

---

## 2. カラーシステム

| 変数名 | HEX値 | 用途 |
|---|---|---|
| `--color-primary` | #1350b2 | メインCTA・ブランドカラー・リンク |
| `--color-primary-dark` | #0e3d87 | ホバー状態 |
| `--color-primary-light` | #e8eef9 | バッジ背景・ハイライト |
| `--color-accent` | #c4832a | テイストタグ・アクセント・ハイライト |
| `--color-accent-light` | #f7edd8 | アクセント薄色背景 |
| `--color-bg` | #f9f5ef | ページ背景（生成り） |
| `--color-surface` | #ffffff | カード・パネル背景 |
| `--color-surface-alt` | #f4efe7 | 薄いサーフェス（特集バナー等） |
| `--color-text` | #2c2018 | 本文テキスト（ダークブラウン） |
| `--color-text-muted` | #7a6554 | 補助テキスト・ラベル |
| `--color-border` | #e0d5c5 | ボーダー・区切り線 |
| `--color-border-light` | #ede7db | 薄いボーダー |

---

## 3. タイポグラフィ

- **見出し・本文フォント**: `Noto Serif JP` — 明朝系。品格とブランド感を演出。Google Fonts
- **ヒーロー装飾フォント**: `Playfair Display` — 英字セリフ。ヒーローエリアのキャッチコピーや商品名の英字装飾。Google Fonts

### フォントスケール

| 用途 | サイズ | ウェイト | line-height |
|---|---|---|---|
| ヒーローh1 | 48px / sp: 32px | 700 | 1.15 |
| h2（セクション見出し） | 28px | 600 | 1.3 |
| h3（カード見出し） | 18px | 600 | 1.4 |
| 本文 | 15px | 400 | 1.7 |
| 小文字・ラベル | 12px | 500 | — |
| ボタン | 14px | 600 | — |
| 価格 | 20px | 700 | — |

---

## 4. スペーシング・グリッド

- ベーススペーシング単位: 8px
- コンテンツ最大幅: 1200px
- ページ横余白: 24px（sp） / 48px（pc）
- セクション縦余白: 80px（pc） / 60px（sp）
- カード内パディング: 20px（sp） / 24px（pc）
- グリッドギャップ: 20px（sp） / 24px（pc）

---

## 5. コンポーネント仕様

### ボタン
- **Primary**: 背景 `--color-primary` / テキスト白 / 角丸 4px / パディング 12px 28px
- **Secondary**: 背景透明 / ボーダー `--color-primary` / テキスト `--color-primary` / 角丸 4px
- **Ghost**: 背景透明 / テキスト `--color-text-muted` / アンダーライン
- **hover**: `--color-primary-dark` に変化 / transition 0.2s

### フォーム
- inputの高さ: 44px
- フォントサイズ: 15px
- ボーダー: 1px solid `--color-border`
- フォーカス時: ボーダー色 `--color-primary` / box-shadow 0 0 0 3px rgba(19,80,178,0.12)
- エラー表示: テキスト #b94141 / SVGアイコン付き

### カード（商品カード）
- 背景: `--color-surface`
- ボーダー: 1px solid `--color-border-light`
- シャドウ: `box-shadow: 0 1px 4px rgba(44,32,24,0.08)`
- 角丸: 6px
- ホバー: shadow強化 + border色変化

### ナビゲーション（グローバルヘッダー）
- 形式: 上部固定ヘッダー
- 高さ: 64px（pc）/ 56px（sp）
- 背景: #ffffff / bottom-border 1px solid `--color-border-light`
- アクティブ状態: テキスト `--color-primary` / ボーダーボトム 2px

### テイストタグ
- 背景: `--color-accent-light`
- テキスト: `--color-accent`
- 角丸: 3px
- パディング: 3px 10px
- サイズ: 12px / font-weight 500

---

## 6. アニメーション・トランジション

- **標準トランジション**: `transition: all 0.2s ease`
- **ボタンホバー**: background-color変化（浮き上がり禁止）
- **カードホバー**: box-shadow強化 + border-color変化
- **モーダル表示**: `opacity 0→1 + translateY 8px→0` / 0.25s ease
- **フォームフォーカス**: border + box-shadow / 0.15s
- ページ遷移アニメーション: なし（静的HTML）

---

## 7. 画面一覧と主要UI要素

| 画面名 | ファイル名 | 主要コンポーネント |
|---|---|---|
| トップページ | index.html | ヒーロー・年齢確認モーダル・商品カード・診断バナー・ブルワリーロゴ |
| 商品一覧 | products.html | フィルターサイドバー・商品グリッド・ソートバー |
| 商品詳細 | product-detail.html | 画像ギャラリー・テイストメーター・購入エリア・関連商品 |
| カート | cart.html | 商品リスト・ギフトオプション・金額サマリー |
| チェックアウト | checkout.html | ステッパー・フォーム各種・注文サマリー |
| 注文完了 | order-complete.html | チェックアイコン・注文番号・CTAボタン |
| テイスト診断 | taste-quiz.html | 進捗バー・質問カード・選択肢 |
| 診断結果 | taste-result.html | 結果タイプ・説明文・おすすめ商品 |
| ブルワリー一覧 | breweries.html | ブルワリーカードグリッド |
| ログイン | login.html | フォーム・リンク |
| 会員登録 | register.html | フォーム・同意チェック |
| マイページ | mypage.html | サイドナビ・注文履歴・お気に入り |

---

## 8. 実装上の注意点

- **レスポンシブ対応**: スマートフォンファースト（375px）。ブレークポイントは768px（tablet）/ 1024px（pc）
- **アクセシビリティ**: フォームラベルは必ず`<label>`で関連付け / ARIA属性を適切に使用 / カラーコントラスト比 4.5:1以上
- **酒類販売**: 年齢確認モーダルは sessionStorage で管理（一度確認したら再表示しない）
- **アイコン**: SVGインラインのみ使用。絵文字禁止
- **画像**: Unsplash風のプレースホルダー URL を使用（実際の実装時に差し替え）
- **フォント読み込み**: Google Fonts から `Noto+Serif+JP:wght@400;600;700` と `Playfair+Display:wght@700;900` を preconnect 付きで読み込む

---

## 活用したSkill

- `design-elevation` — デザイン品質基準・AIっぽさ排除ルール
- `frontend-design` — 独自性のある UI 設計アプローチ
- `ui-ux-pro-max` — カラーシステム・タイポグラフィ・UXガイドライン
- `typography` — UI タイポグラフィの正確な実装
