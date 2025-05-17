window.addEventListener("DOMContentLoaded", () => {
  fetchQuote();

  document.getElementById("new-quote").addEventListener("click", fetchQuote);
  document.getElementById("copy").addEventListener("click", copyQuote);
  document.getElementById("share").addEventListener("click", shareQuote);
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
});

function fetchQuote() {
  if (!quotes || quotes.length === 0) {
    document.getElementById("quote").textContent = "No quotes available.";
    document.getElementById("author").textContent = "";
    return;
  }

  const q = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteBox = document.querySelector(".quote-box");
  quoteBox.classList.remove("fade-in");
  void quoteBox.offsetWidth; // Re-trigger animation
  document.getElementById("quote").textContent = `"${q.text}"`;
  document.getElementById("author").textContent = `– ${q.author}`;
  quoteBox.classList.add("fade-in");
}

function copyQuote() {
  const quote = document.getElementById("quote").textContent;
  const author = document.getElementById("author").textContent;
  if (!quote || quote === "Loading...") return alert("No quote to copy.");
  navigator.clipboard.writeText(`${quote} ${author}`);
  alert("Quote copied to clipboard!");
}

function shareQuote() {
  const quote = document.getElementById("quote").textContent;
  const author = document.getElementById("author").textContent;
  const fullQuote = `${quote} ${author}`;

  if (navigator.share) {
    navigator
      .share({
        title: "Inspiring Quote",
        text: fullQuote,
        url: window.location.href,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.log("Sharing failed", error));
  } else {
    const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullQuote)}`;
    window.open(tweet, "_blank");
  }
}

function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("theme-toggle");

  body.classList.toggle("dark");

  themeBtn.innerHTML = body.classList.contains("dark")
    ? '<i class="fas fa-sun"></i> Light Mode'
    : '<i class="fas fa-moon"></i> Dark Mode';
}
