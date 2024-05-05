import { Separator } from "../ui/separator"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Typography } from "../ui/typography"
import 'react-day-picker/dist/style.css';
import { DatePickerWithRange } from "../ui/dateRange-picker";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

export function SearchFilterCard() {

  return (
    <Card>
      <CardHeader className="p-0 m-0 mb-5">
        <Typography variant={"h2"} as="h1" className="mx-5 py-2">Reserva ahora</Typography>
      </CardHeader>
      <CardContent>
        <DatePickerWithRange></DatePickerWithRange>
        <Separator className="my-4" />
        <Button size={"lg"}>
            <SearchIcon className="text-primary-foreground me-2"/>
            <Typography variant={"h3"} className="text-primary-foreground">Buscar</Typography>
        </Button>
      </CardContent>
    </Card>
  )
}
