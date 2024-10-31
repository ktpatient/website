function getSciencePointsHelper(outcome) {
    let sciencePoints = 0;
    const leastSymbol = Math.min(outcome[0], outcome[1], outcome[2]);
    sciencePoints += leastSymbol * 7;
    sciencePoints += outcome[0] * outcome[0];
    sciencePoints += outcome[1] * outcome[1];
    sciencePoints += outcome[2] * outcome[2];
    return sciencePoints;
}

function getSciencePoints(science) {
    let [tablet, cog, compass, wilds] = science;
    let scores = [];
    scores.push([tablet, cog, compass]);

    for (let wild_lvl = 0; wild_lvl < wilds; wild_lvl++) {
        const num_to_pop = Math.pow(3, wild_lvl);
        for (let popped = 0; popped < num_to_pop; popped++) {
            if (scores.length === 0) break;
            const values = scores.shift();
            tablet = values[0];
            cog = values[1];
            compass = values[2];
            scores.push([tablet + 1, cog, compass]);
            scores.push([tablet, cog + 1, compass]);
            scores.push([tablet, cog, compass + 1]);
        }
    }

    let maxValue = 0;
    for (const v of scores) {
        const val = getSciencePointsHelper(v);
        if (val > maxValue) maxValue = val;
    }
    return maxValue;
}

function getMilitaryPoints(militaryTokens) {
    return militaryTokens;
}

function getTreasuryPoints(coins) {
    return Math.floor(coins / 3);
}

function getWonderPoints(wonderStages) {
    return wonderStages;
}

function getCivilianPoints(civilianBuildings) {
    return civilianBuildings;
}

function getCommercialPoints(commercialBuildings) {
    return commercialBuildings;
}

function getGuildPoints(guilds) {
    return guilds;
}
function getDebtPoints(debt) {
    return debt;
}

function calculateTotalScore({
    militaryTokens,
    coins,
    debt,
    wonderStages,
    civilianBuildings,
    commercialBuildings,
    guilds,
    science
}) {
    const militaryPoints = getMilitaryPoints(militaryTokens);
    const treasuryPoints = getTreasuryPoints(coins);
    const debtPoints = getDebtPoints(debt);
    const wonderPoints = getWonderPoints(wonderStages);
    const civilianPoints = getCivilianPoints(civilianBuildings);
    const commercialPoints = getCommercialPoints(commercialBuildings);
    const guildPoints = getGuildPoints(guilds);
    const sciencePoints = getSciencePoints(science);

    return (

        militaryPoints +
        treasuryPoints +
        wonderPoints +
        civilianPoints +
        commercialPoints +
        guildPoints +
        sciencePoints - debtPoints
    );
}


function calculateScores() {
    const rows = document.querySelectorAll("#scoreTable tbody tr");
    rows.forEach(row => {
        let militaryTokens = row.querySelector(".militaryTokens");
        let coins = row.querySelector(".coins input");
        let debt = row.querySelector(".debt input");
        console.log(`debt: ${debt.value}`);
        let wonderStages = row.querySelector(".wonderStages");
        let civilianBuildings = row.querySelector(".civilianBuildings");

        let commercialBuildings = row.querySelector(".commercialBuildings");

        let guilds = row.querySelector(".guilds-input");

        let scienceInputs = row.querySelectorAll(".science input");
        let scienceValues = Array.from(scienceInputs).map(input => parseInt(input.value || 0, 10));

        militaryTokens = militaryTokens ? parseInt(militaryTokens.value || 0, 10) : 0;
        coins = coins ? parseInt(coins.value || 0, 10) : 0;
        wonderStages = wonderStages ? parseInt(wonderStages.value || 0, 10) : 0;
        civilianBuildings = civilianBuildings ? parseInt(civilianBuildings.value || 0, 10) : 0;
        commercialBuildings = commercialBuildings ? parseInt(commercialBuildings.value || 0, 10) : 0;
        guilds = guilds ? guilds.value.split(',').map(Number).reduce((total, num) => total + (num || 0), 0) : 0;
        debt = debt ? parseInt(debt.value || 0, 10) : 0;

        let tablet = scienceValues[0] ? parseInt(scienceValues[0], 10) : 0;
        let cog = scienceValues[1] ? parseInt(scienceValues[1], 10) : 0;
        let compass = scienceValues[2] ? parseInt(scienceValues[2], 10) : 0;
        let wilds = scienceValues[3] ? parseInt(scienceValues[3], 10) : 0;

        let totalScore = calculateTotalScore({
            militaryTokens,
            coins,
            debt,
            wonderStages,
            civilianBuildings,
            commercialBuildings,
            guilds,
            science: [tablet, cog, compass, wilds]
        });

        const totalCell = row.querySelector(".total-score");
        if (totalCell) {
            totalCell.textContent = totalScore;
        }
    });
}

function addPlayer() {
    const scoreTableBody = document.querySelector("#scoreTable tbody");
    const firstRow = scoreTableBody.querySelector("tr");

    const newRow = firstRow.cloneNode(true);

    const inputs = newRow.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = "";
    });

    const playerNameInput = newRow.querySelector(".player-name");
    playerNameInput.value = `Player ${scoreTableBody.children.length + 1}`;

    scoreTableBody.appendChild(newRow);
}
