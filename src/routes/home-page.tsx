import { useAPIRoomCategories } from "@/api/api-roomCategories"
import { RoomItemCard } from "@/components/Rooms/room-item-card"
import { SearchFilterCard } from "@/components/Search/SearchFilterCard"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Typography } from "@/components/ui/typography"
import { RoomCategory } from "@/model/RoomCategory"

function Homepage() {

  const { roomCategoryList, isLoading, isError } = useAPIRoomCategories();

  const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
  const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

  const roomList = roomCategoryList?.map((element: RoomCategory) => {
    return (
      <RoomItemCard key={element.id} room={element}/>
    );
  });

  return (
    <div className="bg-background text-foreground">
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
        <Skeleton className="w-[400px] h-[200px] mx-auto"/>
        </>
      )}
      <Separator className="my-10" />
      <p>
        Conected to Back-End at: {BACKEND_HOST} - {BACKEND_PORT}
      </p>
      <p>
        Conection Status: {isError ? "ERROR" : (isLoading ? "LOADING" : "LOADED")}
      </p>
    </div>
  )
}

export default Homepage
