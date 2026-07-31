const riceData = {
    "basmati": { k: 1.25, time: 14 },
    "jasmine": { k: 1.15, time: 13 },
    "sushi":   { k: 1.20, time: 15 },
    "baldo":   { k: 1.35, time: 17 },
    "brown":   { k: 1.80, time: 45 }
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
    const amount = parseFloat(document.getElementById('riceAmount').value);
    

    const K = parseFloat(document.getElementById('absorptionFactor').value);
    const T = parseFloat(document.getElementById('cookTime').value);
    const evapRate = parseFloat(document.getElementById('evaporationRate').value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount of rice, bro!");
        return;
    }

    if (isNaN(K) || isNaN(T) || isNaN(evapRate)) {
        alert("Pro settings fields cannot be empty!");
        return;
    }

    const absorbedWater = amount * K;
    const evaporatedWater = T * evapRate;
    const totalWater = Math.round(absorbedWater + evaporatedWater);

    document.getElementById('waterResult').innerText = totalWater;
    document.getElementById('timeResult').innerText = T;
    
    const resultBox = document.getElementById('resultBox');
    resultBox.style.display = 'block';
}