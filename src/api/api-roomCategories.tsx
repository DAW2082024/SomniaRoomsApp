import { RoomCategory } from "@/model/RoomCategory";
import { fetcherUnwraper } from "./backend";
import useSWR from 'swr';

export function useAPIRoomCategories () {
    const { data, error, isLoading } = useSWR<RoomCategory[]>(`/api/room/category`, fetcherUnwraper)
   
    return {
      roomCategoryList: data,
      isLoading,
      isError: error
    }
  }