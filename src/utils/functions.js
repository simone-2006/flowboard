
{/* GET NOW */ }
export const getNow = () => {
    const now = new Date();
    const timestamp = now.toISOString().split('T')[0] + " " + now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0') + ":" + now.getSeconds().toString().padStart(2, '0');
    return timestamp
}