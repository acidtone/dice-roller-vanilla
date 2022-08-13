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
