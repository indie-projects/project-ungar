export const calculateDaysDifference = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const difference = endDate.getTime() - startDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24)) + 1;
  };