document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('fileInput').addEventListener('change', function (event) {
        const files = event.target.files;
        const folders = {
            images: document.querySelector('.folder[data-folder="images"] .folder-content'),
            videos: document.querySelector('.folder[data-folder="videos"] .folder-content'),
            audio: document.querySelector('.folder[data-folder="audio"] .folder-content'),
            others: document.querySelector('.folder[data-folder="others"] .folder-content'),
        };

        // Очищаем все папки перед загрузкой новых файлов
        Object.values(folders).forEach(folder => folder.innerHTML = '');

        Array.from(files).forEach(file => {
            const container = document.createElement('div');
            container.className = 'media-container';

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.alt = file.name;
                img.title = file.name;
                img.onload = () => URL.revokeObjectURL(img.src);  // Clean up URL
                container.appendChild(img);
                folders.images.appendChild(container);  // Добавляем в папку "Images"
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.alt = file.name;
                video.title = file.name;
                video.controls = true;
                container.appendChild(video);
                folders.videos.appendChild(container);  // Добавляем в папку "Videos"
            } else if (file.type.startsWith('audio/')) {
                const audio = document.createElement('audio');
                audio.src = URL.createObjectURL(file);
                audio.alt = file.name;
                audio.title = file.name;
                audio.controls = true;
                container.appendChild(audio);
                folders.audio.appendChild(container);  // Добавляем в папку "Audio"
            } else {
                const icon = document.createElement('div');
                icon.className = 'file-icon';
                icon.innerHTML = '📄';  // Иконка для остальных файлов
                container.appendChild(icon);
                folders.others.appendChild(container);  // Добавляем в папку "Others"
            }

            const caption = document.createElement('div');
            caption.className = 'caption';
            caption.textContent = file.name;

            container.appendChild(caption);
        });
    });
});
