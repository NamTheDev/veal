// Get references to DOM elements
const botAvatar = document.getElementById('veal-avatar');
const cardsContainer = document.getElementById('cards');
const selectCategories = document.getElementById('selectCategories')
const commandsSearchBar = document.getElementById('commandsSearchBar')
const buttonsList = document.getElementById('buttonsList')
const commandsTotal = document.getElementById('commandsTotal')
const codeCopyButton = document.getElementById('codeCopyButton')

// Function to open invite link
function openInvite(type) {
    const url = type === 'bot' ? 'https://discord.com/oauth2/authorize?client_id=1229494317115244544&permissions=8&scope=bot' : 'https://discord.gg/veal';
    const name = type === 'bot' ? 'Invite bot' : 'Join server';
    window.open(url, name, 'width=500,height=700,left=500,top=50');
}

const clipboardIcon = '<i class="fa-regular fa-clipboard"></i>'
const tickEmoji = '<i class="fa-solid fa-check"></i>'
function copyUsage(button) {
    const usage = button.getAttribute('usage')
    navigator.clipboard.writeText(usage);
    button.innerHTML = tickEmoji
    setTimeout(() => {
        button.innerHTML = clipboardIcon
    }, 1500)
}


(async () => {
    // Function to add options to select element
    function addSelectOptions(categories) {
        for (const category of categories) {
            selectCategories.innerHTML += `<option class="bg-black">${category}</option>`
        }
    }

    // Function to create HTML for command card
    /**
     * 
     * @param {{
     * "name": String, 
     * "category": string, 
     * "description": string, 
     * "aliases": string[], 
     * "arguments": string, 
     * "usage": string
     * }} command 
     * @returns 
     */
    function createCommandCard(command) {
        const { name, description, aliases, arguments, usage, index } = command;
        return `
        <div class="card m-3 shiny-hover rounded-5 py-3 bg-transparent bg-gradient" style="width: 400px;">
        <data json='${JSON.stringify(command)}'></data>
            <div class="card-body">
                <h5 class="card-title fw-normal">${index}. <span class="fw-bold" id="cardTitle">${name}</span><button type="button" class="btn btn-transparent border border-0 float-end m-1" onclick="copyUsage(this)" usage="${usage}"><i class="fa-regular fa-clipboard"></i></button></h5>
                <p class="fs-6 fw-light pt-2">${description}</p>
                <hr>
                <b>Aliases</b>
                <p class="bg-black bg-opacity-25 px-3 py-2 my-2 rounded-3 fs-6 fw-light mb-3">${aliases.join(', ') || "none"}</p>
                <b>Arguments</b>
                <p class="bg-black bg-opacity-25 px-3 py-2 my-2 rounded-3 fs-6 fw-light mb-3">${arguments || "none"}</p>
            </div>
        </div>
    `;
    }

    // Function to render command cards
    function renderCommandCards(commands) {
        const wrapper = document.querySelector('.wrapper')
        if (commands.length === 0) {
            // wrapper.classList.replace('fit', 'full')
            cardsContainer.innerHTML = `<p>No results found.</p>`;
        } else {
            // if (wrapper.classList.contains('full')) wrapper.classList.replace('full', 'fit')
            cardsContainer.innerHTML = commands.map((command) => createCommandCard(command)).join('');
        }
    }

    // Function to handle media query listener
    function initializeMediaQueryListener() {
        const width770 = window.matchMedia("(max-width: 770px)");
        const width630 = window.matchMedia("(max-width: 630px)");
        botAvatar.hidden = width770.matches;
        const { className } = buttonsList
        buttonsList.className = width630.matches ? className.replace('flex-row', 'flex-column') : className.replace('flex-column', 'flex-row')
        width770.addEventListener("change", function () {
            botAvatar.hidden = width770.matches;
        });
        width630.addEventListener("change", function () {
            buttonsList.className = width630.matches ? className.replace('flex-row', 'flex-column') : className.replace('flex-column', 'flex-row')
        })
    }

    // Function to update cards based on search input
    function updateCards(commands) {
        const value = commandsSearchBar.value.toLowerCase()
        renderCommandCards(commands.filter(({ name }) => name.toLowerCase().includes(value)))
    }

    // Check current page and add event listeners accordingly
    if (window.location.href.includes('commands')) {
        // Fetch commands data from JSON file
        const response = await fetch('./json/commands.json')
        const commandsJSON = await response.json()

        // Map commands data and add index
        const commands = commandsJSON.map((command, index) => ({ ...command, index: index + 1 }))

        const categoryCounts = {}
        commands.forEach(command => {
            const {category} = command;
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Extract categories from commands data
        const categories = [`All (${commands.length})`, ...new Set(commands.map(({category}) => `${category} (${categoryCounts[category]})`))];
        console.log(categories)
        // Display total number of commands
        commandsTotal.innerText = commands.length

        addSelectOptions(categories)
        if (Array.isArray(commands) && commands.length > 0) renderCommandCards(commands);


        selectCategories.addEventListener('change', () => {
            const value = selectCategories.value.split(' ')[0]
            renderCommandCards(value === 'All' ? commands : commands.filter(({ category }) => category === value))
        })

        commandsSearchBar.addEventListener("input", () => {
            const value = commandsSearchBar.value.toLowerCase();
            const re = new RegExp(value, 'i');
            const commands = []
            for (const card of cardsContainer.getElementsByTagName('data')) {
                commands.push(JSON.parse(card.getAttribute('json')))
            }
            console.log(commands)
            updateCards(commands);
            for (const card of cardsContainer.children) {
                const title = card.querySelector('#cardTitle');
                if (!title) continue;
                const highlightedText = card.querySelector('.bg-secondary');
                if (re.test(title.innerText)) {
                    if (!highlightedText) {
                        title.innerHTML = title.innerHTML.replace(re, '<span class="bg-secondary">$&</span>');
                    }
                } else {
                    if (highlightedText) {
                        title.innerHTML = title.innerHTML.replace(highlightedText.outerHTML, highlightedText.innerText);
                    }
                }
            }
        });


    } else if (window.location.href.includes('homepage')) {
        initializeMediaQueryListener();
    } else if (window.location.href.includes('authorization/spotify')) {
        const code = window.location.href.split("?code=")[1]
        if (!code || code.length < 290) return window.location.href = '../homepage';
        codeCopyButton.addEventListener('click', () => {
            const originalIcon = '<i class="fa-solid fa-copy fs-3"></i>'
            const copiedIcon = '<i class="fa-solid fa-check fs-3"></i>'
            codeCopyButton.innerHTML = codeCopyButton.innerHTML.replace(originalIcon, copiedIcon)
            navigator.clipboard.writeText(code);
            setTimeout(() => {
                codeCopyButton.innerHTML = codeCopyButton.innerHTML.replace(copiedIcon, originalIcon)
            }, 1500)
        })
    } else {
        window.location.href = "./homepage"
    }

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
})()
