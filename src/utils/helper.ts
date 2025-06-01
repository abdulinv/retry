export const parseCustomDate = (dateStr: string): number => {
    if (!dateStr) return 0;
  
    // Normalize input like "5 May 2025"
    const parts = dateStr.trim().split(" ");
    if (parts.length !== 3) return 0;
  
    const [dayStr, monthStr, yearStr] = parts;
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);
  
    const monthMap: Record<string, number> = {
      January: 0, February: 1, March: 2, April: 3, May: 4,
      June: 5, July: 6, August: 7, September: 8,
      October: 9, November: 10, December: 11,
    };
  
    const month = monthMap[monthStr];
  
    if (isNaN(day) || isNaN(year) || month === undefined) return 0;
  
    return new Date(year, month, day).getTime();
  };