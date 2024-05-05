import { useAPIRoomAvailability } from "@/api/api-roomSearch"
import RoomBooking from "@/components/Rooms/room-booking"
import { SearchFilterCard } from "@/components/Search/SearchFilterCard"
import BackendConnectionStatus from "@/components/backend-conection-status"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Typography } from "@/components/ui/typography"
import { AvailabilityFilter } from "@/model/RoomSearch"
import { SearchFilter } from "@/model/SearchFilter"
import { useState } from "react"

//TODOME: Igual podemos crear un StateMachine conjunta para los siguiente estados de la página: Sin Buscar, Sin disponibilidad, error, cargando.
function SearchPage() {

  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>();
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const onBtSearchClick = (newFilter: SearchFilter) => {
    setAvailabilityFilter({
      startDate: newFilter.dateRange.from?.toDateString() ?? "",
      endDate: newFilter.dateRange.to?.toDateString() ?? ""
    });
    setIsSearched(true);
  }

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
      <RoomBooking key={99} availableAmount={5} roomCategoryId={6} />
      <Separator className="my-10" />
      <BackendConnectionStatus isLoading={isLoading} isError={isError} />
    </div>
  )
}

export default SearchPage
