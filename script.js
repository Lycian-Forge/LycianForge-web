// ===========================
// Loading Screen
// ===========================
window.addEventListener('load', function() {
  const loaderWrapper = document.getElementById('loader-wrapper');
  
  // Ensure minimum loading time of 1 second for smooth experience
  setTimeout(() => {
    loaderWrapper.classList.add('fade-out');
    
    // Remove from DOM after fade out
    setTimeout(() => {
      loaderWrapper.style.display = 'none';
    }, 500);
  }, 1000);
});

// ===========================
// Mobile Menu Toggle
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const menuCheckbox = document.getElementById("menu-checkbox");
  const hamburgerBtn = document.getElementById("hamburger-btn");

  if (!menu || !menuCheckbox) {
    return;
  }

  // Toggle menu visibility based on checkbox state
  menuCheckbox.addEventListener("change", function () {
    if (menuCheckbox.checked) {
      menu.classList.add("active");
      menu.classList.remove("closed");
    } else {
      menu.classList.add("closed");
      menu.classList.remove("active");
    }
  });

  // Close menu if a menu item is clicked
  menu.querySelectorAll("a").forEach(item => {
    item.addEventListener("click", function () {
      menuCheckbox.checked = false;
      menu.classList.add("closed");
      menu.classList.remove("active");
    });
  });

  // Close the menu if a click happens outside
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickInsideHamburger = hamburgerBtn && hamburgerBtn.contains(event.target);

    if (!isClickInsideMenu && !isClickInsideHamburger) {
      if (menuCheckbox.checked) {
        menuCheckbox.checked = false;
        menu.classList.add("closed");
        menu.classList.remove("active");
      }
    }
  });

  // Close the menu if a touch happens outside
  document.addEventListener("touchstart", function (event) {
    const isTouchInsideMenu = menu.contains(event.target);
    const isClickInsideHamburger = hamburgerBtn.contains(event.target);

    if (!isTouchInsideMenu && !isClickInsideHamburger) {
      if (menuCheckbox.checked) {
        menuCheckbox.checked = false;
        menu.classList.add("closed");
        menu.classList.remove("active");
      }
    }
  });
});

// ===========================
// Header Scroll Effect
// ===========================
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(10, 10, 20, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.background = 'rgba(10, 10, 20, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Don't prevent default for just "#" or if target doesn't exist
    if (href === '#' || href === '#warrior-smith' || href === '#newsletter') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===========================
// Trailer Modal
// ===========================
const trailerModal = document.getElementById('trailerModal');
const watchTrailerBtns = document.querySelectorAll('#watchTrailerBtn, .watch-trailer-btn');
const closeTrailer = document.getElementById('closeTrailer');
const trailerIframe = document.getElementById('trailerIframe');
const modalOverlay = document.querySelector('.modal-overlay');

// YouTube video ID from the old website
const youtubeVideoId = 'J-mOElxWfH8';

if (watchTrailerBtns.length > 0 && trailerModal) {
  watchTrailerBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openTrailerModal();
    });
  });
}

if (closeTrailer) {
  closeTrailer.addEventListener('click', closeTrailerModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', closeTrailerModal);
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && trailerModal && trailerModal.classList.contains('active')) {
    closeTrailerModal();
  }
});

