import {roll, reduceRollResults} from './utilities.js'

const die = [
  'Heart',
  'Attack',
  'Money',
  'One',
  'Two',
  'Three'
];

const init = () => {

  const moveDie = event => {
    if (event.target.parentNode.parentNode.parentNode.classList.contains('roll-pile')) {
      keepPile.appendChild(event.target.parentNode);
    } else if (event.target.parentNode.parentNode.parentNode.classList.contains('keep-pile')) {
      rollPile.appendChild(event.target.parentNode);
    }
  }

  const resolveDice = () => {
    // Disable rolling
    rollBtn.disabled = true;

    // If any remaining dice, keep them
    const remainingDice =  rollPile.querySelectorAll('li');
    if (remainingDice.length > 0) {
      remainingDice.forEach(function(item) {
        keepPile.appendChild(item);
      });
    }

    // Get values from dice
    const keptDice = keepPile.querySelectorAll('button');
    const keptDiceVals = [];

    for(let dieVal of keptDice){
      keptDiceVals.push(dieVal.innerHTML);
    }

    // Create a map of the rolled values
    const rollResults = reduceRollResults(keptDiceVals);
    console.log(rollResults);

    // Add map values
    let keptValuesDisplay = '';
    for(let faceValue in rollResults){
        keptValuesDisplay += `<li><button>${faceValue} ${rollResults[faceValue]}</button></li>` 
    }
    rollPile.innerHTML = keptValuesDisplay; 

    resolveBtn.disabled = true;

  }

  const rollBtn = document.querySelector('.roll-dice');
  const resolveBtn = document.querySelector('.resolve-dice');
  const rollPile = document.querySelector('.roll-pile ul');
  const keepPile = document.querySelector('.keep-pile ul');

  let rollCount = 0;

  resolveBtn.disabled = true; // disable by default


  rollBtn.addEventListener('click', () => {
    resolveBtn.disabled = false; // enable resolve after first roll

    const numDie = 6 - keepPile.querySelectorAll('li').length;

    let rollResults = [];
    for (let i = 0; i < numDie; i++) {
      rollResults[rollResults.length] = roll(die);
    }

    console.log(rollResults);

    rollCount++;

    if (rollCount <= 3) {
      let listItems = '';
      rollResults.forEach(function(item){
        listItems += `<li><button class="die">${item}</button></li>`;
      });
      rollPile.innerHTML = listItems;

      rollPile.querySelectorAll('button').forEach(function(item){
        item.addEventListener('click', moveDie);
      });

    } else {
      resolveDice();
    }


  })

  resolveBtn.addEventListener('click', resolveDice)

}

init();