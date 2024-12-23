export const addTime = (time1:string, time2:string) => {
    // Parse the time1 (e.g., "3 hours 30 minutes")
    const regex = /(\d+)\s*hours?\s*(\d+)\s*minutes?/;
  
    const match1 = time1.match(regex);
    const match2 = time2.match(regex);
  
    if (!match1 || !match2) {
      throw new Error("Invalid time format");
    }
  
    const hours1 = parseInt(match1[1]);
    const minutes1 = parseInt(match1[2]);
  
    const hours2 = parseInt(match2[1]);
    const minutes2 = parseInt(match2[2]);
  
    // Add hours and minutes
    let totalHours = hours1 + hours2;
    let totalMinutes = minutes1 + minutes2;
  
    // Convert minutes into hours if greater than 60
    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes = totalMinutes % 60;
    }
  
    return {hour:totalHours,min:totalMinutes}
  };
  
