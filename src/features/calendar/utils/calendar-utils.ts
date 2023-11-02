export const calendarStepInMinutes = 15;

export const createIntervalTimestamps = (pickedDate:Date):Date[] => {
    let hours = [];
    let date = new Date(pickedDate);
    date.setHours(0, 0, 0);
    while(date.getDate() === pickedDate.getDate()){
        hours.push(new Date(date));
        date = new Date(date.getTime() + calendarStepInMinutes * 60000 );
    }
    return hours;
}

export const getTimeDiffInMinutes = (a:number, b:number) => {
    if(a > b) {
        return (a - b) / 60000;
    }
    else return (b-a)/60000;
}