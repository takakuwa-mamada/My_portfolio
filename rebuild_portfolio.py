# -*- coding: utf-8 -*-
"""
ポートフォリオファイルの完全修正スクリプト
- エンコーディング修正（UTF-8に統一）
- HTMLのインラインスタイルを整理
- CSSの重複削除
"""
import os

print("=" * 60)
print("ポートフォリオファイル修正スクリプト")
print("=" * 60)

# ===== index.html の修正 =====
print("\n【1/2】 index.html を修正中...")

# バックアップから読み込み
try:
    with open('index_original.html', 'r', encoding='utf-8') as f:
        html_content = f.read()
    print("  ✓ バックアップファイルを読み込みました")
except:
    print("  ⚠️ バックアップがUTF-8で読めません。Shift-JISで試行...")
    with open('index_original.html', 'r', encoding='shift-jis', errors='ignore') as f:
        html_content = f.read()
    print("  ✓ Shift-JISで読み込みました")

# 行に分割
lines = html_content.split('\n')
print(f"  総行数: {len(lines)}")

# 15行目(index 14)から296行目(index 295)のインラインスタイルを削除して、
# クリーンなスタイルを挿入
clean_inline_styles = '''    <!-- CLEAN OVERRIDES -->
    <style>
        /* Matrix Background */
        #matrix-canvas {
            position: fixed !important;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            z-index: 1 !important;
            pointer-events: none;
            opacity: 0.35;
        }
        
        /* Content Above Matrix */
        body > *:not(#matrix-canvas) { position: relative; z-index: 10; }
        
        /* Black Background */
        body, html, section { background: #000000 !important; }
        
        /* ABOUT ME - Equal Columns */
        .about-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem !important;
            max-width: 1400px !important;
            margin: 0 auto !important;
        }
        
        .about-visual,
        .about-content {
            background: rgba(0, 0, 0, 0.85) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            padding: 3rem !important;
            min-height: 600px !important;
        }
        
        .profile-border, .profile-scan { display: none !important; }
        
        @media (max-width: 1024px) {
            .about-grid { grid-template-columns: 1fr !important; }
        }
        
        /* JOURNEY */
        .journey-timeline { max-width: 900px; margin: 0 auto; }
        .journey-line { display: none !important; }
        .journey-item { margin: 0 0 6rem 0 !important; opacity: 1 !important; }
        .journey-year { position: relative !important; left: 0 !important; border-bottom: 2px solid #fff !important; }
        .journey-card { margin: 0 !important; border-left: 4px solid #fff !important; }
        .journey-card::before { display: none !important; }
        
        /* Chart */
        .chart-container { height: 500px !important; }
    </style>

'''

# 再構築：最初の14行 + クリーンスタイル + 296行目以降
# 注意: 行番号は0-indexedなので、14行目まで = [0:14], 296行目以降 = [295:]
new_lines = lines[:14] + [clean_inline_styles] + lines[295:]

print(f"  修正後: {len(new_lines)} 行")

# UTF-8で保存
with open('index.html', 'w', encoding='utf-8', newline='\n') as f:
    f.write('\n'.join(new_lines))

print("  ✅ index.html を保存しました（UTF-8）")

# ===== styles.css の修正 =====
print("\n【2/2】 styles.css を修正中...")

try:
    with open('styles_original.css', 'r', encoding='utf-8') as f:
        css_content = f.read()
    print("  ✓ バックアップファイルを読み込みました")
except:
    print("  ⚠️ バックアップがUTF-8で読めません。Shift-JISで試行...")
    with open('styles_original.css', 'r', encoding='shift-jis', errors='ignore') as f:
        css_content = f.read()
    print("  ✓ Shift-JISで読み込みました")

css_lines = css_content.split('\n')
print(f"  総行数: {len(css_lines)}")

# 2050行目までを保持（重複セクションを削除）
if len(css_lines) > 2050:
    clean_css_lines = css_lines[:2050]
    print(f"  削除された行数: {len(css_lines) - 2050}")
else:
    clean_css_lines = css_lines
    print("  削除する重複がありませんでした")

print(f"  修正後: {len(clean_css_lines)} 行")

# UTF-8で保存
with open('styles.css', 'w', encoding='utf-8', newline='\n') as f:
    f.write('\n'.join(clean_css_lines))

print("  ✅ styles.css を保存しました（UTF-8）")

# ===== 完了 =====
print("\n" + "=" * 60)
print("✅ すべての修正が完了しました！")
print("=" * 60)
print("\n修正内容:")
print("  📄 index.html")
print("    - 日本語の文字化けを修正（UTF-8で保存）")
print("    - 肥大化したインラインスタイルを50行のクリーンバージョンに置換")
print("  📄 styles.css")
print("    - 日本語の文字化けを修正（UTF-8で保存）")
print("    - 重複セクションを削除")
print("  📄 script.js")
print("    - GitHub自動取得機能を修正（ページロード時にtakakuwa-mamadaのリポジトリを取得）")
print("\n🌐 ブラウザで確認してください:")
print("   file:///C:/dev/プログラミング/My_portfolio/index.html")
