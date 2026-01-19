document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburgerMenu.addEventListener('click', function () {
        hamburgerMenu.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
});

const observerr = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observar todos los elementos con la clase 'scroll-animation'
document.querySelectorAll('.scroll-animation').forEach((el) => {
    observer.observe(el);
});
const positions = { 1: 0, 2: 0 };

function moveCarousel(line, direction) {
    const track = document.getElementById(`carouselTrack${line}`);
    const cards = track.children;
    const totalCards = cards.length;
    const cardWidth = 340;
    const gap = 24;
    const step = cardWidth + gap;
    const viewport = track.parentElement;
    const visibleCards = Math.floor(viewport.offsetWidth / step);
    const maxPosition = Math.max(0, totalCards - visibleCards);

    positions[line] += direction * visibleCards;
    if (positions[line] < 0) positions[line] = 0;
    if (positions[line] > maxPosition) positions[line] = maxPosition;

    track.style.transform = `translateX(${-positions[line] * step}px)`;
    updateIndicators(line, positions[line], Math.ceil(totalCards / visibleCards));
}

function updateIndicators(line, current, total) {
    const container = document.getElementById(`indicators${line}`);
    container.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel__indicator' + (i === current ? ' active' : '');
        dot.onclick = () => goToSlide(line, i);
        container.appendChild(dot);
    }
}

function goToSlide(line, index) {
    const track = document.getElementById(`carouselTrack${line}`);
    const viewport = track.parentElement;
    const cardWidth = 340;
    const gap = 24;
    const step = cardWidth + gap;
    const visibleCards = Math.floor(viewport.offsetWidth / step);

    positions[line] = index * visibleCards;
    track.style.transform = `translateX(${-positions[line] * step}px)`;

    const totalCards = track.children.length;
    updateIndicators(line, index, Math.ceil(totalCards / visibleCards));
}

// Inicializar indicadores
updateIndicators(1, 0, Math.ceil(10 / 3));
updateIndicators(2, 0, Math.ceil(4 / 3));

window.addEventListener('resize', () => {
    moveCarousel(1, 0);
    moveCarousel(2, 0);
});

// scripts.js


// Función para mover el carousel
function moveCarousel(line, direction) {
    const track = document.getElementById(`carouselTrack${line}`);
    const cards = track.children;
    const totalCards = cards.length;
    const cardWidth = 340;
    const gap = 24;
    const step = cardWidth + gap;
    const viewport = track.parentElement;
    const visibleCards = Math.floor(viewport.offsetWidth / step);
    const maxPosition = Math.max(0, totalCards - visibleCards);

    positions[line] += direction * visibleCards;
    if (positions[line] < 0) positions[line] = 0;
    if (positions[line] > maxPosition) positions[line] = maxPosition;

    track.style.transform = `translateX(${-positions[line] * step}px)`;
    updateIndicators(line, positions[line], Math.ceil(totalCards / visibleCards));
}

// Función para actualizar indicadores
function updateIndicators(line, current, total) {
    const container = document.getElementById(`indicators${line}`);
    container.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel__indicator' + (i === current ? ' active' : '');
        dot.onclick = () => goToSlide(line, i);
        container.appendChild(dot);
    }
}

// Función para ir a un slide específico
function goToSlide(line, index) {
    const track = document.getElementById(`carouselTrack${line}`);
    const viewport = track.parentElement;
    const cardWidth = 340;
    const gap = 24;
    const step = cardWidth + gap;
    const visibleCards = Math.floor(viewport.offsetWidth / step);

    positions[line] = index * visibleCards;
    track.style.transform = `translateX(${-positions[line] * step}px)`;

    const totalCards = track.children.length;
    updateIndicators(line, index, Math.ceil(totalCards / visibleCards));
}

// Función toggleView (ajustada de conversaciones previas, con botones separados si usas eso)
function toggleView(id, mode = 'toggle') {
    const carousel = document.getElementById(`carousel${id}`);
    const grid = document.getElementById(`grid${id}`);
    const verMasBtn = document.querySelector('.ver-mas-btn');
    const verMenosBtn = document.querySelector('.ver-menos-btn');

    if (!grid || !carousel || !verMasBtn || !verMenosBtn) {
        console.error('Elemento no encontrado: verifica IDs y clases de botones, carousel y grid');
        return;
    }

    const isGridVisible = grid.style.display === "grid";

    if (mode === 'more' || (mode === 'toggle' && !isGridVisible)) {
        // Mostrar grid (expandir)
        grid.style.display = "grid";
        carousel.style.display = "none";
        verMasBtn.style.display = "none";
        verMenosBtn.style.display = "block";
    } else if (mode === 'less' || (mode === 'toggle' && isGridVisible)) {
        // Mostrar carrusel (achicar)
        grid.style.display = "none";
        carousel.style.display = "block";
        verMasBtn.style.display = "block";
        verMenosBtn.style.display = "none";
    }
}
// Guardar y restaurar posición del scroll
(function () {
    // Guardar posición antes de salir de la página
    window.addEventListener('beforeunload', function () {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    });

    // Restaurar posición al cargar la página
    window.addEventListener('load', function () {
        const savedPosition = sessionStorage.getItem('scrollPosition');
        if (savedPosition !== null) {
            window.scrollTo(0, parseInt(savedPosition));
            // Opcional: limpiar después de restaurar
            // sessionStorage.removeItem('scrollPosition');
        }
    });

    // Para navegación con el botón atrás/adelante
    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            const savedPosition = sessionStorage.getItem('scrollPosition');
            if (savedPosition !== null) {
                window.scrollTo(0, parseInt(savedPosition));
            }
        }
    });
})();


