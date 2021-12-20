export const noDateOverlap = (dates) => {
  let res = true;
  if (dates.length >= 2) {
    for (let i = 0; i < dates.length; i++) {
      for (let j = i + 1; j < dates.length; j++) {
        if (
          new Date(dates[j][0]) <= new Date(dates[i][1]) &&
          new Date(dates[j][0]) >= new Date(dates[i][0])
        ) {
          res = false;
          break;
        }
      }
    }
  }
  return res;
};
