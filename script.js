// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out-quad'
  });
  
  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.style.background = window.scrollY > 50 ? 'rgba(10,10,10,0.98)' : 'rgba(26,26,26,0.95)';
  });
  
  // Card Tilt Effect
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = (x - rect.width/2) / 15;
      const rotateX = (y - rect.height/2) / 15;
      card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
  
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
  
  // Enhanced Parallax Effect
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallax = document.querySelector('.parallax');
    if(parallax) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });


  window.addEventListener("load", function () {
    const loaderWrapper = document.getElementById("loader-wrapper");
    const mainContent = document.getElementById("main-content");

    // Enforce a minimum loader duration of 1.5 seconds
    setTimeout(() => {
      loaderWrapper.classList.add("fade-out");

      // Wait for fade-out transition (0.5s) before showing content
      setTimeout(() => {
        loaderWrapper.style.display = "none";
        mainContent.classList.add("visible"); // Add animation-triggering class
      }, 500);
      mainContent.style.display = "block";
    }, 1000);
  });

