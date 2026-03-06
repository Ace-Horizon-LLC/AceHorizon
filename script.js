/* ==========================================
   ACE HORIZON - CORE SYSTEMS
   ========================================== */

// 1. Initialize Lucide Icons
lucide.createIcons();

// 2. Theme Management (Fixed Duplicate Declarations)
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

const updateThemeIcon = (theme) => {
    themeToggle.innerHTML = theme === "dark" 
        ? '<i data-lucide="sun"></i>' 
        : '<i data-lucide="moon"></i>';
    lucide.createIcons();
};

// Apply saved theme or default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
htmlElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
    const current = htmlElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    
    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
});

// 3. Audio Feedback System
const sfx = document.getElementById("clickSfx");
document.addEventListener("click", (e) => {
    if (e.target.closest("button, a, .repo-card")) {
        sfx.currentTime = 0;
        sfx.play().catch(() => { /* Autoplay policy handler */ });
    }
});

// 4. Typing Effect Logic
const typingElement = document.getElementById("typing");
const bioText = "Building optimized systems from Varanasi.";
let charIndex = 0;

function typeEffect() {
    if (charIndex < bioText.length) {
        typingElement.innerHTML += bioText.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 50);
    }
}

// 5. GitHub Systems Integration (Profile + Repos)
async function initializeGitHubData() {
    const username = "aceyash-dev";
    
    try {
        // Fetch Profile for Avatar
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();
        
        const img = document.getElementById("pfp");
        const skeleton = document.getElementById("pfpSkeleton");
        
        if (userData.avatar_url) {
            img.src = userData.avatar_url;
            img.onload = () => {
                skeleton.style.opacity = "0";
                setTimeout(() => {
                    skeleton.remove();
                    img.style.display = "block";
                }, 300);
            };
        }

        // Fetch Repositories
        const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        const repos = await repoRes.json();
        const grid = document.getElementById("repoGrid");
        
        grid.innerHTML = ""; // Clear existing skeletons
        
        repos.filter(r => !r.fork)
            .slice(0, 6)
            .forEach(repo => {
                const card = document.createElement("a");
                card.href = repo.html_url;
                card.target = "_blank";
                card.className = "repo-card glass-card";
                card.innerHTML = `
                    <h3 style="color:var(--neon); margin-bottom:10px;">${repo.name}</h3>
                    <p style="font-size:0.9rem; color:var(--muted);">${repo.description || "No description provided"}</p>
                    <div style="margin-top:15px; font-size:0.8rem; display:flex; gap:15px; opacity:0.8;">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                        <span style="color:var(--pink)">${repo.language || ''}</span>
                    </div>
                `;
                grid.appendChild(card);
            });

    } catch (err) {
        console.error("System Error: GitHub Sync Failed", err);
        document.getElementById("repoGrid").innerHTML = "<p>System offline. Please check connection.</p>";
    }
}

// 6. Contact Form Simulation
document.getElementById("contactForm").addEventListener("submit", async e => {
    e.preventDefault();
    const status = document.getElementById("formStatus");
    const btn = e.target.querySelector('button');
    
    btn.disabled = true;
    status.textContent = "Transmitting...";

    // Simulated network delay
    setTimeout(() => {
        const formData = new FormData(e.target);
        console.log("Transmission Received:", Object.fromEntries(formData.entries()));
        
        status.style.color = "var(--neon)";
        status.textContent = "Message successfully routed to Ace Horizon.";
        e.target.reset();
        btn.disabled = false;
    }, 1500);
});

// Initial Load
window.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    initializeGitHubData();
});
