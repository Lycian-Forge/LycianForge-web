// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out-quad'
  });



  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("section"); // Assuming your sections are inside <section> tags
    let scrollPosition = window.scrollY;
    
    if (window.scrollY === 0) {
      header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    }
    else {
      sections.forEach((section) => {
        let sectionTop = section.offsetTop - header.offsetHeight;
        let sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            let bgColor = window.getComputedStyle(section).backgroundColor;
            header.style.backgroundColor = bgColor;
        }

    });
    }


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


  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let statusMessage = document.getElementById('formStatus');

    fetch("https://formspree.io/f/xwpvqqrn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (response.ok) {
            statusMessage.textContent = "Message Sent! We'll get back to you soon.";
            statusMessage.classList.remove("hidden");
            document.getElementById('contactForm').reset();
        } else {
            statusMessage.textContent = "Failed to send. Please try again.";
            statusMessage.style.color = "red";
            statusMessage.classList.remove("hidden");
        }
    })
    .catch(error => {
        statusMessage.textContent = "Error sending message.";
        statusMessage.style.color = "red";
        statusMessage.classList.remove("hidden");
    });
});
