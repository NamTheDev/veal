(async () => {
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
    const response = await fetch('./json/commands.json')
    const commandsJSON = await response.json()

    const commands = commandsJSON.map((command, index) => ({ ...command, index: index + 1 }))

    const categories = ["all", ...new Set(commands.map(command => command.category))];

    function addSelectOptions() {
        for (const category of categories) {
            selectCategories.innerHTML += `<option>${category}</option>`
        }
    }

    function openInvite(type) {
        const url = type === 'bot' ? 'https://discord.com/oauth2/authorize?client_id=1220835979003297983' : 'https://discord.gg/veal';
        const name = type === 'bot' ? 'Invite bot' : 'Join server';
        window.open(url, name, 'width=500,height=700,left=500,top=50');
    }

    function createCommandCard(command) {
        const { name, description, category, usage, index } = command;
        return `
        <div class="card m-2 shiny-hover rounded-5 p-3" style="width: 400px;">
            <div class="card-body">
                <h5 class="card-title fw-normal">${index}. <span class="fw-bold">${name}</span></h5>
                <p class="fs-6 fw-light pt-2">${description}</p>
                <hr class>
                <p class="card-text">
                <p><b>Category</b> - ${category}</p>
                <p class="fw-bold">Usage</p>
                <button type="button" class="btn float-end"><i class="fa-regular fa-clipboard"></i></button>
                <p class="bg-secondary-subtle rounded p-3" style="font-size: 15px">${usage}</p>
            </div>
        </div>
    `;
    }

    function renderCommandCards(commands) {
        cardsContainer.innerHTML = commands.map((command) => createCommandCard(command)).join('');
    }

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

    function updateCards() {
        const value = commandsSearchBar.value.toLowerCase()
        renderCommandCards(commands.filter(({ name, description }) => name.toLowerCase().includes(value) || description.toLowerCase().includes(value)))
    }

    if (window.location.href.includes('commands')) {
        addSelectOptions()
        if (Array.isArray(commands) && commands.length > 0) renderCommandCards(commands);

        selectCategories.addEventListener('change', () => {
            const value = selectCategories.value.toLowerCase()
            renderCommandCards(value === 'all' ? commands : commands.filter(({ category }) => category === value))
        })

        commandsSearchBar.addEventListener("input", updateCards);

    } else if (window.location.href.includes('homepage')) {
        initializeMediaQueryListener();
    }


    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
})()