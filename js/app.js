import {roll, reduceRollResults} from './utilities.js'

const dieFaces = [
  {
    label: 'heal'
  },
  {
    label: 'attack'
  },
  {
    label: 'money'
  },
  {
    label: 'one'
  },
  {
    label: 'two'
  },
  {
    label: 'three'
  }
];

const dice = [
  {
    id: 0,
    value: '',
    keep: false,
  },
  {
    id: 1,
    value: '',
    keep: false,
  },
  {
    id: 2,
    value: '',
    keep: false,
  },
  {
    id: 3,
    value: '',
    keep: false,
  },
  {
    id: 4,
    value: '',
    keep: false,
  },
  {
    id: 5,
    value: '',
    keep: false,
  }
];


const init = () => {

  const renderPiles = () => {
    let keepListItems = '';
    let rollListItems = '';

    dice.forEach((item) => {
      if (item.keep) {
        keepListItems += `<li><button data-id="${item.id}" class="die ${item.value}" aria-label="${item.value}"></button></li>`;
      } else {
        rollListItems += `<li><button data-id="${item.id}" class="die ${item.value}" aria-label="${item.value}"></button></li>`;      
      }
    })
    rollPile.innerHTML = rollListItems;
    keepPile.innerHTML = keepListItems;
    rollPile.querySelectorAll('button').forEach(function(item){
      item.addEventListener('click', toggleKeep);
    });

    keepPile.querySelectorAll('button').forEach(function(item){
      item.addEventListener('click', toggleKeep);
    });
  }

  const toggleKeep = event => {
    console.log(event.target.getAttribute('data-id'));
    const dieId = parseInt(event.target.getAttribute('data-id'));
    dice.find((item) => {
      if (item.id === dieId) {
        item.keep = !item.keep;
      }
    })
    renderPiles();
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
      keptDiceVals.push(dieVal.getAttribute('aria-label'));
    }

    // Create a map of the rolled values
    const rollResults = reduceRollResults(keptDiceVals);
    console.log(rollResults);

    // Add map values
    let keptValuesDisplay = '';
    for(let faceValue in rollResults){
        keptValuesDisplay += `<li><button data-keep="">${faceValue} ${rollResults[faceValue]}</button></li>` 
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

    dice.forEach((die) => {
      if (!die.keep) {
        die.value = roll(dieFaces).label;
      }
    })

    rollCount++;

    // TODO: Figure out how the interface should work when roll limit is reached. Currently there is an action required to resolve the dice. Auto-resolve makes it more difficult to see what the last dice roll was.
    if (rollCount <= 3) {
      renderPiles();
    } else {
      resolveDice();
    }


  })

  resolveBtn.addEventListener('click', resolveDice)

}

init();