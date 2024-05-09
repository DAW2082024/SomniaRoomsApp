import { BookingDetails } from "@/components/booking/booking-details"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"

function BookPage() {



  return (
    <>
      <Typography variant={"h1"}>Booking Details</Typography>
      <Separator className="my-10" />
      <div>
        <Typography variant={"h3"}>Personal Details</Typography>
        <div>
          <Label>Name</Label>
          <Input></Input>
          <Label>Surname</Label>
          <Input></Input>
          <Label>Email</Label>
          <Input></Input>
          <Label>Phone Number</Label>
          <Input></Input>
        </div>
      </div>
      <Separator className="my-10" />
      <BookingDetails></BookingDetails>
      <Separator className="my-10" />
      <Button>
        <Typography variant={"h3"} className="text-primary-foreground">Book it now!</Typography> 
      </Button>
    </>
  )
}

export default BookPage
