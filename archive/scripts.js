document.addEventListener('DOMContentLoaded', function() {
    const correctPassword = '1234'; // Set your password here
    const password = prompt('Please enter the password:');
    
    if (password !== correctPassword) {
        document.body.innerHTML = '<h1>Access Denied</h1>';
        return;
    }

    document.getElementById('themeToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    document.getElementById('uploadFiles').addEventListener('click', function() {
        window.location.href = 'https://mega.nz/filerequest/pb3UGwgD7MI';
    });

    document.getElementById('openArchive').addEventListener('click', function() {
        window.location.href = '/archive';
    });

    fetch('/archive.json')
        .then(response => response.json())
        .then(data => displayGallery(data))
        .catch(error => console.error('Error loading archive:', error));
});

function displayGallery(files) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';  // Clear the gallery

    files.forEach(file => {
        const container = document.createElement('div');
        container.className = 'media-container';

        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = file.url;
            img.alt = file.name;
            img.title = file.name;
            img.addEventListener('click', () => openLightbox(file.url, file.name, 'image'));
            container.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = file.url;
            video.alt = file.name;
            video.title = file.name;
            video.controls = true;
            container.appendChild(video);
        } else if (file.type.startsWith('audio/')) {
            const audio = document.createElement('audio');
            audio.src = file.url;
            audio.alt = file.name;
            audio.title = file.name;
            audio.controls = true;
            container.appendChild(audio);
        } else {
            const icon = document.createElement('div');
            icon.className = 'file-icon';
            icon.innerHTML = '📄';  // Default icon for unsupported files
            container.appendChild(icon);
        }

        const caption = document.createElement('div');
        caption.className = 'caption';
        caption.textContent = file.name;

        container.appendChild(caption);
        gallery.appendChild(container);
    });
}

function openLightbox(src, caption, type) {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxContent.innerHTML = ''; // Clear lightbox content

    if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.alt = caption;
        lightboxContent.appendChild(img);
    } else if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.alt = caption;
        video.controls = true;
        lightboxContent.appendChild(video);
    } else if (type === 'audio') {
        const audio = document.createElement('audio');
        audio.src = src;
        audio.alt = caption;
        audio.controls = true;
        lightboxContent.appendChild(audio);
    }

    lightboxCaption.textContent = caption;
    lightbox.classList.remove('hidden');
}

document.getElementById('close').addEventListener('click', () => {
    document.getElementById('lightbox').classList.add('hidden');
});
