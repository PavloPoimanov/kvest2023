import { DateTime } from 'luxon'

export const toShortDate = (ISODate) => {
    return DateTime.fromISO(ISODate).toFormat('dd/MM/yyyy')
}

export const toLongDate = (ISODate) => {
    return DateTime.fromISO(ISODate).toFormat('dd/MM/yyyy HH:mm')
}
