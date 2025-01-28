export const getFormattedDate = (date: string): string => {
    if (!date) {
        return '';
    }

    const [year, month, day] = date
        .split('-')
        .map(v => parseInt(v));

    if (!year || !month || !day) {
        return '';
    }

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(year, month-1, day));
};