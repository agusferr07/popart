// JavaScript básico para efectos Pop Art

document.addEventListener("DOMContentLoaded", function() {
    // Crear fondo dinámico de cuadrados
    createColorGrid();
    
    // Efectos de "Sabías qué"
    initSabiasQueEffects();
    
    // Animar elementos en scroll
    animateOnScroll();
    
    // Configurar menú hamburguesa
    setupHamburgerMenu();
    
    // Marcar página activa en navegación
    markActivePage();
    
    // Animar timeline
    animateTimeline();
    
    // Inicializar carrusel de obras
    initObrasCarousel();
});

// Crear fondo dinámico de cuadrados Pop Art con cambio de color
function createColorGrid() {
    const colorGrid = document.getElementById('colorGrid');
    if (!colorGrid) return;
    
    // Limpiar el grid existente
    colorGrid.innerHTML = '';
    
    const colors = ['#FF1493', '#FFFF00', '#00BFFF', '#FF0000', '#00FF00', '#FF69B4', '#00FF7F', '#FF4500', '#8A2BE2', '#FF6347', '#32CD32', '#FFD700'];
    
    // Crear 24 cuadrados (6x4 grid) con cambio de color
    for (let i = 0; i < 24; i++) {
        const cell = document.createElement('div');
        cell.className = 'color-cell';
        
        // Asignar color inicial aleatorio
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        cell.style.cssText = `
            background: ${randomColor};
            border: 3px solid #000000;
            animation: colorChangeSlow ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
            opacity: 0.8;
            transition: background 0.5s ease;
        `;
        
        colorGrid.appendChild(cell);
    }
    
    // Cambiar colores dinámicamente cada 3 segundos
    setInterval(() => {
        const cells = document.querySelectorAll('.color-cell');
        cells.forEach(cell => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            cell.style.background = randomColor;
        });
    }, 3000);
}

// Efectos de "Sabías qué"
function initSabiasQueEffects() {
    const sabiasQueSection = document.querySelector('.sabias-que-section');
    if (!sabiasQueSection) return;
    
    const facts = [
        "El Pop Art nació en los años 50 como reacción al expresionismo abstracto",
        "Andy Warhol usaba la técnica de serigrafía para crear múltiples copias",
        "Roy Lichtenstein se inspiró en los cómics para crear su arte",
        "El Pop Art democratizó el arte al usar imágenes de la cultura popular",
        "David Hockney fue pionero en el uso del iPad para crear arte digital"
    ];
    
    let currentFact = 0;
    
    setInterval(() => {
        const factElement = sabiasQueSection.querySelector('.fact-text');
        if (factElement) {
            factElement.style.opacity = '0';
            setTimeout(() => {
                factElement.textContent = facts[currentFact];
                factElement.style.opacity = '1';
                currentFact = (currentFact + 1) % facts.length;
            }, 500);
        }
    }, 4000);
}

// Animar elementos en scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.bubble-container').forEach(container => {
        observer.observe(container);
    });
}

// Configurar menú hamburguesa
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMenu);
    }
}

function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
        // Cerrar menú
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    } else {
        // Abrir menú
        hamburger.classList.add('active');
        navMenu.classList.add('active');
    }
}

// Marcar página activa en navegación
function markActivePage() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Animar timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// CARRUSEL DE OBRAS - VERSIÓN DEFINITIVA Y SIMPLE
let currentSlide = 0;
let totalSlides = 0;

function initObrasCarousel() {
    console.log('�� Inicializando carrusel de obras...');
    
    const carousel = document.getElementById('obrasCarousel');
    if (!carousel) {
        console.log('❌ No se encontró el carrusel');
        return;
    }
    
    const slides = carousel.querySelectorAll('.obra-slide');
    totalSlides = slides.length;
    
    console.log('✅ Slides encontrados:', totalSlides);
    
    if (totalSlides === 0) {
        console.log('❌ No hay slides en el carrusel');
        return;
    }
    
    // Crear indicadores
    createIndicators();
    
    // Actualizar controles iniciales
    updateControls();
    
    // Posicionar carrusel en slide 0
    updateCarousel();
    
    console.log('✅ Carrusel inicializado correctamente');
}

function changeSlide(direction) {
    console.log('🔄 Cambiando slide:', direction, 'Slide actual:', currentSlide);
    
    const newSlide = currentSlide + direction;
    
    if (newSlide >= 0 && newSlide < totalSlides) {
        currentSlide = newSlide;
        console.log('✅ Nuevo slide:', currentSlide);
        updateCarousel();
        updateControls();
        updateIndicators();
    } else {
        console.log('⚠️ No se puede cambiar al slide:', newSlide);
    }
}

