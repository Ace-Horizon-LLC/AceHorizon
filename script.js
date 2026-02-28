lucide.createIcons();

/* THEME FIX */
const toggle = document.getElementById("themeToggle");

function updateIcon(){
  const icon = document.body.classList.contains("light")
    ? "sun"
    : "moon";
  toggle.innerHTML = `<i data-lucide="${icon}"></i>`;
  lucide.createIcons();
}

toggle.addEventListener("click",()=>{
  document.body.classList.toggle("light");
  localStorage.setItem("theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
  updateIcon();
});

/* Restore saved theme */
if(localStorage.getItem("theme")==="light"){
  document.body.classList.add("light");
}
updateIcon();

/* Click SFX */
const sfx=document.getElementById("clickSfx");
document.querySelectorAll("button,a").forEach(el=>{
  el.addEventListener("click",()=>{
    sfx.currentTime=0;
    sfx.play().catch(()=>{});
  });
});

/* Typing */
const text="Building optimized systems from Varanasi.";
let i=0;
(function type(){
  if(i<text.length){
    document.getElementById("typing").innerHTML+=text[i++];
    setTimeout(type,30);
  }
})();

/* GitHub Avatar */
fetch("https://api.github.com/users/aceyash-dev")
  .then(res=>res.json())
  .then(data=>{
    document.getElementById("pfp").src=data.avatar_url;
  });

/* Repos */
fetch("https://api.github.com/users/aceyash-dev/repos")
.then(res=>res.json())
.then(data=>{
  const grid=document.getElementById("repoGrid");
  data.filter(r=>!r.fork)
      .slice(0,6)
      .forEach(repo=>{
        const card=document.createElement("a");
        card.href=repo.html_url;
        card.target="_blank";
        card.className="repo-card glass-card";
        card.innerHTML=`
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description provided"}</p>
          <small>★ ${repo.stargazers_count}</small>
        `;
        grid.appendChild(card);
      });
});

/* Email form */
document.getElementById("contactForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const form=new FormData(e.target);
  const status=document.getElementById("formStatus");

  const res=await fetch("/api/contact",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name:form.get("name"),
      message:form.get("message")
    })
  });

  if(res.ok){
    status.textContent="Message sent successfully.";
    e.target.reset();
  } else {
    status.textContent="Error sending message.";
  }
});