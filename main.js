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

// Interactive Paper Mouse Effect
document.addEventListener('mousemove', (e) => {
    const doodles = document.querySelectorAll('.doodle');
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    
    doodles.forEach((doodle, index) => {
        const factor = (index + 1) * 15;
        const rotate = x * 10;
        doodle.style.transform = `translate(${x * factor}px, ${y * factor}px) rotate(${rotate}deg)`;
    });
});

// Smooth reveal on load
window.addEventListener('load', () => {
    reveal();
    document.querySelector('.hero-content').style.opacity = "1";
    document.querySelector('.hero-content').style.transform = "translateY(0)";
});
