import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Typography } from "./ui/typography"
import { Link } from "react-router-dom"
import { BookAIcon, HomeIcon } from "lucide-react"

function AppHeader() {

  return (
    <Card className="flex items-center mx-10 my-4">
      <CardContent className="w-full">
        <div className="flex justify-around items-center">
          <div className="flex flex-row items-center gap-2 relative">
            <img src="public/SR2.svg" className="w-[64px]"></img>
            <Typography variant={"largeText"}>Somnia Rooms</Typography>
            <a href="https://duck.com" className="absolute w-[100%] h-[100%]"></a>
          </div>
          <Button variant="ghost">
            <HomeIcon />
            <Link to={`home`}>Home</Link>
          </Button>
          <Button variant="ghost">
            <BookAIcon />
            <Link to={`search`}>Reservar</Link>
          </Button>
          <ModeToggle />
        </div>
      </CardContent>
    </Card>
  )
}

export default AppHeader
