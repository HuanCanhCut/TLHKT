// Spaced Repetition / Active Learning Words Database (Cognitive Psychology Theme)
const words = [
  {
    word: "Psychology",
    ipa: "/saɪˈkɒlədʒi/",
    type: "NOUN",
    vietnamese: "Tâm lý học",
    definition:
      "The scientific study of the human mind and its functions, especially those affecting behavior in a given context.",
    example: "Engineering psychology studies human behavior.",
    exampleVi: "Tâm lý học kỹ thuật nghiên cứu hành vi con người.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
  },
  {
    word: "Engineering Psychology",
    ipa: "/ˌendʒɪˈnɪərɪŋ saɪˈkɒlədʒi/",
    type: "NOUN",
    vietnamese: "Tâm lý học kỹ thuật",
    definition:
      "A field of psychology focusing on the relationship between humans and the products, systems, and environments they use.",
    example:
      "Engineering psychology aims to design systems that minimize human errors.",
    exampleVi:
      "Tâm lý học kỹ thuật nhằm mục đích thiết kế các hệ thống giảm thiểu sai sót của con người.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600",
  },
  {
    word: "Cognitive Load",
    ipa: "/ˈkɒɡ.nə.tɪv loʊd/",
    type: "NOUN",
    vietnamese: "Quá tải nhận thức",
    definition:
      "The total amount of mental effort being used in the working memory during learning or task execution.",
    example:
      "Instructional designers aim to minimize extraneous cognitive load.",
    exampleVi:
      "Các nhà thiết kế bài giảng đặt mục tiêu giảm thiểu quá tải nhận thức không liên quan.",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600",
  },
  {
    word: "Signal Detection",
    ipa: "/ˈsɪɡ.nəl dɪˈtek.ʃən/",
    type: "NOUN",
    vietnamese: "Phát hiện tín hiệu",
    definition:
      "A theory stating that the detection of a stimulus depends on both the intensity of the stimulus and the physical and mental state of the individual.",
    example:
      "Signal detection theory is widely applied in radar monitoring and medical diagnostics.",
    exampleVi:
      "Thuyết phát hiện tín hiệu được ứng dụng rộng rãi trong giám sát radar và chẩn đoán y tế.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
  },
];

let currentIndex = 0;
const flashcard = document.getElementById("flashcard");
const flipBtn = document.getElementById("flipBtn");
const nextBtn = document.getElementById("nextBtn");

// Progress Elements
const progressBar = document.querySelector("header .bg-secondary");

// Evaluation Level Buttons (Spaced Repetition System)
const btnEasy = document.getElementById("btn-easy");
const btnMedium = document.getElementById("btn-medium");
const btnHard = document.getElementById("btn-hard");

// Determine if we are in Evaluation mode (3 feedback buttons exist)
const isEvaluationMode = !!btnEasy;

function toggleFlip() {
  if (flashcard) {
    flashcard.classList.toggle("flashcard-flipped");
  }
}

// Play TTS audio (Pronunciation sound)
window.playPronunciation = function (word) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.85; // slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("TTS is not supported in this browser.");
  }
};

// Bind Volume Up button clicks on front side
function bindAudioButtons() {
  const audioBtn = document.querySelector("#flashcard .flashcard-front button");
  if (audioBtn) {
    audioBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      playPronunciation(words[currentIndex].word);
    });
  }
}

