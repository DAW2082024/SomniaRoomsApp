import { APISendCreateBooking } from "@/api/api-booking"
import { BookingDetails } from "@/components/booking/booking-details"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Typography } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import { useAppStore } from "@/store"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

enum PageState {
  noData, showForm, sending, created, error
}


function BookPage() {
  const [pageState, setPageState] = useState<PageState>(PageState.showForm);
  const bookingData = useAppStore((state) => state.newBookingData)
  const setCustomerData = useAppStore((state) => state.setBookingCustomer);
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!bookingData || !bookingData.customerDetails) {
    return (
      <Typography variant={"h2"}>You must select some rooms...</Typography>
    )
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (bookingData == null) {
      return;
    }

    const newCustomerData = bookingData.customerDetails;

    switch (e.target.name) {
      case "name":
        newCustomerData.name = e.target.value;
        break;
      case "surname":
        newCustomerData.surname = e.target.value;
        break;
      case "email":
        newCustomerData.email = e.target.value;
        break;
      case "phoneNumber":
        newCustomerData.phoneNumber = e.target.value;
        break;
      default:
        break;
    }

    setCustomerData(newCustomerData);
  }

  function handleOnBookingSubmit() {
    const customerDetails = bookingData?.customerDetails;

    if (!customerDetails ||
      customerDetails.name == "" || customerDetails.surname == "" || customerDetails.phoneNumber == "" || customerDetails.email == "") {
      toast({
        variant: "destructive",
        title: "Uh oh! You must fill all fields.",
      });
      return;
    }

    setPageState(PageState.sending);
    console.log(bookingData);

    sendCreateRequest();
  }

  const sendCreateRequest = async () => {
    const rs = await APISendCreateBooking(bookingData);
    if (rs.isError) {
      setPageState(PageState.error);
    } else {
      navigate("/success", { state: rs.bookingResponse })
    }
  }


  return (
    <>
      <Typography variant={"h1"}>Booking Details</Typography>
      <Separator className="my-10" />
      <div>
        <Typography variant={"h3"}>Personal Details</Typography>
        <div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Name" value={bookingData.customerDetails.name ?? ""}
              onChange={handleOnChange} />
          </div>
          <div>
            <Label htmlFor="surname">Surname</Label>
            <Input type="text" name="surname" id="surname" placeholder="Surname" value={bookingData.customerDetails.surname ?? ""}
              onChange={handleOnChange} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email" value={bookingData.customerDetails.email ?? ""}
              onChange={handleOnChange} />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input type="tel" name="phoneNumber" id="phone" placeholder="Number" value={bookingData.customerDetails.phoneNumber ?? ""}
              onChange={handleOnChange} />
          </div>
        </div>
      </div>
      <Separator className="my-10" />
      <BookingDetails mode="View"></BookingDetails>
      <Separator className="my-10" />
      <Button onClick={handleOnBookingSubmit} disabled={pageState == PageState.sending}>
        <Typography variant={"h3"} className="text-primary-foreground">Book it now!</Typography>
      </Button>
    </>
  )
}

export default BookPage
