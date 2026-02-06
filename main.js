document.addEventListener('DOMContentLoaded', () => {
    const screens = {
        start: document.getElementById('start-screen'),
        quiz: document.getElementById('quiz-screen'),
        end: document.getElementById('end-screen'),
        contact: document.getElementById('contact-screen'), // Add contact screen
    };

    const buttons = {
        startCouple: document.getElementById('start-couple-btn'),
        startFriend: document.getElementById('start-friend-btn'),
        restart: document.getElementById('restart-btn'),
        langKR: document.getElementById('lang-kr'),
        langEN: document.getElementById('lang-en'),
        contact: document.getElementById('contact-btn'), // Add contact button
        backToStart: document.getElementById('back-to-start-btn'), // Add back to start button
    };

    const elements = {
        questionTitle: document.getElementById('question-title'),
        optionsContainer: document.getElementById('options-container'),
        progressBar: document.getElementById('progress-bar'),
    };

    let currentLanguage = 'kr';
    let currentGameMode = ''; // 'couple' or 'friend'
    let currentQuestionIndex = 0;
    let questions = [];

    const langData = {
        kr: {
            mainTitle: "궁극의 밸런스 게임",
            mainDescription: "커플, 친구와 함께 당신의 취향을 알아보세요!",
            coupleButton: "커플 밸런스 게임",
            friendButton: "우정 밸런스 게임",
            questionTitle: "둘 중 하나만 선택하세요!",
            endTitle: "게임 종료!",
            endDescription: "재미있었나요? 다시 플레이하며 서로에 대해 더 깊이 알아보세요.",
            restartButton: "다시하기",
            contactButton: "문의하기", // New
            contactTitle: "문의하기", // New
            contactDescription: "궁금한 점이나 제안할 사항이 있으시면 메시지를 남겨주세요.", // New
            contactNameLabel: "이름", // New
            contactEmailLabel: "이메일", // New
            contactMessageLabel: "메시지", // New
            contactSubmitButton: "보내기", // New
            backToStartButton: "처음으로", // New
            messageSent: "메시지가 성공적으로 전송되었습니다!", // New for feedback
            messageError: "메시지 전송에 실패했습니다. 다시 시도해 주세요.", // New for feedback
        },
        en: {
            mainTitle: "The Ultimate Balance Game",
            mainDescription: "For couples, for friends. Discover your preferences!",
            coupleButton: "Couple Balance Game",
            friendButton: "Friendship Balance Game",
            questionTitle: "Choose only one!",
            endTitle: "Game Over!",
            endDescription: "Did you have fun? You can play again to get to know each other better.",
            restartButton: "Play Again",
            contactButton: "Contact Us", // New
            contactTitle: "Contact Us", // New
            contactDescription: "If you have any questions or suggestions, please leave us a message.", // New
            contactNameLabel: "Name", // New
            contactEmailLabel: "Email", // New
            contactMessageLabel: "Message", // New
            contactSubmitButton: "Send", // New
            backToStartButton: "Back to Start", // New
            messageSent: "Message sent successfully!", // New for feedback
            messageError: "Failed to send message. Please try again.", // New for feedback
        }
    };

    const quizData = {
        couple: {
            kr: [
                { q: "평생 문자만 vs 평생 전화만", a: ["평생 문자만", "평생 전화만"] },
                { q: "깻잎 논쟁 vs 새우 논쟁", a: ["깻잎 논쟁", "새우 논쟁"] },
                { q: "1시간 일찍 와서 기다리기 vs 1시간 늦게 가기", a: ["1시간 일찍 와서 기다리기", "1시간 늦게 가기"] },
                { q: "월 500 받는 백수 애인 vs 월 200 받는 직장인 애인", a: ["월 500 백수 애인", "월 200 직장인 애인"] },
                { q: "내 친구랑 바람피우기 vs 친구의 애인이랑 바람피우기", a: ["내 친구랑 바람피우기", "친구의 애인이랑 바람피우기"] },
            ],
            en: [
                { q: "Texting only for life vs Calling only for life", a: ["Texting only", "Calling only"] },
                { q: "The perilla leaf debate vs The shrimp peeling debate", a: ["Perilla leaf debate", "Shrimp peeling debate"] },
                { q: "Arriving an hour early vs Arriving an hour late", a: ["Arrive 1h early", "Arrive 1h late"] },
                { q: "Unemployed partner earning $5000/month vs Employed partner earning $2000/month", a: ["Unemployed $5k", "Employed $2k"] },
                { q: "Cheat on me with my friend vs Cheat on your friend with me", a: ["Cheat with my friend", "Cheat on your friend"] },
            ]
        },
        friend: {
            kr: [
                { q: "더 싫은 친구: 약속시간 안 지키는 친구 vs 돈 안 갚는 친구", a: ["약속 안 지키는 친구", "돈 안 갚는 친구"] },
                { q: "여행 스타일: 즉흥 여행 vs 계획 여행", a: ["즉흥 여행", "계획 여행"] },
                { q: "내가 쏜다! 비싼 밥 사주기 vs 비싼 선물 사주기", a: ["비싼 밥 사주기", "비싼 선물 사주기"] },
                { q: "평생 한 명의 친구만 사귀기 vs 매년 새로운 친구 사귀기", a: ["평생 한 명의 친구", "매년 새로운 친구"] },
                { q: "친구의 전 애인과 사귀기 vs 전 애인의 친구와 사귀기", a: ["친구의 전 애인과 사귀기", "전 애인의 친구와 사귀기"] },
            ],
            en: [
                { q: "Worse friend: Always late vs Never pays back", a: ["Always late", "Never pays back"] },
                { q: "Travel style: Spontaneous vs Planned", a: ["Spontaneous trip", "Planned trip"] },
                { q: "My treat! Buying an expensive meal vs Buying an expensive gift", a: ["Expensive meal", "Expensive gift"] },
                { q: "One friend for life vs New friends every year", a: ["One friend for life", "New friends every year"] },
                { q: "Date your friend\'s ex vs Date your ex\'s friend", a: ["Date friend\'s ex", "Date ex\'s friend"] },
            ]
        }
    };

    const setLanguage = (lang) => {
        currentLanguage = lang;
        document.documentElement.lang = lang;
        buttons.langKR.classList.toggle('active', lang === 'kr');
        buttons.langEN.classList.toggle('active', lang === 'en');

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            if (langData[lang][key]) {
                el.textContent = langData[lang][key];
            }
        });

        // If quiz is active, re-display the question in the new language
        if (screens.quiz.classList.contains('active')) {
            questions = quizData[currentGameMode][currentLanguage];
            displayQuestion();
        }
    };

    const showScreen = (screenId) => {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenId].classList.add('active');
    };

    const startGame = (mode) => {
        currentGameMode = mode;
        currentQuestionIndex = 0;
        questions = quizData[mode][currentLanguage];
        elements.progressBar.className = ``;
        void elements.progressBar.offsetWidth; // Trigger reflow
        elements.progressBar.classList.add(mode);

        displayQuestion();
        showScreen('quiz');
    };

    const displayQuestion = () => {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            elements.questionTitle.textContent = langData[currentLanguage].questionTitle;
            elements.optionsContainer.innerHTML = '';

            const questionText = document.createElement('p');
            questionText.textContent = question.q;
            questionText.className = 'question-text';
            elements.optionsContainer.appendChild(questionText);

            const optionButtons = document.createElement('div');
            optionButtons.className = 'option-buttons';

            question.a.forEach(optionText => {
                const button = document.createElement('button');
                button.textContent = optionText;
                button.classList.add('option-btn', currentGameMode);
                button.addEventListener('click', () => {
                    currentQuestionIndex++;
                    displayQuestion();
                });
                optionButtons.appendChild(button);
            });
            elements.optionsContainer.appendChild(optionButtons);

            updateProgress();
        } else {
            showScreen('end');
        }
    };

    const updateProgress = () => {
        const progress = (currentQuestionIndex / questions.length) * 100;
        elements.progressBar.style.width = `${progress}%`;
    };

    buttons.startCouple.addEventListener('click', () => startGame('couple'));
    buttons.startFriend.addEventListener('click', () => startGame('friend'));
    buttons.restart.addEventListener('click', () => showScreen('start'));
    buttons.langKR.addEventListener('click', () => setLanguage('kr'));
    buttons.langEN.addEventListener('click', () => setLanguage('en'));

    buttons.contact.addEventListener('click', () => showScreen('contact')); // New
    buttons.backToStart.addEventListener('click', () => showScreen('start')); // New

    // Handle form submission for feedback
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formStatusMessage = document.createElement('p');
            formStatusMessage.className = 'form-status';
            contactForm.appendChild(formStatusMessage);

            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatusMessage.textContent = langData[currentLanguage].messageSent;
                    formStatusMessage.style.color = 'green';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        formStatusMessage.textContent = data.errors.map(error => error.message).join(', ');
                    } else {
                        formStatusMessage.textContent = langData[currentLanguage].messageError;
                    }
                    formStatusMessage.style.color = 'red';
                }
            } catch (error) {
                formStatusMessage.textContent = langData[currentLanguage].messageError;
                formStatusMessage.style.color = 'red';
            }
            // Remove status message after a few seconds
            setTimeout(() => {
                formStatusMessage.remove();
            }, 5000);
        });
    }

    // Initial setup
    setLanguage('kr');
    showScreen('start');
});
