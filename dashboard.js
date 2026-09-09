document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const desktopToggle = document.getElementById('desktopToggle');
    const mobileToggle = document.getElementById('mobileToggle');
    const backdrop = document.getElementById('sidebarBackdrop');

    // Desktop Toggle
    desktopToggle.addEventListener('click', () => {
        if (window.innerWidth > 1024) {
            sidebar.classList.toggle('collapsed');
            sidebar.classList.toggle('expanded');
        } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
            sidebar.classList.toggle('force-expand');
        }
    });

    // Mobile Toggle
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.add('mobile-open');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    // Close Mobile Drawer
    const closeMobileSidebar = () => {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    };

    backdrop.addEventListener('click', closeMobileSidebar);

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            if (window.innerWidth <= 768) {
                closeMobileSidebar();
            }
        });
    });
});
