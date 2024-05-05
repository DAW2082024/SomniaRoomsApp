import { useAPIRoomCategories } from "@/api/api-roomCategories"
import { RoomItemCard } from "@/components/Rooms/room-item-card"
import { SearchFilterCard } from "@/components/Search/SearchFilterCard"
import BackendConnectionStatus from "@/components/backend-conection-status"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Typography } from "@/components/ui/typography"
import { RoomCategory } from "@/model/RoomCategory"

function Homepage() {

  const { roomCategoryList, isLoading, isError } = useAPIRoomCategories();

  const roomList = roomCategoryList?.map((element: RoomCategory) => {
    return (
      <RoomItemCard key={element.id} room={element} />
    );
  });

  return (
    <>
      <Typography variant={"h1"}>Hostal del Val</Typography>
      <Separator className="my-10" />
      <SearchFilterCard />
      <Separator className="my-10" />
      <div className="grid grid-cols-2 gap-4">
        {roomList}
      </div>
      {isLoading && (
        <>
          <Typography variant={"h3"} as="h2">Loading...</Typography>
          <Skeleton className="w-[400px] h-[200px] mx-auto" />
        </>
      )}
      <Separator className="my-10" />
      <BackendConnectionStatus isLoading={isLoading} isError={isError} />
    </>
  )
}

export default Homepage
