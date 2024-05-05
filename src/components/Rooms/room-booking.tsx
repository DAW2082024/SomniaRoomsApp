import { useAPIRoomCategoryId } from "@/api/api-roomCategories"
import { Card, CardContent, CardHeader } from "../ui/card"
import { useState } from "react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { RoomCategoryPhoto } from "@/model/RoomCategory";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

function RoomBooking({ roomCategoryId, availableAmount }: { roomCategoryId: number, availableAmount: number }) {

  const [selectedAmount, setSelectedAmount] = useState<number>(0);

  const { roomCategory, isLoading: isLoadingCategory, isError: isErrorCategory } = useAPIRoomCategoryId(roomCategoryId);

  //TODOME: Gestionar también los estados al cargar los precios.
  const isLoading = isLoadingCategory;
  const isError = isErrorCategory;

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest number</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>25€</TableCell>
              <TableCell>
                <div className="flex flex-row">
                  <Button
                    onClick={() => setSelectedAmount(selectedAmount - 1)}>-</Button>
                  <p className="mx-2">{selectedAmount}</p>
                  <Button
                    onClick={() => setSelectedAmount(selectedAmount + 1)}>+</Button>
                </div></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div>
          <p>Available: {availableAmount}</p>
          <p>Selected: {selectedAmount}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default RoomBooking
