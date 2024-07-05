// Select the main play/pause button
const mainPlayPauseBtn = document.getElementById('play-pause-btn');
// Select the default audio
const defaultAudio = document.getElementById('default-song');
// Set the currentAudio to defaultAudio
let currentAudio = defaultAudio;

// Function to update the player with default song details
function setDefaultSongDetails() {
    updatePlayer('Beautiful Things', 'Benson Boone', '00:00'); // Update these details as per your default song
}

// Call the function to set initial details
setDefaultSongDetails();

// Play/Pause functionality for the main play button
mainPlayPauseBtn.addEventListener('click', function () {
    if (currentAudio.paused) {
        currentAudio.play();
        mainPlayPauseBtn.classList.remove('bx-right-arrow');
        mainPlayPauseBtn.classList.add('bx-pause');
        animateProgress();
    } else {
        currentAudio.pause();
        mainPlayPauseBtn.classList.remove('bx-pause');
        mainPlayPauseBtn.classList.add('bx-right-arrow');
    }
});

// Play buttons functionality for the song list
const playButtons = document.querySelectorAll('.play-btn');

playButtons.forEach(button => {
    button.addEventListener('click', function () {
        const songId = this.getAttribute('data-song');
        const audio = document.getElementById(songId);
        const item = this.closest('.item');
        const title = item.getAttribute('data-title');
        const artist = item.getAttribute('data-artist');
        const duration = item.getAttribute('data-duration');

        // Pause the current audio if a different song is selected
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            const currentBtn = document.querySelector(`.play-btn[data-song="${currentAudio.id}"]`);
            if (currentBtn) {
                currentBtn.classList.remove('bx-pause');
                currentBtn.classList.add('bx-right-arrow');
            }
        }

        if (audio.paused) {
            audio.play();
            button.classList.remove('bx-right-arrow');
            button.classList.add('bx-pause');
            updatePlayer(title, artist, duration);
            mainPlayPauseBtn.classList.remove('bx-right-arrow');
            mainPlayPauseBtn.classList.add('bx-pause');
            animateProgress();
        } else {
            audio.pause();
            button.classList.remove('bx-pause');
            button.classList.add('bx-right-arrow');
            mainPlayPauseBtn.classList.remove('bx-pause');
            mainPlayPauseBtn.classList.add('bx-right-arrow');
        }

        currentAudio = audio;
    });
});

function updatePlayer(title, artist, duration) {
    const songInfo = document.querySelector('.song-info');
    const songTitle = songInfo.querySelector('h3');
    const songArtist = songInfo.querySelector('h5');
    const songDuration = songInfo.querySelector('.progress p:first-child');

    songTitle.textContent = title;
    songArtist.textContent = artist;
    songDuration.textContent = duration;

    // Update the song image
    const songImage = songInfo.querySelector('img');
    const playingItem = document.querySelector(`.item[data-title="${title}"]`);
    const playingImage = playingItem ? playingItem.querySelector('img').src : 'assets/player.png'; // Default image if playingItem is not found
    songImage.src = playingImage;
}

function animateProgress() {
    const progressBar = document.querySelector('.progress .active-line');
    const duration = currentAudio.duration;

    setInterval(() => {
        const currentTime = currentAudio.currentTime;
        const progress = (currentTime / duration) * 100;
        progressBar.style.width = `${progress}%`;
    }, 1000); // Update the progress bar every second
}
