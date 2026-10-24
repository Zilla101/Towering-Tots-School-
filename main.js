// Reveal sections on scroll
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = 'auto';
    });
});

// Smooth reveal on load
window.addEventListener('load', () => {
    reveal();
    document.querySelector('.hero-content').style.opacity = "1";
    document.querySelector('.hero-content').style.transform = "translateY(0)";
});


// Interactive Polaroid Gallery Stack with Collision Avoidance & Dynamic Dot Pop
const galleryStack = document.getElementById('galleryStack');
const stackCards = document.querySelectorAll('.gallery-stack-card');
const stackDots = document.querySelectorAll('.stack-dot');
const prevBtn = document.getElementById('stackPrevBtn');
const nextBtn = document.getElementById('stackNextBtn');

let currentActiveIndex = 0;
let isUserProgrammaticScroll = false;
let scrollEndTimer = null;

function updateDotOnly(index) {
    if (index < 0 || index >= stackDots.length) return;
    stackDots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
    });
}

function setActiveCard(index, shouldScroll = true) {
    if (index < 0 || index >= stackCards.length) return;
    currentActiveIndex = index;

    if (galleryStack) galleryStack.classList.add('has-active');

    // Ensure ONLY the active card is raised; all others drop back
    stackCards.forEach((card, i) => {
        card.classList.toggle('is-active', i === index);
    });

    updateDotOnly(index);

    if (shouldScroll && galleryStack && window.innerWidth <= 768) {
        const card = stackCards[index];
        if (card) {
            isUserProgrammaticScroll = true;
            const targetLeft = card.offsetLeft - (galleryStack.clientWidth / 2) + (card.clientWidth / 2);
            galleryStack.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
            setTimeout(() => {
                isUserProgrammaticScroll = false;
            }, 450);
        }
    }
}

function clearActiveCard() {
    currentActiveIndex = -1;
    if (galleryStack) galleryStack.classList.remove('has-active');
    stackCards.forEach(card => card.classList.remove('is-active'));
}

function getCenteredCardIndex() {
    if (!galleryStack || stackCards.length === 0) return 0;
    const stackCenter = galleryStack.scrollLeft + (galleryStack.clientWidth / 2);
    let closestIndex = 0;
    let minDistance = Infinity;

    stackCards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
        const distance = Math.abs(stackCenter - cardCenter);
        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });
    return closestIndex;
}

if (stackCards.length > 0) {
    // Real-time dot pop when swiping/scrolling through carousel on touch or trackpad
    if (galleryStack) {
        galleryStack.addEventListener('scroll', () => {
            if (isUserProgrammaticScroll) return;

            window.requestAnimationFrame(() => {
                const centeredIndex = getCenteredCardIndex();
                updateDotOnly(centeredIndex);
            });

            clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(() => {
                if (!isUserProgrammaticScroll) {
                    const finalIndex = getCenteredCardIndex();
                    setActiveCard(finalIndex, false);
                }
            }, 100);
        }, { passive: true });
    }

    // Card interactions
    stackCards.forEach((card, index) => {
        // When hovered, ensure any other card drops back immediately
        card.addEventListener('mouseenter', () => {
            stackCards.forEach((c, i) => {
                if (i !== index) c.classList.remove('is-active');
            });
            card.classList.add('is-active');
            currentActiveIndex = index;
            updateDotOnly(index);
        });

        // Click / tap
        card.addEventListener('click', (e) => {
            if (e.target.closest('.stack-album-btn')) return;

            if (currentActiveIndex === index && card.classList.contains('is-active')) {
                clearActiveCard();
            } else {
                setActiveCard(index, true);
            }
        });

        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.closest('.stack-album-btn')) return;
                e.preventDefault();
                if (currentActiveIndex === index && card.classList.contains('is-active')) {
                    clearActiveCard();
                } else {
                    setActiveCard(index, true);
                }
            }
        });
    });

    if (galleryStack) {
        // When leaving the stack on desktop, drop cards back cleanly
        galleryStack.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                clearActiveCard();
            }
        });
    }

    // Prev & Next Buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let nextIndex = (currentActiveIndex <= 0 ? stackCards.length : currentActiveIndex) - 1;
            setActiveCard(nextIndex, true);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentActiveIndex + 1) % stackCards.length;
            setActiveCard(nextIndex, true);
        });
    }

    // Direct dot navigation
    stackDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setActiveCard(index, true);
        });
    });

    // Close active card when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.gallery-stack-container') && !e.target.closest('.gallery-stack-indicators')) {
            clearActiveCard();
        }
    });
}