function updateFlashcardDOM() {
  if (!flashcard) return;

  const wordData = words[currentIndex];

  // Front elements
  const frontImg = flashcard.querySelector(".flashcard-front img");
  const frontWord = flashcard.querySelector(".flashcard-front h1");
  const frontIpa = flashcard.querySelector(".flashcard-front span");

  if (frontImg) frontImg.src = wordData.image;
  if (frontWord) frontWord.innerText = wordData.word;
  if (frontIpa) frontIpa.innerText = wordData.ipa;

  // Back elements
  if (isEvaluationMode) {
    const backWord = flashcard.querySelector(".flashcard-back h2");
    const backTranslation = flashcard.querySelector(".flashcard-back p");
    const backExampleEn = flashcard.querySelector(
      ".flashcard-back .bg-surface-container-lowest p:nth-child(2)",
    );
    const backExampleVi = flashcard.querySelector(
      ".flashcard-back .bg-surface-container-lowest p:nth-child(3)",
    );

    if (backWord) backWord.innerText = wordData.word;
    if (backTranslation) backTranslation.innerText = wordData.vietnamese;
    if (backExampleEn) backExampleEn.innerText = wordData.example;
    if (backExampleVi) backExampleVi.innerText = wordData.exampleVi;
  } else {
    const backType = flashcard.querySelector(
      ".flashcard-back span.bg-tertiary-fixed",
    );
    const backTranslation = flashcard.querySelector(".flashcard-back h2");
    const backDefinition = flashcard.querySelector(
      ".flashcard-back .bg-surface-container-lowest p",
    );
    const backExampleEn = flashcard.querySelector(
      ".flashcard-back .text-left.space-y-xs p:nth-child(2)",
    );

    if (backType) backType.innerText = wordData.type;
    if (backTranslation) backTranslation.innerText = wordData.vietnamese;
    if (backDefinition) backDefinition.innerText = `"${wordData.definition}"`;
    if (backExampleEn) backExampleEn.innerText = `"${wordData.example}"`;
  }

  // Update Header progress
  if (progressBar) {
    progressBar.style.width = `${((currentIndex + 1) / words.length) * 100}%`;
  }

  bindAudioButtons();
}

function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className =
      "fixed bottom-6 right-6 z-50 flex flex-col gap-sm pointer-events-none max-w-sm w-full px-md";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `flex items-center gap-sm p-md rounded-xl shadow-lg border transition-all duration-300 transform translate-y-4 opacity-0 text-body-md font-body-md ${
    type === "success"
      ? "bg-secondary-container/95 text-on-secondary-container border-secondary/20"
      : type === "lock"
        ? "bg-error-container/95 text-on-error-container border-error/20"
        : "bg-surface-container-high/95 text-on-surface border-outline/20"
  }`;

  const icon =
    type === "success" ? "check_circle" : type === "lock" ? "lock" : "info";
  toast.innerHTML = `
        <span class="material-symbols-outlined text-[20px]">${icon}</span>
        <span>${message}</span>
    `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  }, 50);

  setTimeout(() => {
    toast.classList.add("translate-y-2", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function handleNextCard() {
  if (!flashcard) return;

  if (currentIndex === words.length - 1) {
    localStorage.setItem("vocab_completed", "true");
    showToast(
      "Chúc mừng! Bạn đã hoàn thành phần học Từ vựng. Đang quay lại lộ trình...",
      "success",
    );
    setTimeout(() => {
      window.location.href = "progress.html";
    }, 1200);
    return;
  }

  // Smooth translation effect (Cognitive Ergonomics: Slide Out)
  const container = flashcard.parentElement;
  container.classList.add(
    "transition-all",
    "duration-300",
    "translate-x-[100%]",
    "opacity-0",
  );

  setTimeout(() => {
    // Increment Index
    currentIndex = (currentIndex + 1) % words.length;

    // Reset card flip and update contents
    flashcard.classList.remove("flashcard-flipped");
    updateFlashcardDOM();

    container.style.transition = "none";
    container.classList.remove("translate-x-[100%]");
    container.classList.add("translate-x-[-100%]");

    setTimeout(() => {
      container.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      container.classList.remove("translate-x-[-100%]", "opacity-0");
    }, 50);
  }, 300);
}

// Initial binding
if (flashcard) {
  flashcard.addEventListener("click", toggleFlip);
  updateFlashcardDOM();
}

if (flipBtn) {
  flipBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFlip();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", handleNextCard);
}

// Evaluation Mode Buttons Logic (Spaced Repetition Feedback)
if (isEvaluationMode) {
  [btnEasy, btnMedium, btnHard].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        // Show a quick micro-feedback overlay or transition
        btn.classList.add("scale-95");
        setTimeout(() => {
          btn.classList.remove("scale-95");
          handleNextCard();
        }, 150);
      });
    }
  });
}

// Keyboard shortcuts for efficiency
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    toggleFlip();
  }
  if (e.code === "ArrowRight" || e.code === "Enter") {
    handleNextCard();
  }
});
