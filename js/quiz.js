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
    // Quiz Questions Database
    // ----------------------------------------
    const quizQuestions = [
        {
            question: "What is the fundamental difference between laminar and turbulent flow?",
            options: [
                "Laminar flow is chaotic and fast, while turbulent flow is predictable.",
                "Laminar flow is smooth and parallel, while turbulent flow is chaotic.",
                "Laminar flow only occurs in air, while turbulent flow only occurs in water.",
                "Laminar flow is always less fuel-efficient."
            ],
            correctIdx: 1,
            explanation: "Laminar flow consists of smooth, parallel fluid layers, whereas turbulent flow is characterized by chaotic swirls and mixing."
        },
        {
            question: "Which term refers to the mental effort required to process information in a learning task?",
            options: [
                "Reynolds number",
                "Spaced repetition",
                "Cognitive load",
                "Extraneous friction"
            ],
            correctIdx: 2,
            explanation: "Cognitive load is the total amount of mental effort being used in the working memory."
        },
        {
            question: "According to Cognitive Ergonomics, how should pilot displays be designed?",
            options: [
                "By adding more complex widgets to the primary screen.",
                "By increasing extraneous cognitive load to challenge pilots.",
                "By minimizing extraneous load through clean visual cues.",
                "By using custom decorative text fonts."
            ],
            correctIdx: 2,
            explanation: "Reducing extraneous cognitive load (distractions, messy layout) helps operators focus on essential safety information."
        },
        {
            question: "What does transition to a high Reynolds number indicate in fluid dynamics?",
            options: [
                "The flow is shifting from laminar to turbulent.",
                "The fluid is freezing due to high friction.",
                "The operator is experiencing mental overload.",
                "Air currents are traveling in a vacuum."
            ],
            correctIdx: 0,
            explanation: "The Reynolds number is a dimensionless quantity that predicts the transition from laminar (low Re) to turbulent (high Re) flow."
        },
        {
            question: "Which transition signal word is best used to state a contrast or counterpoint?",
            options: [
                "Crucially",
                "However",
                "In conclusion",
                "Importantly"
            ],
            correctIdx: 1,
            explanation: "'However' is a transition word used to signal a contradiction or contrasting point."
        }
    ];

    let currentIdx = 0;
    let selectedAns = null;
    let score = 0;
    let isChecked = false; // Tracks if user clicked "Check Answer" for current question

    // Elements
    const qIndexText = document.getElementById('question-index-text');
    const progressPercent = document.getElementById('quiz-progress-percent');
    const progressFill = document.getElementById('quiz-progress-fill');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const playScreen = document.getElementById('quiz-play-screen');
    const resultScreen = document.getElementById('quiz-result-screen');
    const scoreText = document.getElementById('score-text');
    const finishBtn = document.getElementById('finish-quiz-btn');

    function renderQuestion() {
        isChecked = false;
        selectedAns = null;
        
        // Update header & progress bar
        const qNum = currentIdx + 1;
        const total = quizQuestions.length;
        const percent = Math.round((qNum / total) * 100);
        
        qIndexText.innerText = `Question ${qNum} of ${total}`;
        progressPercent.innerText = `${percent}%`;
        progressFill.style.width = `${percent}%`;

        // Update question text
        questionText.innerText = quizQuestions[currentIdx].question;

        // Reset button
        nextBtn.innerHTML = `
            <span>Check Answer</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
        `;

        // Render options
        optionsContainer.innerHTML = '';
        quizQuestions[currentIdx].options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = "quiz-option group flex items-center p-md border border-outline rounded-xl hover:bg-surface-container-high transition-all text-left w-full cursor-pointer";
            btn.innerHTML = `
                <div class="radio-indicator w-6 h-6 rounded-full border-2 border-outline mr-md flex-shrink-0 group-hover:border-primary flex items-center justify-center"></div>
                <span class="text-body-md text-on-surface font-medium">${opt}</span>
            `;
            
            btn.addEventListener('click', () => {
                if (isChecked) return; // Prevent selection changes after checking
                
                // Reset other options styling
                document.querySelectorAll('.quiz-option').forEach(o => {
                    o.className = "quiz-option group flex items-center p-md border border-outline rounded-xl hover:bg-surface-container-high transition-all text-left w-full cursor-pointer";
                    const indicator = o.querySelector('.radio-indicator');
                    if (indicator) {
                        indicator.className = "radio-indicator w-6 h-6 rounded-full border-2 border-outline mr-md flex-shrink-0 group-hover:border-primary flex items-center justify-center";
                        indicator.innerHTML = '';
                    }
                });

                // Select current option styling
                btn.className = "quiz-option flex items-center p-md border-2 border-primary bg-primary/5 rounded-xl transition-all text-left w-full cursor-pointer";
                const indicator = btn.querySelector('.radio-indicator');
                if (indicator) {
                    indicator.className = "radio-indicator w-6 h-6 rounded-full border-2 border-primary mr-md flex-shrink-0 flex items-center justify-center";
                    indicator.innerHTML = '<div class="w-3 h-3 bg-primary rounded-full"></div>';
                }

                selectedAns = idx;
            });

            optionsContainer.appendChild(btn);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const total = quizQuestions.length;

            if (selectedAns === null) {
                showToast("Please select an answer first!", "error");
                return;
            }

            if (!isChecked) {
                // Check Answer State
                isChecked = true;
                const correctIdx = quizQuestions[currentIdx].correctIdx;
                const options = optionsContainer.children;

                if (selectedAns === correctIdx) {
                    score++;
                    showToast("Correct! Great job.", "success");
                    options[selectedAns].className = "quiz-option flex items-center p-md border-2 border-secondary bg-secondary/5 rounded-xl transition-all text-left w-full";
                    const indicator = options[selectedAns].querySelector('.radio-indicator');
                    if (indicator) {
                        indicator.className = "radio-indicator w-6 h-6 rounded-full border-2 border-secondary mr-md flex-shrink-0 flex items-center justify-center";
                        indicator.innerHTML = '<span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings: \'FILL\' 1">check</span>';
                    }
                } else {
                    showToast("Incorrect answer. Read the explanation.", "error");
                    // Highlight selected as wrong
                    options[selectedAns].className = "quiz-option flex items-center p-md border-2 border-error bg-error/5 rounded-xl transition-all text-left w-full";
                    const indicator = options[selectedAns].querySelector('.radio-indicator');
                    if (indicator) {
                        indicator.className = "radio-indicator w-6 h-6 rounded-full border-2 border-error mr-md flex-shrink-0 flex items-center justify-center";
                        indicator.innerHTML = '<span class="material-symbols-outlined text-error text-sm" style="font-variation-settings: \'FILL\' 1">close</span>';
                    }
                    
                    // Highlight correct answer
                    options[correctIdx].className = "quiz-option flex items-center p-md border-2 border-secondary bg-secondary/5 rounded-xl transition-all text-left w-full";
                    const correctIndicator = options[correctIdx].querySelector('.radio-indicator');
                    if (correctIndicator) {
                        correctIndicator.className = "radio-indicator w-6 h-6 rounded-full border-2 border-secondary mr-md flex-shrink-0 flex items-center justify-center";
                        correctIndicator.innerHTML = '<span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings: \'FILL\' 1">check</span>';
                    }
                }

                // Add explanation block below choices
                const expBlock = document.createElement('div');
                expBlock.className = "mt-md p-md bg-surface-container rounded-xl border border-outline-variant text-body-md text-on-surface-variant animate-fade-in";
                expBlock.innerHTML = `
                    <p class="font-bold text-on-surface flex items-center gap-xs mb-xs">
                        <span class="material-symbols-outlined text-primary">info</span> Explanation:
                    </p>
                    <p>${quizQuestions[currentIdx].explanation}</p>
                `;
                optionsContainer.appendChild(expBlock);

                // Change button text
                const isLast = currentIdx === total - 1;
                nextBtn.innerHTML = `
                    <span>${isLast ? 'View Results' : 'Next Question'}</span>
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                `;
            } else {
                // Next Question State
                currentIdx++;
                if (currentIdx < total) {
                    renderQuestion();
                } else {
                    // Show final score results screen
                    playScreen.classList.add('hidden');
                    resultScreen.classList.remove('hidden');
                    scoreText.innerText = `${score} / ${total}`;
                }
            }
        });
    }

    if (finishBtn) {
        finishBtn.addEventListener('click', () => {
            localStorage.setItem('quiz_completed', 'true');
            showToast('Congratulations on finishing the quiz!', 'success');
            setTimeout(() => {
                window.location.href = 'roadmap.html';
            }, 800);
        });
    }

    // Initialize
    renderQuestion();
});
