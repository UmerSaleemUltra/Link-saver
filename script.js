document.addEventListener("DOMContentLoaded", function() {
    const linkForm = document.getElementById('linkForm');
    const linkInput = document.getElementById('linkInput');
    const linkList = document.getElementById('linkList');

    // Load links from session storage when the page loads
    loadLinks();

    linkForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const url = linkInput.value.trim();
        if (url !== '') {
            addLink(url);
            linkInput.value = '';
            saveLinks(); // Save links to session storage after adding a new link
        }
    });

    linkList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-link')) {
            removeLink(event.target.parentElement);
            saveLinks(); // Save links to session storage after removing a link
        }
    });

    function addLink(url) {
        const linkItem = document.createElement('div');
        linkItem.classList.add('bg-white', 'rounded', 'p-2', 'mb-2', 'flex', 'justify-between', 'items-center');
        linkItem.innerHTML = `
            <a href="${url}" class="text-blue-500">${url}</a>
            <button class="text-red-500 remove-link">Remove</button>
        `;
        linkList.appendChild(linkItem);
    }

    function removeLink(linkItem) {
        linkList.removeChild(linkItem);
    }

    function saveLinks() {
        // Get all link URLs from linkList and save them to session storage
        const links = Array.from(linkList.querySelectorAll('a')).map(link => link.href);
        sessionStorage.setItem('savedLinks', JSON.stringify(links));
    }

    function loadLinks() {
        // Load links from session storage and add them to the linkList
        const savedLinks = JSON.parse(sessionStorage.getItem('savedLinks')) || [];
        savedLinks.forEach(link => addLink(link));
    }
});
