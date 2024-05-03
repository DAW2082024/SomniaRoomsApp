import { Separator } from "../ui/separator"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Typography } from "../ui/typography"
import { BedDoubleIcon, BedSingleIcon, UserIcon } from "lucide-react"

export function RoomItemCard() {

  return (
    <Card>
      <CardHeader className="p-0 m-0 mb-5">
        <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39" className="rounded-md"></img>
        <Typography variant={"h2"} as="h1" className="mx-5 py-2">Doble con baño</Typography>
      </CardHeader>
      <CardContent>
        <Typography variant={"p"} as="p">
          Habitación doble con <strong>baño privado</strong>.
        </Typography>
        <Separator className="my-4" />
        <div className="flex justify-around">
          <div className="flex flex-row gap-2">
            <Typography variant={"p_inline"}>2</Typography>
            <BedSingleIcon />
            <Typography variant={"p_inline"}>1</Typography>
            <BedDoubleIcon />
          </div>
          <div className="flex flex-row">
            <UserIcon />
            <Typography variant={"p_inline"} className="ml-3">3</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
