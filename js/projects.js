// Project card toggle functionality
function toggleProject(header) {
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.project-toggle');
    
    content.classList.toggle('show');
    toggle.textContent = content.classList.contains('show') ? 'Hide Details ▲' : 'View Details ▼';
}
