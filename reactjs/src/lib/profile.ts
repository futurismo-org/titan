export const mergeCategory = (currentData: any, newData: any) => {
  const days = newData.days;
  const maxDays = Math.max(currentData.maxDays, newData.maxDays);
  const toMaxDays = maxDays - days > 0 ? maxDays - days : 0;
  const lastResetDate = newData.lastResetDate;

  return {
    days,
    maxDays,
    toMaxDays,
    lastResetDate
  };
};
