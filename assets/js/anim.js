/* Shared scroll-reveal + count-up for concept pages */
(function(){
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  function animate(el){var end=+el.dataset.count,pre=el.dataset.prefix||'',suf=el.dataset.suffix||'',s=null,d=1400;
    function step(t){if(!s)s=t;var p=Math.min((t-s)/d,1);el.textContent=pre+Math.floor((1-Math.pow(1-p,3))*end)+suf;if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}
  var co=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){animate(en.target);co.unobserve(en.target);}});},{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(el){co.observe(el);});
})();
