
    const songs = [
    {
        title: "Iradayy",
        artist: "Abdul Hanan",
        src: "assets/songs/song1.mp3",
        cover: "assets/images/cover2.jfif"
    },
    {
        title: "ATTRACTION",
        artist: "Sukha",
        src: "assets/songs/song2.mp3",
        cover: "assets/images/cover3.webp"
    },
    {
        title: "Lalkaraa",
        artist: "Diljit Dosanjh",
        src: "assets/songs/song3.mp3",
        cover: "assets/images/cover1.webp"
    }
];


let currentSong = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

const cover = document.getElementById("cover");

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.src = song.cover; // This line changes image per song
}

function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener("click", () => {
    currentSong--;
    if (currentSong < 0) currentSong = songs.length - 1;
    loadSong(songs[currentSong]);
    playSong();
});

nextBtn.addEventListener("click", () => {
    currentSong++;
    if (currentSong >= songs.length) currentSong = 0;
    loadSong(songs[currentSong]);
    playSong();
});

audio.addEventListener("timeupdate", () => {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    let durationMin = Math.floor(duration / 60) || 0;
    let durationSec = Math.floor(duration % 60) || 0;
    if (durationSec < 10) durationSec = "0" + durationSec;

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) currentSec = "0" + currentSec;

    durationEl.textContent = `${durationMin}:${durationSec}`;
    currentTimeEl.textContent = `${currentMin}:${currentSec}`;
});

progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

function loadPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener("click", () => {
            currentSong = index;
            loadSong(songs[currentSong]);
            playSong();
        });
        playlistEl.appendChild(li);
    });
}

audio.addEventListener("ended", () => {
    nextBtn.click();
});

loadSong(songs[currentSong]);
loadPlaylist();