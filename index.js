// Target passcode key configured here
const CORRECT_PASSCODE = "1207";
let currentInput = "";

/**
 * Handle screen-to-screen application transitions
 * @param {string} screenId 
 */
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    document.getElementById(screenId).classList.add('active');

    const song = document.getElementById('loveSong');

    if (screenId === 'song-screen') {
        song.play();
    } else {
        song.pause();
        song.currentTime = 0;
    }
}

/**
 * Append numeric keystrokes up to 4 characters
 * @param {string} number 
 */
function pressKey(number) {
    if (currentInput.length < 4) {
        currentInput += number;
        updatePasscodeDisplay();
    }
    // Automated trigger evaluation when character max hits
    if (currentInput.length === 4) {
        setTimeout(checkPasscode, 300);
    }
}

/**
 * Reset layout buffer inputs
 */
function clearPasscode() {
    currentInput = "";
    updatePasscodeDisplay();
}

/**
 * Render standard view updates on keypad triggers
 */
function updatePasscodeDisplay() {
    const display = document.getElementById('passcode-display');
    if (currentInput === "") {
        display.innerText = "----";
    } else {
        display.innerText = currentInput.padEnd(4, '-');
    }
}

/**
 * Validate sequence matching configurations
 */
function checkPasscode() {
    if (currentInput === CORRECT_PASSCODE) {
        clearPasscode();
        navigateTo('dashboard-screen');
    } else {
        alert("Incorrect date! Try again, bebu. 💕");
        clearPasscode();
    }
}

/**
 * Handle manual sliders pagination on the Letter Screen
 * @param {number} pageIndex 
 */
function switchLetterPage(pageIndex) {
    const pages = document.querySelectorAll('.letter-page');
    const dots = document.querySelectorAll('.dot');
    
    pages.forEach((page, idx) => {
        page.classList.toggle('active', idx === pageIndex);
    });
    
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === pageIndex);
    });
}