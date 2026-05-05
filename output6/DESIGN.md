# デザイン仕様書 - HACCO クラフトビールECサイト

## 1. デザインコンセプト

- **トーン・世界観**: ナチュラル醸造所 × 上質な温かさ
- **ターゲットとの関係性**: クラフトビールを「選ぶ喜び」として提供する。情報過多にならず、写真とストーリーが語りかける
- **デザイン方向性**: WHISKY TOKAI / NISHIKI MARKET 参照。余白大きめ、写真主役、明朝体でブランド格調を演出
- **記憶に残る要素**: Playfair Display のイタリック大文字「*craft*」が随所に装飾的に使われ、醸造の手仕事感を体現する

---

## 2. カラーシステム

| 変数名 | HEX値 | 用途 |
|---|---|---|
| `--color-primary` | `#1E0F08` | メインテキスト・ブランドカラー |
| `--color-secondary` | `#5C3220` | サブ要素・ミディアムブラウン |
| `--color-accent` | `#B85C1A` | CTA・強調・リンク |
| `--color-accent-warm` | `#D4823C` | ホバー状態・ライト琥珀 |
| `--color-bg` | `#F7F2EA` | ページ背景（生成り） |
| `--color-surface` | `#FDFAF5` | カード・パネル背景 |
| `--color-surface-warm` | `#F0E8D8` | 強調カード・バナー背景 |
| `--color-text` | `#1E0F08` | 本文テキスト |
| `--color-text-muted` | `#7A5C4A` | 補助テキスト・ラベル |
| `--color-border` | `#E2D5C4` | ボーダー・区切り線 |
| `--color-border-dark` | `#C4B09A` | 強いボーダー |

---

## 3. タイポグラフィ

- **表示フォント（ヒーロー・装飾）**: Playfair Display（イタリック使用） / Google Fonts
- **本文・UI フォント**: Noto Serif JP / Google Fonts
- **UIラベル・ボタン**: Noto Serif JP Weight 600（ゴシック的な強さを明朝体で代用）

| 用途 | サイズ | ウェイト | line-height | その他 |
|---|---|---|---|---|
| Hero Display | 72–96px | 400 italic | 1.0 | Playfair Display |
| h1 | 40px | 700 | 1.2 | Noto Serif JP |
| h2 | 28px | 600 | 1.3 | Noto Serif JP |
| h3 | 20px | 600 | 1.4 | Noto Serif JP |
| body | 15px | 400 | 1.75 | Noto Serif JP |
| label / small | 11px | 500 | — | uppercase, letter-spacing: 0.1em |
| price | 24px | 700 | 1.0 | Playfair Display / tabular-nums |

---

## 4. スペーシング・グリッド

- **ベーススペーシング**: 8px 単位
- **コンテンツ最大幅**: 1200px
- **ページ余白 PC**: 横 48px
- **ページ余白 SP**: 横 20px
- **セクション縦余白**: 80–120px（PC） / 48–64px（SP）
- **カード内パディング**: 24px
- **グリッドギャップ**: 24px

---

## 5. コンポーネント仕様

### ボタン
- **Primary**: 背景`#B85C1A`（琥珀） / テキスト白 / 角丸 4px / padding: 14px 32px / font-weight: 600
- **Secondary**: 背景透明 / ボーダー`#1E0F08` 1.5px / テキスト`#1E0F08` / 同上padding
- **Ghost / Text**: テキスト`#B85C1A` / アンダーライン / 背景なし
- **hover**: opacity 0.85 + transition 0.2s。浮き上がりアニメーション禁止

### フォーム
- **input高さ**: 48px
- **ボーダー**: 1.5px solid `#E2D5C4`
- **フォーカス時**: border-color `#B85C1A` + box-shadow: 0 0 0 3px rgba(184,92,26,0.15)
- **エラー表示**: border-color `#C0392B` / エラーテキスト赤

### カード
- **背景**: `#FDFAF5`
- **ボーダー**: 1px solid `#E2D5C4`
- **シャドウ**: 0 2px 8px rgba(30,15,8,0.08)
- **角丸**: 4px
- **hover**: shadow 0 8px 24px rgba(30,15,8,0.12)

### ナビゲーション
- **形式**: 固定ヘッダー（top: 0; position: sticky）
- **高さ**: 72px（PC）/ 60px（SP）
- **背景**: rgba(247,242,234,0.95) + backdrop-filter: blur(8px)
- **アクティブ状態**: border-bottom 2px solid `#B85C1A`

---

## 6. アニメーション・トランジション

- **標準トランジション**: `transition: all 0.2s ease`
- **ホバー動作**: 色変化 + シャドウ強化のみ（translateY禁止）
- **モーダル表示**: opacity 0→1 + translateY(8px)→0 の 0.25s
- **ページフェードイン**: `.page-enter` クラスで opacity 0→1 の 0.3s

---

## 7. 画面一覧と主要UI要素

| 画面名 | ファイル名 | 主要コンポーネント |
|---|---|---|
| トップ（年齢確認含む） | index.html | ヒーローバナー・商品カード・診断バナー・ブルワリーロゴ |
| 商品一覧 | products.html | フィルターサイドバー・商品グリッド・ソートバー |
| 商品詳細 | product-detail.html | 画像ギャラリー・テイストメーター・アコーディオン |
| カート | cart.html | 商品リスト・ギフトオプション・金額サマリー |
| チェックアウト | checkout.html | ステッパー・フォーム・注文サマリー |
| 注文完了 | order-complete.html | 完了アイコン・注文番号・CTAリンク |
| テイスト診断 | taste-quiz.html | 進捗バー・選択肢カード |
| 診断結果 | taste-result.html | タイプ名・説明・おすすめ商品カード |
| ログイン | login.html | メール・PW入力・フォーム |
| 会員登録 | register.html | 各種入力フォーム・同意チェック |
| マイページ | mypage.html | サイドナビ・注文履歴・お気に入り |
| ブルワリー一覧 | breweries.html | ブルワリーカードグリッド |

---

## 8. 実装上の注意点

- **レスポンシブ**: 375px（SP）/ 768px（タブレット）/ 1280px（PC）の3ブレイクポイント
- **スマートフォン比率が70%**: 商品カードはSP時2カラム、カート・チェックアウトは縦積み
- **年齢確認**: sessionStorage で制御（再読み込みで再表示しない）
- **酒類免許表記**: フッターに必ず記載
- **アイコン**: SVGインラインのみ（絵文字禁止）
- **画像**: Unsplash URL（fit=crop&auto=format）、onerrorフォールバック設定済み
- **アクセシビリティ**: focus-visible スタイル、aria-label、alt属性すべて記載
- **JS**: バックエンド不要。タブ・モーダル・ドロワーのみ。画面遷移はaタグ
