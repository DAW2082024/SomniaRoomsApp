
export type NewBooking = {
    arrivalDate: Date,
    departureDate: Date,
    customerDetails: NewBookingCustomerDetails,
    rooms: NewBookingRoom[]
};

export type NewBookingCustomerDetails = {
    name: string | null,
    surname: string | null,
    email: string | null,
    phoneNumber: string | null
};

export type NewBookingRoom = {
    roomCategory: number,
    guestNumber: number,
    amount: number,
    price: number
};

export type NewBookingResponse = {
    refNumber: number,
}