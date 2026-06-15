document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------
  // Dynamic Toast Notification System
  // ----------------------------------------
  function showToast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className =
        "fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col gap-sm pointer-events-none max-w-sm w-full px-md";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    let bgClass =
      "bg-surface-container-high border-outline-variant text-on-surface";
    let icon = "info";
    let iconColor = "text-primary";

    if (type === "error") {
      bgClass = "bg-error-container border-error/20 text-on-error-container";
      icon = "error";
      iconColor = "text-error";
    } else if (type === "lock") {
      bgClass =
        "bg-tertiary-fixed border-on-tertiary-fixed-variant/10 text-on-tertiary-fixed";
      icon = "lock";
      iconColor = "text-tertiary";
    } else if (type === "success") {
      bgClass =
        "bg-secondary-container border-secondary/10 text-on-secondary-container";
      icon = "check_circle";
      iconColor = "text-secondary";
    }

    toast.className = `flex items-center gap-sm p-md rounded-xl border shadow-lg ${bgClass} translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto`;
    toast.innerHTML = `
            <span class="material-symbols-outlined ${iconColor}">${icon}</span>
            <p class="text-label-md font-label-md font-medium leading-snug">${message}</p>
        `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.remove("translate-y-4", "opacity-0"), 10);
    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => {
        toast.remove();
        if (container.children.length === 0) container.remove();
      }, 300);
    }, 3500);
  }

  // Micro-interactions for roadmap lines
  document
    .querySelectorAll(".roadmap-line, .roadmap-line-active")
    .forEach((line) => {
      line.addEventListener("mouseenter", () =>
        line.classList.add("scale-x-110"),
      );
      line.addEventListener("mouseleave", () =>
        line.classList.remove("scale-x-110"),
      );
    });

  // ----------------------------------------
  // Read and Render Progress State
  // ----------------------------------------
  const isVocabCompleted = localStorage.getItem("vocab_completed") === "true";
  const isListeningCompleted =
    localStorage.getItem("listening_completed") === "true";
  const isReadingCompleted =
    localStorage.getItem("reading_completed") === "true";
  const isQuizCompleted = localStorage.getItem("quiz_completed") === "true";

  // Elements
  const stepVocab = document.getElementById("step-vocab");
  const stepListening = document.getElementById("step-listening");
  const stepReading = document.getElementById("step-reading");
  const stepQuiz = document.getElementById("step-quiz");
  const stepCompletion = document.getElementById("step-completion");
  const resetBtn = document.getElementById("reset-progress-btn");
  const continueBtn = document.getElementById("continue-btn");

  // 1. Vocabulary Step rendering (Blue Theme)
  if (stepVocab) {
    if (isVocabCompleted) {
      // Completed State
      const circle = stepVocab.querySelector(".z-10");
      if (circle) {
        circle.className =
          "z-10 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110";
        circle.innerHTML =
          '<span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 1">check_circle</span>';
      }
      const infoBox = stepVocab.querySelector(".mt-base");
      if (infoBox) {
        infoBox.innerHTML = `
                    <h3 class="text-headline-md font-headline-md text-on-surface">Vocabulary</h3>
                    <div class="flex items-center justify-center gap-xs mt-xs">
                        <span class="material-symbols-outlined text-blue-600 text-sm">done_all</span>
                        <p class="text-label-md font-label-md text-blue-600">Done</p>
                    </div>
                `;
      }
      const connector = stepVocab.querySelector(
        ".roadmap-line, .roadmap-line-active",
      );
      if (connector) {
        connector.className = "absolute top-16 w-0.5 h-12";
        connector.style.background = "#2563eb";
      }

      stepVocab.addEventListener("click", () => {
        showToast("Đang mở lại phần từ vựng đã hoàn thành...", "success");
        setTimeout(() => (window.location.href = "flashcard_eval.html"), 800);
      });
    } else {
      // Active State (since it's the first step and not completed)
      const circle = stepVocab.querySelector(".z-10");
      if (circle) {
        circle.className =
          "z-10 w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transition-all scale-105 group-hover:scale-110 ring-8 ring-blue-600/20 relative";
        circle.innerHTML =
          '<span class="material-symbols-outlined text-[40px]">menu_book</span>';
      }
      const infoBox = stepVocab.querySelector(".mt-base");
      if (infoBox) {
        infoBox.innerHTML = `
                    <h3 class="text-headline-md font-headline-md text-blue-600 font-bold">Vocabulary</h3>
                    <div class="flex items-center justify-center gap-xs mt-xs">
                        <span class="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                        <p class="text-label-md font-label-md text-blue-600 font-semibold">Active Session</p>
                    </div>
                    <p class="text-label-sm font-label-sm text-on-surface-variant mt-xs max-w-[240px]">
                        Master core engineering psychology vocabulary.
                    </p>
                `;
      }
      const connector = stepVocab.querySelector(
        ".roadmap-line, .roadmap-line-active",
      );
      if (connector) {
        connector.className = "absolute top-24 w-0.5 h-12 roadmap-line";
        connector.style.background = "";
      }

      stepVocab.addEventListener("click", () => {
        showToast("Bắt đầu học Từ vựng với Flashcards...", "success");
        setTimeout(() => (window.location.href = "flashcard_eval.html"), 800);
      });
    }
  }

  // 2. Listening Step rendering (Purple Theme)
  if (stepListening) {
    if (isVocabCompleted) {
      stepListening.classList.remove("opacity-60", "grayscale-[0.5]");

      if (isListeningCompleted) {
        // Completed State
        const circle = stepListening.querySelector(".z-10");
        if (circle) {
          circle.className =
            "z-10 w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110";
          circle.innerHTML =
            '<span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 1">check_circle</span>';
        }
        const infoBox =
          stepListening.querySelector(".mt-md") ||
          stepListening.querySelector(".mt-base");
        if (infoBox) {
          infoBox.innerHTML = `
                        <h3 class="text-headline-md font-headline-md text-on-surface">Listening</h3>
                        <div class="flex items-center justify-center gap-xs mt-xs">
                            <span class="material-symbols-outlined text-purple-600 text-sm">done_all</span>
                            <p class="text-label-md font-label-md text-purple-600">Done</p>
                        </div>
                    `;
        }
        const connector = stepListening.querySelector(
          ".roadmap-line, .roadmap-line-active",
        );
        if (connector) {
          connector.className = "absolute top-16 w-0.5 h-12";
          connector.style.background = "#9333ea";
        }

        stepListening.addEventListener("click", () => {
          showToast("Đang mở lại phần Nghe hiểu đã hoàn thành...", "success");
          setTimeout(() => (window.location.href = "listening.html"), 800);
        });
      } else {
        // Active State (Vocab done, Listening not done)
        const circle = stepListening.querySelector(".z-10");
        if (circle) {
          circle.className =
            "z-10 w-24 h-24 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg transition-all scale-105 group-hover:scale-110 ring-8 ring-purple-600/20 relative";
          circle.innerHTML =
            '<span class="material-symbols-outlined text-[40px]">headset</span>';

          const badge = document.createElement("div");
          badge.className =
            "absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-surface-container-low shadow-sm";
          badge.innerText = "0%";
          circle.appendChild(badge);
        }
        const infoBox =
          stepListening.querySelector(".mt-md") ||
          stepListening.querySelector(".mt-base");
        if (infoBox) {
          infoBox.innerHTML = `
                        <h3 class="text-headline-md font-headline-md text-purple-600 font-bold">Listening</h3>
                        <div class="flex items-center justify-center gap-xs mt-xs">
                            <span class="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse"></span>
                            <p class="text-label-md font-label-md text-purple-600 font-semibold">Active Session (0%)</p>
                        </div>
                        <p class="text-label-sm font-label-sm text-on-surface-variant mt-xs max-w-[240px]">
                            Mastering acoustic cues in industrial environments.
                        </p>
                    `;
        }
        const connector = stepListening.querySelector(
          ".roadmap-line, .roadmap-line-active",
        );
        if (connector) {
          connector.className = "absolute top-24 w-0.5 h-12 roadmap-line";
          connector.style.background = "";
        }

        stepListening.addEventListener("click", () => {
          showToast("Đang mở phiên học Nghe hiểu hiện tại...", "success");
          setTimeout(() => (window.location.href = "listening.html"), 800);
        });
      }
    } else {
      // Vocab not completed -> Listening is Locked
      stepListening.classList.add("opacity-60", "grayscale-[0.5]");

      const circle = stepListening.querySelector(".z-10");
      if (circle) {
        circle.className =
          "z-10 w-16 h-16 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center border border-outline-variant transition-transform group-hover:scale-110";
        circle.innerHTML =
          '<span class="material-symbols-outlined">headset</span>';
      }
      const infoBox =
        stepListening.querySelector(".mt-md") ||
        stepListening.querySelector(".mt-base");
      if (infoBox) {
        infoBox.innerHTML = `
                    <h3 class="text-headline-md font-headline-md text-on-surface">Listening</h3>
                    <div class="flex items-center justify-center gap-xs mt-xs">
                        <span class="material-symbols-outlined text-sm">lock</span>
                        <p class="text-label-md font-label-md text-on-surface-variant">Locked</p>
                    </div>
                `;
      }
      const connector = stepListening.querySelector(
        ".roadmap-line, .roadmap-line-active",
      );
      if (connector) {
        connector.className = "absolute top-16 w-0.5 h-12 roadmap-line";
        connector.style.background = "";
      }

      stepListening.addEventListener("click", () => {
        showToast(
          "Phần Nghe hiểu đang khóa. Hãy hoàn thành phần Từ vựng trước!",
          "lock",
        );
      });
    }
  }

  // 3. Reading Step rendering (Amber Theme)
  if (stepReading) {
    if (isListeningCompleted) {
      // Unlock Reading
      stepReading.classList.remove("opacity-60", "grayscale-[0.5]");

      if (isReadingCompleted) {
        // Reading Completed State
        const circle = stepReading.querySelector(".z-10");
        if (circle) {
          circle.className =
            "z-10 w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110";
          circle.innerHTML =
            '<span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 1">check_circle</span>';
        }
        const infoBox = stepReading.querySelector(".mt-base");
        if (infoBox) {
          infoBox.innerHTML = `
                        <h3 class="text-headline-md font-headline-md text-on-surface">Reading</h3>
                        <div class="flex items-center justify-center gap-xs mt-xs">
                            <span class="material-symbols-outlined text-amber-600 text-sm">done_all</span>
                            <p class="text-label-md font-label-md text-amber-600">Done</p>
                        </div>
                    `;
        }
        const connector = stepReading.querySelector(
          ".roadmap-line, .roadmap-line-active",
        );
        if (connector) {
          connector.className = "absolute top-16 w-0.5 h-12";
          connector.style.background = "#d97706";
        }

        stepReading.addEventListener("click", () => {
          showToast("Đang mở lại phần Đọc hiểu đã hoàn thành...", "success");
          setTimeout(() => (window.location.href = "reading.html"), 800);
        });
      } else {
        // Reading Active State
        const circle = stepReading.querySelector(".z-10");
        if (circle) {
          circle.className =
            "z-10 w-24 h-24 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg transition-all scale-105 group-hover:scale-110 ring-8 ring-amber-600/20 relative";
          circle.innerHTML =
            '<span class="material-symbols-outlined text-[40px]">auto_stories</span>';
        }
        const infoBox = stepReading.querySelector(".mt-base");
        if (infoBox) {
          infoBox.innerHTML = `
                        <h3 class="text-headline-md font-headline-md text-amber-600 font-bold">Reading</h3>
                        <div class="flex items-center justify-center gap-xs mt-xs">
                            <span class="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse"></span>
                            <p class="text-label-md font-label-md text-amber-600 font-semibold">Active Session</p>
                        </div>
                    `;
        }
        const connector = stepReading.querySelector(
          ".roadmap-line, .roadmap-line-active",
        );
        if (connector) {
          connector.className = "absolute top-24 w-0.5 h-12 roadmap-line";
          connector.style.background = "";
        }

        stepReading.addEventListener("click", () => {
          showToast("Đang mở phiên học Đọc hiểu...", "success");
          setTimeout(() => (window.location.href = "reading.html"), 800);
        });
      }
    } else {
      // Locked
      stepReading.classList.add("opacity-60", "grayscale-[0.5]");

      const circle = stepReading.querySelector(".z-10");
      if (circle) {
        circle.className =
          "z-10 w-16 h-16 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center border border-outline-variant transition-transform group-hover:scale-110";
        circle.innerHTML =
          '<span class="material-symbols-outlined">auto_stories</span>';
      }
      const infoBox = stepReading.querySelector(".mt-base");
      if (infoBox) {
        infoBox.innerHTML = `
                    <h3 class="text-headline-md font-headline-md text-on-surface">Reading</h3>
                    <div class="flex items-center justify-center gap-xs mt-xs">
                        <span class="material-symbols-outlined text-sm">lock</span>
                        <p class="text-label-md font-label-md text-on-surface-variant">Locked</p>
                    </div>
                `;
      }
      const connector = stepReading.querySelector(
        ".roadmap-line, .roadmap-line-active",
      );
      if (connector) {
        connector.className = "absolute top-16 w-0.5 h-12 roadmap-line";
        connector.style.background = "";
      }

      stepReading.addEventListener("click", () => {
        showToast(
          "Phần đọc hiểu đang khóa. Hãy hoàn thành phiên Nghe hiểu trước!",
          "lock",
        );
      });
    }
  }

  // 4. Quiz Step rendering (Rose Theme)
  if (stepQuiz) {
    if (isReadingCompleted) {
      // Unlock Quiz
      stepQuiz.classList.remove("opacity-60", "grayscale-[0.5]");

      if (isQuizCompleted) {
        // Quiz Completed State
        const circle = stepQuiz.querySelector(".z-10");
        if (circle) {
          circle.className =
            "z-10 w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110";
          circle.innerHTML =
            '<span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 1">check_circle</span>';
        }
        const infoBox = stepQuiz.querySelector(".mt-base");
        if (infoBox) {
          infoBox.innerHTML = `
                        <h3 class="text-headline-md font-headline-md text-on-surface">Quiz</h3>
                        <div class="flex items-center justify-center gap-xs mt-xs">
                            <span class="material-symbols-outlined text-rose-600 text-sm">done_all</span>
                            <p class="text-label-md font-label-md text-rose-600">Done</p>
                        </div>
                    `;
        }
        const connector = stepQuiz.querySelector(
          ".roadmap-line, .roadmap-line-active",
        );
        if (connector) {
          connector.className = "absolute top-16 w-0.5 h-12";
          connector.style.background = "#e11d48";
        }

        stepQuiz.addEventListener("click", () => {
          showToast("Đang mở xem lại bài kiểm tra đã hoàn thành...", "success");
          setTimeout(() => (window.location.href = "quiz.html"), 800);
        });
      } else {
        // Quiz Active State
        const circle = stepQuiz.querySelector(".z-10");
        if (circle) {
          circle.className =
            "z-10 w-24 h-24 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg transition-all scale-105 group-hover:scale-110 ring-8 ring-rose-600/20 relative";
          circle.innerHTML =
            '<span class="material-symbols-outlined text-[40px]">quiz</span>';
        }
        const infoBox = stepQuiz.querySelector(".mt-base");
        if (infoBox) {
          infoBox.innerHTML = `
                        <h3 class="text-headline-md font-headline-md text-rose-600 font-bold">Quiz</h3>
                        <div class="flex items-center justify-center gap-xs mt-xs">
                            <span class="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
                            <p class="text-label-md font-label-md text-rose-600 font-semibold">Active Session</p>
                        </div>
                    `;
        }
        const connector = stepQuiz.querySelector(
          ".roadmap-line, .roadmap-line-active",
        );
        if (connector) {
          connector.className = "absolute top-24 w-0.5 h-12 roadmap-line";
          connector.style.background = "";
        }

        stepQuiz.addEventListener("click", () => {
          showToast(
            "Bắt đầu làm bài kiểm tra tổng hợp chương! +100 XP",
            "success",
          );
          setTimeout(() => (window.location.href = "quiz.html"), 800);
        });
      }
    } else {
      // Locked
      stepQuiz.classList.add("opacity-60", "grayscale-[0.5]");

      const circle = stepQuiz.querySelector(".z-10");
      if (circle) {
        circle.className =
          "z-10 w-16 h-16 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center border border-outline-variant transition-transform group-hover:scale-110";
        circle.innerHTML =
          '<span class="material-symbols-outlined">quiz</span>';
      }
      const infoBox = stepQuiz.querySelector(".mt-base");
      if (infoBox) {
        infoBox.innerHTML = `
                    <h3 class="text-headline-md font-headline-md text-on-surface">Quiz</h3>
                    <div class="flex items-center justify-center gap-xs mt-xs">
                        <span class="material-symbols-outlined text-sm">lock</span>
                        <p class="text-label-md font-label-md text-on-surface-variant">Locked</p>
                    </div>
                `;
      }
      const connector = stepQuiz.querySelector(
        ".roadmap-line, .roadmap-line-active",
      );
      if (connector) {
        connector.className = "absolute top-16 w-0.5 h-12 roadmap-line";
        connector.style.background = "";
      }

      stepQuiz.addEventListener("click", () => {
        showToast(
          "Bài kiểm tra đang khóa. Vui lòng hoàn thành các phần học trước!",
          "lock",
        );
      });
    }
  }

  // 5. Completion Step rendering (Emerald Theme)
  if (stepCompletion) {
    if (isQuizCompleted) {
      // Unlock Completion
      stepCompletion.classList.remove("opacity-60", "grayscale-[0.5]");

      const circle = stepCompletion.querySelector(".z-10");
      if (circle) {
        circle.className =
          "z-10 w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg transition-all scale-105 group-hover:scale-110 ring-8 ring-emerald-600/20 relative";
        circle.innerHTML =
          '<span class="material-symbols-outlined text-[40px]" style="font-variation-settings: &quot;FILL&quot; 1">emoji_events</span>';
      }
      const infoBox =
        stepCompletion.querySelector(".mt-base") ||
        stepCompletion.querySelector(".mt-md");
      if (infoBox) {
        infoBox.innerHTML = `
                    <h3 class="text-headline-md font-headline-md text-emerald-600 font-bold">Chapter Mastered!</h3>
                    <div class="flex items-center justify-center gap-xs mt-xs">
                        <span class="material-symbols-outlined text-emerald-600 text-sm">workspace_premium</span>
                        <p class="text-label-md font-label-md text-emerald-600 font-semibold">100% Completed</p>
                    </div>
                `;
      }

      stepCompletion.addEventListener("click", () => {
        showToast(
          "Bạn đã hoàn thành xuất sắc chương này! Đang mở Bảng xếp hạng...",
          "success",
        );
        setTimeout(() => (window.location.href = "ranking.html"), 800);
      });
    } else {
      stepCompletion.classList.add("opacity-60", "grayscale-[0.5]");

      const circle = stepCompletion.querySelector(".z-10");
      if (circle) {
        circle.className =
          "z-10 w-16 h-16 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center border border-outline-variant transition-transform group-hover:scale-110";
        circle.innerHTML =
          '<span class="material-symbols-outlined">emoji_events</span>';
      }
      const infoBox =
        stepCompletion.querySelector(".mt-base") ||
        stepCompletion.querySelector(".mt-md");
      if (infoBox) {
        infoBox.innerHTML = `
                    <h3 class="text-headline-md font-headline-md text-on-surface">Completion</h3>
                    <p class="text-label-md font-label-md text-on-surface-variant">Finish Line</p>
                `;
      }

      stepCompletion.addEventListener("click", () => {
        showToast(
          "Chương này chưa hoàn thành. Hãy vượt qua bài Quiz trước nhé!",
          "lock",
        );
      });
    }
  }

  // ----------------------------------------
  // Continue Button Redirection Logic
  // ----------------------------------------
  if (continueBtn) {
    continueBtn.addEventListener("mousemove", (e) => {
      const rect = continueBtn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      continueBtn.style.setProperty("--mouse-x", `${x}px`);
      continueBtn.style.setProperty("--mouse-y", `${y}px`);
    });

    // Determine destination based on progress
    let destination = "flashcard_eval.html";
    let destText = "Từ vựng";
    let isStarted = false;

    if (isVocabCompleted) {
      destination = "listening.html";
      destText = "Nghe hiểu";
      isStarted = true;
    }
    if (isListeningCompleted) {
      destination = "reading.html";
      destText = "Đọc hiểu";
      isStarted = true;
    }
    if (isReadingCompleted) {
      destination = "quiz.html";
      destText = "Bài kiểm tra (Quiz)";
      isStarted = true;
    }
    if (isQuizCompleted) {
      destination = "ranking.html";
      destText = "Bảng xếp hạng";
      isStarted = true;
    }

    const btnSpan = continueBtn.querySelector("span");
    if (btnSpan) {
      btnSpan.innerText = isStarted
        ? `Tiếp tục ${destText}`
        : `Bắt đầu ${destText}`;
    }

    continueBtn.addEventListener("click", () => {
      showToast(`Đang chuyển hướng sang bài học ${destText}...`, "success");
      setTimeout(() => (window.location.href = destination), 800);
    });
  }

  // ----------------------------------------
  // Reset Progress Button Action
  // ----------------------------------------
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      localStorage.removeItem("vocab_completed");
      localStorage.removeItem("listening_completed");
      localStorage.removeItem("reading_completed");
      localStorage.removeItem("quiz_completed");
      showToast("Đã cài đặt lại tiến trình học tập của bạn!", "success");
      setTimeout(() => window.location.reload(), 1000);
    });
  }
});
