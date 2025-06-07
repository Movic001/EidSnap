// Gratitude messages storage
let gratitudeMessages = [
  "Alhamdulillah for family and health",
  "Grateful for the opportunity to celebrate Eid",
  "Thankful for Allah's countless blessings",
];

// Add Gratitude
function addGratitude() {
  const input = document.getElementById("gratitude-input");
  const message = input.value.trim();

  if (message) {
    gratitudeMessages.unshift(message);
    input.value = "";
    displayGratitudeMessages();
  }
}

// Display Gratitude Messages
function displayGratitudeMessages() {
  const list = document.getElementById("gratitude-list");
  list.innerHTML = gratitudeMessages
    .map((message) => `<div class="gratitude-item">💚 ${message}</div>`)
    .join("");
}
