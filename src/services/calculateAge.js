import moment from 'moment';

export const SECOND = 'second';
export const MINUTE = 'minute';
export const HOUR = 'hour';
export const DAY = 'day';
export const MONTH = 'month';
export const YEAR = 'year';

/**
 * Calculate the age of a date from now
 * @param {Date} date The target date
 * @param {'second'|'minute'|'hour'|'day'|'month'|'year'} dateUnit 
 */
export function calculateAge(date, dateUnit = DAY, shouldRound = true) {
    const duration = calculateDuration(date, moment());
    const durationResult = duration.as(dateUnit);
    return shouldRound ? Math.floor(durationResult) : durationResult;
}

/**
 * Calculate duration between two dates 
 * @param {Date} startDate 
 * @param {Date} endDate 
 */
export function calculateDuration(startDate, endDate) {
    return moment.duration(endDate.diff(startDate));
}