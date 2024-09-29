
    const dropdowns = document.querySelectorAll('nav ul li');

    dropdowns.forEach((dropdown) => {
        let timeout;

        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            const menu = dropdown.querySelector('.dropdown');
            if (menu) {
                menu.classList.add('visible'); // Show the dropdown
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            const menu = dropdown.querySelector('.dropdown');
            if (menu) {
                timeout = setTimeout(() => {
                    menu.classList.remove('visible'); // Hide after a delay
                }, 150); // Adjust the delay here (300ms) as needed
            }
        });
    });
