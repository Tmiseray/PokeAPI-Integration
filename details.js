
async function fetchPokeData(pokeQuery) {
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokeQuery}/`

    const response = await fetch(apiURL);
    const pokeData = await response.json();
    return pokeData;
}

function formListener() {
    
    document.getElementById('pokeSearchForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const pokeName = document.getElementById('pokeName').value.trim();
        const pokeID = document.getElementById('pokeID').value.trim();
    
        const pokeQuery = pokeName ? pokeName : pokeID;
    
        if (pokeQuery) {
            try {
                const pokeData = await fetchPokeData(pokeQuery);
                console.log(pokeData);
    
                localStorage.setItem('pokeData', JSON.stringify(pokeData));
    
                window.location.href = 'details.html';
    
            } catch (error) {
                console.error("Error fetching Pokemon Data:", error);
            };
        }
    });
}


function displayPokeData() {
    const pokeData = JSON.parse(localStorage.getItem('pokeData'));

    if (pokeData) {
        console.log(pokeData);
        const pokeName = pokeData.name;
        const pokeTitle = document.getElementById('pokeTitle');
        pokeTitle.innerHTML = pokeName;
        console.log(pokeName);
    
        const pokeImg = document.getElementById('pokeImg');
        const pokeSprite = pokeData.sprites.other['official-artwork'].front_default;
        pokeImg.innerHTML = "";
        const image = document.createElement('img');
        image.src = pokeSprite;
        image.alt = pokeName;
        image.classList.add('img-thumbnail', 'border', 'border-primary', 'rounded', 'borderEffects');
        pokeImg.appendChild(image);
    
        const pokeURL = `https://www.pokemon.com/us/pokedex/${pokeName}`;
        const pokeLink = document.getElementById('pokeLink');
        pokeLink.innerHTML = "";
    
        const pokeBtn = document.createElement('button');
        pokeBtn.href = pokeURL;
        pokeBtn.type = 'button';
        pokeBtn.classList.add('btn', 'btn-outline-warning', 'w-100', 'fs-3');
        pokeBtn.textContent = `PokéDex: ${pokeName}`;
        pokeLink.appendChild(pokeBtn);
    
        const pokeDetails = document.getElementById('pokeDetails');
        const pokeDetailsTitle = document.createElement('h3');
        pokeDetailsTitle.classList.add('h2', 'text-warning-emphasis', 'text-center');
        pokeDetailsTitle.textContent = 'PokéDetails:';
        pokeDetails.appendChild(pokeDetailsTitle);
    
        const pokeIDList = document.createElement('ul');
        pokeIDList.classList.add('list-group');
    
        const pokeIDTitle = document.createElement('li');
        pokeIDTitle.innerHTML = 'PokéDex ID Number';
        pokeIDTitle.classList.add('list-group-item', 'text-warning-emphasis', 'fw-bold', 'fs-4', 'border', 'border-primary');
        const pokeIDItem = document.createElement('li');
        pokeIDItem.innerHTML = pokeData.id;
        pokeIDItem.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary');
        pokeIDTitle.appendChild(pokeIDItem);
        pokeIDList.appendChild(pokeIDTitle);
        pokeDetails.appendChild(pokeIDList);
    
        const pokeHeightList = document.createElement('ul');
        pokeHeightList.classList.add('list-group');
    
        const pokeHeightTitle = document.createElement('li');
        pokeHeightTitle.innerHTML = 'Height'
        pokeHeightTitle.classList.add('list-group-item', 'text-warning-emphasis', 'fw-bold', 'fs-4', 'border', 'border-primary');
        const pokeDeciHeight = document.createElement('li');
        pokeDeciHeight.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary');
        pokeDeciHeight.innerHTML = `${pokeData.height} Decimeters`;
        const pokeMeterHeight = document.createElement('li');
        pokeMeterHeight.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary');
        pokeMeterHeight.innerHTML = `${pokeData.height/10} Meters`;
        const pokeFeetHeight = document.createElement('li');
        pokeFeetHeight.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary');
        let feet = parseInt(((pokeData.height/10)*3.281), 10)
        pokeFeetHeight.innerHTML = `${feet} ${feet === 1 ? 'Foot' : 'Feet'}`;

        pokeHeightTitle.appendChild(pokeDeciHeight);
        pokeHeightTitle.appendChild(pokeMeterHeight);
        pokeHeightTitle.appendChild(pokeFeetHeight);
        pokeHeightList.appendChild(pokeHeightTitle);
        pokeDetails.appendChild(pokeHeightList);
        

    
        const statsTitle = document.getElementById('statsTitle');
        statsTitle.textContent = 'PokéStats';
    
        const pokeStats = document.getElementById('pokeStats');
        const statsList = document.createElement('ul');
        statsList.classList.add('list-group', 'list-group-horizontal');
        pokeStats.appendChild(statsList);
    
        const statName = document.createElement('li');
        statName.textContent = 'Name';
        statName.classList.add('list-group-item', 'text-center', 'text-warning-emphasis', 'fw-bold', 'fs-4', 'border', 'border-primary','w-50');
        const statBase = document.createElement('li');
        statBase.textContent = 'Base Amount';
        statBase.classList.add('list-group-item', 'text-center', 'text-warning-emphasis', 'fw-bold', 'fs-4', 'border', 'border-primary','w-50');
        statsList.appendChild(statName);
        statsList.appendChild(statBase);
    
        const statsItems = pokeData.stats;
        statsItems.forEach(statItem => {
            if (statItem.stat.name === 'speed') {
                const speedStatList = document.createElement('ul');
                speedStatList.classList.add('list-group', 'list-group-horizontal');
                const speedStatName = document.createElement('li');
                speedStatName.textContent = 'Speed';
                speedStatName.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                speedStatList.appendChild(speedStatName);
                const speedStatBase = document.createElement('li');
                speedStatBase.textContent = statItem.base_stat;
                speedStatBase.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                speedStatList.appendChild(speedStatBase);
                pokeStats.appendChild(speedStatList);
    
            } else if (statItem.stat.name === 'hp') {
                const hpStatList = document.createElement('ul');
                hpStatList.classList.add('list-group', 'list-group-horizontal');
                const hpStatName = document.createElement('li');
                hpStatName.textContent = 'HP';
                hpStatName.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                hpStatList.appendChild(hpStatName);
                const hpStatBase = document.createElement('li');
                hpStatBase.textContent = statItem.base_stat;
                hpStatBase.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                hpStatList.appendChild(hpStatBase);
                pokeStats.appendChild(hpStatList);
    
            } else if (statItem.stat.name === 'attack') {
                const atkStatList = document.createElement('ul');
                atkStatList.classList.add('list-group', 'list-group-horizontal');
                const atkStatName = document.createElement('li');
                atkStatName.textContent = 'Attack';
                atkStatName.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                atkStatList.appendChild(atkStatName);
                const atkStatBase = document.createElement('li');
                atkStatBase.textContent = statItem.base_stat;
                atkStatBase.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                atkStatList.appendChild(atkStatBase);
                pokeStats.appendChild(atkStatList);
    
            } else if (statItem.stat.name === 'defense') {
                const defStatList = document.createElement('ul');
                defStatList.classList.add('list-group', 'list-group-horizontal');
                const defStatName = document.createElement('li');
                defStatName.textContent = 'Defense';
                defStatName.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                defStatList.appendChild(defStatName);
                const defStatBase = document.createElement('li');
                defStatBase.textContent = statItem.base_stat;
                defStatBase.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                defStatList.appendChild(defStatBase);
                pokeStats.appendChild(defStatList);
    
            } else if (statItem.stat.name === 'special-attack') {
                const specialATKStatList = document.createElement('ul');
                specialATKStatList.classList.add('list-group', 'list-group-horizontal');
                const specialATKStatName = document.createElement('li');
                specialATKStatName.textContent = 'Special Attack';
                specialATKStatName.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                specialATKStatList.appendChild(specialATKStatName);
                const specialATKStatBase = document.createElement('li');
                specialATKStatBase.textContent = statItem.base_stat;
                specialATKStatBase.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                specialATKStatList.appendChild(specialATKStatBase);
                pokeStats.appendChild(specialATKStatList);
    
            } else if (statItem.stat.name === 'special-defense') {
                const specialDEFStatList = document.createElement('ul');
                specialDEFStatList.classList.add('list-group', 'list-group-horizontal');
                const specialDEFStatName = document.createElement('li');
                specialDEFStatName.textContent = 'Special Defense';
                specialDEFStatName.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                specialDEFStatList.appendChild(specialDEFStatName);
                const specialDEFStatBase = document.createElement('li');
                specialDEFStatBase.textContent = statItem.base_stat;
                specialDEFStatBase.classList.add('list-group-item', 'text-warning', 'fs-5', 'border', 'border-primary','w-50');
                specialDEFStatList.appendChild(specialDEFStatBase);
                pokeStats.appendChild(specialDEFStatList);
                
            };
        });
    }
}


if (window.location.pathname.endsWith('search.html')) {
    formListener();
} else if (window.location.pathname.endsWith('details.html')) {
    displayPokeData();
}
