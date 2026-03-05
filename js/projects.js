const drawer = document.getElementById('project-drawer');
const backdrop = document.getElementById('drawer-backdrop');
const drawerTitle = document.getElementById('drawer-title');
const drawerBody = document.getElementById('drawer-body');
const drawerClose = document.getElementById('drawer-close');

function openDrawer(header) {
    const title = header.querySelector('.project-title').textContent;
    const content = header.nextElementSibling;

    drawerTitle.textContent = title;
    drawerBody.innerHTML = content.innerHTML;
    drawerBody.scrollTop = 0;

    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
}

function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
}

backdrop.addEventListener('click', closeDrawer);
drawerClose.addEventListener('click', closeDrawer);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
    }
});

drawer.addEventListener('wheel', function(e) {
    var el = drawerBody;
    var atTop = el.scrollTop === 0 && e.deltaY < 0;
    var atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0;
    if (atTop || atBottom) {
        e.preventDefault();
    }
}, { passive: false });
