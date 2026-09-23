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
  // contact
  document.querySelectorAll('.kind').forEach(function(b){b.addEventListener('click',function(){document.querySelectorAll('.kind').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});document.getElementById('c-detail-label').textContent=b.getAttribute('data-hint');});});
  var send=document.getElementById('c-send'),reset=document.getElementById('c-reset');
  if(send) send.addEventListener('click',function(){ /* TODO: connect to a form service such as Formspree before launch */ document.getElementById('c-form').hidden=true;document.getElementById('c-sent').hidden=false;});
  if(reset) reset.addEventListener('click',function(){document.getElementById('c-form').hidden=false;document.getElementById('c-sent').hidden=true;});
})();
