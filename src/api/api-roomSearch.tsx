import { fetcherUnwraperWithFilter } from "./backend";
import useSWR from 'swr';
import { AvailabilityFilter, AvailabilityRequest, FareFilter, FareRequest, RoomAvailabity, RoomPrice } from "@/model/RoomSearch";

export function useAPIRoomAvailability(filter: AvailabilityFilter | null) {

    const request: AvailabilityRequest | null = filter ? {
        filter: filter
    } : null;

    const { data, isLoading, error } = useSWR(request ? ['/api/search/availability', request] : null, ([url, request]) => fetcherUnwraperWithFilter<RoomAvailabity[]>(url, request))

    return {
        roomAvailabilityList: data,
        isLoading,
        isError: error
    }
}

export function useAPIRoomPrices(filter: FareFilter | null) {

    const request: FareRequest | null = filter ? {
        filter: filter
    } : null;

    const { data, isLoading, error } = useSWR(request ? ['/api/search/fares', request] : null, ([url, request]) => fetcherUnwraperWithFilter<RoomPrice[]>(url, request))

    return {
        roomPriceList: data,
        isLoading,
        isError: error
    }
}