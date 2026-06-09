document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------
    // Dynamic Toast System for Premium UX
    // ----------------------------------------
    function showToast(message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-sm pointer-events-none max-w-sm w-full px-md';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        let bgClass = 'bg-surface-container-high border-outline-variant text-on-surface';
        let icon = 'info';
        let iconColor = 'text-primary';
        
        if (type === 'success') {
            bgClass = 'bg-secondary-container border-secondary/10 text-on-secondary-container';
            icon = 'check_circle';
            iconColor = 'text-secondary';
        } else if (type === 'error') {
            bgClass = 'bg-error-container border-error/20 text-on-error-container';
            icon = 'error';
            iconColor = 'text-error';
        }
        
        toast.className = `flex items-center gap-sm p-md rounded-xl border shadow-lg ${bgClass} translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto`;
        toast.innerHTML = `
            <span class="material-symbols-outlined ${iconColor}">${icon}</span>
            <p class="text-label-md font-label-md font-medium leading-snug">${message}</p>
        `;
        container.appendChild(toast);
        setTimeout(() => toast.classList.remove('translate-y-4', 'opacity-0'), 10);
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => {
                toast.remove();
                if (container.children.length === 0) container.remove();
            }, 300);
        }, 3500);
    }

    // ----------------------------------------
    // Audio Player with Web Speech Synthesis
    // ----------------------------------------
    const playPauseBtn = document.getElementById('play-pause-btn');
    const overlayPlayBtn = document.getElementById('overlay-play-btn');
    const timeText = document.getElementById('time-text');
    const progressContainer = document.getElementById('player-progress-container');
    const progressBar = document.getElementById('player-progress-bar');
    const transcriptLines = document.querySelectorAll('.transcript-line');
    const transcriptContainer = document.querySelector('.transcript-container');
    const skipPreviousBtn = document.getElementById('skip-previous');
    const skipNextBtn = document.getElementById('skip-next');
    
    let isPlaying = false;
    let currentTime = 0; // Starts at 00:00 (0s)
    const totalTime = 330; // 5:30 in seconds
    let playInterval = null;
    let currentUtterance = null;
    let lastActiveIndex = -1;

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function getActiveParagraphIndex() {
        let activeIndex = -1;
        transcriptLines.forEach((line, idx) => {
            const lineTime = parseInt(line.getAttribute('data-time'), 10);
            if (currentTime >= lineTime) {
                activeIndex = idx;
            }
        });
        return activeIndex === -1 ? 0 : activeIndex;
    }

    function playParagraph(index) {
        window.speechSynthesis.cancel(); // Stop current speech
        
        if (index < 0 || index >= transcriptLines.length) return;
        
        const line = transcriptLines[index];
        
        // Extract plain text to speak (strip timestamp label)
        const textClone = line.cloneNode(true);
        const timeSpan = textClone.querySelector('span.text-label-sm');
        if (timeSpan) timeSpan.remove();
        const textToSpeak = textClone.innerText.trim();
        
        currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
        currentUtterance.lang = 'en-US';
        currentUtterance.rate = 0.85; // Natural lecture speed
        
        currentUtterance.onend = () => {
            if (isPlaying) {
                const nextIdx = index + 1;
                if (nextIdx < transcriptLines.length) {
                    const nextLine = transcriptLines[nextIdx];
                    currentTime = parseInt(nextLine.getAttribute('data-time'), 10);
                    updatePlayerUI();
                    playParagraph(nextIdx);
                } else {
                    // Reached the end of transcript
                    isPlaying = false;
                    updatePlayIcons();
                    clearInterval(playInterval);
                    currentTime = 0;
                    updatePlayerUI();
                    showToast('Đã hoàn thành bài nghe!', 'success');
                }
            }
        };
        
        window.speechSynthesis.speak(currentUtterance);
    }

    function updatePlayIcons() {
        const playIcon = playPauseBtn ? playPauseBtn.querySelector('.material-symbols-outlined') : null;
        const overlayIcon = overlayPlayBtn ? overlayPlayBtn.querySelector('.material-symbols-outlined') : null;
        
        const iconName = isPlaying ? 'pause' : 'play_arrow';
        if (playIcon) playIcon.innerText = iconName;
        if (overlayIcon) overlayIcon.innerText = iconName;
    }

    function updatePlayerUI() {
        // Update progress bar
        const progressPercentage = (currentTime / totalTime) * 100;
        if (progressBar) progressBar.style.width = `${progressPercentage}%`;
        
        // Update time text
        if (timeText) {
            timeText.innerText = `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
        }

        // Highlight active line
        const activeIndex = getActiveParagraphIndex();
        transcriptLines.forEach((line, idx) => {
            const timeLabel = line.querySelector('span.text-label-sm');
            if (idx === activeIndex) {
                line.classList.remove('opacity-50');
                line.classList.add('opacity-100', 'bg-primary/5');
                if (timeLabel) timeLabel.classList.add('text-primary');
            } else {
                line.classList.remove('opacity-100', 'bg-primary/5');
                line.classList.add('opacity-50');
                if (timeLabel) timeLabel.classList.remove('text-primary');
            }
        });

        // Auto scroll to active paragraph only when index changes
        if (activeIndex !== -1 && activeIndex !== lastActiveIndex && transcriptContainer) {
            lastActiveIndex = activeIndex;
            const activeLine = transcriptLines[activeIndex];
            const activeLineTop = activeLine.offsetTop;
            const containerHeight = transcriptContainer.clientHeight;
            transcriptContainer.scrollTo({
                top: activeLineTop - containerHeight / 2 + activeLine.clientHeight / 2,
                behavior: 'smooth'
            });
        }
    }

    function togglePlay() {
        isPlaying = !isPlaying;
        updatePlayIcons();
        
        if (isPlaying) {
            showToast('Đang phát bài nghe (đọc bằng giọng AI)...', 'success');
            
            const activeIndex = getActiveParagraphIndex();
            lastActiveIndex = -1; // Force scroll to focus on resume
            playParagraph(activeIndex);
            
            // Visual progress timer ticks every second
            playInterval = setInterval(() => {
                currentTime++;
                if (currentTime >= totalTime) {
                    currentTime = 0;
                    if (isPlaying) togglePlay();
                }
                updatePlayerUI();
            }, 1000);
        } else {
            clearInterval(playInterval);
            window.speechSynthesis.cancel();
            showToast('Đã tạm dừng bài nghe', 'info');
        }
    }

    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
    if (overlayPlayBtn) overlayPlayBtn.addEventListener('click', togglePlay);

    // Skip Buttons
    if (skipNextBtn) {
        skipNextBtn.addEventListener('click', () => {
            currentTime = Math.min(currentTime + 10, totalTime);
            lastActiveIndex = -1; // Force scroll to focus
            updatePlayerUI();
            showToast('Tua nhanh 10 giây', 'info');
            if (isPlaying) {
                playParagraph(getActiveParagraphIndex());
            }
        });
    }

    if (skipPreviousBtn) {
        skipPreviousBtn.addEventListener('click', () => {
            currentTime = Math.max(currentTime - 10, 0);
            lastActiveIndex = -1; // Force scroll to focus
            updatePlayerUI();
            showToast('Lùi lại 10 giây', 'info');
            if (isPlaying) {
                playParagraph(getActiveParagraphIndex());
            }
        });
    }

    // Progress Bar Scrubber Click (Interactive Scrubbing)
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const clickPercent = Math.min(Math.max(clickX / width, 0), 1);
            
            currentTime = Math.round(clickPercent * totalTime);
            lastActiveIndex = -1; // Force scroll focus
            updatePlayerUI();
            
            showToast(`Tua tới ${formatTime(currentTime)}`, 'info');
            if (isPlaying) {
                playParagraph(getActiveParagraphIndex());
            }
        });
    }

    // Jump-to-time click
    transcriptLines.forEach((line, idx) => {
        line.addEventListener('click', () => {
            const targetTime = parseInt(line.getAttribute('data-time'), 10);
            currentTime = targetTime;
            lastActiveIndex = -1; // Force scroll to focus
            updatePlayerUI();
            showToast(`Nhảy đến ${formatTime(targetTime)}`, 'info');
            if (isPlaying) {
                playParagraph(idx);
            }
        });
    });

    // Ensure speech synthesis stops when leaving the page
    window.addEventListener('beforeunload', () => {
        window.speechSynthesis.cancel();
    });

    // Initial Render
    updatePlayerUI();

    // ----------------------------------------
    // Comprehension Quiz Selection & Submission
    // ----------------------------------------
    const quizOptions = document.querySelectorAll('.quiz-option');
    const checkBtn = document.getElementById('check-answer-btn');
    let selectedOption = null;

    quizOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            // Reset state
            quizOptions.forEach(o => {
                o.className = "quiz-option group flex items-center p-md border border-outline rounded-xl hover:bg-surface-container-high transition-all text-left w-full cursor-pointer";
                const indicator = o.querySelector('.radio-indicator');
                if (indicator) {
                    indicator.className = "radio-indicator w-6 h-6 rounded-full border-2 border-outline mr-md flex-shrink-0 group-hover:border-primary flex items-center justify-center";
                    indicator.innerHTML = "";
                }
            });

            // Set selected state
            opt.className = "quiz-option flex items-center p-md border-2 border-primary bg-primary/5 rounded-xl transition-all text-left w-full cursor-pointer";
            const indicator = opt.querySelector('.radio-indicator');
            if (indicator) {
                indicator.className = "radio-indicator w-6 h-6 rounded-full border-2 border-primary mr-md flex-shrink-0 flex items-center justify-center";
                indicator.innerHTML = '<div class="w-3 h-3 bg-primary rounded-full"></div>';
            }
            
            selectedOption = opt;
        });
    });

    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            if (!selectedOption) {
                showToast('Vui lòng chọn một đáp án trước!', 'error');
                return;
            }

            const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
            if (isCorrect) {
                localStorage.setItem('listening_completed', 'true');
                showToast('Chính xác! Bạn đã hiểu đúng vai trò của các từ tín hiệu (Signal Words). Đã mở khóa chặng Đọc hiểu trên Roadmap! +50 XP', 'success');
            } else {
                showToast('Chưa đúng rồi. Hãy chú ý lại đoạn văn lúc 02:12 trong bài giảng.', 'error');
            }
        });
    }
});
