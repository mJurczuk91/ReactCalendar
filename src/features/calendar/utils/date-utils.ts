export const getLastDayOfMonth = (m: number, y: number):number => {
    m=m+1;
    return m===2 ? y & 3 || (!(y%25) && y & 15) ? 28 : 29 : 30 + (m+(m>>3)&1);
    // https://stackoverflow.com/questions/222309/calculate-last-day-of-month
}

export const getAllDaysInMonth = (month:number, year:number):number[] => {
    const days:number[] = [];
    for(let day = 1; day <= getLastDayOfMonth(month, year); day++){
        days.push(day);
    }
    return days;
}

export const sameDayMonthYear = (date1:Date, date2:Date):boolean => {
    if(date1.getDate() !== date2.getDate()) return false;
    if(date1.getMonth() !== date2.getMonth()) return false;
    if(date1.getFullYear() !== date2.getFullYear()) return false;

    return true;
}

export const sameMonth = (date1:Date, date2:Date):boolean => {
    if(date1.getMonth() !== date2.getMonth()) return false;

    return true;
}

export const getMonthNameInPolish = (month:number):string => {
    switch (month){
        case 0:{
            return 'Styczeń';
        }
        case 1:{
            return 'Luty';
        }
        case 2:{
            return 'Marzec';
        }
        case 3:{
            return 'Kwiecień';
        }
        case 4:{
            return 'Maj';
        }
        case 5:{
            return 'Czerwiec';
        }
        case 6:{
            return 'Lipiec';
        }
        case 7:{
            return 'Sierpień';
        }
        case 8:{
            return 'Wrzesień';
        }
        case 9:{
            return 'Październik';
        }
        case 10:{
            return 'Listopad';
        }
        case 11:{
            return 'Grudzień';
        }
        default: {
            return 'INCORRECT_MONTH_NUMBER';
        }
    }
}

export const padWithZeros = (a:number) => {
    if(a.toString().length === 1) return '0'+a.toString();
    else return a;
}
