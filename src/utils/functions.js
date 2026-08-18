
{/* GET NOW */ }
export const getNow = () => {
    const now = new Date();
    const timestamp = now.toISOString().split('T')[0] + " " + now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0') + ":" + now.getSeconds().toString().padStart(2, '0');
    return timestamp
}

// Formatta data in GG/MM/AAAA
export function formatDateGGMMAAAA(date) {
    const d = (date instanceof Date) ? date : new Date(date);
    if (isNaN(d.getTime())) return "";
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

// Formatta data e ora in GG/MM/AAAA HH:MM:SS
export function formatDateTimeGGMMAAAAHHMMSS(date) {
    const d = (date instanceof Date) ? date : new Date(date);
    if (isNaN(d.getTime())) return "";
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}