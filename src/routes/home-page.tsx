import { RoomItemCard } from "@/components/Rooms/room-item-card"
import { SearchFilterCard } from "@/components/Search/SearchFilterCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function Homepage() {

  return (
    <div className="bg-background text-foreground">
      <Button>Test</Button>
      <Separator className="my-10"/>
      <SearchFilterCard />
      <Separator className="my-10"/>
      <RoomItemCard />
    </div>
  )
}

export default Homepage
