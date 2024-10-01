document.addEventListener('DOMContentLoaded', function() {
    const correctPassword = '1234'; // Set your password here
    const password = prompt('Please enter the password:');
    
    if (password !== correctPassword) {
        document.body.innerHTML = '<h1>Access Denied</h1>';
        return;
    }

    document.getElementById('fileInput').addEventListener('change', function(event) {
        const items = event.target.files;
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = ''; 

        Array.from(items).forEach(item => {
            const container = document.createElement('div');
            container.className = 'media-container';

            if (item.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(item);
                img.alt = item.name;
                img.title = item.name;
                img.addEventListener('click', () => openLightbox(img.src, item.name, 'image'));
                img.onload = () => URL.revokeObjectURL(img.src); // Clean up URL
                container.appendChild(img);
            } else if (item.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(item);
                video.alt = item.name;
                video.title = item.name;
                video.controls = true;
                container.appendChild(video);
            } else if (item.type.startsWith('audio/')) {
                const audio = document.createElement('audio');
                audio.src = URL.createObjectURL(item);
                audio.alt = item.name;
                audio.title = item.name;
                audio.controls = true;
                container.appendChild(audio);
            }

            const caption = document.createElement('div');
            caption.className = 'caption';
            caption.textContent = item.name;

            container.appendChild(caption);
            gallery.appendChild(container);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fileInput').addEventListener('change', function(event) {
        const files = event.target.files;
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';  // Clear the gallery

        Array.from(files).forEach(file => {
            const container = document.createElement('div');
            container.className = 'media-container';

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.alt = file.name;
                img.title = file.name;
                img.addEventListener('click', () => openLightbox(img.src, file.name, 'image'));
                img.onload = () => URL.revokeObjectURL(img.src);  // Clean up URL
                container.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.alt = file.name;
                video.title = file.name;
                video.controls = true;
                container.appendChild(video);
            } else if (file.type.startsWith('audio/')) {
                const audio = document.createElement('audio');
                audio.src = URL.createObjectURL(file);
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
    });

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

    document.getElementById('themeToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    document.getElementById('uploadFiles').addEventListener('click', function() {
        window.location.href = 'https://mega.nz/filerequest/pb3UGwgD7MI';
    });
});
