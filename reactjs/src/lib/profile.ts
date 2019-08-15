export const mergeCategory = (currentData: any, newData: any) => {
  const days = newData.days;
  const maxDays = Math.max(currentData.maxDays, newData.maxDays);
  const toMaxDays = maxDays - days > 0 ? maxDays - days : 0;

  const data = {
    days,
    maxDays,
    toMaxDays
  };

  if (newData.lastResetDays) {
    return Object.assign(data, {
      lastResetDays: newData.lastResetDays
    });
  } else {
    return data;
  }
};
