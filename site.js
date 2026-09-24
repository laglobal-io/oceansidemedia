(function(){
  document.addEventListener('click',function(e){ var a=e.target.closest('a[href="#"]'); if(a) e.preventDefault(); });
  // shows
  var cat='All', q='', n=12, tiles=[].slice.call(document.querySelectorAll('.show-tile'));
  function renderShows(){
    var m=tiles.filter(function(t){return (cat==='All'||t.getAttribute('data-cats').split('|').indexOf(cat)>-1)&&(!q||t.getAttribute('data-search').indexOf(q)>-1);});
    tiles.forEach(function(t){t.hidden=true;}); m.slice(0,n).forEach(function(t){t.hidden=false;});
    document.getElementById('show-count').textContent=m.length+(m.length===1?' show':' shows');
    document.getElementById('show-more-wrap').hidden=m.length<=n;
    document.getElementById('show-empty').hidden=m.length>0;
  }
  if(tiles.length){
    document.querySelectorAll('[data-filter]').forEach(function(b){b.addEventListener('click',function(){cat=b.getAttribute('data-filter');n=12;document.querySelectorAll('[data-filter]').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});renderShows();});});
    document.getElementById('show-q').addEventListener('input',function(e){q=e.target.value.trim().toLowerCase();n=12;renderShows();});
    document.getElementById('show-more').addEventListener('click',function(){n+=12;renderShows();});
    document.getElementById('show-clear').addEventListener('click',function(){q='';cat='All';n=12;document.getElementById('show-q').value='';document.querySelectorAll('[data-filter]').forEach(function(x){x.setAttribute('aria-pressed',x.getAttribute('data-filter')==='All'?'true':'false');});renderShows();});
    renderShows();
  }
  // tabs
  document.querySelectorAll('[data-tab]').forEach(function(b){b.addEventListener('click',function(){
    var id=b.getAttribute('data-tab');
    document.querySelectorAll('[data-tab]').forEach(function(x){x.setAttribute('aria-selected',x===b?'true':'false');});
    document.querySelectorAll('[data-panel]').forEach(function(p){p.hidden=p.getAttribute('data-panel')!==id;});
  });});
  // press carousel
  var tr=document.getElementById('press-track');
  if(tr){
    function step(){var c=tr.querySelector('article');return c?c.getBoundingClientRect().width+20:400;}
    function upd(){document.getElementById('press-prev').setAttribute('aria-disabled',tr.scrollLeft<=2?'true':'false');document.getElementById('press-next').setAttribute('aria-disabled',tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-2?'true':'false');}
    document.getElementById('press-prev').addEventListener('click',function(){tr.scrollBy({left:-step(),behavior:'smooth'});});
    document.getElementById('press-next').addEventListener('click',function(){tr.scrollBy({left:step(),behavior:'smooth'});});
    tr.addEventListener('scroll',upd); window.addEventListener('resize',upd); upd();
  }
  // hero logo: waves video inside the letters; falls back to the colored logo
  var hl=document.querySelector('.hero-logo'), wv=hl&&hl.querySelector('.wm-video');
  if(wv){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ wv.pause(); wv.removeAttribute('autoplay'); }
    else {
      var on=function(){ hl.classList.add('has-waves'); }, off=function(){ hl.classList.remove('has-waves'); };
      wv.addEventListener('playing',on); wv.addEventListener('error',off); wv.addEventListener('emptied',off);
      if(!wv.paused && wv.readyState>=3) on();
      var pp=wv.play(); if(pp&&pp.catch) pp.catch(off);
    }
  }
  // sizzle reel: show the player only once sizzle.mp4 exists
  var rv=document.getElementById('reel-video');
  if(rv){ var showRv=function(){ rv.style.opacity='1'; rv.style.pointerEvents='auto'; }; rv.addEventListener('loadedmetadata',showRv); if(rv.readyState>=1) showRv(); }
  // creator spotlight videos: black & white until hover/focus, then play in color
  var cards=[].slice.call(document.querySelectorAll('.cvid'));
  var noHover=window.matchMedia('(hover: none)').matches, reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  cards.forEach(function(c){
    var v=c.querySelector('video'); if(!v) return;
    v.addEventListener('loadedmetadata',function(){c.classList.add('has-video');});
    v.addEventListener('loadeddata',function(){c.classList.add('has-video');});
    if(!v.getAttribute('data-seeked')){ v.setAttribute('data-seeked','1'); v.addEventListener('loadedmetadata',function(){ try{ if(v.currentTime===0) v.currentTime=0.05; }catch(e){} },{once:true}); }
    if(v.readyState>=1){ c.classList.add('has-video'); try{ if(v.currentTime===0) v.currentTime=0.05; }catch(e){} }
    function on(){c.classList.add('is-on'); if(c.classList.contains('has-video')){var p=v.play(); if(p&&p.catch)p.catch(function(){});}}
    function off(){c.classList.remove('is-on'); v.pause();}
    c.addEventListener('mouseenter',on); c.addEventListener('mouseleave',off);
    c.addEventListener('focus',on); c.addEventListener('blur',off);
    c.addEventListener('touchstart',function(){ if(c.classList.contains('is-on')) off(); else { cards.forEach(function(o){ if(o!==c){o.classList.remove('is-on'); var ov=o.querySelector('video'); if(ov) ov.pause();} }); on(); } },{passive:true});
  });
  if(noHover && !reduce && 'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){var c=e.target,v=c.querySelector('video'); if(!v) return; if(e.intersectionRatio>0.75){c.classList.add('is-on'); if(c.classList.contains('has-video')){var p=v.play(); if(p&&p.catch)p.catch(function(){});}} else {c.classList.remove('is-on'); v.pause();}});},{threshold:[0,0.75,1]});
    cards.forEach(function(c){io.observe(c);});
  }
  // contact
  document.querySelectorAll('.kind').forEach(function(b){b.addEventListener('click',function(){document.querySelectorAll('.kind').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});document.getElementById('c-detail-label').textContent=b.getAttribute('data-hint');});});
  var send=document.getElementById('c-send'),reset=document.getElementById('c-reset');
  if(send) send.addEventListener('click',function(){ /* TODO: connect to a form service such as Formspree before launch */ document.getElementById('c-form').hidden=true;document.getElementById('c-sent').hidden=false;});
  if(reset) reset.addEventListener('click',function(){document.getElementById('c-form').hidden=false;document.getElementById('c-sent').hidden=true;});
})();
