import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"
import { NewBookingResponse } from "@/model/Bookings"
import { useAppStore } from "@/store"
import { addDays } from "date-fns"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function SuccessPage() {

    const [pageState, setPageState] = useState<NewBookingResponse|null>(null)
    const resetBookingState = useAppStore((state) => state.resetBookingState);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(location.state == null) {
            navigate("/home");
        }
        setPageState(location.state);

    }, [location, navigate])

    const handleBtBackClick = () => {
        resetBookingState(new Date(), addDays(new Date(), 2));
        navigate("/home");
    }


  return (
    <Card>
        <CardHeader>
            <Typography variant={"h2"}>Booking Completed</Typography>
        </CardHeader>
        <CardContent>
            <Typography variant={"largeText"}>Booking ref: {pageState?.refNumber}</Typography>
            <Button className="my-4" onClick={handleBtBackClick}>
                <Typography variant={"largeText"} className="text-primary-foreground">Go Back</Typography>
            </Button>
        </CardContent>
    </Card>
  )
}

export default SuccessPage
