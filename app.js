/* ==========================================================================
   SATVIK WALLPAPER - INTERACTIVE LOGIC & SYNTHESIZER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Particles Background
    initParticles();

    // 2. Initialize Hero Screen Carousel
    initMockupCarousel();

    // 3. Initialize Modal Functionality
    initModals();

    // 4. Initialize Ringtone Audio Player & Synthesizer
    initRingtonePlayer();

    // 5. Initialize Navigation Scroll Effects
    initNavScroll();
});

/* ==========================================================================
   1. BACKGROUND PARTICLE SYSTEM
   ========================================================================== */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random sizes, positions, and animation delays
    const size = Math.random() * 8 + 4; // 4px to 12px
    const left = Math.random() * 100; // 0% to 100%
    const duration = Math.random() * 10 + 8; // 8s to 18s
    const delay = Math.random() * -15; // Negative delay to start immediately
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
}

/* ==========================================================================
   2. HERO PHONE CAROUSEL
   ========================================================================== */
function initMockupCarousel() {
    const images = document.querySelectorAll('.screen-carousel .screen-img');
    const dots = document.querySelectorAll('.footer-dots .dot');
    let currentIndex = 0;
    let timer;

    if (images.length === 0) return;

    function showSlide(index) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        images[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() {
        let next = (currentIndex + 1) % images.length;
        showSlide(next);
    }

    function startTimer() {
        timer = setInterval(nextSlide, 3500);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }

    // Dot navigation
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
            resetTimer();
        });
    });

    startTimer();
}

/* ==========================================================================
   3. POLICY & CONTACT MODALS
   ========================================================================== */
function initModals() {
    const backdrop = document.getElementById('modal-backdrop');
    const closeButtons = document.querySelectorAll('.modal-close-btn');
    
    // Modal definitions
    const modals = {
        about: {
            trigger: document.getElementById('open-about'),
            card: document.getElementById('modal-about')
        },
        contact: {
            trigger: document.getElementById('open-contact'),
            card: document.getElementById('modal-contact')
        },
        privacy: {
            trigger: document.getElementById('open-privacy'),
            card: document.getElementById('modal-privacy')
        },
        terms: {
            trigger: document.getElementById('open-terms'),
            card: document.getElementById('modal-terms')
        },
        copyright: {
            trigger: document.getElementById('open-copyright'),
            card: document.getElementById('modal-copyright')
        }
    };

    // Open Modal Handlers
    Object.keys(modals).forEach(key => {
        const modal = modals[key];
        if (modal.trigger && modal.card) {
            modal.trigger.addEventListener('click', () => {
                closeAllModals();
                backdrop.classList.add('active');
                modal.card.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop page scrolling
            });
        }
    });

    // Close on backdrop click
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            closeAllModals();
        });
    }

    // Close on 'x' buttons
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    function closeAllModals() {
        if (backdrop) backdrop.classList.remove('active');
        Object.keys(modals).forEach(key => {
            if (modals[key].card) {
                modals[key].card.classList.remove('active');
            }
        });
        const lightbox = document.getElementById('lightbox-modal');
        if (lightbox) lightbox.classList.remove('active');
        
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Wallpaper Lightbox functionality
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxDownloadLink = document.getElementById('lightbox-download-link');
    const openLightboxBtns = document.querySelectorAll('.open-lightbox-btn');
    const lightboxCloseBtn = document.querySelector('.lightbox-close-btn');

    if (lightbox && openLightboxBtns.length > 0) {
        openLightboxBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const imgUrl = btn.getAttribute('data-target');
                const titleName = btn.getAttribute('data-name');
                
                lightboxImage.src = imgUrl;
                lightboxCaption.textContent = titleName;
                lightboxDownloadLink.href = imgUrl;
                lightboxDownloadLink.download = `Satvik_${titleName.replace(/\s+/g, '_')}_Wallpaper.png`;

                lightbox.classList.add('active');
                backdrop.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (lightboxCloseBtn) {
            lightboxCloseBtn.addEventListener('click', () => {
                closeAllModals();
            });
        }
    }

    // Contact Form submission logic
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('contact-success');
    
    if (contactForm && successMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Perform basic validation checks
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-msg').value.trim();

            if (name && email && message) {
                // Simulate sending (animation/delay)
                const submitBtn = document.getElementById('contact-submit-btn');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending Message...';

                setTimeout(() => {
                    contactForm.classList.add('hidden');
                    successMsg.classList.remove('hidden');
                    
                    // Reset form fields
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }, 1200);
            }
        });
    }
}

/* ==========================================================================
   4. RINGTONE AUDIO PLAYER & WEB AUDIO SYNTHESIZER
   ========================================================================== */
