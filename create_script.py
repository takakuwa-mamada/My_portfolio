# -*- coding: utf-8 -*-
"""script.jsを作成"""

js_content = '''// ===== ポートフォリオ JavaScript =====
console.log('Portfolio JavaScript Loaded');

// GitHub自動取得（ページロード時にtakakuwa-mamadaのリポジトリを取得）
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== GitHub Auto-fetch ===');
    const username = 'takakuwa-mamada';
    const githubUsername = document.getElementById('githubUsername');
    const githubLoading = document.getElementById('githubLoading');
    const githubRepos = document.getElementById('githubRepos');
    
    if (githubUsername) {
        githubUsername.value = username;
    }
    
    async function fetchGitHubRepos() {
        if (githubLoading) githubLoading.style.display = 'flex';
        if (githubRepos) githubRepos.innerHTML = '';
        
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
            
            if (!response.ok) {
                throw new Error('ユーザーが見つかりません');
            }
            
            const repos = await response.json();
            
            if (githubLoading) githubLoading.style.display = 'none';
            
            if (repos.length === 0) {
                if (githubRepos) githubRepos.innerHTML = '<p class="no-repos">リポジトリが見つかりませんでした</p>';
                return;
            }
            
            displayGitHubRepos(repos);
            
        } catch (error) {
            console.error('Error fetching repos:', error);
            if (githubLoading) githubLoading.style.display = 'none';
            if (githubRepos) githubRepos.innerHTML = `<p class="error-message">${error.message}</p>`;
        }
    }
    
    function displayGitHubRepos(repos) {
        if (!githubRepos) return;
        
        githubRepos.innerHTML = '';
        
        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'github-repo-card';
            
            const updatedDate = new Date(repo.updated_at).toLocaleDateString('ja-JP');
            
            repoCard.innerHTML = `
                <div class="repo-header">
                    <h4 class="repo-name">
                        <i class="fas fa-code-branch"></i>
                        ${repo.name}
                    </h4>
                    <a href="${repo.html_url}" target="_blank" class="repo-link">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                <p class="repo-description">${repo.description || '説明なし'}</p>
                <div class="repo-stats">
                    <span class="repo-stat">
                        <i class="fas fa-star"></i> ${repo.stargazers_count}
                    </span>
                    <span class="repo-stat">
                        <i class="fas fa-code-branch"></i> ${repo.forks_count}
                    </span>
                    ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
                </div>
                <div class="repo-footer">
                    <span class="repo-updated">Updated: ${updatedDate}</span>
                </div>
            `;
            
            githubRepos.appendChild(repoCard);
        });
    }
    
    setTimeout(() => {
        console.log(`Fetching repositories for: ${username}`);
        fetchGitHubRepos();
    }, 500);
});

console.log('✅ Script loaded successfully');
'''

with open('script.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(js_content)

print("✅ script.js を作成しました（最小限の機能版）")
print(f"   サイズ: {len(js_content)} 文字")
