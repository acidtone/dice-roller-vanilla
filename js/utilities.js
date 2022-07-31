const isFairDie = faces => {
  const validFaces = [2, 4, 6, 8, 10, 12, 20];
  return validFaces.includes(faces);
}

export const roll = die => {
  if (Number.isInteger(die) && isFairDie(die)) return Math.ceil(Math.random() * die);
  if (Array.isArray(die) && isFairDie(die.length)) return die[Math.floor(Math.random() * die.length)];
  return 'Not a valid die';
}

// Takes array of dice and maps out values
export const reduceRollResults = (resultsArray) => {
  console.log(resultsArray);
  // First, sort all values
  const rollResults = resultsArray.reduce((acc, curr) => {
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, {});

  return rollResults;
}
