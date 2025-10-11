/**
 * AiThinkWise Clean URL Handler
 * Handles clean URLs without .html extension for GitHub Pages
 */

(function() {
    'use strict';
    
    // Clean URL configuration
    const cleanUrls = {
        'services': 'services.html',
        'why-choose-us': 'why-choose-us.html',
        'contact': 'contact.html',
        'get-started': 'get-started.html',
        'thank-you': 'thank-you.html',
        'digital-services': 'digital-services.html',
        'qr-scan': 'qr-scan.html',
        'ads-template': 'ads-template.html'
    };
    
    // Get current path without leading slash
    function getCurrentPath() {
        return window.location.pathname.replace(/^\//, '');
    }
    
    // Check if current URL needs to be cleaned
    function handleCleanUrl() {
        const currentPath = getCurrentPath();
        
        // If we're on a clean URL (no .html), redirect to the actual file
        if (currentPath && cleanUrls[currentPath] && !currentPath.includes('.')) {
            // Only redirect if we're not already on the .html version
            if (!window.location.href.includes('.html')) {
                window.location.replace('/' + cleanUrls[currentPath]);
                return;
            }
        }
        
        // If we're on a .html URL, update the browser URL to clean version
        if (currentPath.endsWith('.html')) {
            const cleanPath = currentPath.replace('.html', '');
            if (cleanUrls[cleanPath]) {
                // Update URL without page reload
                const newUrl = window.location.origin + '/' + cleanPath;
                window.history.replaceState({}, '', newUrl);
            }
        }
    }
    
    // Handle navigation links to use clean URLs
    function updateNavigationLinks() {
        const links = document.querySelectorAll('a[href$=".html"]');
        
        links.forEach(function(link) {
            const href = link.getAttribute('href');
            const cleanHref = href.replace('.html', '');
            
            // Update href to clean URL
            link.setAttribute('href', cleanHref);
            
            // Add click handler to ensure proper navigation
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = href; // Navigate to actual .html file
            });
        });
    }
    
    // Initialize clean URL handling
    function init() {
        // Handle current URL
        handleCleanUrl();
        
        // Update navigation links
        updateNavigationLinks();
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', function() {
            handleCleanUrl();
        });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export for potential external use
    window.AiThinkWiseCleanUrls = {
        handleCleanUrl: handleCleanUrl,
        updateNavigationLinks: updateNavigationLinks
    };
    
})();
