const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("hidden", window.scrollY < 300);
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"});
});

// Accordion functionality
document.querySelectorAll('.accordion-btn').forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;
        const icon = button.querySelector('.accordion-icon');
        const isActive = button.classList.contains('active');

        // Cierra todos primero
        document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = '0');
        document.querySelectorAll('.accordion-icon').forEach(i => i.style.transform = 'rotate(0deg)');
        document.querySelectorAll('.accordion-btn').forEach(b => b.classList.remove('active'));

        // Si el clickeado NO estaba activo => ábrelo
        if (!isActive) {
            button.classList.add('active');
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// Cierra menú al hacer clic en un link
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
});

// Initialize Feather Icons
feather.replace();

// Highlight active nav item
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#main-nav a, #mobile-menu a");

// --- IntersectionObserver para actualizar el menú al scrollear ---
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    navLinks.forEach(link => {
        link.classList.remove("active", "text-sunshine");
        link.classList.add("text-white"); // estilo por defecto
        if (link.getAttribute("href") === `#${entry.target.id}`) {
        link.classList.add("active", "text-sunshine");
        link.classList.remove("text-white");
        }
    });
    }
});
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));

// --- Click para hacer scroll suave ---
navLinks.forEach(link => {
link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
    target.scrollIntoView({ behavior: "smooth" });
    }
});
});
        
// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offset = 64; // Adjust this value as needed
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash
            history.pushState(null, null, targetId);
            
            // Update active nav item
            document.querySelectorAll('#main-nav a, #mobile-menu a').forEach(link => {
                link.classList.remove('active', 'text-sunshine');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active', 'text-sunshine');
                }
            });
        }
    });
});

//load maps
const loadMap = (id, src) => {
    const container = document.getElementById(id);
    if (container && !container.querySelector("iframe")) {
        container.innerHTML = `<iframe src="${src}" width="100%" height="100%" style="border:0;" loading="lazy" allowfullscreen="" loading="lazy" title="Mapa ${id}" referrerpolicy="no-referrer-when-downgrade" class="rounded-lg"></iframe>`;
    }
};

const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            loadMap("map1", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.6654313604336!2d-89.4503904228847!3d14.330856350346139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f62554c9b1738d1%3A0x30ca38a4391c9cbe!2sLibrer%C3%ADa%20Nueva%20Jeric%C3%B3!5e0!3m2!1ses-419!2ssv!4v1759095117539!5m2!1ses-419!2ssv"); // tu link real
            loadMap("map2", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.6654313604336!2d-89.4503904228847!3d14.330856350346139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f62554c9b1738d1%3A0x30ca38a4391c9cbe!2sLibrer%C3%ADa%20Nueva%20Jeric%C3%B3!5e0!3m2!1ses-419!2ssv!4v1759095117539!5m2!1ses-419!2ssv"); // tu link real
        }
    });
}, {threshold: 0.3});

mapObserver.observe(document.getElementById("sucursales"));

// Handle initial load highlighting
window.addEventListener('load', function() {
    const currentHash = window.location.hash || '#';
    const navLinks = document.querySelectorAll('#main-nav a, #mobile-menu a');
    
    navLinks.forEach(link => {
        const linkHash = link.getAttribute('href');
        if ((currentHash === '#' && linkHash === '#') || 
            (linkHash !== '#' && currentHash === linkHash)) {
            link.classList.add('active', 'text-sunshine');
            link.classList.remove('text-white');
            
            // Scroll to section with offset on load
            if (linkHash !== '#') {
                setTimeout(() => {
                    const targetElement = document.querySelector(linkHash);
                    if (targetElement) {
                        const offset = 100;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                        window.scrollTo({ top: targetPosition });
                    }
                }, 100);
            }
        } else {
            link.classList.remove('active', 'text-sunshine');
            if (linkHash.includes('#') || linkHash.endsWith('#')) {
                link.classList.add('text-white');
            }
        }
    });
});

// Formspree form submission handling

document.getElementById('contact-form').addEventListener('submit', async function(event) {
            event.preventDefault(); // Evita que la página se recargue
            
            const form = event.target;
            const data = new FormData(form);
            const statusSuccess = document.getElementById('form-success');
            const statusError = document.getElementById('form-error');
            const submitBtn = document.getElementById('submit-btn');
            const btnText = submitBtn.querySelector('span');

            // 1. Cambiar estado del botón (feedback visual inmediato)
            submitBtn.disabled = true;
            btnText.textContent = 'Enviando...';
            statusSuccess.classList.add('hidden');
            statusError.classList.add('hidden');

            try {
                // 2. Envío a tu endpoint de Formspree
                const response = await fetch("https://formspree.io/f/xgvqgjoe", {
                    method: "POST",
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // 3. Éxito: Limpiar y mostrar mensaje
                    form.reset();
                    statusSuccess.classList.remove('hidden');
                    
                    // Opcional: Ocultar el mensaje de éxito después de 5 segundos
                    setTimeout(() => {
                        statusSuccess.classList.add('hidden');
                    }, 8000);
                } else {
                    // Error del servidor (Formspree)
                    statusError.classList.remove('hidden');
                }
            } catch (error) {
                // Error de red (Internet)
                statusError.classList.remove('hidden');
            } finally {
                // 4. Restaurar botón
                submitBtn.disabled = false;
                btnText.textContent = 'Enviar Mensaje';
            }
        });