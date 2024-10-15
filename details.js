
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
        pokeTitle.classList.add('andy', 'text-uppercase');
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
    
        const pokeBtn = document.createElement('a');
        pokeBtn.href = pokeURL;
        pokeBtn.classList.add('btn', 'btn-outline-warning', 'w-100', 'fs-3');
        const names = pokeName.split(" ");
        for (let i = 0; i < names.length; i++) {
            names[i] = names[i][0].toUpperCase() + names[i].substr(1);
        }
        names.join(" ");
        pokeBtn.textContent = `PokéDex: ${names}`;
        pokeLink.appendChild(pokeBtn);
    
        const pokeDetails = document.getElementById('pokeDetails');
        const pokeDetailsTitle = document.createElement('h3');
        pokeDetailsTitle.classList.add('h2', 'text-warning-emphasis', 'text-center');
        pokeDetailsTitle.textContent = 'PokéDetails:';
        pokeDetails.appendChild(pokeDetailsTitle);


        const pokeTypeList = document.createElement('ul');
        pokeTypeList.classList.add('list-group');

        const pokeTypeTitle = document.createElement('li');
        pokeTypeTitle.innerHTML = 'PokéMon Type';
        pokeTypeTitle.classList.add('list-group-item', 'text-warning-emphasis', 'fs-4', 'border', 'border-primary', 'deco');
        const pokeTypeItem = document.createElement('li');
        let type = pokeData.types[0].type.name[0].toUpperCase() + pokeData.types[0].type.name.substring(1);
        pokeTypeItem.innerHTML = type;
        pokeTypeItem.classList.add('list-group-item', 'text-white', 'border', 'border-warning', 'andy');
        pokeTypeTitle.appendChild(pokeTypeItem);
        pokeTypeList.appendChild(pokeTypeTitle);
        pokeDetails.appendChild(pokeTypeList);


        const pokeExperienceList = document.createElement('ul');
        pokeExperienceList.classList.add('list-group');

        const pokeExperienceTitle = document.createElement('li');
        pokeExperienceTitle.innerHTML = 'Experience';
        pokeExperienceTitle.classList.add('list-group-item', 'text-warning-emphasis', 'fs-4', 'border', 'border-primary', 'deco');
        const pokeExperienceItem = document.createElement('li');
        pokeExperienceItem.innerHTML = pokeData.base_experience;
        pokeExperienceItem.classList.add('list-group-item', 'text-white', 'border', 'border-warning', 'andy');
        pokeExperienceTitle.appendChild(pokeExperienceItem);
        pokeExperienceList.appendChild(pokeExperienceTitle);
        pokeDetails.appendChild(pokeExperienceList);
    

        const pokeIDList = document.createElement('ul');
        pokeIDList.classList.add('list-group');
    
        const pokeIDTitle = document.createElement('li');
        pokeIDTitle.innerHTML = 'PokéDex ID Number';
        pokeIDTitle.classList.add('list-group-item', 'text-warning-emphasis', 'fs-4', 'border', 'border-primary', 'deco');
        const pokeIDItem = document.createElement('li');
        pokeIDItem.innerHTML = pokeData.id;
        pokeIDItem.classList.add('list-group-item', 'text-white', 'border', 'border-warning', 'andy');
        pokeIDTitle.appendChild(pokeIDItem);
        pokeIDList.appendChild(pokeIDTitle);
        pokeDetails.appendChild(pokeIDList);
    

        const pokeHeightList = document.createElement('ul');
        pokeHeightList.classList.add('list-group');
    
        const pokeHeightTitle = document.createElement('li');
        pokeHeightTitle.innerHTML = 'Height'
        pokeHeightTitle.classList.add('list-group-item', 'text-warning-emphasis', 'deco', 'fs-4', 'border', 'border-primary');
        const pokeDeciHeight = document.createElement('li');
        pokeDeciHeight.classList.add('list-group-item', 'text-white', 'andy', 'border', 'border-warning');
        pokeDeciHeight.innerHTML = `${pokeData.height} Decimeters`;
        const pokeMeterHeight = document.createElement('li');
        pokeMeterHeight.classList.add('list-group-item', 'text-white', 'andy', 'border', 'border-warning');
        pokeMeterHeight.innerHTML = `${pokeData.height/10} Meters`;
        const pokeFeetHeight = document.createElement('li');
        pokeFeetHeight.classList.add('list-group-item', 'text-white', 'andy', 'border', 'border-warning');
        let feet = parseInt(((pokeData.height/10)*3.281), 10)
        pokeFeetHeight.innerHTML = `${feet} ${feet === 1 ? 'Foot' : 'Feet'}`;

        pokeHeightTitle.appendChild(pokeDeciHeight);
        pokeHeightTitle.appendChild(pokeMeterHeight);
        pokeHeightTitle.appendChild(pokeFeetHeight);
        pokeHeightList.appendChild(pokeHeightTitle);
        pokeDetails.appendChild(pokeHeightList);
        

        const pokeWeightList = document.createElement('ul');
        pokeWeightList.classList.add('list-group');
    
        const pokeWeightTitle = document.createElement('li');
        pokeWeightTitle.innerHTML = 'Weight'
        pokeWeightTitle.classList.add('list-group-item', 'text-warning-emphasis', 'deco', 'fs-4', 'border', 'border-primary');
        const pokeDecaWeight = document.createElement('li');
        pokeDecaWeight.classList.add('list-group-item', 'text-white', 'andy', 'border', 'border-warning');
        pokeDecaWeight.innerHTML = `${pokeData.weight} Decagrams`;
        const pokeKiloWeight = document.createElement('li');
        pokeKiloWeight.classList.add('list-group-item', 'text-white', 'andy', 'border', 'border-warning');
        pokeKiloWeight.innerHTML = `${pokeData.weight/10} Kilograms`;
        const pokePoundsWeight = document.createElement('li');
        pokePoundsWeight.classList.add('list-group-item', 'text-white', 'andy', 'border', 'border-warning');
        let pounds = parseInt(((pokeData.weight/10)*3.281), 10)
        pokePoundsWeight.innerHTML = `${pounds} ${pounds === 1 ? 'Pound' : 'Pounds'}`;

        pokeWeightTitle.appendChild(pokeDecaWeight);
        pokeWeightTitle.appendChild(pokeKiloWeight);
        pokeWeightTitle.appendChild(pokePoundsWeight);
        pokeWeightList.appendChild(pokeWeightTitle);
        pokeDetails.appendChild(pokeWeightList);

    
        const statsTitle = document.getElementById('statsTitle');
        statsTitle.textContent = 'PokéStats';
    
        const pokeStats = document.getElementById('pokeStats');
        const statsList = document.createElement('ul');
        statsList.classList.add('list-group', 'list-group-horizontal');
        pokeStats.appendChild(statsList);
    
        const statName = document.createElement('li');
        statName.textContent = 'Name';
        statName.classList.add('list-group-item', 'text-center', 'text-warning-emphasis', 'deco', 'fs-4', 'border', 'border-primary','w-50');
        const statBase = document.createElement('li');
        statBase.textContent = 'Base Amount';
        statBase.classList.add('list-group-item', 'text-center', 'text-warning-emphasis', 'deco', 'fs-4', 'border', 'border-primary','w-50');
        statsList.appendChild(statName);
        statsList.appendChild(statBase);
    
        const statsItems = pokeData.stats;
        statsItems.forEach(statItem => {
            if (statItem.stat.name === 'speed') {
                const speedStatList = document.createElement('ul');
                speedStatList.classList.add('list-group', 'list-group-horizontal');
                const speedStatName = document.createElement('li');
                speedStatName.textContent = 'Speed';
                speedStatName.classList.add('list-group-item', 'text-warning', 'fs-4', 'border', 'border-primary','w-50');
                speedStatList.appendChild(speedStatName);
                const speedStatBase = document.createElement('li');
                speedStatBase.textContent = statItem.base_stat;
                speedStatBase.classList.add('list-group-item', 'text-white', 'fs-4', 'border', 'border-primary','w-50');
                speedStatList.appendChild(speedStatBase);
                pokeStats.appendChild(speedStatList);
    
            } else if (statItem.stat.name === 'hp') {
                const hpStatList = document.createElement('ul');
                hpStatList.classList.add('list-group', 'list-group-horizontal');
                const hpStatName = document.createElement('li');
                hpStatName.textContent = 'HP';
                hpStatName.classList.add('list-group-item', 'text-warning', 'fs-4', 'border', 'border-primary','w-50');
                hpStatList.appendChild(hpStatName);
                const hpStatBase = document.createElement('li');
                hpStatBase.textContent = statItem.base_stat;
                hpStatBase.classList.add('list-group-item', 'text-white', 'fs-4', 'border', 'border-primary','w-50');
                hpStatList.appendChild(hpStatBase);
                pokeStats.appendChild(hpStatList);
    
            } else if (statItem.stat.name === 'attack') {
                const atkStatList = document.createElement('ul');
                atkStatList.classList.add('list-group', 'list-group-horizontal');
                const atkStatName = document.createElement('li');
                atkStatName.textContent = 'Attack';
                atkStatName.classList.add('list-group-item', 'text-warning', 'fs-4', 'border', 'border-primary','w-50');
                atkStatList.appendChild(atkStatName);
                const atkStatBase = document.createElement('li');
                atkStatBase.textContent = statItem.base_stat;
                atkStatBase.classList.add('list-group-item', 'text-white', 'fs-4', 'border', 'border-primary','w-50');
                atkStatList.appendChild(atkStatBase);
                pokeStats.appendChild(atkStatList);
    
            } else if (statItem.stat.name === 'defense') {
                const defStatList = document.createElement('ul');
                defStatList.classList.add('list-group', 'list-group-horizontal');
                const defStatName = document.createElement('li');
                defStatName.textContent = 'Defense';
                defStatName.classList.add('list-group-item', 'text-warning', 'fs-4', 'border', 'border-primary','w-50');
                defStatList.appendChild(defStatName);
                const defStatBase = document.createElement('li');
                defStatBase.textContent = statItem.base_stat;
                defStatBase.classList.add('list-group-item', 'text-white', 'fs-4', 'border', 'border-primary','w-50');
                defStatList.appendChild(defStatBase);
                pokeStats.appendChild(defStatList);
    
            } else if (statItem.stat.name === 'special-attack') {
                const specialATKStatList = document.createElement('ul');
                specialATKStatList.classList.add('list-group', 'list-group-horizontal');
                const specialATKStatName = document.createElement('li');
                specialATKStatName.textContent = 'Special Attack';
                specialATKStatName.classList.add('list-group-item', 'text-warning', 'fs-4', 'border', 'border-primary','w-50');
                specialATKStatList.appendChild(specialATKStatName);
                const specialATKStatBase = document.createElement('li');
                specialATKStatBase.textContent = statItem.base_stat;
                specialATKStatBase.classList.add('list-group-item', 'text-white', 'fs-4', 'border', 'border-primary','w-50');
                specialATKStatList.appendChild(specialATKStatBase);
                pokeStats.appendChild(specialATKStatList);
    
            } else if (statItem.stat.name === 'special-defense') {
                const specialDEFStatList = document.createElement('ul');
                specialDEFStatList.classList.add('list-group', 'list-group-horizontal');
                const specialDEFStatName = document.createElement('li');
                specialDEFStatName.textContent = 'Special Defense';
                specialDEFStatName.classList.add('list-group-item', 'text-warning', 'fs-4', 'border', 'border-primary','w-50');
                specialDEFStatList.appendChild(specialDEFStatName);
                const specialDEFStatBase = document.createElement('li');
                specialDEFStatBase.textContent = statItem.base_stat;
                specialDEFStatBase.classList.add('list-group-item', 'text-white', 'fs-4', 'border', 'border-primary','w-50');
                specialDEFStatList.appendChild(specialDEFStatBase);
                pokeStats.appendChild(specialDEFStatList);
                
            };
            const pokeMoves = document.getElementById('pokeMoves');
            const pokeMovesTitle = document.getElementById('pokeMovesTitle');
            pokeMovesTitle.textContent = 'PokéMoves:';
            pokeMoves.innerHTML = '';
            
            const pokeMovesList = document.createElement('ul');
            pokeMovesList.classList.add('list-group', 'list-group-horizontal');

            const pokeMoveName = document.createElement('li');
            pokeMoveName.classList.add('list-group-item', 'text-warning-emphasis', 'fs-4', 'border', 'border-primary', 'deco', 'text-center', 'w-50');
            pokeMoveName.innerHTML = 'Name';
            pokeMovesList.appendChild(pokeMoveName);

            const pokeMoveVersion = document.createElement('li')
            pokeMoveVersion.classList.add('list-group-item', 'text-warning-emphasis', 'fs-4', 'border', 'border-primary', 'deco', 'text-center', 'w-50');
            pokeMoveVersion.innerHTML = 'Version';
            pokeMovesList.appendChild(pokeMoveVersion);
            pokeMoves.appendChild(pokeMovesList);

            
            
            const pokeMoveItems = pokeData.moves;
            pokeMoveItems.forEach(pokeMoveItem => {
                
                const moveItem = document.createElement('ul');
                moveItem.classList.add('list-group', 'list-group-horizontal');

                const moveName = document.createElement('li');
                moveName.classList.add('list-group-item', 'text-warning', 'fs-4', 'border', 'border-primary','w-50');
                moveName.innerHTML = pokeMoveItem.move.name;
                moveItem.appendChild(moveName);
                
                const moveVersions = document.createElement('li');
                moveVersions.classList.add('list-group-item', 'text-warning', 'fs-4', 'border', 'border-primary','w-50');
                moveItem.appendChild(moveVersions);
                pokeMoves.appendChild(moveItem);

                const versionDropdown = document.createElement('div');
                versionDropdown.classList.add('dropdown', 'dropstart');
                moveVersions.appendChild(versionDropdown);

                const dropdownBtn = document.createElement('button');
                dropdownBtn.classList.add('btn', 'btn-outline-warning', 'dropdown-toggle', 'fs-4');
                dropdownBtn.type = 'button';
                for (let i = 0; i < pokeMoveItems.length; i++) {
                    dropdownBtn.id = `dropdown${i}`;
                };
                dropdownBtn.setAttribute('data-bs-toggle', 'dropdown');
                dropdownBtn.setAttribute('aria-expanded', 'false');
                dropdownBtn.textContent = 'Display Versions';
                versionDropdown.appendChild(dropdownBtn);

                const versionList = document.createElement('ul');
                versionList.classList.add('dropdown-menu', 'border', 'border-warning');
                versionList.setAttribute('aria-labelledby', dropdownBtn.id);
                versionDropdown.appendChild(versionList);
                
                const versions = pokeMoveItem.version_group_details;
                versions.forEach(version => {
                    
                    const versionItem = document.createElement('li');
                    versionItem.classList.add('dropdown-item','text-white', 'fs-4');
                    versionItem.innerHTML = version.version_group.name;
                    versionList.appendChild(versionItem);
                });
                
            });
            
            
        });
    }
}


if (window.location.pathname.endsWith('search.html')) {
    formListener();
} else if (window.location.pathname.endsWith('details.html')) {
    displayPokeData();
}
