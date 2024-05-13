import { RoomCategory } from "@/model/RoomCategory";
import { fetcher, fetcherUnwraper } from "./backend";
import useSWR from 'swr';

export function useAPIRoomCategories() {
  const { data, error, isLoading } = useSWR<RoomCategory[]>('/api/room/category', fetcherUnwraper)

  return {
    roomCategoryList: data,
    isLoading,
    isError: error
  }
}

export function useAPIRoomCategoryId(categoryId: number) {
  const url = categoryId ? '/api/room/category/' + categoryId : null;

  const { data, error, isLoading } = useSWR<RoomCategory>(url, fetcher)

  return {
    roomCategory: data,
    isLoading,
    isError: error
  }
}