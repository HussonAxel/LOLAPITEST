const btn = document.getElementById("championSave-btn");
const items = document.getElementById('items');

btn.addEventListener("click", async function() {
  const championInput = document.getElementById("champion");
  const champion = championInput.value;

  if (!champion) {
    alert("Please enter a champion name");
    return;
  }

  const firstLetterChampion = champion.charAt(0).toUpperCase();
  const championName = champion.replace(champion.charAt(0), firstLetterChampion);
  console.log(championName);

  try {
    const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/13.3.1/data/en_US/champion/${championName}.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const championLore = data.data[championName].lore;
    const championImage = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`;


    const championWrapper = document.createElement("div");
    championWrapper.classList.add('champion-wrapper');
    championWrapper.innerHTML = `
      <h3 class="championQuote">${championLore}</h3>
      <img src="${championImage}" class="img">
    `;
    // remove the previous quote
    const previousQuote = items.querySelector('.champion-wrapper');
    if (previousQuote) {
      previousQuote.remove();
    }
    items.appendChild(championWrapper);

  } catch (error) {
    alert("Champion not found");
    console.error('Error:', error);
  }
});
