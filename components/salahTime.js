// Get Salah Times Function
async function getSalahTimes() {
  const city = document.getElementById("city").value.trim();
  const country = document.getElementById("country").value.trim();

  if (!city || !country) {
    alert("Please enter both city and country");
    return;
  }

  const container = document.getElementById("prayer-times-container");
  container.innerHTML = '<div class="loading"></div> Loading prayer times...';

  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
        city
      )}&country=${encodeURIComponent(country)}`
    );
    const data = await response.json();

    if (data.code === 200) {
      const timings = data.data.timings;
      const hijriDate = data.data.date.hijri;

      updateHijriDate(hijriDate);

      container.innerHTML = `
        <div class="prayer-times">
          <div class="prayer-time"><h3>Fajr</h3><div class="time">${timings.Fajr}</div></div>
          <div class="prayer-time"><h3>Dhuhr</h3><div class="time">${timings.Dhuhr}</div></div>
          <div class="prayer-time"><h3>Asr</h3><div class="time">${timings.Asr}</div></div>
          <div class="prayer-time"><h3>Maghrib</h3><div class="time">${timings.Maghrib}</div></div>
          <div class="prayer-time"><h3>Isha</h3><div class="time">${timings.Isha}</div></div>
        </div>
      `;
    } else {
      container.innerHTML =
        "<p>City not found. Please check your input and try again.</p>";
    }
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    container.innerHTML =
      "<p>Error fetching prayer times. Please try again later.</p>";
  }
}
