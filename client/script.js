/**
 * This is the script.js file which contains the JavaScript code for
 * my the ChatGPT clone, ChatCMF.
 *
 * @author Conner Fisk
 * @since  Dec 29, 2022
 */

import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

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
    loadInterval = setInterval(() => {
        element.textContent += '.';
        // Make sure to reset the text if there are 
        // more than three '.'
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
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
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20);
}

/**
 * This function creates a unique ID for each chat message
 * which allows us to iterate over them.
 * 
 * @returns 
 */
function generateUniqueId() {
    // Initialize the needed variables for each unique message.
    const curTime = Date.now();
    const randomNum = Math.random();
    const hexadecimalStr = randomNum.toString(16);

    return `id-${curTime}-${hexadecimalStr}`;
}

/**
 * This function will allow us to distinguish between the user's and 
 * AI's message by having different background colors.
 * 
 * @param {Tells if it is an AI message or user} isAi 
 * @param {The message value} value 
 * @param {The message ID} uniqueId 
 */
function chatStripe (isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

/**
 * 
 * @param {*} e 
 */
const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    // chatStripe for the user.
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

    // to clear the textarea input 
    form.reset();

    // chatStripe for the AI.
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId);

    loader(messageDiv);
}

form.addEventListener('submit', handleSubmit);
// Add functionality for the 'enter' key on the
// user's keyboard to submit.
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
});