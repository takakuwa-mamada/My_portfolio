// ===== ポートフォリオ JavaScript =====
console.log('Portfolio JavaScript Loaded');

// ===== カスタムカーソル =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    followerX += (mouseX - followerX) * 0.05;
    followerY += (mouseY - followerY) * 0.05;
    
    if (cursor && cursorFollower) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    }
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// ホバー効果
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-block, .tag-item');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hover-active');
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hover-active');
    });
});

// ===== ナビゲーション =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// スクロール時のナビゲーション背景変更
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ハンバーガーメニュー
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // ナビゲーションリンククリック時にメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// スムーズスクロール
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== パーティクルエフェクト（ヒーローセクション） =====
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) {
                this.speedX *= -1;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY *= -1;
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== 統計カウンター（ヒーローセクション） =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer でビューポートに入ったら実行
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ===== スクロールアニメーション =====
const scrollElements = document.querySelectorAll('[data-scroll]');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
    );
};

const displayScrollElement = (element) => {
    element.classList.add('in-view');
};

const hideScrollElement = (element) => {
    element.classList.remove('in-view');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 80)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// ===== JOURNEY セクションのアニメーション =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== DOM Content Loaded ===');
    
    const journeyItems = document.querySelectorAll('.journey-item');
    console.log('Journey items found:', journeyItems.length);

    if (journeyItems.length === 0) {
        console.error('⚠️ No journey items found! Check HTML structure.');
        return;
    }

    const journeyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('✓ Journey item is visible:', entry.target);
                entry.target.classList.add('visible');
                journeyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    journeyItems.forEach((item, index) => {
        console.log(`Observing journey item ${index + 1}:`, item);
        journeyObserver.observe(item);
    });

    // ページ読み込み時に既に表示されている要素をチェック
    setTimeout(() => {
        journeyItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                console.log(`✓ Journey item ${index + 1} already visible on load`);
                item.classList.add('visible');
            }
        });
    }, 100);
});

// 初期ロード時にもチェック
handleScrollAnimation();

// ===== スキルバーアニメーション =====
const skillBlocks = document.querySelectorAll('.skill-block');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target.querySelector('.skill-bar');
            const progress = skillBar.getAttribute('data-progress');
            const progressBar = skillBar.querySelector('.skill-progress');
            
            if (progressBar) {
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
            }
            
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillBlocks.forEach(block => skillObserver.observe(block));

// ===== フォーム送信 =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        console.log('Form submitted:', { name, email, subject, message });
        
        alert(`Thank you, ${name}! Your message has been sent successfully.\\n\\nI will get back to you soon.`);
        
        contactForm.reset();
    });
}

