/* Lightweight client-side password gate (preview protection).
   Note: this is a soft gate for sharing a private preview — not strong security. */
(function(){
  var PW="avb", K="af-gate-asyraf";
  try{ if(sessionStorage.getItem(K)==="ok") return; }catch(e){}
  var st=document.createElement("style");
  st.id="af-hide";
  st.textContent="body{visibility:hidden!important}#af-gate,#af-gate *{visibility:visible!important}";
  document.documentElement.appendChild(st);
  var o=document.createElement("div"); o.id="af-gate";
  o.setAttribute("style","position:fixed;inset:0;z-index:2147483647;background:#09090b;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,'Segoe UI',sans-serif");
  o.innerHTML="<div style='text-align:center;max-width:340px;padding:2rem;color:#fff'>"
    +"<div style='width:58px;height:58px;border-radius:16px;background:linear-gradient(135deg,#2BD4A8,#5B8CFF);display:flex;align-items:center;justify-content:center;margin:0 auto 1.3rem;font-weight:800;color:#04121a;font-size:1.25rem;font-family:sans-serif'>AF</div>"
    +"<h1 style='font-size:1.4rem;margin:0 0 .4rem;font-weight:700'>Private preview</h1>"
    +"<p style='color:#a1a1aa;font-size:.92rem;margin:0 0 1.3rem'>Enter the password to view this site.</p>"
    +"<input id='af-pw' type='password' autocomplete='off' placeholder='Password' style='width:100%;box-sizing:border-box;padding:.85rem 1rem;border-radius:12px;border:1px solid #3f3f46;background:#18181b;color:#fff;font-size:1rem;margin-bottom:.7rem;outline:none'>"
    +"<button id='af-go' style='width:100%;padding:.85rem;border:0;border-radius:12px;background:#fff;color:#09090b;font-weight:700;font-size:1rem;cursor:pointer'>Enter</button>"
    +"<div id='af-err' style='color:#ff6b6b;font-size:.85rem;margin-top:.6rem;min-height:1.1rem'></div>"
    +"<div style='margin-top:1.4rem;color:#52525b;font-size:.74rem'>Hj. Asyraf Fauzi &middot; Ummah Collective</div></div>";
  function go(){
    var inp=document.getElementById("af-pw"), err=document.getElementById("af-err");
    if(inp.value===PW){ try{sessionStorage.setItem(K,"ok")}catch(e){} var h=document.getElementById("af-hide"); if(h)h.remove(); o.parentNode&&o.parentNode.removeChild(o); }
    else { err.textContent="Incorrect password"; inp.value=""; inp.focus(); }
  }
  function attach(){
    (document.body||document.documentElement).appendChild(o);
    var inp=document.getElementById("af-pw"), btn=document.getElementById("af-go");
    btn.addEventListener("click",go);
    inp.addEventListener("keydown",function(e){ if(e.key==="Enter"){e.preventDefault();go();} });
    setTimeout(function(){ try{inp.focus()}catch(e){} },60);
  }
  attach();
  if(!document.body) document.addEventListener("DOMContentLoaded",function(){ if(!document.getElementById("af-pw")) attach(); });
})();
