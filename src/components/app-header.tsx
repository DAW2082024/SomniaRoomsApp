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
          <Typography variant={"largeText"}>Hostal del Val</Typography>
          <Button variant="ghost">
            <BookmarkIcon/>
            <Typography variant={"largeText"}>Reservar</Typography>
          </Button>
          <ModeToggle />
        </div>
      </CardContent>
    </Card>
  )
}

export default AppHeader
