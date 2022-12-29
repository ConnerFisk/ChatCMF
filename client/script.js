import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat-container');

let loadInterval;

/**
 * This function creates a loading "animation" while the AI
 * is coming up with an answer.
 * 
 * @param {} element 
 */
function loader(element) {
    // Create an empty string.
    element.textContent = '';
    // Every 300ms, add a '.' to the text.
    loadInterval = setInverval(() => {
        element.textContent += '.';
        // Make sure to reset the text if there are 
        // more than three '.'
        if(element.textContent === '....'){
            element.textContent = '';
        }
    }, 300)
}

/**
 * This function animates the AI's answer, making it appear
 * as it is typing directly to us.
 * 
 * @param {*} element 
 * @param {*} text 
 */
function typeText(element, text) {
    let index = 0;
    // Add a char every 20ms
    let interval = setInterval(() => {
        if(index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        }else{
            clearInterval(interval);
        }
    }, 20)
}

/**
 * This function creates a unique ID for each chat message
 * which allows us to iterate over them.
 * 
 * @returns 
 */
function createUniqueId() {
    // Initialize the needed variables for each unique message.
    const curTime = Date.now();
    const randomNum = Math.random();
    const hexadecimalStr = randomNum.toString(16);

    return 'id-${curTime}-${hexadecimalStr}';
}