// Initialize Icons
lucide.createIcons();

const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

// THEME SYSTEM
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

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

function updateThemeIcon(theme){
    themeToggle.innerHTML =
        theme === "dark"
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';
    lucide.createIcons();
}

function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === "dark" 
        ? '<i data-lucide="sun"></i>' 
        : '<i data-lucide="moon"></i>';
    lucide.createIcons();
}

// 2. Click SFX
const sfx = document.getElementById("clickSfx");
document.addEventListener("click", (e) => {
    if (e.target.closest("button, a")) {
        sfx.currentTime = 0;
        sfx.play().catch(() => {});
    }
});

// 3. Typing Effect (Fixed: clearing existing content first if needed)
const typingElement = document.getElementById("typing");
const text = "Building optimized systems from Varanasi.";
let i = 0;
typingElement.innerHTML = ""; 
function type() {
    if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 50);
    }
}
type();

/* Avatar with proper skeleton */
fetch("https://api.github.com/users/aceyash-dev")
  .then(res => res.json())
  .then(data => {

    const img = document.getElementById("pfp");
    const skeleton = document.getElementById("pfpSkeleton");

    img.src = data.avatar_url;

    img.onload = () => {
      skeleton.style.opacity = "0";
      setTimeout(()=>{
        skeleton.remove();
        img.style.display = "block";
      },300);
    };
  });

// 5. Repos Display Fix
fetch("https://api.github.com/users/aceyash-dev/repos?sort=updated")
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById("repoGrid");
        grid.innerHTML = ""; // Clear loader/old content
        
        data.filter(r => !r.fork)
            .slice(0, 6)
            .forEach(repo => {
                const card = document.createElement("a");
                card.href = repo.html_url;
                card.target = "_blank";
                card.className = "repo-card glass-card"; // Apply both classes
                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "No description provided"}</p>
                    <div style="margin-top:10px; font-size:0.8rem; opacity:0.8;">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span style="margin-left:15px;">🍴 ${repo.forks_count}</span>
                    </div>
                `;
                grid.appendChild(card);
            });
    })
    .catch(err => console.error("Error fetching repos:", err));

// 6. Contact Form
document.getElementById("contactForm").addEventListener("submit", async e => {
    e.preventDefault();
    const status = document.getElementById("formStatus");
    status.textContent = "Sending...";

    // Note: This requires a real backend endpoint to work
    try {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Placeholder for actual API logic
        console.log("Form Data:", data);
        status.textContent = "Message sent successfully (Simulation).";
        e.target.reset();
    } catch (err) {
        status.textContent = "Error sending message.";
    }
});


