let surahs = [];
let currentVerseAudio = null;
let isVerseAudioPlaying = false;

// Load Surah list
async function loadSurahs() {
  try {
    const response = await fetch("https://api.alquran.cloud/v1/surah");
    const data = await response.json();

    if (data.code === 200) {
      surahs = data.data;
      populateSurahDropdown();
    }
  } catch (error) {
    console.error("Error loading surahs:", error);
  }
}

// Populate Surah dropdown
function populateSurahDropdown() {
  const select = document.getElementById("surah-select");
  select.innerHTML = '<option value="">Select Surah...</option>';

  surahs.forEach((surah) => {
    const option = document.createElement("option");
    option.value = surah.number;
    option.textContent = `${surah.number}. ${surah.englishName} (${surah.name})`;
    select.appendChild(option);
  });
}

// Search for specific verse
async function searchVerse() {
  const surahNumber = document.getElementById("surah-select").value;
  const ayahNumber = document.getElementById("ayah-number").value;

  if (!surahNumber || !ayahNumber) {
    alert("Please select a Surah and enter an Ayah number");
    return;
  }

  await loadVerse(parseInt(surahNumber), parseInt(ayahNumber));
}

// Load specific verse
async function loadVerse(surahNumber, ayahNumber, isRandom = false) {
  const container = document.getElementById("verse-container");
  container.style.display = "block";
  container.innerHTML =
    '<div class="verse-loading"><div class="loading"></div><p>Loading verse...</p></div>';

  try {
    const arabicResponse = await fetch(
      `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/editions/quran-uthmani,en.asad,ar.alafasy`
    );
    const arabicData = await arabicResponse.json();

    if (arabicData.code === 200) {
      const verses = arabicData.data;
      const arabicVerse = verses.find(
        (v) => v.edition.identifier === "quran-uthmani"
      );
      const translationVerse = verses.find(
        (v) => v.edition.identifier === "en.asad"
      );
      const audioVerse = verses.find(
        (v) => v.edition.identifier === "ar.alafasy"
      );

      displayVerse(arabicVerse, translationVerse, audioVerse, isRandom);
    } else {
      container.innerHTML =
        '<div class="verse-loading"><p>Verse not found. Please check the Surah and Ayah numbers.</p></div>';
    }
  } catch (error) {
    console.error("Error loading verse:", error);
    container.innerHTML =
      '<div class="verse-loading"><p>Error loading verse. Please try again.</p></div>';
  }
}

// Display verse
function displayVerse(
  arabicVerse,
  translationVerse,
  audioVerse,
  isRandom = false
) {
  const container = document.getElementById("verse-container");

  const surahName =
    surahs.find((s) => s.number === arabicVerse.surah.number)?.englishName ||
    "Unknown";

  container.innerHTML = `
    <div class="verse-card">
        <div class="arabic-text">${arabicVerse.text}</div>
        <div class="translation-text">"${translationVerse.text}"</div>
        <div class="verse-reference">
            ${surahName} (${arabicVerse.surah.englishName}) ${
    arabicVerse.surah.number
  }:${arabicVerse.numberInSurah}
            ${
              isRandom
                ? '<span style="color: #8e44ad;"> ✨ Random Blessing</span>'
                : ""
            }
        </div>
        <div class="verse-audio-controls">
            <button class="play-button verse-play-btn" onclick="toggleVerseAudio()">
                <span id="verse-audio-icon">🔊</span>
                <span id="verse-audio-text">Listen to Recitation</span>
            </button>
            <div class="audio-info">
                <small>Recited by Mishary Rashid Alafasy</small>
            </div>
        </div>
        <audio id="verse-audio" preload="none">
            <source src="${audioVerse.audio}" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div>
  `;

  currentVerseAudio = document.getElementById("verse-audio");
  isVerseAudioPlaying = false;

  currentVerseAudio.addEventListener("ended", () => {
    document.getElementById("verse-audio-icon").textContent = "🔊";
    document.getElementById("verse-audio-text").textContent =
      "Listen to Recitation";
    isVerseAudioPlaying = false;
  });

  currentVerseAudio.addEventListener("loadstart", () => {
    console.log("Audio loading started");
  });

  currentVerseAudio.addEventListener("error", (e) => {
    console.error("Audio error:", e);
    alert("Audio playback failed. Please try again.");
  });
}

// Toggle verse audio
function toggleVerseAudio() {
  if (!currentVerseAudio) {
    alert("No verse audio available");
    return;
  }

  const audioIcon = document.getElementById("verse-audio-icon");
  const audioText = document.getElementById("verse-audio-text");

  if (isVerseAudioPlaying) {
    currentVerseAudio.pause();
    audioIcon.textContent = "🔊";
    audioText.textContent = "Listen to Recitation";
    isVerseAudioPlaying = false;
  } else {
    if (isPlaying) {
      audio.pause();
      document.getElementById("audio-icon").textContent = "🔊";
      document.getElementById("audio-text").textContent = "Play Takbeer";
      isPlaying = false;
    }

    currentVerseAudio
      .play()
      .then(() => {
        audioIcon.textContent = "⏸️";
        audioText.textContent = "Pause Recitation";
        isVerseAudioPlaying = true;
      })
      .catch((error) => {
        console.error("Error playing verse audio:", error);
        alert("Audio playback failed. Please try again.");
      });
  }
}

// Get random verse
async function getRandomVerse() {
  const popularVerses = [
    { surah: 1, maxAyah: 7 },
    { surah: 2, maxAyah: 286 },
    { surah: 3, maxAyah: 200 },
    { surah: 18, maxAyah: 110 },
    { surah: 36, maxAyah: 83 },
    { surah: 55, maxAyah: 78 },
    { surah: 67, maxAyah: 30 },
    { surah: 112, maxAyah: 4 },
    { surah: 113, maxAyah: 5 },
    { surah: 114, maxAyah: 6 },
  ];

  const randomSurah =
    popularVerses[Math.floor(Math.random() * popularVerses.length)];
  const randomAyah = Math.floor(Math.random() * randomSurah.maxAyah) + 1;

  await loadVerse(randomSurah.surah, randomAyah, true);
}

// Load featured verse
async function loadFeaturedVerse(surahNumber, ayahNumber) {
  await loadVerse(surahNumber, ayahNumber);
}
