/*
 * Latest Updates Chips
 *
 * Displays dismissible notification chips in the hero section.
 * Clicking a chip smooth-scrolls to the relevant section.
 *
 * HOW TO EDIT:
 *   FEATURED_PROJECTS — scrollTo: ID of the element to scroll to
 *   LATEST_BLOG       — scrollTo: ID of the element to scroll to
 *
 * DISMISS BEHAVIOR:
 *   - Users can close each chip via the X button; stored in localStorage.
 *   - Changing scrollTo automatically resets dismissed state.
 *   - Each chip type has its own dismiss state.
 */
var FEATURED_PROJECTS = {
    scrollTo: "projects",
    highlight: [
        "project-dbt-salesforce-formula-toolkit",
        "project-async-snowflake-connector-python"
    ]
};

var LATEST_BLOG = {
    scrollTo: "project-dbt-unit-test-best-practice"
};

function dismissChip(container, key) {
    localStorage.setItem(key, '1');
    container.classList.add('hiding');
    container.addEventListener('animationend', function() { container.remove(); });
}

function scrollToTarget(id, highlightIds) {
    var el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    var targets;
    if (highlightIds && highlightIds.length) {
        targets = highlightIds.map(function(hid) { return document.getElementById(hid); }).filter(Boolean);
    } else {
        targets = [el];
    }
    targets.forEach(function(t) {
        t.classList.add('chip-highlight');
        setTimeout(function() { t.classList.remove('chip-highlight'); }, 3000);
    });
}

function renderProjectsChip() {
    var container = document.getElementById('updates-chip');
    if (!container) return;

    var dismissKey = 'update-dismissed-projects-' + FEATURED_PROJECTS.scrollTo;
    if (localStorage.getItem(dismissKey)) {
        container.remove();
        return;
    }

    container.innerHTML =
        '<div class="update-chip-inner">' +
            '<span class="update-chip-icon"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></span>' +
            '<span class="update-chip-badge">New</span>' +
            '<span class="update-chip-label">Check out my latest projects</span>' +
            '<button class="update-chip-close" aria-label="Dismiss update">' +
                '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>' +
            '</button>' +
        '</div>';

    container.classList.add('visible');

    container.querySelector('.update-chip-inner').addEventListener('click', function(e) {
        if (e.target.closest('.update-chip-close')) return;
        scrollToTarget(FEATURED_PROJECTS.scrollTo, FEATURED_PROJECTS.highlight);
    });

    container.querySelector('.update-chip-close').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dismissChip(container, dismissKey);
    });
}

function renderBlogChip() {
    var container = document.getElementById('updates-chip-blog');
    if (!container) return;

    var dismissKey = 'update-dismissed-blog-' + LATEST_BLOG.scrollTo;
    if (localStorage.getItem(dismissKey)) {
        container.remove();
        return;
    }

    container.innerHTML =
        '<div class="update-chip-inner">' +
            '<span class="update-chip-icon"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></span>' +
            '<span class="update-chip-badge update-chip-badge--blog">Blog</span>' +
            '<span class="update-chip-label">Read my latest article</span>' +
            '<button class="update-chip-close" aria-label="Dismiss update">' +
                '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>' +
            '</button>' +
        '</div>';

    container.classList.add('visible');

    container.querySelector('.update-chip-inner').addEventListener('click', function(e) {
        if (e.target.closest('.update-chip-close')) return;
        scrollToTarget(LATEST_BLOG.scrollTo);
    });

    container.querySelector('.update-chip-close').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dismissChip(container, dismissKey);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderProjectsChip();
    renderBlogChip();
});
