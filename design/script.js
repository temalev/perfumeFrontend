document.querySelectorAll('.subnav .nav-cat').forEach(function(el){
  el.addEventListener('click',function(){
    document.querySelectorAll('.subnav .nav-cat').forEach(c=>c.classList.remove('active'));
    el.classList.add('active');
  });
});
function openWhy(){document.getElementById('whyModal').classList.add('open');document.body.style.overflow='hidden';}
function closeWhy(){document.getElementById('whyModal').classList.remove('open');document.body.style.overflow='';}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeWhy();});
function scrollCar(id,dir){var t=document.getElementById(id);if(t)t.scrollBy({left:dir*Math.max(t.clientWidth*0.8,220),behavior:'smooth'});}
