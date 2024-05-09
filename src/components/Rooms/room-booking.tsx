import { useAPIRoomCategoryId } from "@/api/api-roomCategories"
import { Card, CardContent, CardHeader } from "../ui/card"
import { useMemo, useState } from "react";
import { Typography } from "../ui/typography";
import { RoomCategoryPhoto } from "@/model/RoomCategory";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { useAppStore } from "@/store";
import { DateRange } from "react-day-picker";
import { FareFilter } from "@/model/RoomSearch";
import { useAPIRoomPrices } from "@/api/api-roomSearch";
import { NumberSelector } from "../ui/number-selector";

function RoomBooking({ roomCategoryId, availableAmount }: { roomCategoryId: number, availableAmount: number }) {

  const [selectedAmount, setSelectedAmount] = useState<number>(0);

  const currentDates: DateRange = useAppStore((state) => (state.searchFilter.dateRange));

  function onSelectedAmountUpdate(guestNumber: number, newCount: number) {
    console.log("Room " + roomCategoryId + " Guestnumber: " + guestNumber + " Count: " + newCount);
    setSelectedAmount(newCount);
  }
  const canAddMore: boolean = availableAmount > selectedAmount;

  //This seems a little bit overkill, but IDK.
  const fareFilter: FareFilter | null = useMemo(
    () => {
      if (currentDates && currentDates.from && currentDates.to) {
        const filter: FareFilter = {
          startDate: currentDates.from?.toDateString(),
          endDate: currentDates.to?.toDateString(),
          roomCategory: roomCategoryId
        }
        return filter;
      }
      return null;
    },
    [currentDates, roomCategoryId]
  );

  const { roomCategory, isLoading: isLoadingCategory, isError: isErrorCategory } = useAPIRoomCategoryId(roomCategoryId);
  const { roomPriceList, isLoading: isLoadingPrices, isError: isErrorPrices } = useAPIRoomPrices(fareFilter);


  //TODOME: Gestionar también los estados al cargar los precios.
  const isLoading = isLoadingCategory || isLoadingPrices;
  const isError = isErrorCategory || isErrorPrices;

  if (isLoading) {
    return (
      <Skeleton className="w-[600px] h-[150px] mx-auto" />
    );
  }

  if (isError) {
    return (
      <Typography variant={"h3"} as="h3">Sorry, there was an error loading data.</Typography>
    );
  }

  const mainPhoto: RoomCategoryPhoto | undefined = roomCategory?.roomCategoryPhotos.filter((p) => p.kind == "main")[0];
  const photoElement = mainPhoto && (
    <img src={mainPhoto.path} alt={mainPhoto.altText} className="rounded-md mx-0 px-0"></img>
  );

  const hasPrices = roomPriceList != null && roomPriceList?.length > 0;
  let priceTable = null;
  if (hasPrices) {
    const tableRows = roomPriceList?.map((el) => {
      return (
        <TableRow>
          <TableCell>{el.guestNumber}</TableCell>
          <TableCell>{el.price / 100} €</TableCell>
          <TableCell>
            <NumberSelector updateCount={(count) => onSelectedAmountUpdate(el.guestNumber, count)} addEnabled={canAddMore}></NumberSelector>
          </TableCell>
        </TableRow>
      );
    });

    priceTable = (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest number</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingPrices ? <Skeleton className="w-[80%] h-[100%]" /> : tableRows}
          </TableBody>
        </Table>
        <p>Rooms Available: {availableAmount}</p>
      </>
    );
  }


  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row gap-5 w-full">
          <div className="w-[40%] flex-none">
            {photoElement}
          </div>
          <div>
            <Typography variant={"h3"} as="h3">{roomCategory?.name}</Typography>
            <Typography >{roomCategory?.description}</Typography>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {hasPrices ? priceTable : <Typography variant={"largeText"}>No Prices available</Typography>}
        <div>
        </div>
        <p>Selected: {selectedAmount}</p>
      </CardContent>
    </Card>
  );
}

export default RoomBooking
