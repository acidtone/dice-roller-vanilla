// TODO: refactor this code to use the best dice rollr package evar made.
// https://unpkg.com/dice-rollr@1.0.0/index.js

const isFairDie = faces => {
  const validFaces = [2, 4, 6, 8, 10, 12, 20];
  return validFaces.includes(faces);
}

export const roll = die => {
  if (Number.isInteger(die) && isFairDie(die)) return Math.ceil(Math.random() * die);
  if (Array.isArray(die) && isFairDie(die.length)) return die[Math.floor(Math.random() * die.length)];
  return 'Not a valid die';
}

// Takes array of dice and returns a reduced count of each die face
export const reduceRollResults = (resultsArray) => {
  console.log(resultsArray);

  const rollResults = resultsArray.reduce((acc, curr) => {

    if (typeof acc[curr.value] == 'undefined') {
        acc[curr.value] = 1;
      } else {
        acc[curr.value] += 1;
      }
      return acc;
    }, {});

  return rollResults;
}
