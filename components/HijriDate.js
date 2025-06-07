// Update Hijri Date
function updateHijriDate(hijriDate) {
  const container = document.getElementById("hijri-date-container");
  container.innerHTML = `
    📅 ${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} AH
    <br>
    <small>${hijriDate.weekday.en}</small>
  `;
}

// Load current Hijri date on page load
async function loadCurrentHijriDate() {
  try {
    const response = await fetch("https://api.aladhan.com/v1/gToH");
    const data = await response.json();

    if (data.code === 200) {
      updateHijriDate(data.data.hijri);
    }
  } catch (error) {
    console.error("Error fetching Hijri date:", error);
    document.getElementById("hijri-date-container").innerHTML =
      "📅 Unable to load Hijri date";
  }
}
