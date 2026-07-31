const riceData = {
    "basmati": { k: 1.25, time: 14, density: 0.80 },
    "jasmine": { k: 1.15, time: 13, density: 0.825 },
    "sushi":   { k: 1.20, time: 15, density: 0.875 },
    "baldo":   { k: 1.35, time: 17, density: 0.85 },
    "brown":   { k: 1.80, time: 45, density: 0.80 }
};

window.onload = function() {
    syncProSettings();
};

function syncProSettings() {
    const type = document.getElementById('riceType').value;
    document.getElementById('absorptionFactor').value = riceData[type].k;
    document.getElementById('cookTime').value = riceData[type].time;
}

function toggleAdvanced() {
    const adv = document.getElementById('advancedSettings');
    adv.style.display = adv.style.display === 'block' ? 'none' : 'block';
}

function calculateWater() {
    const amountInput = parseFloat(document.getElementById('riceAmount').value);
    const unit = document.getElementById('unit').value;
    const type = document.getElementById('riceType').value;
    
    const K = parseFloat(document.getElementById('absorptionFactor').value);
    const T = parseFloat(document.getElementById('cookTime').value);
    const evapRate = parseFloat(document.getElementById('evaporationRate').value);

    if (isNaN(amountInput) || amountInput <= 0) {
        alert("Please enter a valid amount of rice, bro!");
        return;
    }

    if (isNaN(K) || isNaN(T) || isNaN(evapRate)) {
        alert("Pro settings fields cannot be empty!");
        return;
    }

    let cupVolume = 0;
    if (unit === 'cup_us') cupVolume = 240;
    else if (unit === 'cup_metric') cupVolume = 250;
    else if (unit === 'cup_200') cupVolume = 200;

    let amountInGrams = amountInput;
    if (cupVolume > 0) {
        amountInGrams = amountInput * (cupVolume * riceData[type].density);
    }

    const absorbedWater = amountInGrams * K;
    const evaporatedWater = T * evapRate;
    const totalWater = Math.round(absorbedWater + evaporatedWater);

    document.getElementById('waterResult').innerText = totalWater;
    document.getElementById('timeResult').innerText = T;

    const cupsText = document.getElementById('cupsResult');
    if (cupVolume > 0) {
        const waterInCups = (totalWater / cupVolume).toFixed(2);
        cupsText.innerText = `Or approx. ${waterInCups} cups of water`;
        cupsText.style.display = 'block';
    } else {
        cupsText.style.display = 'none';
    }
    
    const resultBox = document.getElementById('resultBox');
    resultBox.style.display = 'block';
}