import { useAPIRoomAvailability } from "@/api/api-roomSearch"
import RoomBooking from "@/components/Rooms/room-booking"
import { SearchFilterCard } from "@/components/Search/SearchFilterCard"
import BackendConnectionStatus from "@/components/backend-conection-status"
import { BookingDetails } from "@/components/booking/booking-details"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Typography } from "@/components/ui/typography"
import { AvailabilityFilter } from "@/model/RoomSearch"
import { SearchFilter } from "@/model/SearchFilter"
import { useAppStore } from "@/store"
import { useMemo, useState } from "react"

//TODOME: Igual podemos crear un StateMachine conjunta para los siguiente estados de la página: Sin Buscar, Sin disponibilidad, error, cargando.
function SearchPage() {

  //const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>();
  const searchFilter = useAppStore((state) => (state.searchFilter));
  const resetBooking = useAppStore((state) => (state.resetBookingState));

  const [isSearched, setIsSearched] = useState<boolean>(false);

  const onBtSearchClick = (newFilter: SearchFilter) => {
    console.log("onBtSearchClick: ");
    console.log(newFilter);

    if (newFilter.dateRange && newFilter.dateRange.from && newFilter.dateRange.to) {
      setIsSearched(true);

      resetBooking(newFilter.dateRange.from, newFilter.dateRange.to);
    }
  }

  //This seems a little bit overkill, but IDK.
  const availabilityFilter: AvailabilityFilter | null = useMemo(
    () => {
      if (searchFilter && searchFilter.dateRange && searchFilter.dateRange.from && searchFilter.dateRange.to) {
        const newAvailabilityFilter: AvailabilityFilter = {
          startDate: searchFilter.dateRange.from.toDateString(),
          endDate: searchFilter.dateRange.to.toDateString()
        };
        return newAvailabilityFilter;
      }
      return null;
    },
    [searchFilter]
  );

  const { roomAvailabilityList, isLoading: isLoadingAvailability, isError: isErrorAvailability } = useAPIRoomAvailability(availabilityFilter ?? null);

  const isLoading = isLoadingAvailability;
  const isError = isErrorAvailability;

  const roomList = roomAvailabilityList?.map((element) => {
    return (
      <RoomBooking key={element.roomCategory} availableAmount={element.availability} roomCategoryId={element.roomCategory} />
    );
  });
  const noRoomsAvailable = (
    <>
      <Typography variant={"h3"} as="h3">Sorry 😔, there aren't rooms available for selected period.
        You can contact us for more info.</Typography>
    </>
  );
  const hasRooms = (roomAvailabilityList?.length && roomAvailabilityList?.length > 0);
  console.log(hasRooms);

  return (
    <div className="bg-background text-foreground">
      <SearchFilterCard onSearchClick={onBtSearchClick} />
      <Separator className="my-10" />
      {isLoading && (
        <>
          <Typography variant={"h3"} as="h2">Loading...</Typography>
          <Skeleton className="w-[400px] h-[200px] mx-auto" />
        </>
      )}
      <div className="flex flex-col gap-5">
        {hasRooms ? roomList : (isSearched && noRoomsAvailable)}
      </div>
      <Separator className="my-10" />
      <BookingDetails></BookingDetails>
      <Separator className="my-10" />
      <BackendConnectionStatus isLoading={isLoading} isError={isError} />
    </div>
  )
}

export default SearchPage
