export const timeAgo = (createdAt: string): string => {
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - createdAtDate.getTime();

    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);
    const differenceInWeeks = Math.floor(differenceInDays / 7);
    const differenceInMonths = Math.floor(differenceInDays / 30); // Aproximado
    const differenceInYears = Math.floor(differenceInDays / 365); // Aproximado

    if (differenceInSeconds < 60) {
        return `${differenceInSeconds} segundo${differenceInSeconds !== 1 ? 's' : ''}`;
    } else if (differenceInMinutes < 60) {
        return `${differenceInMinutes} minuto${differenceInMinutes !== 1 ? 's' : ''}`;
    } else if (differenceInHours < 24) {
        return `${differenceInHours} hora${differenceInHours !== 1 ? 's' : ''}`;
    } else if (differenceInDays < 7) {
        return `${differenceInDays} día${differenceInDays !== 1 ? 's' : ''}`;
    } else if (differenceInWeeks < 5) {
        return `${differenceInWeeks} semana${differenceInWeeks !== 1 ? 's' : ''}`;
    } else if (differenceInMonths < 12) {
        return `${differenceInMonths} mes${differenceInMonths !== 1 ? 'es' : ''}`;
    } else {
        return `${differenceInYears} año${differenceInYears !== 1 ? 's' : ''}`;
    }
}
