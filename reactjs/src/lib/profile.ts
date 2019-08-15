export const mergeCategory = (currentData: any, newData: any) => {
  const days = newData.days;
  const maxDays = newData.maxDays
    ? Math.max(currentData.maxDays, newData.maxDays)
    : currentData.maxDays;
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
