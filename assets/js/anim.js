/* Shared scroll-reveal + count-up + parallax + scroll-progress */
(function(){
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  function animate(el){var end=+el.dataset.count,pre=el.dataset.prefix||'',suf=el.dataset.suffix||'',s=null,d=1500;
    function step(t){if(!s)s=t;var p=Math.min((t-s)/d,1);el.textContent=pre+Math.floor((1-Math.pow(1-p,3))*end)+suf;if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}
  var co=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){animate(en.target);co.unobserve(en.target);}});},{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(el){co.observe(el);});

  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bar=document.createElement('div'); bar.className='scrollbar'; document.body.appendChild(bar);
  var px=[].slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking=false;
  function onScroll(){
    var stp=window.pageYOffset||document.documentElement.scrollTop;
    var h=document.documentElement.scrollHeight-window.innerHeight;
    bar.style.transform='scaleX('+(h>0?Math.min(stp/h,1):0)+')';
    if(!reduce){px.forEach(function(el){var sp=+el.getAttribute('data-parallax')||.12;el.style.transform='translate3d(0,'+(stp*sp)+'px,0)';});}
    ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(onScroll);ticking=true;}},{passive:true});
  onScroll();
})();
