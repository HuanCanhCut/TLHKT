// Spaced Repetition / Active Learning Words Database (Cognitive Psychology Theme)
const words = [
    {
        word: 'Psychology',
        ipa: '/saɪˈkɒlədʒi/',
        type: 'NOUN',
        vietnamese: 'Tâm lý học',
        definition: 'The scientific study of the human mind and its functions, especially those affecting behavior in a given context.',
        example: 'Engineering psychology studies human behavior.',
        exampleVi: 'Tâm lý học kỹ thuật nghiên cứu hành vi con người.',
        image: 'https://lh3.googleusercontent.com/aida/AP1WRLs2XIxh706UAt-NnViG609JjTryusOYS9YWHjqe-90_UpHNSrjaxmvX5yklBATjY02ofGTQtK0eimlJKmIS7JhG6KwqUpVSqq_52C6KOOrwY6beKOwLgjYBF73L-pIhId_JSfYHAeILjmWEJtuSLBNN9weXmM1LWlgEqMD7P0ZE1LOON6GgHebl3ovx2Mfhl87RVOaONNdf6_RyDfJxMEF02B0ArqzorJ9tiBWDRfKpyl1ZAf3a7k9qjlY'
    },
    {
        word: 'Cognitive Load',
        ipa: '/ˈkɒɡ.nə.tɪv loʊd/',
        type: 'NOUN',
        vietnamese: 'Quá tải nhận thức',
        definition: 'The total amount of mental effort being used in the working memory during learning or task execution.',
        example: 'Instructional designers aim to minimize extraneous cognitive load.',
        exampleVi: 'Các nhà thiết kế bài giảng đặt mục tiêu giảm thiểu quá tải nhận thức không liên quan.',
        image: 'https://lh3.googleusercontent.com/aida/AP1WRLuMPuGz3FJBZhflPBevrlzV3zZZuztGq0Y3yDszSeyZx0_KUjlFnqqa3jOdPbpScdA3djAkaFhGzW3pWGcbKqJXJstWlV5OtkxXi-_7CxmG7hI71S6C-ozK52Ap3FJ0437cDr7T3BAEwsBIPH3Nv-8cFxw_Bgmp6WP5O2RX-G5bKQ1VNzxsSQrzA8xRWmvGBy-o0SYfFapgGZqB4Bq1cbyc4TpbXv-lPr752cC5hf3_ijwYh3Fn3f8XT9M'
    },
    {
        word: 'Gestalt Principles',
        ipa: '/ɡəˈʃtælt ˈprɪn.sə.pəlz/',
        type: 'NOUN',
        vietnamese: 'Nguyên lý Gestalt',
        definition: 'Laws of human perception that describe how humans naturally organize visual elements into groups or unified wholes.',
        example: 'Spacing between elements follows the Gestalt principle of proximity.',
        exampleVi: 'Khoảng cách giữa các phần tử tuân theo nguyên lý tiệm cận của Gestalt.',
        image: 'https://lh3.googleusercontent.com/aida/AP1WRLtxnlvJcYjByUIsx2U1LmaGcMttCU6ncsp0Jqfj28srPbR_lGmMVP0TY86uKC-7UMuyQJURDWe91vVspTFKYzuK1T9njfwJoeRPa60PmCMPF0j0x34afKS0iy1FcsVDhH-SilNWtqzjxC_U6_jmToaZvEhxL-yrf_t_cZOAsxK-VwDFThYImzm58g-2B2gBLG_0ZKoJqC_DbRldzY_d3XEViNGYMCLZbHuFgxyXVJG6WR07xn-oom6rbA'
    },
    {
        word: 'Fitts’s Law',
        ipa: '/fɪts lɔː/',
        type: 'NOUN',
        vietnamese: 'Định luật Fitts',
        definition: 'A model of human movement predicting that the time required to move to a target is a function of target distance and size.',
        example: 'Fitts’s Law explains why large, centrally located buttons are easier to click.',
        exampleVi: 'Định luật Fitts giải thích lý do tại sao các nút lớn ở trung tâm lại dễ bấm hơn.',
        image: 'https://lh3.googleusercontent.com/aida/AP1WRLsFrZAMmyk6_-FeAeS5wqt_sjyp62UFWMjcTh9oj4xYV8jmrb8eN2Stpm4bhtY1RsaiRPt8VcDymI6rkyDA9GDla2nLQmNIOSPbXd8oSmUbnLSG5L5dEwS_1aPX-lS9uJCAX9dD35hfY_Gly5TIPZfNpJd8rBYoZHXKJ8K8NVzQJoLYKrAgOuelANsGlrIKyMYYpj0H_klrORAiqkAF0aiXcuHZ_WeK3XY4gwubhqXxxDPJhVVg-aIeDVE'
    }
];

let currentIndex = 0;
const flashcard = document.getElementById('flashcard');
const flipBtn = document.getElementById('flipBtn');
const nextBtn = document.getElementById('nextBtn');

