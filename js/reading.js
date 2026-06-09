const wordData = {
    'Cognitive Load': {
        definition: 'The total amount of mental effort being used in the working memory during learning or task execution.',
        example: 'Instructional designers aim to minimize extraneous cognitive load to help students focus on the actual content.',
        ipa: '/ˈkɒɡ.nə.tɪv loʊd/'
    },
    'Simultaneous Processing': {
        definition: 'The ability of the brain to organize and integrate multiple pieces of information concurrently.',
        example: 'Expert readers engage in simultaneous processing of syntax and semantic meaning without conscious effort.',
        ipa: '/ˌsɪm.əlˈteɪ.ni.əs ˈprəʊ.ses.ɪŋ/'
    },
    'Gestalt Principles': {
        definition: 'Laws of human perception that describe how humans naturally organize visual elements into groups or unified wholes.',
        example: 'Using consistent spacing between related items follows the Gestalt principle of proximity.',
        ipa: '/ɡəˈʃtælt ˈprɪn.sə.pəlz/'
    },
    'Lexical': {
        definition: 'Relating to the words, vocabulary, or the set of all words in a language.',
        example: 'Students with a strong lexical foundation find it easier to comprehend advanced technical journals.',
        ipa: '/ˈlek.sɪ.kəl/'
    },
    'Fitts’s Law': {
        definition: 'A model of human movement that predicts the time required to rapidly move to a target area is a function of the distance to the target and the size of the target.',
        example: 'In UI design, Fitts’s Law explains why large, centrally located buttons are easier for users to click.',
        ipa: '/fɪts lɔː/'
    }
};

let currentSelectedWord = '';

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

window.showWord = function(word) {
    const data = wordData[word];
    const container = document.getElementById('word-def-box');
    const title = document.getElementById('current-word');
    const pronunciation = document.getElementById('word-pronunciation');
    const definition = document.getElementById('word-definition');
    const example = document.getElementById('word-example');
    const card = document.getElementById('explanation-card');

    if (!data || !container) return;

    currentSelectedWord = word;

    // Smooth visual feedback
    card.classList.add('bg-primary/5', 'border-primary/50');
    
    setTimeout(() => {
        title.innerText = word;
        pronunciation.innerText = data.ipa;
        definition.innerText = data.definition;
        example.innerText = data.example;
        container.classList.remove('hidden');
        card.classList.remove('bg-primary/5', 'border-primary/50');
        showToast(`Đã tra cứu từ: "${word}"`, 'success');
    }, 100);
};

// ----------------------------------------
// Save to Lexicon Action
// ----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('save-to-lexicon-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (currentSelectedWord) {
                showToast(`Đã lưu "${currentSelectedWord}" vào Sổ tay từ vựng thành công!`, 'success');
            }
        });
    }

    // ----------------------------------------
    // Comprehension Quiz Answers Validation
    // ----------------------------------------
    const submitBtn = document.getElementById('submit-answers-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const selectedRadio = document.querySelector('input[name="q1"]:checked');
            if (!selectedRadio) {
                showToast('Vui lòng chọn một đáp án trước khi nộp bài!', 'error');
                return;
            }

            if (selectedRadio.value === 'correct') {
                localStorage.setItem('reading_completed', 'true');
                showToast('Chính xác! Bạn đã nắm vững mục tiêu của việc giảm thiểu extraneous load. Đã mở khóa chặng Quiz trên Roadmap! +50 XP', 'success');
            } else {
                showToast('Chưa đúng rồi. Hãy đọc kỹ lại đoạn văn đầu tiên để tìm câu trả lời chính xác.', 'error');
            }
        });
    }

    // ----------------------------------------
    // Scroll-based Reading Progress Calculation
    // ----------------------------------------
    const progressPercentageText = document.getElementById('progress-percentage');
    const progressBarFill = document.getElementById('progress-bar-fill');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        
        const scrollRange = scrollHeight - clientHeight;
        if (scrollRange <= 0) return;

        let percentage = Math.round((scrollTop / scrollRange) * 100);
        percentage = Math.min(Math.max(percentage, 0), 100); // Clamp between 0 and 100

        if (progressPercentageText) {
            progressPercentageText.innerText = `${percentage}%`;
        }
        if (progressBarFill) {
            progressBarFill.style.width = `${percentage}%`;
        }
    });
});
