export const mergeCategory = (currentData: any, newData: any) => {
  const days = isNaN(newData.pastDays) ? 0 : newData.pastDays;

  let maxDays;
  if (currentData && currentData.maxDays && newData.maxDays) {
    maxDays = Math.max(currentData.maxDays, newData.maxDays);
  } else if (newData && newData.maxDays) {
    maxDays = newData.maxDays;
  } else if (currentData && currentData.maxDays) {
    maxDays = currentData.maxDays;
  } else {
    maxDays = 0;
  }

  const toMaxDays = maxDays - days > 0 ? maxDays - days : 0;

  const data = {
    days,
    maxDays,
    toMaxDays
  };

  if (newData.lastResetDate) {
    return Object.assign(data, {
      lastResetDate: newData.lastResetDate
    });
  } else {
    return data;
  }
};
