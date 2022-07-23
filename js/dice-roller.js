const isFairDie = faces => {
  const validFaces = [2, 4, 6, 8, 10, 12, 20];
  if (validFaces.includes(faces)) {
    return true; 
  } else {
    return false;
  }
}

const tokyoDie = [
  'Heart',
  'Attack',
  'Money',
  'One',
  'Two',
  'Three'
]

const roll = die => {
  if (Number.isInteger(die) && isFairDie(die)) {
    return Math.ceil(Math.random() * die);
  } else if (Array.isArray(die) && isFairDie(die.length)) {
    return die[Math.floor(Math.random() * die.length)];
  } else {
    return 'Not a valid die';
  }
}

console.log(roll(6));
console.log(roll(tokyoDie));