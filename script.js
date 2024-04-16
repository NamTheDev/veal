const botAvatar = document.getElementById('veal-avatar');
const cardsContainer = document.getElementById('cards');

const commands = [
    {
        name: 'hi',
        description: 'Initiate a greeting conversation'
    },
    {
        name: 'weather',
        description: 'Get the current weather conditions and forecast for a specified location'
    },
    {
        name: 'quote',
        description: 'Fetch a random famous quote to inspire or motivate'
    },
    {
        name: 'translate',
        description: 'Translate text from one language to another using a specified translation service'
    },
    {
        name: 'timer',
        description: 'Set a timer for a specified duration, useful for reminders and time management'
    },
    {
        name: 'news',
        description: 'Fetch the latest news headlines from various sources'
    },
    {
        name: 'calculator',
        description: 'Perform basic arithmetic operations such as addition, subtraction, multiplication, and division'
    },
    {
        name: 'todo',
        description: 'Manage your to-do list by adding, removing, and updating tasks'
    },
    {
        name: 'joke',
        description: 'Retrieve a random joke or pun to lighten the mood'
    },
    {
        name: 'wiki',
        description: 'Search for information on Wikipedia about a particular topic'
    }
];

function toggleBotAvatar(x) {
    botAvatar.hidden = x.matches;
}

function openInvite(type) {
    const url = type === 'bot' ? 'https://discord.com/oauth2/authorize?client_id=1220835979003297983' : 'https://discord.gg/veal';
    const name = type === 'bot' ? 'Invite bot' : 'Join server';
    window.open(url, name, 'width=500,height=700,left=500,top=50');
}

function createCommandCard(command, index) {
    const { name, description } = command;
    return `
        <div class="card m-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title text-center fw-normal">${index + 1}. <span class="fw-bold">${name}</span></h5>
                <hr class="hr hr-blurry" />
                <p class="card-text">${description}</p>
            </div>
        </div>
    `;
}

function renderCommandCards(commands) {
    cardsContainer.innerHTML = commands.map((command, index) => createCommandCard(command, index)).join('');
}

function initializeMediaQueryListener() {
    const x = window.matchMedia("(max-width: 770px)");
    toggleBotAvatar(x);
    x.addEventListener("change", function () {
        toggleBotAvatar(x);
    });
}

// Check if commands array is valid
if (Array.isArray(commands) && commands.length > 0) {
    renderCommandCards(commands);
} else {
    console.error('Invalid commands data');
}

initializeMediaQueryListener();