function openTrailerModal() {
  if (trailerModal && trailerIframe) {
    trailerModal.classList.add('active');
    trailerIframe.src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`;
    document.body.style.overflow = 'hidden';
  }
}

function closeTrailerModal() {
  if (trailerModal && trailerIframe) {
    trailerModal.classList.remove('active');
    trailerIframe.src = '';
    document.body.style.overflow = '';
  }
}

// ===========================
// Contact Form Submission
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('contactSubmitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formStatus = document.getElementById('formStatus');
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    formStatus.style.display = 'none';
    formStatus.classList.remove('success', 'error', 'show');
    
    // Submit to Formspree
    fetch('https://formspree.io/f/xwpvqqrn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _subject: 'New Contact Form Submission - Lycian Forge'
      })
    })
    .then(response => {
      if (response.ok) {
        formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! We\'ll get back to you within 1-2 business days.';
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        contactForm.reset();
        
        // Animate in
        setTimeout(() => {
          formStatus.classList.add('show');
        }, 10);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again or email us directly at arda@lycianforge.com';
      formStatus.className = 'form-status error';
      formStatus.style.display = 'block';
      
      // Animate in
      setTimeout(() => {
        formStatus.classList.add('show');
      }, 10);
    })
    .finally(() => {
      // Reset button state
      submitBtn.disabled = false;
      btnText.style.display = 'inline-block';
      btnLoading.style.display = 'none';
      
      // Hide status message after 7 seconds
      setTimeout(() => {
        formStatus.classList.remove('show');
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 300);
      }, 7000);
    });
  });
}

// ===========================
// Newsletter Form Submission
// ===========================
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('newsletterSubmitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formStatus = document.getElementById('newsletterStatus');
    const emailInput = document.getElementById('newsletter-email');
    
    // Get form data
    const email = emailInput.value;
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    formStatus.style.display = 'none';
    formStatus.classList.remove('success', 'error', 'show');
    
    // Submit to Formspree
    fetch('https://formspree.io/f/xwpvqqrn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        message: 'Newsletter subscription request',
        _subject: 'New Newsletter Subscription - Lycian Forge'
      })
    })
    .then(response => {
      if (response.ok) {
        formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Welcome to the Forge! Check your inbox for updates.';
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        newsletterForm.reset();
        
        // Animate in
        setTimeout(() => {
          formStatus.classList.add('show');
        }, 10);
      } else {
        throw new Error('Subscription failed');
      }
    })
    .catch(error => {
      formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again later.';
      formStatus.className = 'form-status error';
      formStatus.style.display = 'block';
      
      // Animate in
      setTimeout(() => {
        formStatus.classList.add('show');
      }, 10);
    })
    .finally(() => {
      // Reset button state
      submitBtn.disabled = false;
      btnText.style.display = 'inline-block';
      btnLoading.style.display = 'none';
      
      // Hide status message after 7 seconds
      setTimeout(() => {
        formStatus.classList.remove('show');
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 300);
      }, 7000);
    });
  });
}

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  const animateElements = document.querySelectorAll(`
    .game-showcase,
    .team-member-card,
    .value-card,
    .career-card,
    .roadmap-item,
    .stat-item
  `);
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// ===========================
// Parallax Effect for Hero
// ===========================
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    // Only apply parallax when hero is visible
    if (scrolled < heroHeight) {
      const parallaxBg = document.querySelector('.parallax-bg');
      
      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    }
  }
});

// ===========================
// Active Navigation Highlight
// ===========================
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.includes(currentPage))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', highlightActiveNav);

// ===========================
// Form Input Animations
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'translateY(0)';
    });
  });
});

// ===========================
// Preload Images
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', function() {
        this.style.opacity = '1';
      });
    }
  });
});

// ===========================
// Handle Hash Navigation
// ===========================
window.addEventListener('load', function() {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});

// ===========================
// Feature Cards Touch Interaction
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // For touch devices, toggle active class
      if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        // Close other cards
        featureCards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove('active');
          }
        });
        
        // Toggle this card
        card.classList.toggle('active');
      }
    });
  });
  
  // Close feature cards when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.feature-card')) {
      featureCards.forEach(card => {
        card.classList.remove('active');
      });
    }
  });
});

// ===========================
// Console Easter Egg
// ===========================
console.log('%cWelcome to Lycian Forge!', 'color: #FFA500; font-size: 24px; font-weight: bold;');
console.log('%cInterested in game development? Check out our careers page!', 'color: #FFD700; font-size: 14px;');
console.log('%chttps://lycianforge.com/about.html#careers', 'color: #FF6B35; font-size: 12px;');

// ===========================
// Performance Monitoring
// ===========================
window.addEventListener('load', function() {
  // Log performance metrics (can be removed in production)
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page loaded in ${pageLoadTime}ms`);
  }
});

// ===========================
// Utility Functions
// ===========================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events for better performance
const debouncedScroll = debounce(function() {
  // Your scroll logic here if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

