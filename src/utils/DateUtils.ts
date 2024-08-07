export const timeAgoUnit = (createdAt: string): string => {
  const createdAtDate = new Date(createdAt);
  const currentDate = new Date();
  const differenceInMilliseconds =
    currentDate.getTime() - createdAtDate.getTime();

  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);
  const differenceInWeeks = Math.floor(differenceInDays / 7);
  const differenceInMonths = Math.floor(differenceInDays / 30); // Aproximado
  const differenceInYears = Math.floor(differenceInDays / 365); // Aproximado

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} segundo${differenceInSeconds !== 1 ? "s" : ""}`;
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minuto${differenceInMinutes !== 1 ? "s" : ""}`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours} hora${differenceInHours !== 1 ? "s" : ""}`;
  } else if (differenceInDays < 7) {
    return `${differenceInDays} día${differenceInDays !== 1 ? "s" : ""}`;
  } else if (differenceInWeeks < 5) {
    return `${differenceInWeeks} semana${differenceInWeeks !== 1 ? "s" : ""}`;
  } else if (differenceInMonths < 12) {
    return `${differenceInMonths} mes${differenceInMonths !== 1 ? "es" : ""}`;
  } else {
    return `${differenceInYears} año${differenceInYears !== 1 ? "s" : ""}`;
  }
};

export const timeAgoDate = (createdAt: string): string => {
  const date = new Date(createdAt);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `hace ${diffInSeconds} segundos`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} minutos`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `hace ${diffInHours} horas`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `hace ${diffInDays} días`;
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
};
