let isPlaying = false;
const audio = document.getElementById("takbeer-audio");

// Toggle Audio
function toggleAudio() {
  const audioIcon = document.getElementById("audio-icon");
  const audioText = document.getElementById("audio-text");

  if (isPlaying) {
    audio.pause();
    audioIcon.textContent = "🔊";
    audioText.textContent = "Play Takbeer";
    isPlaying = false;
  } else {
    audio
      .play()
      .then(() => {
        audioIcon.textContent = "⏸️";
        audioText.textContent = "Pause Takbeer";
        isPlaying = true;
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
        alert("Audio playback failed. Please try again.");
      });
  }
}

// Audio event listener
audio.addEventListener("ended", () => {
  document.getElementById("audio-icon").textContent = "🔊";
  document.getElementById("audio-text").textContent = "Play Takbeer";
  isPlaying = false;
});
