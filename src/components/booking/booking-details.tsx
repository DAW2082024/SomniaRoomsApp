import { useAppStore } from "@/store"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Typography } from "../ui/typography"
import { differenceInDays } from "date-fns";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

type OnBookingClickFunction = () => void;

export function BookingDetails({ onBookingConfirm }: { onBookingConfirm?: OnBookingClickFunction }) {

  const bookingData = useAppStore((state) => state.newBookingData);

  const onBtBookingClick = () => {
    if (onBookingConfirm) {
      onBookingConfirm();
    }
  }

  if (!bookingData || bookingData.rooms.length <= 0) {
    return (
      <Card>
        <CardHeader>
          <Typography variant={"h2"} as="h2">Your Booking</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant={"h3"}>No rooms added yet</Typography>
        </CardContent>
      </Card>
    );
  }

  const roomList = bookingData.rooms.map((room) => {
    return (
      <TableRow key={room.roomCategory + "_" + room.guestNumber}>
        <TableCell>{room.roomCategory}</TableCell>
        <TableCell>{room.guestNumber}</TableCell>
        <TableCell>{room.amount}</TableCell>
        <TableCell>{room.price / 100} €</TableCell>
      </TableRow>
    );
  })


  const roomTable = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Room</TableHead>
          <TableHead>Guests</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roomList}
      </TableBody>
    </Table>
  );


  const totalPrice = bookingData.rooms.reduce((acc, room) => (acc + room.price), 0);

  return (
    <Card>
      <CardHeader>
        <Typography variant={"h2"} as="h2">Your Booking</Typography>
      </CardHeader>
      <CardContent>
        <Typography variant={"h3"}>Your Dates</Typography>
        <Typography variant={"largeText"}>
          Arrival: {bookingData.arrivalDate.toLocaleDateString()}  -
          Departure: {bookingData.departureDate.toLocaleDateString()} <br></br>
          Number of nights: {differenceInDays(bookingData.departureDate, bookingData.arrivalDate)}
        </Typography>
        <Separator className="my-2"></Separator>
        <Typography variant={"h3"}>Your Rooms</Typography>
        {roomTable}
        <Separator className="my-2"></Separator>
        <Typography variant={"h3"}>Total Price</Typography>
        <Typography variant={"h3"}>{totalPrice / 100} €</Typography>
        <Button className="my-2" onClick={onBtBookingClick}>
          <Typography variant={"largeText"} className="text-primary-foreground">Book it!</Typography>
        </Button>
      </CardContent>
    </Card>
  )
}
