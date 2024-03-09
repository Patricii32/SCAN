export default function dateString (date) {
    date = date.split('T')[0].split('-');
    return (`${date[2]}.${date[1]}.${date[0]}`)
}
