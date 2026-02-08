// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out-quad'
  });

  // Logo click and keyboard accessibility
  const logo = document.getElementById('logo');
  
  logo.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Keyboard support for logo
  logo.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const menuCheckbox = document.getElementById("menu-checkbox");
    const hamburgerCheckBox = document.getElementById("hamburger-btn");
    ;

    if (!menu || !menuCheckbox) {
        console.error("Menu or Checkbox not found!");
        return;
    }

    // Toggle menu visibility based on checkbox state
    menuCheckbox.addEventListener("change", function () {
        if (menuCheckbox.checked) {
            // When the checkbox is checked, show the menu with the animation
            menu.classList.add("active");
            menu.classList.remove("closed");
            console.log("Menu opened");
        } else {
            // When the checkbox is unchecked, close the menu with the reverse animation
            menu.classList.add("closed");
            menu.classList.remove("active");
            console.log("Menu closed");
        }
    });

    // Optional: Close menu if a menu item is clicked
    menu.querySelectorAll("a").forEach(item => {
        item.addEventListener("click", function () {
            // Uncheck the checkbox and trigger closing animation
            menuCheckbox.checked = false;
            menu.classList.add("closed");
            menu.classList.remove("active");
            console.log("Menu item clicked, menu closed");
        });
    });

    // Close the menu if a click or touch happens outside the menu or checkbox
    document.addEventListener("click", function (event) {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickInsideHamburger = hamburgerCheckBox && hamburgerCheckBox.contains(event.target)

        if (!isClickInsideMenu && !isClickInsideHamburger ) {
            // Uncheck the checkbox and trigger closing animation if the click is outside
            if (menuCheckbox.checked) {
                menuCheckbox.checked = false;
                menu.classList.add("closed");
                menu.classList.remove("active");
                console.log("Menu closed from outside click");
            }
        }
    });

    document.addEventListener("touchstart", function (event) {
        const isTouchInsideMenu = menu.contains(event.target);
        const isClickInsideHamburger = hamburgerCheckBox.contains(event.target)

        if (!isTouchInsideMenu && !isClickInsideHamburger) {
            // Uncheck the checkbox and trigger closing animation if the touch is outside
            if (menuCheckbox.checked) {
                menuCheckbox.checked = false;
                menu.classList.add("closed");
                menu.classList.remove("active");
                console.log("Menu closed from outside touch");
            }
        }
    });


});



document.addEventListener("DOMContentLoaded", function () {
  const aboutLink = document.querySelector("a[href='#about']");

  if (!aboutLink) {
    console.error("About link not found!");
    return;
  }

  // Function to check the screen size and update the href attribute
  function updateLinkBasedOnLayout() {
    if (window.innerWidth <= 768) { // Mobile layout
      aboutLink.setAttribute("href", "#team");
    } else { // Desktop layout
      aboutLink.setAttribute("href", "#about");
    }
  }

  // Run the function on page load
  updateLinkBasedOnLayout();

  // Run the function whenever the window is resized
  window.addEventListener("resize", updateLinkBasedOnLayout);
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

  let lastHoveredCard = null;

  document.querySelectorAll(".team-card").forEach(card => {
    let timeout;

    card.addEventListener("mouseenter", () => {
      clearTimeout(card.dataset.timeoutId); // Prevent premature removal
      card.classList.add("hovered");
      card.style.zIndex = "2"; // Bring the hovered card to the front

      if (lastHoveredCard && lastHoveredCard !== card) {
        lastHoveredCard.style.zIndex = "1"; // Reset previous card’s z-index
      }

      lastHoveredCard = card; // Update last hovered card
    });

    card.addEventListener("mouseleave", () => {
      const timeoutId = setTimeout(() => {
        card.classList.remove("hovered");
        if (lastHoveredCard === card) {
          card.style.zIndex = "1"; // Reset only if it's still the last hovered
          lastHoveredCard = null;
        }
      }, 800);

      card.dataset.timeoutId = timeoutId; // Store timeout ID per card
    });
  });






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
              menu.style.backgroundColor = 'rgba(26, 26, 26, 0.2)';
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


  // Contact Form with Loading State
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let statusMessage = document.getElementById('formStatus');
    let submitBtn = event.target.querySelector('.send-btn');

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

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
    })
    .finally(() => {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    });
  });

  // Newsletter Form with Loading State
  document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('newsletter-email').value;
    let statusMessage = document.getElementById('newsletterStatus');
    let submitBtn = event.target.querySelector('.newsletter-btn');
    let btnText = submitBtn.querySelector('.btn-text');
    let btnLoading = submitBtn.querySelector('.btn-loading');

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';

    // Use Formspree for newsletter (you can create a separate form for this)
    fetch("https://formspree.io/f/xwpvqqrn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          email: email, 
          message: "Newsletter subscription request",
          _subject: "New Newsletter Subscription"
        })
    })
    .then(response => {
        statusMessage.classList.remove('hidden', 'error');
        if (response.ok) {
            statusMessage.textContent = "🎉 Welcome to the Forge! Check your inbox for confirmation.";
            statusMessage.classList.add('success');
            document.getElementById('newsletterForm').reset();
        } else {
            statusMessage.textContent = "Oops! Something went wrong. Please try again.";
            statusMessage.classList.add('error');
        }
    })
    .catch(error => {
        statusMessage.classList.remove('hidden', 'success');
        statusMessage.textContent = "Network error. Please check your connection.";
        statusMessage.classList.add('error');
    })
    .finally(() => {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        
        // Hide status message after 5 seconds
        setTimeout(() => {
            statusMessage.classList.add('hidden');
        }, 5000);
    });
  });

  // Trailer Modal Functionality
  document.addEventListener('DOMContentLoaded', function() {
    const trailerBtn = document.querySelector('.watch-trailer-btn');
    const trailerModal = document.querySelector('.trailer-modal');
    const closeTrailerBtn = document.querySelector('.close-trailer');
    const trailerIframe = trailerModal?.querySelector('iframe');

    if (trailerBtn && trailerModal) {
      // Open trailer modal
      trailerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        trailerModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Load the video (lazy load)
        if (trailerIframe && trailerIframe.dataset.src) {
          trailerIframe.src = trailerIframe.dataset.src;
        }
      });

      // Close trailer modal
      function closeTrailer() {
        trailerModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Stop the video by clearing src
        if (trailerIframe) {
          trailerIframe.src = '';
        }
      }

      if (closeTrailerBtn) {
        closeTrailerBtn.addEventListener('click', closeTrailer);
      }

      // Close on background click
      trailerModal.addEventListener('click', function(e) {
        // Close if clicking on the modal background (not on the content)
        if (e.target === trailerModal || e.target.classList.contains('trailer-modal')) {
          closeTrailer();
        }
      });

      // Also add click listener to modal content wrapper
      const modalContent = trailerModal.querySelector('.trailer-modal-content');
      if (modalContent) {
        // Prevent clicks inside the content from bubbling to the modal
        modalContent.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      }

      // Close on Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && trailerModal.classList.contains('active')) {
          closeTrailer();
        }
      });
    }
  });
