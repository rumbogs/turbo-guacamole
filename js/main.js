import emojis from '../emojis-en-v14.0.json';

const synth = window.speechSynthesis;

let currentEmoji = 's';

const currentEmojiEl = document.getElementById('current-emoji');

const emojiList = document.getElementById('emoji-list');
const voices = synth.getVoices();

const handleStart = (ev) => {
    ev.preventDefault();
    if (ev.target.classList.contains('emoji-btn')) {
        currentEmoji = ev.target.getAttribute('data-name');
        currentEmojiEl.innerHTML = currentEmoji;
        const utterThis = new SpeechSynthesisUtterance(currentEmoji);
        utterThis.lang = 'ro-RO';
        utterThis.voice = voices.find(voice => voice.lang === 'ro-RO');
        synth.speak(utterThis);
    }
}

emojiList.addEventListener('click', handleStart);
const emojiListItems = emojis.reduce((acc, cat) => {
    return [...acc, ...cat.emojis.map(emoji => {
        const liEl = document.createElement('li');
        const buttonEl = document.createElement('button');
        buttonEl.classList.add('emoji-btn');
        buttonEl.setAttribute('data-name', emoji);
        buttonEl.innerHTML = emoji;
        liEl.appendChild(buttonEl);
        return liEl;
    })];
}, []);

emojiListItems.forEach(item => {
    emojiList.appendChild(item);
});
