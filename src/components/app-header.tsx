import { BookmarkIcon } from "@radix-ui/react-icons"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Typography } from "./ui/typography"

function AppHeader() {

  return (
    <Card className="flex items-center mx-10 my-4">
      <CardContent className="w-full">
        <div className="flex justify-around">
          <div className="flex flex-row items-center gap-2">
            <img src="public/SR2.svg" className="w-[64px]"></img>
            <Typography variant={"largeText"}>Somnia Rooms</Typography>
          </div>
          <Button variant="ghost">
            <BookmarkIcon />
            <Typography variant={"largeText"}>Reservar</Typography>
          </Button>
          <ModeToggle />
        </div>
      </CardContent>
    </Card>
  )
}

export default AppHeader
