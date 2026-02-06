document.addEventListener('DOMContentLoaded', () => {
    const screens = {
        start: document.getElementById('start-screen'),
        quiz: document.getElementById('quiz-screen'),
        end: document.getElementById('end-screen'),
        contact: document.getElementById('contact-screen'), // Add contact screen
        results: document.getElementById('results-screen'), // Add results screen
    };

    const buttons = {
        startCouple: document.getElementById('start-couple-btn'),
        startFriend: document.getElementById('start-friend-btn'),
        restart: document.getElementById('restart-btn'),
        langKR: document.getElementById('lang-kr'),
        langEN: document.getElementById('lang-en'),
        backToStart: document.getElementById('back-to-start-btn'), // Add back to start button
        restartQuiz: document.getElementById('restart-quiz-btn'), // Add restart quiz button
        footerContact: document.getElementById('footer-contact-btn'), // New footer contact button
        footerComments: document.getElementById('footer-comments-btn'), // New footer comments button
    };

    const elements = {
        questionTitle: document.getElementById('question-title'),
        optionsContainer: document.getElementById('options-container'),
        progressBar: document.getElementById('progress-bar'),
        resultTitle: document.getElementById('result-title'), // New
        resultDescription: document.getElementById('result-description'), // New
        resultImage: document.getElementById('result-image'), // New
    };

    let currentLanguage = 'kr';
    let currentGameMode = ''; // 'couple' or 'friend'
    let currentQuestionIndex = 0;
    let questions = [];
    let totalScore = 0; // Track the score for personality test


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
            resultLaidBackTitle: "당신은 무던한 스타일!", // New
            resultLaidBackDescription: "당신은 어떤 상황에서도 평온함을 유지하며, 유연하고 개방적인 태도를 가지고 있습니다. 쉽게 화내지 않고 주변 사람들을 편안하게 해주는 매력이 있어요.", // New
            resultJealousTitle: "당신은 질투 많은 스타일!", // New
            resultJealousDescription: "당신은 관계에 대한 애착이 강하고, 소중한 것을 지키려는 마음이 큽니다. 이는 때로 질투로 나타나기도 하지만, 그만큼 열정적이고 깊은 사랑을 가지고 있다는 증거이기도 합니다.", // New
            commentsButton: "댓글 보기/숨기기", // New


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
            resultLaidBackTitle: "You are Laid-back Style!", // New
            resultLaidBackDescription: "You maintain calmness in any situation, with a flexible and open attitude. You rarely get angry and have a charm that makes people around you comfortable.", // New
            resultJealousTitle: "You are Jealous Style!", // New
            resultJealousDescription: "You have strong attachments to relationships and a great desire to protect what is precious to you. This sometimes manifests as jealousy, but it is also a sign of your passionate and deep love.", // New
            commentsButton: "Show/Hide Comments", // New


        }
    };

    const quizData = {
        couple: {
            kr: [
                { q: "평생 문자만 vs 평생 전화만", a: [{ text: "평생 문자만", score: -1 }, { text: "평생 전화만", score: 1 }] },
                { q: "깻잎 논쟁 vs 새우 논쟁", a: [{ text: "깻잎 논쟁", score: 1 }, { text: "새우 논쟁", score: -1 }] },
                { q: "1시간 일찍 와서 기다리기 vs 1시간 늦게 가기", a: [{ text: "1시간 일찍 와서 기다리기", score: 1 }, { text: "1시간 늦게 가기", score: -1 }] },
                { q: "월 500 받는 백수 애인 vs 월 200 받는 직장인 애인", a: [{ text: "월 500 백수 애인", score: 1 }, { text: "월 200 직장인 애인", score: -1 }] },
                { q: "내 친구랑 바람피우기 vs 친구의 애인이랑 바람피우기", a: [{ text: "내 친구랑 바람피우기", score: 1 }, { text: "친구의 애인이랑 바람피우기", score: -1 }] },
            ],
            en: [
                { q: "Texting only for life vs Calling only for life", a: [{ text: "Texting only", score: -1 }, { text: "Calling only", score: 1 }] },
                { q: "The perilla leaf debate vs The shrimp peeling debate", a: [{ text: "Perilla leaf debate", score: 1 }, { text: "Shrimp peeling debate", score: -1 }] },
                { q: "Arriving an hour early vs Arriving an hour late", a: [{ text: "Arrive 1h early", score: 1 }, { text: "Arrive 1h late", score: -1 }] },
                { q: "Unemployed partner earning $5000/month vs Employed partner earning $2000/month", a: [{ text: "Unemployed $5k", score: 1 }, { text: "Employed $2k", score: -1 }] },
                { q: "Cheat on me with my friend vs Cheat on your friend with me", a: [{ text: "Cheat with my friend", score: 1 }, { text: "Cheat on your friend", score: -1 }] },
            ]
        },
        friend: {
            kr: [
                { q: "더 싫은 친구: 약속시간 안 지키는 친구 vs 돈 안 갚는 친구", a: [{ text: "약속 안 지키는 친구", score: -1 }, { text: "돈 안 갚는 친구", score: 1 }] },
                { q: "여행 스타일: 즉흥 여행 vs 계획 여행", a: [{ text: "즉흥 여행", score: -1 }, { text: "계획 여행", score: 1 }] },
                { q: "내가 쏜다! 비싼 밥 사주기 vs 비싼 선물 사주기", a: [{ text: "비싼 밥 사주기", score: -1 }, { text: "비싼 선물 사주기", score: 1 }] },
                { q: "평생 한 명의 친구만 사귀기 vs 매년 새로운 친구 사귀기", a: [{ text: "평생 한 명의 친구", score: 1 }, { text: "매년 새로운 친구", score: -1 }] },
                { q: "친구의 전 애인과 사귀기 vs 전 애인의 친구와 사귀기", a: [{ text: "친구의 전 애인과 사귀기", score: 1 }, { text: "전 애인의 친구와 사귀기", score: -1 }] },
            ],
            en: [
                { q: "Worse friend: Always late vs Never pays back", a: [{ text: "Always late", score: -1 }, { text: "Never pays back", score: 1 }] },
                { q: "Travel style: Spontaneous vs Planned", a: [{ text: "Spontaneous trip", score: -1 }, { text: "Planned trip", score: 1 }] },
                { q: "My treat! Buying an expensive meal vs Buying an expensive gift", a: [{ text: "Expensive meal", score: -1 }, { text: "Expensive gift", score: 1 }] },
                { q: "One friend for life vs New friends every year", a: [{ text: "One friend for life", score: 1 }, { text: "New friends every year", score: -1 }] },
                { q: "Date your friend\'s ex vs Date your ex\'s friend", a: [{ text: "Date friend\'s ex", score: 1 }, { text: "Date ex\'s friend", score: -1 }] },
            ]
        }
    };

    const resultImages = {
        laidBack: 'https://via.placeholder.com/400x250/82b1ff/ffffff?text=Laid-Back+Style', // Placeholder image for Laid-Back
        jealous: 'https://via.placeholder.com/400x250/ffb382/ffffff?text=Jealous+Style', // Placeholder image for Jealous
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

            question.a.forEach(option => { // option is now an object {text, score}
                const button = document.createElement('button');
                button.textContent = option.text;
                button.classList.add('option-btn', currentGameMode);
                button.addEventListener('click', () => {
                    totalScore += option.score; // Update total score
                    currentQuestionIndex++;
                    displayQuestion();
                });
                optionButtons.appendChild(button);
            });
            elements.optionsContainer.appendChild(optionButtons);

            updateProgress();
        } else {
            displayResult(); // Call displayResult when quiz ends
        }
    };

    const updateProgress = () => {
        const progress = (currentQuestionIndex / questions.length) * 100;
        elements.progressBar.style.width = `${progress}%`;
    };

    const displayResult = () => {
        let resultType = '';
        let resultTitleKey = '';
        let resultDescriptionKey = '';
        let resultImageSrc = '';

        if (totalScore >= 0) { // Assuming 0 or positive score means jealous style
            resultType = 'jealous';
            resultTitleKey = 'resultJealousTitle';
            resultDescriptionKey = 'resultJealousDescription';
            resultImageSrc = resultImages.jealous;
        } else { // Negative score means laid-back style
            resultType = 'laidBack';
            resultTitleKey = 'resultLaidBackTitle';
            resultDescriptionKey = 'resultLaidBackDescription';
            resultImageSrc = resultImages.laidBack;
        }

        elements.resultTitle.textContent = langData[currentLanguage][resultTitleKey];
        elements.resultDescription.textContent = langData[currentLanguage][resultDescriptionKey];
        elements.resultImage.src = resultImageSrc;
        elements.resultImage.alt = langData[currentLanguage][resultTitleKey]; // Set alt text for accessibility

        showScreen('results');
    };


    buttons.startCouple.addEventListener('click', () => startGame('couple'));
    buttons.startFriend.addEventListener('click', () => startGame('friend'));
    buttons.restart.addEventListener('click', () => showScreen('start'));
    buttons.langKR.addEventListener('click', () => setLanguage('kr'));
    buttons.langEN.addEventListener('click', () => setLanguage('en'));


    buttons.backToStart.addEventListener('click', () => showScreen('start')); // New
    buttons.restartQuiz.addEventListener('click', () => showScreen('start')); // New
    buttons.footerContact.addEventListener('click', () => showScreen('contact')); // New footer contact button
    buttons.footerComments.addEventListener('click', () => { // New footer comments button
        const disqusThread = document.getElementById('disqus_thread');
        if (disqusThread) {
            disqusThread.style.display = disqusThread.style.display === 'none' ? 'block' : 'none';
        }
    });


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
