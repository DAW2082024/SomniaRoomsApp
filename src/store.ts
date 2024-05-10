import { create } from 'zustand'
import { SearchFilter } from './model/SearchFilter'
import { NewBooking, NewBookingCustomerDetails, NewBookingRoom } from './model/Bookings'

interface AppState {
    searchFilter: SearchFilter
    setSearchFilter: (newFilter: SearchFilter) => void
    newBookingData: NewBooking | null
    setNewBooking: (newBooking: NewBooking) => void
    resetBookingState: (arrival: Date, departure: Date) => void
    addNewBookingRoom: (newRoom: NewBookingRoom) => void
    setBookingCustomer: (newCustomer: NewBookingCustomerDetails) => void
}

const defaultSearchFilter: SearchFilter = {
    dateRange: { from: new Date() }
}

const defaultNewBooking: NewBooking = {
    arrivalDate: new Date(),
    departureDate: new Date(),
    customerDetails: {
        name: null,
        surname: null,
        email: null,
        phoneNumber: null
    },
    rooms: []
}

function getDefaultBookingData(arrivalDate: Date, departureDate: Date) {
    return {
        ...defaultNewBooking,
        arrivalDate: arrivalDate,
        departureDate: departureDate
    }
}

function addNewBookingRoomToCurrentState(newRoom: NewBookingRoom, currentState: NewBooking | null): NewBooking | null {

    if (currentState == null) {
        return currentState;
    }

    //Remove rooms with "same key".
    const filteredRooms = currentState.rooms.filter((room) => {
        const diffRoom = room.roomCategory != newRoom.roomCategory;
        const diffAmount = room.guestNumber != newRoom.guestNumber;
        if(diffRoom || (!diffRoom && diffAmount)) {
            return true;
        }
        return false;
    })
    console.log(filteredRooms);

    if (newRoom.amount > 0) {
        filteredRooms.push(newRoom);
    }


    const newState: NewBooking = {
        ...currentState,
        rooms: filteredRooms ?? []
    }

    console.log("AddRoomNewState:");
    console.log(newState);

    return newState;
}

function setBookingCustomer(newCustomer: NewBookingCustomerDetails, currentState: NewBooking | null) {
    if(currentState == null) {
        return currentState;
    }

    const newState: NewBooking = {
        ...currentState,
        customerDetails: newCustomer
    };
    return newState;
}

export const useAppStore = create<AppState>()((set) => ({
    searchFilter: defaultSearchFilter,
    setSearchFilter: (newFilter) => set(() => ({ searchFilter: newFilter })),
    newBookingData: null,
    setNewBooking: (newBooking) => set(() => ({ newBookingData: newBooking })),
    resetBookingState: (arrival, departure) =>
        set(() => ({ newBookingData: getDefaultBookingData(arrival, departure) })),
    addNewBookingRoom: (newRoom: NewBookingRoom) =>
        set((state) => ({ newBookingData: addNewBookingRoomToCurrentState(newRoom, state.newBookingData) })),
    setBookingCustomer: (newCustomer: NewBookingCustomerDetails) => 
        set((state) => ({newBookingData: setBookingCustomer(newCustomer, state.newBookingData)}))
}))
