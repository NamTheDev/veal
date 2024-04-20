(async () => {
    // Get references to DOM elements
    const botAvatar = document.getElementById('veal-avatar');
    const cardsContainer = document.getElementById('cards');
    const title = document.getElementById('title')
    const selectCategories = document.getElementById('selectCategories')
    const commandsSearchBar = document.getElementById('commandsSearchBar')
    const locationHref = window.location.href.split('/')
    const titleChange = locationHref[locationHref.length - 1].split('.')[0]
    title.innerText = title.innerText.replace('{page}', titleChange)
    const buttonsList = document.getElementById('buttonsList')
    const commandsTotal = document.getElementById('commandsTotal')
    const copyButton = document.getElementsByName('copyButton')
    const commandModal = document.getElementById('modalBody')

    // Fetch commands data from JSON file
    const response = await fetch('./json/commands.json')
    const commandsJSON = await response.json()

    // Map commands data and add index
    const commands = commandsJSON.map((command, index) => ({ ...command, index: index + 1 }))

    // Extract categories from commands data
    const categories = ["all", ...new Set(commands.map(command => command.category))];

    // Function to add options to select element
    function addSelectOptions() {
        for (const category of categories) {
            selectCategories.innerHTML += `<option>${category}</option>`
        }
    }

    // Function to open invite link
    function openInvite(type) {
        const url = type === 'bot' ? 'https://discord.com/oauth2/authorize?client_id=1220835979003297983' : 'https://discord.gg/veal';
        const name = type === 'bot' ? 'Invite bot' : 'Join server';
        window.open(url, name, 'width=500,height=700,left=500,top=50');
    }

    // Function to create HTML for command card
    function createCommandCard(command) {
        const { name, description, category, usage, index } = command;
        return `
        <div class="card m-3 shiny-hover rounded-5 py-3" style="width: 400px;">
            <div class="card-body">
                <h5 class="card-title fw-normal">${index}. <span class="fw-bold">${name}</span></h5>
                <p class="fs-6 fw-light pt-2">${description}</p>
                <hr class>
                <p class="card-text">
                <p><b>Category</b> - ${category}</p>
                <p class="fw-bold">Usage</p>
                <button type="button" class="btn btn-dark float-end m-1" name="copyButton"><i class="fa-regular fa-clipboard"></i></button>
                <p class="bg-secondary-subtle rounded p-3" style="font-size:16px" id="usageBox">${usage}</p>
            </div>
        </div>
    `;
    }

    // Function to render command cards
    function renderCommandCards(commands) {
        if (commands.length === 0) {
            cardsContainer.innerHTML = `<p>No results found.</p>`;
        } else {
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
    function updateCards() {
        const value = commandsSearchBar.value.toLowerCase()
        renderCommandCards(commands.filter(({ name, description }) => name.toLowerCase().includes(value) || description.toLowerCase().includes(value)))
    }

    // Check current page and add event listeners accordingly
    if (window.location.href.includes('commands')) {
        // Display total number of commands
        commandsTotal.innerText = commands.length

        addSelectOptions()
        if (Array.isArray(commands) && commands.length > 0) renderCommandCards(commands);

        selectCategories.addEventListener('change', () => {
            const value = selectCategories.value.toLowerCase()
            renderCommandCards(value === 'all' ? commands : commands.filter(({ category }) => category === value))
        })
        const clipboardIcon = '<i class="fa-regular fa-clipboard"></i>'
        const tickEmoji = '<i class="fa-solid fa-check"></i>'
        for (const button of copyButton) {
            const popover = new bootstrap.Popover(button, {
                trigger: 'click',
                placement: 'top',
                content: 'copied'
            });
            button.addEventListener('click', () => {
                const usage = button.parentNode.querySelector('#usageBox')
                navigator.clipboard.writeText(usage.innerText);
                button.innerHTML = tickEmoji
                setTimeout(() => {
                    popover.hide();
                    button.innerHTML = clipboardIcon
                }, 1500)
            })
        }

        commandsSearchBar.addEventListener("input", updateCards);

        const cards = cardsContainer.childNodes
        for (const card of cards) {
            card.addEventListener('click', ({ target }) => {
                if (!target.className.includes('card')) return;
                const modal = new bootstrap.Modal(document.getElementById('commandModal'))
                commandModal.innerHTML = card.innerHTML
               modal.show()
            })
        }

    } else if (window.location.href.includes('homepage')) {
        initializeMediaQueryListener();
    }

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
})()
