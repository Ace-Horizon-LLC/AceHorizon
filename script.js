lucide.createIcons();

/* Scroll progress */
window.addEventListener("scroll",()=>{
  const scroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById("progress").style.width = (scroll/height)*100+"%";
});

/* Typing */
const text="Optimized systems built from a Redmi 8A Dual.";
let i=0;
(function type(){
  if(i<text.length){
    document.getElementById("typing").innerHTML+=text[i++];
    setTimeout(type,30);
  }
})();

/* GitHub fetch */
async function loadRepos(){
  const res = await fetch("https://api.github.com/users/aceyash-dev/repos");
  const data = await res.json();
  const grid=document.getElementById("repoGrid");

  data.filter(r=>!r.fork)
      .sort((a,b)=>b.stargazers_count-a.stargazers_count)
      .slice(0,6)
      .forEach((repo,i)=>{
        const card=document.createElement("div");
        card.className="repo-card";
        card.innerHTML=`
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description provided"}</p>
          <small>★ ${repo.stargazers_count} • ${repo.language || "N/A"}</small>
        `;
        grid.appendChild(card);
        setTimeout(()=>card.classList.add("show"),i*100);
      });
}
loadRepos();

/* Contact API */
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
    status.textContent="Transmission sent successfully.";
    e.target.reset();
  } else {
    status.textContent="Error sending transmission.";
  }
});