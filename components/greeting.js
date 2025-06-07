// Eid Greetings Array
const eidGreetings = [
  "Eid Mubarak! May this blessed day bring you joy, peace, and countless blessings! 🌙",
  "May Allah's blessings be with you today, tomorrow, and always. Eid Mubarak! ✨",
  "Wishing you and your family a blessed Eid filled with happiness and prosperity! 🕌",
  "May this Eid bring you closer to Allah and fill your heart with divine love. Eid Mubarak! 💚",
  "On this joyous occasion, may Allah shower His mercy and blessings upon you. Eid Mubarak! 🌟",
  "May the magic of Eid bring lots of happiness and fill your life with beautiful moments! 🎉",
  "Eid Mubarak! May Allah accept your prayers and grant you forgiveness and mercy! 🤲",
  "Sending you warm wishes on this blessed day. May your faith be renewed and your heart be filled with joy! 🌙",
];

// Refresh Greeting
function refreshGreeting() {
  const greetingText = document.getElementById("greeting-text");
  const randomGreeting =
    eidGreetings[Math.floor(Math.random() * eidGreetings.length)];
  greetingText.style.opacity = "0";

  setTimeout(() => {
    greetingText.textContent = randomGreeting;
    greetingText.style.opacity = "1";
  }, 300);
}
