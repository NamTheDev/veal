const botAvatar = document.getElementById('veal-avatar');
const cardsContainer = document.getElementById('cards');
const title = document.getElementById('title')
const selectCategories = document.getElementById('selectCategories')
const commandsSearchBar = document.getElementById('commandsSearchBar')
title.innerText = title.innerText.replace('{page}', window.location.href.split('/')[3].split('.')[0])

const commands = [
    {
        "name": "afk",
        "description": "Set your status as Away From Keyboard (AFK)",
        "usage": ".afk [reason]",
        "category": "utilities"
    },
    {
        "name": "lf",
        "description": "List all online friends",
        "usage": ".lf",
        "category": "utilities"
    },
    {
        "name": "np",
        "description": "Show what you're currently playing",
        "usage": ".np",
        "category": "utilities"
    },
    {
        "name": "bal",
        "description": "Check your account balance",
        "usage": ".bal",
        "category": "utilities"
    },
    {
        "name": "coinflip",
        "description": "Flip a coin",
        "usage": ".coinflip",
        "category": "utilities"
    },
    {
        "name": "crime",
        "description": "Commit a crime (for fun)",
        "usage": ".crime",
        "category": "utilities"
    },
    {
        "name": "daily",
        "description": "Claim your daily reward",
        "usage": ".daily",
        "category": "utilities"
    },
    {
        "name": "deposit",
        "description": "Deposit coins into your account",
        "usage": ".deposit [amount]",
        "category": "utilities"
    },
    {
        "name": "gamble",
        "description": "Gamble your coins",
        "usage": ".gamble [amount]",
        "category": "utilities"
    },
    {
        "name": "give",
        "description": "Give coins to another user",
        "usage": ".give [amount] [recipient]",
        "category": "utilities"
    },
    {
        "name": "leaderboard",
        "description": "Show the leaderboard of top users",
        "usage": ".leaderboard",
        "category": "utilities"
    },
    {
        "name": "open",
        "description": "Open something (context-dependent)",
        "usage": ".open [something]",
        "category": "utilities"
    },
    {
        "name": "rob",
        "description": "Attempt to rob another user",
        "usage": ".rob [user]",
        "category": "utilities"
    },
    {
        "name": "slut",
        "description": "Become a slut (for fun)",
        "usage": ".slut",
        "category": "utilities"
    },
    {
        "name": "withdraw",
        "description": "Withdraw coins from your account",
        "usage": ".withdraw [amount]",
        "category": "utilities"
    },
    {
        "name": "work",
        "description": "Work to earn coins",
        "usage": ".work",
        "category": "utilities"
    },
    {
        "name": "autorole",
        "description": "Manage automatic roles",
        "usage": ".autorole [options]",
        "category": "utilities"
    },
    {
        "name": "role",
        "description": "Manage roles",
        "usage": ".role [options]",
        "category": "utilities"
    },
    {
        "name": "snipe",
        "description": "Snipe something (context-dependent)",
        "usage": ".snipe [something]",
        "category": "utilities"
    },
    {
        "name": "tz",
        "description": "Show the current time in a specific timezone",
        "usage": ".tz [timezone]",
        "category": "utilities"
    },
    {
        "name": "vanity",
        "description": "Set a custom vanity URL for the server",
        "usage": ".vanity [URL]",
        "category": "utilities"
    },
    {
        "name": "8ball",
        "description": "Ask the magic 8-ball a question",
        "usage": ".8ball [question]",
        "category": "utilities"
    },
    {
        "name": "advice",
        "description": "Get a random piece of advice",
        "usage": ".advice",
        "category": "utilities"
    },
    {
        "name": "cat",
        "description": "Get a random cat picture or gif",
        "usage": ".cat",
        "category": "utilities"
    },
    {
        "name": "dog",
        "description": "Get a random dog picture or gif",
        "usage": ".dog",
        "category": "utilities"
    },
    {
        "name": "emoji",
        "description": "Convert text to emojis",
        "usage": ".emoji [text]",
        "category": "utilities"
    },
    {
        "name": "invite",
        "description": "Get the bot's invite link",
        "usage": ".invite",
        "category": "utilities"
    },
    {
        "name": "joke",
        "description": "Get a random joke",
        "usage": ".joke",
        "category": "utilities"
    },
    {
        "name": "link",
        "description": "Generate a shareable link",
        "usage": ".link [options]",
        "category": "utilities"
    },
    {
        "name": "membercount",
        "description": "Show the member count of the server",
        "usage": ".membercount",
        "category": "utilities"
    },
    {
        "name": "network",
        "description": "Manage network settings",
        "usage": ".network [options]",
        "category": "utilities"
    },
    {
        "name": "ping",
        "description": "Check the bot's ping",
        "usage": ".ping",
        "category": "utilities"
    },
    {
        "name": "rizz",
        "description": "Play a game of Rock, Paper, Scissors",
        "usage": ".rizz [choice]",
        "category": "utilities"
    },
    {
        "name": "translate",
        "description": "Translate text to another language",
        "usage": ".translate [text] [target language]",
        "category": "utilities"
    },
    {
        "name": "meaning",
        "description": "Get the meaning of a word",
        "usage": ".meaning [word]",
        "category": "utilities"
    },
    {
        "name": "ban",
        "description": "Ban a user from the server",
        "usage": ".ban [user] [reason]",
        "category": "moderation"
    },
    {
        "name": "clear",
        "description": "Clear a specified number of messages from a channel",
        "usage": ".clear [amount]",
        "category": "moderation"
    },
    {
        "name": "fn",
        "description": "Execute a custom function",
        "usage": ".fn [function]",
        "category": "moderation"
    },
    {
        "name": "hide",
        "description": "Hide a specific channel",
        "usage": ".hide [channel]",
        "category": "moderation"
    },
    {
        "name": "imute",
        "description": "Instantly mute a user",
        "usage": ".imute [user] [reason]",
        "category": "moderation"
    },
    {
        "name": "iunmute",
        "description": "Instantly unmute a user",
        "usage": ".iunmute [user]",
        "category": "moderation"
    },
    {
        "name": "kick",
        "description": "Kick a user from the server",
        "usage": ".kick [user] [reason]",
        "category": "moderation"
    },
    {
        "name": "lock",
        "description": "Lock a channel",
        "usage": ".lock [channel]",
        "category": "moderation"
    },
    {
        "name": "mute",
        "description": "Mute a user",
        "usage": ".mute [user] [time] [reason]",
        "category": "moderation"
    },
    {
        "name": "nick",
        "description": "Change a user's nickname",
        "usage": ".nick [user] [new nickname]",
        "category": "moderation"
    },
    {
        "name": "nuke",
        "description": "Delete all messages in a channel and recreate it",
        "usage": ".nuke",
        "category": "moderation"
    },
    {
        "name": "pin",
        "description": "Pin a message in a channel",
        "usage": ".pin [message ID]",
        "category": "moderation"
    },
    {
        "name": "rmute",
        "description": "Remove a user's mute",
        "usage": ".rmute [user]",
        "category": "moderation"
    },
    {
        "name": "runmute",
        "description": "Remove a user's mute instantly",
        "usage": ".runmute [user]",
        "category": "moderation"
    },
    {
        "name": "topic",
        "description": "Change the topic of a channel",
        "usage": ".topic [channel] [new topic]",
        "category": "moderation"
    },
    {
        "name": "unban",
        "description": "Unban a user from the server",
        "usage": ".unban [user]",
        "category": "moderation"
    },
    {
        "name": "unhide",
        "description": "Unhide a hidden channel",
        "usage": ".unhide [channel]",
        "category": "moderation"
    },
    {
        "name": "unlock",
        "description": "Unlock a locked channel",
        "usage": ".unlock [channel]",
        "category": "moderation"
    },
    {
        "name": "unmute",
        "description": "Unmute a user",
        "usage": ".unmute [user]",
        "category": "moderation"
    },
    {
        "name": "unpin",
        "description": "Unpin a message in a channel",
        "usage": ".unpin [message ID]",
        "category": "moderation"
    },
    {
        "name": "bite",
        "description": "Bite someone",
        "usage": ".bite [user]",
        "category": "interactions"
    },
    {
        "name": "bonk",
        "description": "Bonk someone",
        "usage": ".bonk [user]",
        "category": "interactions"
    },
    {
        "name": "boop",
        "description": "Boop someone",
        "usage": ".boop [user]",
        "category": "interactions"
    },
    {
        "name": "cuddle",
        "description": "Cuddle someone",
        "usage": ".cuddle [user]",
        "category": "interactions"
    },
    {
        "name": "highfive",
        "description": "Highfive someone",
        "usage": ".highfive [user]",
        "category": "interactions"
    },
    {
        "name": "hug",
        "description": "Hug someone",
        "usage": ".hug [user]",
        "category": "interactions"
    },
    {
        "name": "kill",
        "description": "Kill someone (for fun)",
        "usage": ".kill [user]",
        "category": "interactions"
    },
    {
        "name": "kiss",
        "description": "Kiss someone",
        "usage": ".kiss [user]",
        "category": "interactions"
    },
    {
        "name": "lick",
        "description": "Lick someone",
        "usage": ".lick [user]",
        "category": "interactions"
    },
    {
        "name": "nom",
        "description": "Nom someone",
        "usage": ".nom [user]",
        "category": "interactions"
    },
    {
        "name": "pat",
        "description": "Pat someone",
        "usage": ".pat [user]",
        "category": "interactions"
    },
    {
        "name": "poke",
        "description": "Poke someone",
        "usage": ".poke [user]",
        "category": "interactions"
    },
    {
        "name": "punch",
        "description": "Punch someone",
        "usage": ".punch [user]",
        "category": "interactions"
    },
    {
        "name": "slap",
        "description": "Slap someone",
        "usage": ".slap [user]",
        "category": "interactions"
    },
    {
        "name": "stare",
        "description": "Stare at someone",
        "usage": ".stare [user]",
        "category": "interactions"
    },
    {
        "name": "tickle",
        "description": "Tickle someone",
        "usage": ".tickle [user]",
        "category": "interactions"
    },
    {
        "name": "wave",
        "description": "Wave at someone",
        "usage": ".wave [user]",
        "category": "interactions"
    },
    {
        "name": "avatar",
        "description": "Get a user's avatar",
        "usage": ".avatar [user]",
        "category": "utilities"
    },
    {
        "name": "serveravatar",
        "description": "Get the server's avatar",
        "usage": ".serveravatar",
        "category": "utilities"
    },
    {
        "name": "multiavatar",
        "description": "Get multiple users' avatars",
        "usage": ".multiavatar [users]",
        "category": "utilities"
    },
    {
        "name": "banner",
        "description": "Get the server's banner",
        "usage": ".banner",
        "category": "utilities"
    },
    {
        "name": "guildicon",
        "description": "Get the server's icon",
        "usage": ".guildicon",
        "category": "utilities"
    },
    {
        "name": "guildbanner",
        "description": "Get the server's banner",
        "usage": ".guildbanner",
        "category": "utilities"
    }
]