// Progress Elements
const progressText = document.querySelector('header .text-on-surface-variant span') || document.querySelector('header .font-label-md.text-label-md');
const progressBar = document.querySelector('header .bg-secondary');

// Evaluation Level Buttons (Spaced Repetition System)
const btnEasy = document.getElementById('btn-easy');
const btnMedium = document.getElementById('btn-medium');
const btnHard = document.getElementById('btn-hard');

// Determine if we are in Evaluation mode (3 feedback buttons exist)
const isEvaluationMode = !!btnEasy;

function toggleFlip() {
    if (flashcard) {
        flashcard.classList.toggle('flashcard-flipped');
    }
}

// Play TTS audio (Pronunciation sound)
window.playPronunciation = function(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.85; // slightly slower for clarity
        window.speechSynthesis.speak(utterance);
    } else {
        console.warn('TTS is not supported in this browser.');
    }
};

// Bind Volume Up button clicks on front side
function bindAudioButtons() {
    const audioBtn = document.querySelector('#flashcard .flashcard-front button');
    if (audioBtn) {
        audioBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playPronunciation(words[currentIndex].word);
        });
    }
}

function updateFlashcardDOM() {
    if (!flashcard) return;
    
    const wordData = words[currentIndex];
    
    // Front elements
    const frontImg = flashcard.querySelector('.flashcard-front img');
    const frontWord = flashcard.querySelector('.flashcard-front h1');
    const frontIpa = flashcard.querySelector('.flashcard-front span');
    
    if (frontImg) frontImg.src = wordData.image;
    if (frontWord) frontWord.innerText = wordData.word;
    if (frontIpa) frontIpa.innerText = wordData.ipa;
    
    // Back elements
    if (isEvaluationMode) {
        const backWord = flashcard.querySelector('.flashcard-back h2');
        const backTranslation = flashcard.querySelector('.flashcard-back p');
        const backExampleEn = flashcard.querySelector('.flashcard-back .bg-surface-container-lowest p:nth-child(2)');
        const backExampleVi = flashcard.querySelector('.flashcard-back .bg-surface-container-lowest p:nth-child(3)');
        
        if (backWord) backWord.innerText = wordData.word;
        if (backTranslation) backTranslation.innerText = wordData.vietnamese;
        if (backExampleEn) backExampleEn.innerText = wordData.example;
        if (backExampleVi) backExampleVi.innerText = wordData.exampleVi;
    } else {
        const backType = flashcard.querySelector('.flashcard-back span.bg-tertiary-fixed');
        const backTranslation = flashcard.querySelector('.flashcard-back h2');
        const backDefinition = flashcard.querySelector('.flashcard-back .bg-surface-container-lowest p');
        const backExampleEn = flashcard.querySelector('.flashcard-back .text-left.space-y-xs p:nth-child(2)');
        
        if (backType) backType.innerText = wordData.type;
        if (backTranslation) backTranslation.innerText = wordData.vietnamese;
        if (backDefinition) backDefinition.innerText = `"${wordData.definition}"`;
        if (backExampleEn) backExampleEn.innerText = `"${wordData.example}"`;
    }
    
    // Update Header progress
    if (progressText) {
        progressText.innerText = `${currentIndex + 1} / ${words.length}`;
    }
    if (progressBar) {
        progressBar.style.width = `${((currentIndex + 1) / words.length) * 100}%`;
    }
    
    bindAudioButtons();
}

function handleNextCard() {
    if (!flashcard) return;
    
    // Smooth translation effect (Cognitive Ergonomics: Slide Out)
    const container = flashcard.parentElement;
    container.classList.add('transition-all', 'duration-300', 'translate-x-[100%]', 'opacity-0');
    
    setTimeout(() => {
        // Increment Index
        currentIndex = (currentIndex + 1) % words.length;
        
        // Reset card flip and update contents
        flashcard.classList.remove('flashcard-flipped');
        updateFlashcardDOM();
        
        container.style.transition = 'none';
        container.classList.remove('translate-x-[100%]');
        container.classList.add('translate-x-[-100%]');
        
        setTimeout(() => {
            container.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            container.classList.remove('translate-x-[-100%]', 'opacity-0');
        }, 50);
    }, 300);
}

// Initial binding
if (flashcard) {
    flashcard.addEventListener('click', toggleFlip);
    updateFlashcardDOM();
}

if (flipBtn) {
    flipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFlip();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', handleNextCard);
}

// Evaluation Mode Buttons Logic (Spaced Repetition Feedback)
if (isEvaluationMode) {
    [btnEasy, btnMedium, btnHard].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                // Show a quick micro-feedback overlay or transition
                btn.classList.add('scale-95');
                setTimeout(() => {
                    btn.classList.remove('scale-95');
                    handleNextCard();
                }, 150);
            });
        }
    });
}

// Keyboard shortcuts for efficiency
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        toggleFlip();
    }
    if (e.code === 'ArrowRight' || e.code === 'Enter') {
        handleNextCard();
    }
});