// ===== タイピングエフェクト =====
const typewriterText = document.querySelector('.typewriter');
if (typewriterText) {
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    let i = 0;
    
    setTimeout(() => {
        function typeWriter() {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }, 1500);
}

// ===== プロジェクトカードアニメーション削除 =====
// アニメーションなし - シンプルに

// ===== ページロード完了時のアニメーション =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== スクロール進捗インジケーター =====
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: white;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// ===== アクティブナビゲーションリンク =====
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

setActiveNavLink();

// ===== スクロール進捗バー =====
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`;
    }
});

// ===== パフォーマンス最適化：Intersection Observer のクリーンアップ =====
window.addEventListener('beforeunload', () => {
    if (statsObserver) statsObserver.disconnect();
    if (skillObserver) skillObserver.disconnect();
});

// ===== スキルレーダーチャート =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== Initializing Skill Radar Chart ===');
    
    const skillRadarChart = document.getElementById('skillRadarChart');
    console.log('Radar chart canvas:', skillRadarChart);
    
    if (!skillRadarChart) {
        console.error('❌ Skill radar chart canvas not found!');
        return;
    }
    
    if (typeof Chart === 'undefined') {
        console.error('❌ Chart.js is not loaded!');
        return;
    }
    
    console.log('✓ Chart.js is loaded');
    
    try {
        const ctx = skillRadarChart.getContext('2d');
        console.log('✓ Canvas context obtained');
        
        const radarData = {
            labels: ['Python', '機械学習', '統計学', 'データ可視化', 'SQL', 'Deep Learning', 'Pandas/NumPy'],
            datasets: [{
                label: 'スキルレベル',
                data: [90, 85, 80, 85, 75, 80, 90],
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                borderColor: 'rgba(255, 255, 255, 0.95)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointBorderColor: 'rgba(0, 0, 0, 0.8)',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 255, 255, 0.9)',
                pointRadius: 6,
                pointHoverRadius: 9
            }]
        };
        
        const radarConfig = {
            type: 'radar',
            data: radarData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.3)',
                            lineWidth: 1
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)',
                            lineWidth: 1
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.9)',
                            font: {
                                size: 14,
                                family: 'Space Grotesk',
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.6)',
                            backdropColor: 'rgba(0, 0, 0, 0.5)',
                            stepSize: 20,
                            showLabelBackdrop: true
                        },
                        min: 0,
                        max: 100,
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        borderWidth: 1
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        };
        
        const radarChart = new Chart(ctx, radarConfig);
        console.log('✓ Radar chart created successfully!');
        
        // スクロールでアニメーション
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    radarChart.update();
                }
            });
        }, { threshold: 0.5 });
        
        chartObserver.observe(skillRadarChart);
    } catch (error) {
        console.error('❌ Error creating radar chart:', error);
    }
});

// ===== GitHub API連携 =====
const githubUsername = document.getElementById('githubUsername');
const fetchRepos = document.getElementById('fetchRepos');
const githubLoading = document.getElementById('githubLoading');
const githubRepos = document.getElementById('githubRepos');

if (fetchRepos) {
    fetchRepos.addEventListener('click', async () => {
        const username = githubUsername ? githubUsername.value.trim() : '';
        if (!username) {
            alert('GitHubユーザー名を入力してください');
            return;
        }
        
        await fetchGitHubRepos(username);
    });
}

// GitHubリポジトリ取得
async function fetchGitHubRepos(username) {
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

// GitHubリポジトリ表示
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

// ページ読み込み時に自動取得（takakuwa-mamada のリポジトリ）
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== GitHub Auto-fetch on page load ===');
    const defaultUsername = 'takakuwa-mamada';
    
    // 少し遅延させてからフェッチ（DOMが完全に構築された後）
    setTimeout(() => {
        if (githubUsername) {
            githubUsername.value = defaultUsername;
        }
        console.log(`Fetching repositories for: ${defaultUsername}`);
        fetchGitHubRepos(defaultUsername);
    }, 500);
});

// ===== Matrix Background Effect =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== Initializing Matrix Effect ===');
    
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) {
        console.error('❌ Matrix canvas not found!');
        return;
    }
    
    console.log('✓ Matrix canvas found');
    
    const ctx = canvas.getContext('2d');
    
    // キャンバスサイズを設定
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 文字：0と1のみ
    const chars = '01';
    const charArray = chars.split('');
    
    // 列の設定（画像のような大きめのフォントサイズ）
    const fontSize = 20; // より大きく見やすく
    const columns = canvas.width / fontSize;
    
    // 各列のY座標を初期化
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -50; // ランダムな初期位置（画面外から開始）
    }
    
    // ランダムな動きのための追加パラメータ
    const xOffsets = [];
    const alphas = [];
    const speeds = [];
    for (let i = 0; i < columns; i++) {
        xOffsets[i] = Math.random() * 4 - 2; // -2から+2のランダムなX軸オフセット
        alphas[i] = Math.random() * 0.3 + 0.7; // 0.7から1.0のランダムな透明度（より明るく）
        speeds[i] = Math.random() * 0.4 + 0.6; // 0.6から1.0のランダムな速度（やや速く）
    }
    
    function draw() {
        // 背景を黒で塗りつぶす（トレイル効果を抑える）
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 各列に文字を描画
        for (let i = 0; i < drops.length; i++) {
            // ランダムに0または1を選択
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            
            const x = i * fontSize + xOffsets[i];
            const y = drops[i] * fontSize;
            
            // グロー効果を完全に削除
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'transparent';
            
            // 文字の色を明るい緑に設定
            ctx.fillStyle = '#00ff41';
            ctx.font = `bold ${fontSize}px monospace`;
            ctx.globalAlpha = alphas[i];
            
            ctx.fillText(char, x, y);
            
            // Y座標を更新（ランダムな速度で落下）
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
                // 新しいランダムパラメータを設定
                xOffsets[i] = Math.random() * 4 - 2;
                alphas[i] = Math.random() * 0.3 + 0.7;
                speeds[i] = Math.random() * 0.4 + 0.6;
            }
            
            drops[i] += speeds[i];
        }
        
        ctx.globalAlpha = 1.0; // 透明度をリセット
    }
    
    // アニメーションループ（40msで滑らかに）
    setInterval(draw, 40);
    
    // ウィンドウリサイズ時にキャンバスサイズを調整
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // リサイズ後に列数を再計算
        const newColumns = Math.floor(canvas.width / fontSize);
        while (drops.length > newColumns) drops.pop();
        while (drops.length < newColumns) {
            drops.push(Math.random() * -50);
            xOffsets.push(Math.random() * 4 - 2);
            alphas.push(Math.random() * 0.3 + 0.7);
            speeds.push(Math.random() * 0.4 + 0.6);
        }
    });
    
    console.log('✓ Matrix effect initialized');
});
