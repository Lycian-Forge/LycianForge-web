// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out-quad'
  });

  document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const hamburgerBtn = document.getElementById("hamburger-btn");

    if (!menu || !hamburgerBtn) {
        console.error("Menu or Hamburger button not found!");
        return;
    }

    hamburgerBtn.addEventListener("click", function () {
        console.log("Hamburger button clicked!"); // Debugging log

        if (menu.classList.contains("active")) {
            menu.classList.remove("active"); // Hide menu
            console.log("Hamburger button deaclicked!"); // Debugging log
        } else {
            menu.classList.add("active");  // Show menu
            console.log("Hamburger button actclicked!"); // Debugging log
        }
    });
});



  function adjustTransparency(bgColor, alpha = 0.8) { // Default alpha = 80% opacity
    if (bgColor.startsWith("#")) {
        // Convert HEX to RGBA
        let r = parseInt(bgColor.substring(1, 3), 16);
        let g = parseInt(bgColor.substring(3, 5), 16);
        let b = parseInt(bgColor.substring(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else if (bgColor.startsWith("rgb")) {
        // Convert RGB to RGBA
        return bgColor.replace("rgb", "rgba").replace(")", `, ${alpha})`);
    }


    return bgColor; // Fallback if format is unknown
}


  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    const dropdown = document.querySelector(".dropdown-content");
    const menu = document.querySelector(".menu");
    const homeSection = document.querySelector("#home"); // Get the home section
    const sections = document.querySelectorAll("section");
    const isMobile = window.innerWidth <= 768; // Detect mobile screen size
    let scrollPosition = window.scrollY;

    // If user is at the very top of the page, keep the header background fixed
    if (scrollPosition === 0) {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        dropdown.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';

        if (isMobile) {
          menu.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        } else {
          menu.style.backgroundColor = 'rgba(26, 26, 26, 0)';
        }
        return; // Exit early to avoid unnecessary processing
    }

    // If the home section is in view, don't change the header color
    if (homeSection) {
        let homeTop = homeSection.offsetTop - header.offsetHeight;
        let homeBottom = homeTop + homeSection.offsetHeight;

        if (scrollPosition >= homeTop && scrollPosition < homeBottom) {
            header.style.backgroundColor = 'rgba(26, 26, 26, .2)'; // Keep it same as top
            dropdown.style.backgroundColor = 'rgba(26, 26, 26, .2)';
            if (isMobile) {
              menu.style.backgroundColor = 'rgba(26, 26, 26, 0.0)';
            } else {
              menu.style.backgroundColor = 'rgba(26, 26, 26, 0)';
            }
            return; // Exit early
        }
    }

    // Otherwise, apply the background color of the current section
    sections.forEach((section) => {
        let sectionTop = section.offsetTop - header.offsetHeight;
        let sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            let bgColor = window.getComputedStyle(section).backgroundColor;
            header.style.backgroundColor = adjustTransparency(bgColor, 0.90); // 60% opacity
            dropdown.style.backgroundColor = adjustTransparency(bgColor, 0.90); // 60% opacity {
            if (isMobile) {
              menu.style.backgroundColor = adjustTransparency(bgColor, 0.9);
            } else {
              menu.style.backgroundColor = adjustTransparency(bgColor, 0);
            }
            
        }
    });
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
