# 🚀 Portfolio Website - Data Scientist

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-success)](https://takakuwa-mamada.github.io/My_portfolio/)

**未来的・サイバーパンク × ミニマル** デザインのデータサイエンティスト向けポートフォリオサイト

🔗 **Live Demo**: [View Portfolio](https://takakuwa-mamada.github.io/My_portfolio/)

---

## 📋 目次

- [概要](#概要)
- [主な機能](#主な機能)
- [技術スタック](#技術スタック)
- [セットアップ](#セットアップ)
- [カスタマイズ](#カスタマイズ)
- [デプロイ](#デプロイ)
- [ライセンス](#ライセンス)

---

## 🎯 概要

データサイエンティストとしてのスキル・経歴・プロジェクトを視覚的にアピールするポートフォリオサイト。

### デザインコンセプト
- 🎨 **サイバーパンク × ミニマル**: 未来的で洗練されたデザイン
- ⚫⚪ **モノクロ配色**: 黒(#000000)と白(#ffffff)のみ
- ⚡ **視覚的インパクト**: アニメーションとインタラクティブ要素
- 📊 **実用性重視**: 採用担当者が情報を簡単に取得

---

## ✨ 主な機能

### 1. JOURNEY セクション
🎓 **学習の旅路を可視化**
- 産業技術高等専門学校 (2019-2024)
- 東京都立大学 (2024-2026) [現在]
- 大学院進学予定 (2026-)

縦1列のシンプルなカードレイアウトで、重なりのない見やすいデザイン。

### 2. SKILLS セクション
📊 **Chart.jsレーダーチャート**
```
スキル可視化:
- Python: 90%
- 機械学習: 85%
- 統計学: 80%
- データ可視化: 85%
- SQL: 75%
- Deep Learning: 80%
- Pandas/NumPy: 90%
```

### 3. GITHUB REPOSITORIES
🔗 **GitHub API v3連携**
- リアルタイムでリポジトリ情報を取得
- 最新6件を表示
- スター数、フォーク数、言語表示

### 4. インタラクティブ要素
- ⚡ カスタムカーソルエフェクト
- 📊 スクロール進捗バー
- 🌐 グリッドオーバーレイ
- 🎨 ホバーアニメーション
- 📱 完全レスポンシブ

---

## 🛠 技術スタック

### Frontend
- **HTML5**: セマンティックマークアップ
- **CSS3**: Flexbox, Grid, Animations
- **JavaScript (ES6+)**: Vanilla JS

### ライブラリ
- **Chart.js 4.4.0**: データ可視化
- **Font Awesome 6.4.0**: アイコン
- **Google Fonts**: Space Grotesk, JetBrains Mono
- **GitHub API v3**: リポジトリ取得

---

## 🚀 セットアップ

### ローカルで実行

```bash
# リポジトリをクローン
git clone https://github.com/takakuwa-mamada/My_portfolio.git
cd My_portfolio

# ブラウザで開く (Windows)
start index.html

# またはローカルサーバーを起動
python -m http.server 8000
```

ブラウザで `http://localhost:8000` にアクセス

---

## 🎨 カスタマイズ

### 個人情報の変更

**index.html** (HEROセクション)
```html
<h1 class="hero-title">
    <span class="glitch" data-text="YOUR NAME">YOUR NAME</span>
</h1>
```

**GitHubユーザー名** (line 469)
```html
<input 
    type="text" 
    value="your-github-username"
    class="github-input"
>
```

### スキルデータの変更

**index.html** の `<script>` タグ内
```javascript
data: [90, 85, 80, 85, 75, 80, 90]  // ← 変更
```

### JOURNEYの編集

**index.html** (line 168-)
```html
<div class="journey-item">
    <div class="journey-year">2019-2024</div>
    <div class="journey-card">
        <h3>あなたの学校名</h3>
        <p>説明...</p>
    </div>
</div>
```

---

## 🌐 デプロイ

### GitHub Pages

```bash
# リポジトリを作成・プッシュ
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

**GitHub Settings > Pages**
- Source: `main` ブランチ
- Root を選択
- Save

URL: `https://your-username.github.io/your-repo/`

---

## 📂 ファイル構成

```
My_portfolio/
├── index.html          # メインHTML
├── styles.css          # スタイルシート
├── script.js           # JavaScript
└── README.md           # このファイル
```

---

## 🔧 トラブルシューティング

### レーダーチャートが表示されない
- Chart.js CDNを確認
- `Ctrl + Shift + R` でキャッシュクリア

### GitHubリポジトリが表示されない
- ユーザー名を確認
- APIレート制限 (60回/時間) に注意

---

## 📝 今後の改善予定

- [ ] コンタクトフォーム
- [ ] プロジェクト詳細ページ
- [ ] ダークモード切り替え
- [ ] マトリックス風背景エフェクト
- [ ] 多言語対応

---

## 👨‍💻 作者

**takakuwa-mamada**
- GitHub: [@takakuwa-mamada](https://github.com/takakuwa-mamada)

---

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

---

⭐ **役に立った場合はスターをお願いします!** ⭐
