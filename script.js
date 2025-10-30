// Minimal interactions for the portfolio template
document.addEventListener('DOMContentLoaded', function(){
  // simple fade-in on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
      }
    });
  },{threshold:0.08});

  document.querySelectorAll('.card, .intro-right, .hero-illustration').forEach(el=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 600ms ease, transform 600ms ease';
    observer.observe(el);
  });

  document.querySelectorAll('.card, .intro-right, .hero-illustration').forEach(el=>{
    el.addEventListener('transitionend', ()=>{});
  });

  // when element gets 'in' class set to visible via inline styles
  const mo = new MutationObserver(muts=>{
    muts.forEach(m=>{
      if(m.type==='attributes') return;
    });
  });

  // small helper: when in viewport add styles
  const intObs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },{threshold:0.1});
  document.querySelectorAll('.card, .intro-right, .hero-illustration').forEach(el=>intObs.observe(el));
});
