import { NewBooking, NewBookingResponse } from "@/model/Bookings";
import { fetcherWithFilter } from "./backend";

export async function APISendCreateBooking(bookingData: NewBooking | null) {

    if (!bookingData) {
        return {
            bookingResponse: null,
            isError: true
        }
    }

    const rs = await fetcherWithFilter<NewBookingResponse>("/api/booking/create", bookingData);

    return {
        bookingResponse: rs,
        isError: false
    }
}