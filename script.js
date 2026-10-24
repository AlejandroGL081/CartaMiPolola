(function(){
  var PH = ["fotos/01.jpg", "fotos/02.jpg", "fotos/03.jpg", "fotos/04.jpg", "fotos/05.jpg", "fotos/06.jpg", "fotos/07.jpg", "fotos/08.jpg", "fotos/09.jpg", "fotos/10.jpg", "fotos/11.jpg", "fotos/12.jpg", "fotos/13.jpg", "fotos/14.jpg", "fotos/15.jpg", "fotos/16.jpg", "fotos/17.jpg", "fotos/18.jpg", "fotos/19.jpg", "fotos/20.jpg"];
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Texto que se escribe solo
  var text = "Andy, cada foto guarda un momento, y cada momento me recuerda lo mucho que significas para mí.";
  var el = document.getElementById("typed"), i = 0;
  if (reduce) { el.textContent = text; }
  else { setTimeout(function t(){ el.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(t, 45); }, 1400); }

  // Collage de fondo y mosaico, sin marcos
  function pic(i){ var im = new Image(); im.src = PH[((i % PH.length) + PH.length) % PH.length]; im.alt = ""; im.decoding = "async"; return im; }
  var bg = document.getElementById("bg");
  function fillBg(){
    bg.textContent = "";
    var cols = Math.ceil(window.innerWidth / 124) + 1, rows = Math.ceil(window.innerHeight / 124) + 1, n = Math.min(cols * rows, 110);
    for (var i = 0; i < n; i++) bg.appendChild(pic(i * 7 + Math.floor(i / PH.length) * 3));
  }
  fillBg();
  var rt; window.addEventListener("resize", function(){ clearTimeout(rt); rt = setTimeout(fillBg, 250); });
  var mo = document.getElementById("mosaic"), mo2 = document.getElementById("mosaic2"), lb = document.getElementById("lb"), lbi = lb.querySelector("img");
  for (var j = 0; j < 30; j++) {
    var g = pic(j < 20 ? j * 7 : j * 3 + 1);
    g.addEventListener("click", function(e){ lbi.src = e.target.src; lb.classList.add("on"); });
    (j < 15 ? mo : mo2).appendChild(g);
  }
  lb.addEventListener("click", function(){ lb.classList.remove("on"); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape") lb.classList.remove("on"); });

  var music = document.getElementById("music");

music.volume = 0.85;

// Intentar reproducir automáticamente
window.addEventListener("load", function () {
    music.play().catch(function(err){
        console.log("Autoplay bloqueado por el navegador:", err);
    });
});

  // Contador del tiempo juntos
  var start = new Date(2025, 7, 18, 17, 0, 0), cEl = document.getElementById("count"), tEl = document.getElementById("total");
  function plural(n, one, many){ return n === 1 ? one : many; }
  function pad(n){ return n < 10 ? "0" + n : "" + n; }
  function tick(){
    var now = new Date(); if (now < start) now = start;
    var y = now.getFullYear() - start.getFullYear(), mo = now.getMonth() - start.getMonth(), d = now.getDate() - start.getDate(),
        h = now.getHours() - start.getHours(), mi = now.getMinutes() - start.getMinutes(), s = now.getSeconds() - start.getSeconds();
    if (s < 0) { s += 60; mi--; }
    if (mi < 0) { mi += 60; h--; }
    if (h < 0) { h += 24; d--; }
    if (d < 0) { d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); mo--; }
    if (mo < 0) { mo += 12; y--; }
    var parts = [[y, y, "año", "años"], [mo, mo, "mes", "meses"], [d, d, "día", "días"], [pad(h), h, "hora", "horas"], [pad(mi), mi, "minuto", "minutos"], [pad(s), s, "segundo", "segundos"]];
    cEl.innerHTML = parts.map(function(p){ return "<div><b>" + p[0] + "</b><span>" + plural(p[1], p[2], p[3]) + "</span></div>"; }).join("");
    tEl.textContent = "En total son " + Math.floor((now - start) / 86400000) + " días juntos";
  }
  tick(); setInterval(tick, 1000);

  // Luces que suben
  var lights = document.getElementById("lights");
  function spark(){
    if (reduce || document.hidden) return;
    var s = document.createElement("span"), z = 16 + Math.random()*22;
    var cols = ["#ffd23f","#ffc107","#ffae00","#2f7bff","#1f4dff","#3ddcff","#7dc4ff"], c = cols[Math.floor(Math.random()*cols.length)];
    s.className = "spark"; s.textContent = "♥"; s.style.color = c; s.style.fontSize = z + "px";
    s.style.left = Math.random()*100 + "%"; s.style.setProperty("--dx", (Math.random()*80-40) + "px");
    s.style.animationDuration = (8 + Math.random()*8) + "s";
    lights.appendChild(s); setTimeout(function(){ s.remove(); }, 17000);
  }
  setInterval(spark, 700);

  // Corazones al tocar el botón
  document.getElementById("heart").addEventListener("click", function(e){
    var r = e.currentTarget.getBoundingClientRect();
    for (var k = 0; k < 14; k++) {
      var h = document.createElement("div"); h.className = "burst";
      h.textContent = ["💛","💙","⭐","✨"][k % 4];
      h.style.left = (r.left + r.width/2) + "px"; h.style.top = (r.top + r.height/2) + "px";
      h.style.setProperty("--dx", (Math.random()*300-150) + "px");
      h.style.animationDelay = (k*40) + "ms";
      document.body.appendChild(h); setTimeout(function(x){ x.remove(); }, 2400, h);
    }
  });

})();
