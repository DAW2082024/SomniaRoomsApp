import { fetcherUnwraperWithFilter } from "./backend";
import useSWR from 'swr';
import { AvailabilityFilter, AvailabilityRequest, RoomAvailabity } from "@/model/RoomSearch";

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