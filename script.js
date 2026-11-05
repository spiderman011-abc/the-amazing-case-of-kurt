
// ======================================
// THE AMAZING CASE OF KURT
// Interactive Website Script
// ======================================

const opening = document.getElementById("opening");
const comicWorld = document.getElementById("comic-world");
const envelopeButton = document.getElementById("open-envelope");
const themeSong = document.getElementById("theme-song");

const chapters = document.querySelectorAll(".comic-page");
const nextButtons = document.querySelectorAll(".next-button");


// ======================================
// OPEN THE ENVELOPE
// ======================================

envelopeButton.addEventListener("click", () => {

  // Prevent multiple clicks
  envelopeButton.disabled = true;

  // Envelope animation
  envelopeButton.classList.add("opened");

  // Wait for the animation before revealing the comic
  setTimeout(() => {

    opening.classList.add("hidden");
    comicWorld.classList.remove("hidden");

    showChapter("chapter-1");

    // Start music after the user's click
    if (themeSong.src) {
      themeSong.play().catch(error => {
        console.log("Music playback requires another interaction.", error);
      });
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 700);

});


// ======================================
// CHAPTER NAVIGATION
// ======================================

function showChapter(chapterId) {

  chapters.forEach(chapter => {
    chapter.classList.remove("active-page");
  });

  const selectedChapter = document.getElementById(chapterId);

  if (!selectedChapter) return;

  selectedChapter.classList.add("active-page");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ======================================
// NEXT PAGE BUTTONS
// ======================================

nextButtons.forEach(button => {

  button.addEventListener("click", () => {

    const nextChapter = button.dataset.next;

    if (!nextChapter) return;

    showChapter(nextChapter);

  });

});


// ======================================
// KEYBOARD NAVIGATION
// ======================================

document.addEventListener("keydown", event => {

  if (opening.classList.contains("hidden") === false) {
    return;
  }

  if (event.key === "ArrowRight") {

    const currentChapter = document.querySelector(".active-page");

    if (!currentChapter) return;

    const currentNumber = Number(
      currentChapter.id.replace("chapter-", "")
    );

    const nextNumber = currentNumber + 1;

    if (nextNumber <= chapters.length) {
      showChapter(`chapter-${nextNumber}`);
    }

  }

});


// ======================================
// FINAL PAGE DETECTION
// ======================================

const finalChapter = document.getElementById("chapter-5");

if (finalChapter) {

  const observer = new MutationObserver(() => {

    if (finalChapter.classList.contains("active-page")) {
      document.title = "to kurt, — g.";
    } else {
      document.title = "THE AMAZING CASE OF KURT";
    }

  });

  observer.observe(finalChapter, {
    attributes: true,
    attributeFilter: ["class"]
  });

}


// ======================================
// CONSOLE SIGNATURE
// ======================================

console.log(
  "%cTHE AMAZING CASE OF KURT",
  "color: #b51e25; font-size: 20px; font-weight: bold;"
);

console.log("A little confession, hidden in a comic book. — g.");
