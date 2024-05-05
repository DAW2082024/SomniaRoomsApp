

export type RoomAvailabity = {
    roomCategory: number,
    availability: number
}

export type AvailabilityRequest = {
    filter: AvailabilityFilter
}

export type AvailabilityFilter = {
    startDate: string,
    endDate: string
}

export type FareRequest = {
    filter: FareFilter
}

export type FareFilter = {
    roomCategory: number,
    startDate: string,
    endDate: string
}