function goToSlide(slideIndex) {
    console.log('🎯 Yendo al slide:', slideIndex);
    
    if (slideIndex >= 0 && slideIndex < totalSlides) {
        currentSlide = slideIndex;
        updateCarousel();
        updateControls();
        updateIndicators();
    }
}

function updateCarousel() {
    const carousel = document.getElementById('obrasCarousel');
    if (!carousel) return;
    
    const translateX = -currentSlide * 100;
    console.log('📐 Actualizando carrusel - translateX:', translateX);
    
    carousel.style.transform = `translateX(${translateX}%)`;
    carousel.style.transition = 'transform 0.5s ease-in-out';
}

function updateControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
        console.log('⬅️ Botón anterior:', prevBtn.disabled ? 'deshabilitado' : 'habilitado');
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides - 1;
        console.log('➡️ Botón siguiente:', nextBtn.disabled ? 'deshabilitado' : 'habilitado');
    }
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function createIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.onclick = () => goToSlide(i);
        indicatorsContainer.appendChild(indicator);
    }
    
    console.log('🔘 Indicadores creados:', totalSlides);
}

// FUNCIONALIDAD PARA BIOGRAFÍAS DE ARTISTAS
function showArtistDetails(artistId) {
    // Crear modal si no existe
    let modal = document.getElementById('artistModal');
    if (!modal) {
        modal = createArtistModal();
    }
    
    // Obtener datos del artista
    const artistData = getArtistData(artistId);
    
    // Llenar el modal con los datos
    fillModalContent(modal, artistData);
    
    // Mostrar el modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function createArtistModal() {
    const modal = document.createElement('div');
    modal.id = 'artistModal';
    modal.className = 'artist-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title"></h2>
                <button class="modal-close" onclick="closeArtistModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-image-container">
                    <img class="modal-image" src="" alt="">
                </div>
                <div class="modal-info">
                    <div class="modal-period"></div>
                    <div class="modal-description"></div>
                    <div class="modal-biography"></div>
                    <div class="modal-works"></div>
                    <div class="modal-quotes"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function fillModalContent(modal, artistData) {
    modal.querySelector('.modal-title').textContent = artistData.name;
    modal.querySelector('.modal-image').src = artistData.image;
    modal.querySelector('.modal-image').alt = artistData.name;
    modal.querySelector('.modal-period').textContent = artistData.period;
    modal.querySelector('.modal-description').textContent = artistData.description;
    modal.querySelector('.modal-biography').innerHTML = artistData.biography;
    modal.querySelector('.modal-works').innerHTML = artistData.works;
    modal.querySelector('.modal-quotes').innerHTML = artistData.quotes;
}

function closeArtistModal() {
    const modal = document.getElementById('artistModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function getArtistData(artistId) {
    const artistsData = {
        warhol: {
            name: 'ANDY WARHOL',
            period: '1928 - 1987',
            image: 'imagenes/warhol.jpg',
            description: 'El Rey del Pop Art - Artista estadounidense que transformó la cultura popular en arte.',
            biography: `
                <h3>Biografía</h3>
                <p>Andrew Warhola nació en Pittsburgh, Pennsylvania, en una familia de inmigrantes eslovacos. 
                Estudió arte comercial en el Carnegie Institute of Technology y se mudó a Nueva York en 1949.</p>
                <p>En los años 60, Warhol revolucionó el arte con su Factory Studio, donde producía arte en masa 
                usando técnicas de serigrafía. Su obra cuestionaba la distinción entre arte y comercio.</p>
                <p>Fue una figura central en la escena artística de Nueva York y trabajó con música, cine y literatura, 
                siendo pionero en el arte multimedia.</p>
            `,
            works: `
                <h3>Obras Famosas</h3>
                <ul>
                    <li><strong>Campbell's Soup Cans</strong> (1962) - Serie de 32 latas de sopa</li>
                    <li><strong>Marilyn Monroe</strong> (1962) - Serigrafías de la actriz</li>
                    <li><strong>Brillo Box</strong> (1964) - Esculturas de cajas de jabón</li>
                    <li><strong>Elvis Presley</strong> (1963) - Serigrafías del cantante</li>
                    <li><strong>Mao</strong> (1972) - Retrato del líder chino</li>
                </ul>
            `,
            quotes: `
                <h3>Frases Célebres</h3>
                <blockquote>"En el futuro, todos serán famosos por 15 minutos."</blockquote>
                <blockquote>"El arte es lo que puedes salirte con la tuya."</blockquote>
                <blockquote>"La idea no es vivir para siempre, es crear algo que sí lo haga."</blockquote>
            `
        },
        lichtenstein: {
            name: 'ROY LICHTENSTEIN',
            period: '1923 - 1997',
            image: 'imagenes/lichtenstein.jpg',
            description: 'Maestro de los Cómics - Pionero en el uso de técnicas de impresión comercial.',
            biography: `
                <h3>Biografía</h3>
                <p>Roy Lichtenstein nació en Nueva York y estudió arte en la Universidad Estatal de Ohio. 
                Comenzó su carrera como artista abstracto antes de volverse hacia el Pop Art.</p>
                <p>En 1961, comenzó a usar imágenes de cómics y anuncios publicitarios, desarrollando su 
                estilo característico con puntos Ben-Day y líneas negras gruesas.</p>
                <p>Su trabajo elevó las imágenes comerciales al nivel de arte de galería, cuestionando 
                las jerarquías tradicionales del arte.</p>
            `,
            works: `
                <h3>Obras Famosas</h3>
                <ul>
                    <li><strong>Whaam!</strong> (1963) - Pintura de cómic de guerra</li>
                    <li><strong>Drowning Girl</strong> (1963) - Mujer ahogándose</li>
                    <li><strong>Look Mickey</strong> (1961) - Primera obra Pop Art</li>
                    <li><strong>Ohhh... Alright...</strong> (1964) - Mujer en llamada telefónica</li>
                    <li><strong>Brushstrokes</strong> (1965) - Parodia del expresionismo abstracto</li>
                </ul>
            `,
            quotes: `
                <h3>Frases Célebres</h3>
                <blockquote>"El arte trata de la comunicación, y la comunicación implica comprensión."</blockquote>
                <blockquote>"Creo que mi trabajo es diferente al cómic, pero no podría haber existido sin el cómic."</blockquote>
            `
        },
        hockney: {
            name: 'DAVID HOCKNEY',
            period: '1937 - Presente',
            image: 'imagenes/hockney.jpg',
            description: 'Pionero Digital - Artista británico que exploró nuevas tecnologías y técnicas.',
            biography: `
                <h3>Biografía</h3>
                <p>David Hockney nació en Bradford, Inglaterra, y estudió en el Royal College of Art de Londres. 
                Se mudó a California en la década de 1960, donde desarrolló su estilo característico.</p>
                <p>Conocido por sus pinturas de piscinas y paisajes californianos, Hockney ha experimentado 
                constantemente con nuevas técnicas, incluyendo fotografía, video y arte digital.</p>
                <p>En los años 2000, comenzó a crear arte digital usando iPads y iPhones, siendo pionero 
                en el uso de tecnología móvil para crear arte serio.</p>
            `,
            works: `
                <h3>Obras Famosas</h3>
                <ul>
                    <li><strong>A Bigger Splash</strong> (1967) - Pintura de piscina icónica</li>
                    <li><strong>Mr and Mrs Clark and Percy</strong> (1970-71) - Retrato doble</li>
                    <li><strong>Portrait of an Artist</strong> (1972) - Piscina con dos figuras</li>
                    <li><strong>Pearblossom Hwy</strong> (1986) - Collage fotográfico</li>
                    <li><strong>iPad Drawings</strong> (2010-presente) - Arte digital</li>
                </ul>
            `,
            quotes: `
                <h3>Frases Célebres</h3>
                <blockquote>"El arte es sobre la vida, y el arte digital es sobre la vida digital."</blockquote>
                <blockquote>"La fotografía es todo recto, pero la vida no es recta."</blockquote>
            `
        },
        rosenquist: {
            name: 'JAMES ROSENQUIST',
            period: '1933 - 2017',
            image: 'imagenes/rosenquist.jpg',
            description: 'Maestro del Collage - Conocido por sus pinturas monumentales que combinan imágenes publicitarias.',
            biography: `
                <h3>Biografía</h3>
                <p>James Rosenquist nació en Grand Forks, Dakota del Norte, y estudió arte en la Universidad de Minnesota. 
                Trabajó como pintor de carteles publicitarios antes de dedicarse al arte de galería.</p>
                <p>Su experiencia en publicidad influenció profundamente su arte, creando obras que combinaban 
                fragmentos de imágenes comerciales en composiciones monumentales.</p>
                <p>Sus pinturas a gran escala exploraban temas de consumo, política y cultura de masas, 
                siendo precursoras del arte conceptual.</p>
            `,
            works: `
                <h3>Obras Famosas</h3>
                <ul>
                    <li><strong>F-111</strong> (1964-65) - Pintura de 26 metros</li>
                    <li><strong>President Elect</strong> (1960-61) - Collage de Kennedy</li>
                    <li><strong>I Love You with My Ford</strong> (1961) - Automóvil y romance</li>
                    <li><strong>The Swimmer in the Econo-mist</strong> (1997-98) - Economía y natación</li>
                </ul>
            `,
            quotes: `
                <h3>Frases Célebres</h3>
                <blockquote>"Quiero que mi arte sea tan grande como la publicidad."</blockquote>
                <blockquote>"La publicidad es el arte de nuestro tiempo."</blockquote>
            `
        },
        johns: {
            name: 'JASPER JOHNS',
            period: '1930 - Presente',
            image: 'imagenes/johns.jpg',
            description: 'Símbolos Americanos - Artista que transformó símbolos cotidianos en obras de arte icónicas.',
            biography: `
                <h3>Biografía</h3>
                <p>Jasper Johns nació en Augusta, Georgia, y estudió brevemente en la Universidad de Carolina del Sur. 
                Se mudó a Nueva York en 1952, donde conoció a Robert Rauschenberg.</p>
                <p>Su obra se centra en la representación de objetos y símbolos familiares, como banderas, 
                números y mapas, cuestionando la naturaleza de la representación artística.</p>
                <p>Johns es considerado un puente entre el expresionismo abstracto y el Pop Art, 
                influenciando profundamente el desarrollo del arte conceptual.</p>
            `,
            works: `
                <h3>Obras Famosas</h3>
                <ul>
                    <li><strong>Flag</strong> (1954-55) - Primera pintura de bandera</li>
                    <li><strong>Target with Four Faces</strong> (1955) - Blanco sobre blanco</li>
                    <li><strong>Numbers</strong> (1955) - Serie de números</li>
                    <li><strong>Map</strong> (1961) - Mapa de Estados Unidos</li>
                    <li><strong>Three Flags</strong> (1958) - Tres banderas superpuestas</li>
                </ul>
            `,
            quotes: `
                <h3>Frases Célebres</h3>
                <blockquote>"Hacer algo es hacer algo más."</blockquote>
                <blockquote>"El arte es sobre la vida, no sobre el arte."</blockquote>
            `
        },
        wesselmann: {
            name: 'TOM WESSELMANN',
            period: '1931 - 2004',
            image: 'imagenes/wesselmann.jpg',
            description: 'Arte y Publicidad - Conocido por sus "Great American Nudes" y fusión de arte y publicidad.',
            biography: `
                <h3>Biografía</h3>
                <p>Tom Wesselmann nació en Cincinnati, Ohio, y estudió psicología antes de dedicarse al arte. 
                Se mudó a Nueva York en 1956, donde comenzó a crear arte Pop.</p>
                <p>Su serie "Great American Nudes" combinaba imágenes de mujeres con objetos cotidianos, 
                creando una estética distintiva que mezclaba erotismo y consumo.</p>
                <p>Wesselmann también experimentó con collage, escultura y arte multimedia, 
                siendo uno de los artistas Pop más versátiles.</p>
            `,
            works: `
                <h3>Obras Famosas</h3>
                <ul>
                    <li><strong>Great American Nude #57</strong> (1964) - Serie de desnudos</li>
                    <li><strong>Still Life #30</strong> (1963) - Naturaleza muerta</li>
                    <li><strong>Bedroom Painting #10</strong> (1967) - Dormitorio</li>
                    <li><strong>Seascape</strong> (1967) - Paisaje marino</li>
                </ul>
            `,
            quotes: `
                <h3>Frases Célebres</h3>
                <blockquote>"Quiero que mi arte sea tan directo como la publicidad."</blockquote>
                <blockquote>"El arte debe ser tan claro como un anuncio."</blockquote>
            `
        }
    };
    
    return artistsData[artistId] || null;
}

// FUNCIONALIDAD PARA VER IMÁGENES EN GRANDE
function openImageModal(imageSrc, imageAlt) {
    // Crear modal de imagen si no existe
    let imageModal = document.getElementById('imageModal');
    if (!imageModal) {
        imageModal = createImageModal();
    }
    
    // Configurar la imagen
    const modalImage = imageModal.querySelector('.modal-image-large');
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    
    // Mostrar el modal
    imageModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function createImageModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    
    modal.innerHTML = `
        <div class="image-modal-content">
            <button class="image-modal-close" onclick="closeImageModal()">&times;</button>
            <img class="modal-image-large" src="" alt="">
            <div class="image-modal-caption"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Agregar event listeners a las imágenes de artistas
document.addEventListener('DOMContentLoaded', function() {
    // Para las imágenes en las tarjetas de artistas
    const artistaImages = document.querySelectorAll('.artista-image');
    artistaImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const artistName = this.closest('.artista-card').querySelector('.artista-name').textContent;
            openImageModal(this.src, artistName);
        });
    });
    
    // Para las imágenes en el modal de biografías
    const modalImages = document.querySelectorAll('.modal-image');
    modalImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const artistName = document.querySelector('.modal-title').textContent;
            openImageModal(this.src, artistName);
        });
    });
});

// Cerrar modal de imagen al hacer clic fuera
document.addEventListener('click', function(event) {
    const imageModal = document.getElementById('imageModal');
    if (imageModal && event.target === imageModal) {
        closeImageModal();
    }
});

// Cerrar modal de imagen con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});
