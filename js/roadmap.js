document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------
    // Dynamic Toast Notification System
    // ----------------------------------------
    function showToast(message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col gap-sm pointer-events-none max-w-sm w-full px-md';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        let bgClass = 'bg-surface-container-high border-outline-variant text-on-surface';
        let icon = 'info';
        let iconColor = 'text-primary';
        
        if (type === 'error') {
            bgClass = 'bg-error-container border-error/20 text-on-error-container';
            icon = 'error';
            iconColor = 'text-error';
        } else if (type === 'lock') {
            bgClass = 'bg-tertiary-fixed border-on-tertiary-fixed-variant/10 text-on-tertiary-fixed';
            icon = 'lock';
            iconColor = 'text-tertiary';
        } else if (type === 'success') {
            bgClass = 'bg-secondary-container border-secondary/10 text-on-secondary-container';
            icon = 'check_circle';
            iconColor = 'text-secondary';
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

    // Micro-interactions for roadmap lines
    document.querySelectorAll('.roadmap-line, .roadmap-line-active').forEach(line => {
        line.addEventListener('mouseenter', () => line.classList.add('scale-x-110'));
        line.addEventListener('mouseleave', () => line.classList.remove('scale-x-110'));
    });

    // ----------------------------------------
    // Read and Render Progress State
    // ----------------------------------------
    const isListeningCompleted = localStorage.getItem('listening_completed') === 'true';
    const isReadingCompleted = localStorage.getItem('reading_completed') === 'true';
    const isQuizCompleted = localStorage.getItem('quiz_completed') === 'true';

    // Elements
    const stepVocab = document.getElementById('step-vocab');
    const stepListening = document.getElementById('step-listening');
    const stepReading = document.getElementById('step-reading');
    const stepQuiz = document.getElementById('step-quiz');
    const stepCompletion = document.getElementById('step-completion');
    const resetBtn = document.getElementById('reset-progress-btn');
    const continueBtn = document.getElementById('continue-btn');

    // 1. Vocabulary Step: Always completed
    if (stepVocab) {
        stepVocab.addEventListener('click', () => {
            showToast('Đang mở lại phần từ vựng đã hoàn thành...', 'success');
            setTimeout(() => window.location.href = 'flashcard_eval.html', 800);
        });
    }

    // 2. Listening Step rendering
    if (stepListening) {
        if (isListeningCompleted) {
            // Transform Listening into Completed State
            const circle = stepListening.querySelector('.z-10');
            if (circle) {
                circle.className = "z-10 w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md transition-transform group-hover:scale-110";
                circle.innerHTML = '<span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 1">check_circle</span>';
            }
            const infoBox = stepListening.querySelector('.mt-md') || stepListening.querySelector('.mt-base');
            if (infoBox) {
                infoBox.innerHTML = `
                    <h3 class="text-headline-md font-headline-md text-on-surface">Listening</h3>
                    <div class="flex items-center justify-center gap-xs mt-xs">
                        <span class="material-symbols-outlined text-secondary text-sm">done_all</span>
                        <p class="text-label-md font-label-md text-secondary">Done</p>
                    </div>
                `;
            }
            // Update connector line underneath
            const connector = stepListening.querySelector('.roadmap-line');
            if (connector) {
                connector.className = "absolute top-16 w-0.5 h-12 roadmap-line-active";
            }
            
            // Click redirects to listening review
            stepListening.addEventListener('click', () => {
                showToast('Đang mở lại phần Nghe hiểu đã hoàn thành...', 'success');
                setTimeout(() => window.location.href = 'listening.html', 800);
            });
        } else {
            // Click redirects to listening active session
            stepListening.addEventListener('click', () => {
                showToast('Đang mở phiên học Nghe hiểu hiện tại...', 'success');
                setTimeout(() => window.location.href = 'listening.html', 800);
            });
        }
    }

    // 3. Reading Step rendering
    if (stepReading) {
        if (isListeningCompleted) {
            // Unlock Reading
            stepReading.classList.remove('opacity-60', 'grayscale-[0.5]');
            
            if (isReadingCompleted) {
                // Reading Completed State
                const circle = stepReading.querySelector('.z-10');
                if (circle) {
                    circle.className = "z-10 w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md transition-transform group-hover:scale-110";
                    circle.innerHTML = '<span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 1">check_circle</span>';
                }
                const infoBox = stepReading.querySelector('.mt-base');
                if (infoBox) {
                    infoBox.innerHTML = `
                        <h3 class="text-headline-md font-headline-md text-on-surface">Reading</h3>
                        <div class="flex items-center justify-center gap-xs mt-xs">
                            <span class="material-symbols-outlined text-secondary text-sm">done_all</span>
                            <p class="text-label-md font-label-md text-secondary">Done</p>
                        </div>
                    `;
                }
                const connector = stepReading.querySelector('.roadmap-line');
                if (connector) {
                    connector.className = "absolute top-16 w-0.5 h-12 roadmap-line-active";
                }
                
                stepReading.addEventListener('click', () => {
                    showToast('Đang mở lại phần Đọc hiểu đã hoàn thành...', 'success');
                    setTimeout(() => window.location.href = 'reading.html', 800);
                });
            } else {
                // Reading Active State
                const circle = stepReading.querySelector('.z-10');
                if (circle) {
                    circle.className = "z-10 w-24 h-24 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg transition-all scale-105 group-hover:scale-110 ring-8 ring-primary/20 relative";
                    circle.innerHTML = '<span class="material-symbols-outlined text-[40px]">auto_stories</span>';
                }
                const infoBox = stepReading.querySelector('.mt-base');
                if (infoBox) {
                    infoBox.innerHTML = `
                        <h3 class="text-headline-md font-headline-md text-primary font-bold">Reading</h3>
                        <div class="flex items-center justify-center gap-xs mt-xs">
                            <span class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                            <p class="text-label-md font-label-md text-primary font-semibold">Active Session</p>
                        </div>
                    `;
                }
                const connector = stepReading.querySelector('.roadmap-line');
                if (connector) {
                    // Offset connector down due to larger active circle
                    connector.className = "absolute top-24 w-0.5 h-12 roadmap-line";
                }
                
                stepReading.addEventListener('click', () => {
                    showToast('Đang mở phiên học Đọc hiểu...', 'success');
                    setTimeout(() => window.location.href = 'reading.html', 800);
                });
            }
        } else {
            // Locked
            stepReading.addEventListener('click', () => {
                showToast('Phần đọc hiểu đang khóa. Hãy hoàn thành phiên Nghe hiểu trước!', 'lock');
            });
        }
    }

    // 4. Quiz Step rendering
    if (stepQuiz) {
        if (isReadingCompleted) {
            // Unlock Quiz
            stepQuiz.classList.remove('opacity-60', 'grayscale-[0.5]');
            
            if (isQuizCompleted) {
                // Quiz Completed State
                const circle = stepQuiz.querySelector('.z-10');
                if (circle) {
                    circle.className = "z-10 w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md transition-transform group-hover:scale-110";
                    circle.innerHTML = '<span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 1">check_circle</span>';
                }
                const infoBox = stepQuiz.querySelector('.mt-base');
                if (infoBox) {
                    infoBox.innerHTML = `
                        <h3 class="text-headline-md font-headline-md text-on-surface">Quiz</h3>
                        <div class="flex items-center justify-center gap-xs mt-xs">
                            <span class="material-symbols-outlined text-secondary text-sm">done_all</span>
                            <p class="text-label-md font-label-md text-secondary">Done</p>
                        </div>
                    `;
                }
                const connector = stepQuiz.querySelector('.roadmap-line');
                if (connector) {
                    connector.className = "absolute top-16 w-0.5 h-12 roadmap-line-active";
                }
                
                stepQuiz.addEventListener('click', () => {
                    showToast('Đang mở xem lại bài kiểm tra đã hoàn thành...', 'success');
                    setTimeout(() => window.location.href = 'quiz.html', 800);
                });
            } else {
                // Quiz Active State
                const circle = stepQuiz.querySelector('.z-10');
                if (circle) {
                    circle.className = "z-10 w-24 h-24 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg transition-all scale-105 group-hover:scale-110 ring-8 ring-primary/20 relative";
                    circle.innerHTML = '<span class="material-symbols-outlined text-[40px]">quiz</span>';
                }
                const infoBox = stepQuiz.querySelector('.mt-base');
                if (infoBox) {
                    infoBox.innerHTML = `
                        <h3 class="text-headline-md font-headline-md text-primary font-bold">Quiz</h3>
                        <div class="flex items-center justify-center gap-xs mt-xs">
                            <span class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                            <p class="text-label-md font-label-md text-primary font-semibold">Active Session</p>
                        </div>
                    `;
                }
                const connector = stepQuiz.querySelector('.roadmap-line');
                if (connector) {
                    connector.className = "absolute top-24 w-0.5 h-12 roadmap-line";
                }
                
                stepQuiz.addEventListener('click', () => {
                    showToast('Bắt đầu làm bài kiểm tra tổng hợp chương! +100 XP', 'success');
                    setTimeout(() => window.location.href = 'quiz.html', 800);
                });
            }
        } else {
            // Locked
            stepQuiz.addEventListener('click', () => {
                showToast('Bài kiểm tra đang khóa. Vui lòng hoàn thành các phần học trước!', 'lock');
            });
        }
    }

    // 5. Completion Step rendering
    if (stepCompletion) {
        if (isQuizCompleted) {
            // Unlock Completion
            stepCompletion.classList.remove('opacity-60', 'grayscale-[0.5]');
            
            const circle = stepCompletion.querySelector('.z-10');
            if (circle) {
                circle.className = "z-10 w-24 h-24 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg transition-all scale-105 group-hover:scale-110 ring-8 ring-secondary/20 relative";
                circle.innerHTML = '<span class="material-symbols-outlined text-[40px]" style="font-variation-settings: &quot;FILL&quot; 1">emoji_events</span>';
            }
            const infoBox = stepCompletion.querySelector('.mt-base') || stepCompletion.querySelector('.mt-md');
            if (infoBox) {
                infoBox.innerHTML = `
                    <h3 class="text-headline-md font-headline-md text-secondary font-bold">Chapter Mastered!</h3>
                    <div class="flex items-center justify-center gap-xs mt-xs">
                        <span class="material-symbols-outlined text-secondary text-sm">workspace_premium</span>
                        <p class="text-label-md font-label-md text-secondary font-semibold">100% Completed</p>
                    </div>
                `;
            }
            
            stepCompletion.addEventListener('click', () => {
                showToast('Bạn đã hoàn thành xuất sắc chương này! Đang mở Bảng xếp hạng...', 'success');
                setTimeout(() => window.location.href = 'leaderboard.html', 800);
            });
        } else {
            stepCompletion.addEventListener('click', () => {
                showToast('Chương này chưa hoàn thành. Hãy vượt qua bài Quiz trước nhé!', 'lock');
            });
        }
    }

    // ----------------------------------------
    // Continue Button Redirection Logic
    // ----------------------------------------
    if (continueBtn) {
        continueBtn.addEventListener('mousemove', (e) => {
            const rect = continueBtn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            continueBtn.style.setProperty('--mouse-x', `${x}px`);
            continueBtn.style.setProperty('--mouse-y', `${y}px`);
        });

        // Determine destination based on progress
        let destination = 'listening.html';
        let destText = 'Nghe hiểu';
        
        if (isListeningCompleted) {
            destination = 'reading.html';
            destText = 'Đọc hiểu';
        }
        if (isReadingCompleted) {
            destination = 'quiz.html';
            destText = 'Bài kiểm tra (Quiz)';
        }
        if (isQuizCompleted) {
            destination = 'leaderboard.html';
            destText = 'Bảng xếp hạng';
        }

        continueBtn.addEventListener('click', () => {
            showToast(`Đang chuyển hướng sang bài học ${destText}...`, 'success');
            setTimeout(() => window.location.href = destination, 800);
        });
    }

    // ----------------------------------------
    // Reset Progress Button Action
    // ----------------------------------------
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            localStorage.removeItem('listening_completed');
            localStorage.removeItem('reading_completed');
            localStorage.removeItem('quiz_completed');
            showToast('Đã cài đặt lại tiến trình học tập của bạn!', 'success');
            setTimeout(() => window.location.reload(), 1000);
        });
    }
});
