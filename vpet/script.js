let hunger = 50;
let happiness = 50;

// Update these variables with your pet's name and type
let petName = "Buddy";
let petType = "Dog";

document.getElementById("petName").getElementsByTagName("span")[0].innerText = petName;
document.getElementById("petType").getElementsByTagName("span")[0].innerText = petType;
updateStatus();

function feedPet() {
    hunger -= 10;
    if (hunger < 0) hunger = 0;
    updateStatus();
}

function playWithPet() {
    happiness += 10;
    if (happiness > 100) happiness = 100;
    updateStatus();
}

function updateStatus() {
    document.getElementById("petStatus").innerText = `Hunger: ${hunger} | Happiness: ${happiness}`;
}
