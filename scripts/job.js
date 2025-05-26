document.addEventListener('DOMContentLoaded', function() {
  const jobTops = document.querySelectorAll('.jobs__item__top');
  
  jobTops.forEach(top => {
    top.addEventListener('click', function() {
      const jobItem = this.closest('.jobs__item');
    
      jobItem.classList.toggle('open');
      
    });
  });
});