const categories = ["all", ...new Set(commands.map(command => command.category))];

function addSelectOptions() {
    for (const category of categories) {
        selectCategories.innerHTML += `<option>${category}</option>`
        console.log(category)
    }
}

function toggleBotAvatar(x) {
    botAvatar.hidden = x.matches;
}

function openInvite(type) {
    const url = type === 'bot' ? 'https://discord.com/oauth2/authorize?client_id=1220835979003297983' : 'https://discord.gg/veal';
    const name = type === 'bot' ? 'Invite bot' : 'Join server';
    window.open(url, name, 'width=500,height=700,left=500,top=50');
}

function createCommandCard(command, index) {
    const { name, description, category, usage } = command;
    return `
        <div class="card m-2 shiny-hover" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title text-center fw-normal">${index + 1}. <span class="fw-bold">${name}</span></h5>
                <hr class="hr hr-blurry" />
                <p class="card-text">
                <p class="text-center"><b>Category</b> - ${category}<br><b>Usage</b>:<br>${usage}</p>
                <hr class="hr hr-blurry" />
                ${description}
                </p>
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

if (window.location.href.includes('commands')) {
    addSelectOptions()
    if (Array.isArray(commands) && commands.length > 0) {
        renderCommandCards(commands);
    } else {
        console.error('Invalid commands data');
    }
} else if (window.location.href.includes('homepage')) {
    initializeMediaQueryListener();
}

selectCategories.addEventListener('change', () => {
    const value = selectCategories.value.toLowerCase()
    renderCommandCards(value === 'all' ? commands : commands.filter(({ category }) => category === value))
})

function updateCards() {
    const value = commandsSearchBar.value.toLowerCase()
    renderCommandCards(commands.filter(({ name, description }) => name.toLowerCase().includes(value) || description.toLowerCase().includes(value)))
}

commandsSearchBar.addEventListener("input", updateCards);

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))