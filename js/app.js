import {roll, reduceRollResults} from './utilities.js'

// TODO: Move die dieFaces and dice to separate file
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

  // TODO: Move renderPiles to game.js file
  const renderPiles = () => {
    let keepListItems = '';
    let rollListItems = '';

    // TODO: Remove repetition in the next 15 lines or so 
    dice.forEach((item) => {
      if (item.keep) {
        keepListItems += `<li><button data-id="${item.id}" class="die ${item.value}" aria-label="${item.value}"></button></li>`;
      } else {
        rollListItems += `<li><button data-id="${item.id}" class="die ${item.value}" aria-label="${item.value}"></button></li>`;      
      }
    })

    // TODO: De-couple the rollPile and keepPile DOM objects -> move to toggleKeep
    rollPile.innerHTML = rollListItems;
    keepPile.innerHTML = keepListItems;
    rollPile.querySelectorAll('button').forEach(function(item){
      item.addEventListener('click', toggleKeep);
    });

    keepPile.querySelectorAll('button').forEach(function(item){
      item.addEventListener('click', toggleKeep);
    });
  }

  // TODO: Move toggleKeep to game.js file
  const toggleKeep = event => {
    const dieId = parseInt(event.target.getAttribute('data-id'));
    const die = dice.find(item => item.id === dieId);
    die.keep = !die.keep;  
    renderPiles();
  }

  const resolveDice = () => {
    // TODO: Remove dice click handlers

    // Disable rolling
    rollBtn.disabled = true;

    // TODO: Refactor reduceRollResults to use the dice array directly
    const keptDiceVals = [];

    dice.forEach(item => {
      keptDiceVals.push(item.value);
    })

    // Reduce the results of the dice
    const rollResults = reduceRollResults(keptDiceVals);
    console.log(rollResults);

    // Take reduced dice results and output to the page
    let keptValuesDisplay = '';
    for(let faceValue in rollResults){
        keptValuesDisplay += `<li><button data-keep="">${faceValue} ${rollResults[faceValue]}</button></li>` 
    }
    resolvePile.innerHTML = keptValuesDisplay; 

    resolveBtn.disabled = true;

  }

  const rollBtn = document.querySelector('.roll-dice');
  const resolveBtn = document.querySelector('.resolve-dice');
  const rollPile = document.querySelector('.roll-pile');
  const keepPile = document.querySelector('.keep-pile');
  const resolvePile = document.querySelector('.resolve-pile ul');

  let rollCount = 0;

  resolveBtn.disabled = true; // disable by default


  rollBtn.addEventListener('click', () => {
    resolveBtn.disabled = false; // enable resolve after first roll

    // TODO: Move to separate function to clean up if/else with guard clauses
    if (rollCount < 3) {
      dice.forEach((die) => {
        if (!die.keep) {
          die.value = roll(dieFaces).label;
        }
      })
  
      rollCount++;

      renderPiles();

      if (rollCount === 3) {
        resolveDice();
      }
    } else {
      resolveDice();
    }

  })

  resolveBtn.addEventListener('click', resolveDice)

}

init();