function initRingtonePlayer() {
    let audioCtx = null;
    let synthTimer = null;
    let playingCardId = null;
    let synthIntervalId = null;
    let progressIntervalId = null;
    let duration = 0;
    let currentTime = 0;

    const playButtons = document.querySelectorAll('.ringtone-play-btn');

    // Synthesizer notes configurations for meditative melodies
    const melodies = {
        'shiva-tandav': {
            tempo: 140,
            duration: 32,
            scale: [110.00, 130.81, 146.83, 164.81, 196.00, 220.00], // Pentatonic Shiv / Bhairav-ish: A, C, D, E, G, A
            pattern: [0, 2, 3, 5, 4, 3, 2, 0, 3, 4, 5, 4, 3, 2, 3, 0]
        },
        'krishna-flute': {
            tempo: 80,
            duration: 45,
            scale: [293.66, 329.63, 392.00, 440.00, 493.88, 587.33], // D major pentatonic / Bhupali: D, E, G, A, B, D
            pattern: [0, 1, 2, 3, 4, 3, 2, 4, 5, 4, 3, 2, 1, 0, 2, 0]
        },
        'mahamrityunjaya': {
            tempo: 60,
            duration: 40,
            scale: [130.81, 146.83, 164.81, 196.00, 220.00, 261.63], // Deep C Major: C, D, E, G, A, C
            pattern: [0, 0, 2, 2, 3, 3, 4, 3, 2, 1, 0, 0, 4, 3, 0, 0]
        }
    };

    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playNote(freq, start, duration, type = 'sine') {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = type;
        osc.frequency.value = freq;
        
        // Custom sound shaping (envelope)
        gainNode.gain.setValueAtTime(0, start);
        if (type === 'triangle') {
            // breathy flute-like attack
            gainNode.gain.linearRampToValueAtTime(0.2, start + 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.001, start + duration - 0.05);
        } else {
            // chime or plucky attack
            gainNode.gain.linearRampToValueAtTime(0.15, start + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, start + duration - 0.02);
        }
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(start);
        osc.stop(start + duration);
    }

    function stopPlayback() {
        // Clear all timers and stop audio context synthesis loops
        if (synthIntervalId) clearInterval(synthIntervalId);
        if (progressIntervalId) clearInterval(progressIntervalId);
        
        playButtons.forEach(btn => {
            btn.querySelector('.play-svg').classList.remove('hidden');
            btn.querySelector('.pause-svg').classList.add('hidden');
        });
        
        if (playingCardId) {
            const progressFill = document.getElementById(`progress-${playingCardId}`);
            if (progressFill) progressFill.style.width = '0%';
        }
        
        playingCardId = null;
    }

    function startPlayback(id) {
        stopPlayback();
        
        playingCardId = id;
        const melody = melodies[id];
        duration = melody.duration;
        currentTime = 0;
        
        // Show pause icon on the clicked card
        const cardBtn = document.getElementById(`play-${id}`);
        cardBtn.querySelector('.play-svg').classList.add('hidden');
        cardBtn.querySelector('.pause-svg').classList.remove('hidden');

        // Play meditative synthesizer notes
        const ctx = getAudioContext();
        let step = 0;
        const stepTime = 60 / melody.tempo; // time of 1 beat in seconds
        
        // Sound styling depending on card
        let oscType = 'sine';
        if (id === 'krishna-flute') oscType = 'triangle'; // triangle has a smoother, flutey sound
        
        // Start play scheduling
        function scheduleNextNotes() {
            const lookAhead = 0.5; // schedule 500ms in advance
            const now = ctx.currentTime;
            
            // Rhythmic Bell Drone for Shiva / Mantra
            if (id === 'mahamrityunjaya' && step % 4 === 0) {
                // deep Om drone
                playNote(65.41, now, stepTime * 4, 'sine'); // Deep C
                // high temple bell
                playNote(1046.50, now, 0.8, 'sine'); // C6 chime
            }
            if (id === 'shiva-tandav' && step % 8 === 0) {
                // rhythmic percussion drone
                playNote(55.00, now, stepTime * 8, 'sawtooth'); // deep buzz
            }

            const scaleIndex = melody.pattern[step % melody.pattern.length];
            const frequency = melody.scale[scaleIndex];
            
            // Play main note
            playNote(frequency, now, stepTime * 0.9, oscType);
            
            step++;
        }

        // Run scheduling loop
        scheduleNextNotes();
        synthIntervalId = setInterval(() => {
            if (currentTime < duration) {
                scheduleNextNotes();
            }
        }, stepTime * 1000);

        // Update progress bar
        const progressFill = document.getElementById(`progress-${id}`);
        progressIntervalId = setInterval(() => {
            currentTime += 0.1;
            const percentage = (currentTime / duration) * 100;
            if (progressFill) progressFill.style.width = `${Math.min(percentage, 100)}%`;

            if (currentTime >= duration) {
                stopPlayback();
            }
        }, 100);
    }

    playButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cardId = btn.id.replace('play-', '');
            if (playingCardId === cardId) {
                stopPlayback();
            } else {
                startPlayback(cardId);
            }
        });
    });

    // Mock Download triggers
    const downloadBtns = document.querySelectorAll('.btn-ringtone-download');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const ringtoneName = btn.closest('.ringtone-card').querySelector('.ringtone-title').textContent;
            
            // Show dynamic premium download indicator
            const originalText = btn.innerHTML;
            btn.style.borderColor = '#4CAF50';
            btn.style.color = '#4CAF50';
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16" class="success-icon" style="color: #4CAF50">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Downloaded!</span>
            `;
            
            // Download triggering (simulated)
            const blob = new Blob([`Satvik Ringtone file content for: ${ringtoneName}`], { type: 'audio/mp3' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Satvik_${ringtoneName.replace(/\s+/g, '_')}.mp3`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
                btn.style.borderColor = '';
                btn.style.color = '';
                btn.innerHTML = originalText;
            }, 2000);
        });
    });
}

/* ==========================================================================
   5. NAVIGATION SCROLL EFFECTS
   ========================================================================== */
function initNavScroll() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    // Header scroll background toggle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Menu toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            if (isOpen) {
                mobileMenu.classList.remove('open');
            } else {
                mobileMenu.classList.add('open');
            }
        });

        // Close menu on navigation link clicks
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });
    }
}
