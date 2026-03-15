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

// Interactive Paper Mouse Effect
document.addEventListener('mousemove', (e) => {
    const doodles = document.querySelectorAll('.doodle, .menu-bg-doodle');
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    
    doodles.forEach((doodle, index) => {
        const factor = (index % 5 + 1) * 10;
        const rotate = x * 15;
        doodle.style.transform = `translate(${x * factor}px, ${y * factor}px) rotate(${rotate}deg)`;
    });
});

// Smooth reveal on load
window.addEventListener('load', () => {
    reveal();
    document.querySelector('.hero-content').style.opacity = "1";
    document.querySelector('.hero-content').style.transform = "translateY(0)";
});
