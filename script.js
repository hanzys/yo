// ===== ANTI INSPECT =====
document.addEventListener("contextmenu", e => e.preventDefault());
document.onkeydown = e => {
  if (
    e.keyCode === 123 ||
    (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
    (e.ctrlKey && e.keyCode === 85)
  ) return false;
};

// ===== LOGIN SYSTEM =====
async function login() {
  const keyInput = document.getElementById("keyInput").value;
  const status = document.getElementById("status");

  const res = await fetch("key.json");
  const data = await res.json();
  const today = new Date().toISOString().split("T")[0];

  const found = data.keys.find(k => k.key === keyInput);

  if (!found) return status.innerText = "❌ KEY TIDAK VALID";
  if (found.used) return status.innerText = "❌ KEY SUDAH DIGUNAKAN";
  if (today > found.expired) return status.innerText = "❌ KEY EXPIRED";

  found.used = true;
  status.innerText = "✅ LOGIN BERHASIL";
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("dashboard").classList.remove("hidden");
}

// ===== PARTICLE =====
const canvas = document.getElementById("particle");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = Array.from({length: 100}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  r: Math.random()*2,
  dx: Math.random()-0.5,
  dy: Math.random()-0.5
}));

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="gold";
    ctx.fill();
    p.x+=p.dx; p.y+=p.dy;
  });
  requestAnimationFrame(animate);
}
animate();
