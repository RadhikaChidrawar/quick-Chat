// export function formatMessageTime(date){
//     return new Date(date).toLocaleDateString("en-us",{
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false
//     })
// }


export function formatMessageTime(date){
    const messageDate = new Date(date);
    const hours = String(messageDate.getHours()).padStart(2, '0');
    const minutes = String(messageDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}


