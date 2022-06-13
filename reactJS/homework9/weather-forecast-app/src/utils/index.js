import { DAYS, MONTHS } from '../consts';

export const getTemperature = (data) => {
    const temperature = data.toFixed(0);

    if (+temperature === 0) {
        return '0 °C';
    } 

    if (temperature > 0) {
        return `+${temperature} °C`;
    }

    return `${temperature} °C`;
};

export const getHour = (date) => {
    const hour = date.getHours();

    if (hour === 0) {
        return '12 AM';
    }

    if (hour > 12) {
        return `${hour - 12} PM`;
    }

    return `${hour} AM`;
};

export const getMonth = (date) => {
    const numberOfMonth = date.getMonth();

    return MONTHS[numberOfMonth];
};

export const getDayOfWeek = (date) => {
    const numberOfDay = date.getDay();

    return DAYS[numberOfDay];
};