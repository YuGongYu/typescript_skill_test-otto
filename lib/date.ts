const millisecond = 1
const second = 1000 * millisecond
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

function addDays(date: Date, days: number): Date {
    return new Date(date.valueOf() + day * days)
}

function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth())
}

function nextMonth(date: Date): Date {
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (month > 12){
        month = 1
        year += 1
    }
    return new Date(year, month)
}

export {
    addDays,
    startOfMonth,
    nextMonth,
}