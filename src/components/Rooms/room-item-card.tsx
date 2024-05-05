import { Separator } from "../ui/separator"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Typography } from "../ui/typography"
import { BedDoubleIcon, BedSingleIcon, UserIcon } from "lucide-react"
import { RoomCategory, RoomCategoryPhoto } from "@/model/RoomCategory"
import { IconWithTooltipNumber } from "../ui/icon-number-tooltip"

interface RoomItemCardProps {
  room: RoomCategory
}

const defaultRoom: RoomCategory = {
  id: -1,
  name: "Sample Room",
  description: "Lorem Ipsum",
  bedType: "0,1",
  maxGuestNum: 2,
  roomCategoryDetails: [],
  roomCategoryPhotos: []
}

export function RoomItemCard({ room = defaultRoom }: RoomItemCardProps) {

  const mainPhoto: RoomCategoryPhoto | undefined = room.roomCategoryPhotos.find((element) => {
    return element.kind = "main"
  });
  const bedTypeList: number[] = room.bedType.split(",").map((e) => Number.parseInt(e));
  const hasSingleBed: boolean = (bedTypeList.at(0) !== undefined && bedTypeList[0] > 0);
  const hasDoubleBed: boolean = (bedTypeList.at(1) !== undefined && bedTypeList[1] > 0);

  return (
    <Card id={room.id.toString()}>
      <CardHeader className="p-0 m-0 mb-5">
        <img src={mainPhoto?.path ?? "https://images.unsplash.com/photo-1618773928121-c32242e63f39"} className="rounded-md"></img>
        <Typography variant={"h2"} as="h1" className="mx-5 py-2">{room.name}</Typography>
      </CardHeader>
      <CardContent>
        <Typography variant={"p"} as="p">
          {room.description}
        </Typography>
        <Separator className="my-4" />
        <div className="flex justify-around">
          <div className="flex flex-row gap-2">
            {hasSingleBed && (
              <IconWithTooltipNumber altText="Single bed" amount={bedTypeList[0]}>
                <BedSingleIcon />
              </IconWithTooltipNumber>
            )}
            {hasDoubleBed && (
              <>
                <IconWithTooltipNumber altText="Double bed" amount={bedTypeList[1]}>
                  <BedDoubleIcon />
                </IconWithTooltipNumber>
              </>
            )}
          </div>
          <div className="flex flex-row">
            <UserIcon />
            <Typography variant={"p_inline"} className="ml-3">{room.maxGuestNum}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
