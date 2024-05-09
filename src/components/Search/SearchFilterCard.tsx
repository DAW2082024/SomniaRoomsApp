import { Separator } from "../ui/separator"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Typography } from "../ui/typography"
import 'react-day-picker/dist/style.css';
import { DatePickerWithRange } from "../ui/dateRange-picker";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { SearchFilter } from "@/model/SearchFilter";
import { DateRange } from "react-day-picker";
import { useToast } from "../ui/use-toast";
import { useAppStore } from "@/store";

type funOnSearchClick = (newFilter: SearchFilter) => void;

export function SearchFilterCard({ onSearchClick }: { onSearchClick?: funOnSearchClick }) {

  const { toast } = useToast();

  //Local Filter state.
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    dateRange: { from: new Date() }
  })

  //App filter. Updated on btSearchClick.
  const setAppSearchFilter = useAppStore((state) => (state.setSearchFilter));

  // Validate and call callback on btSearch click.
  //TODOME: Add data validations and show messages.
  const btSearchClick = () => {
    if (!searchFilter || !searchFilter.dateRange) {
      toast({
        variant: "destructive",
        title: "Uh oh! Invalid Search.",
      });
      return;
    }

    if (!searchFilter.dateRange.from || !searchFilter.dateRange.to) {
      toast({
        variant: "destructive",
        title: "Uh oh! Invalid Search.",
        description: "You should select a 'from' and 'to' dates"
      })
      return;
    }

    if (onSearchClick) {
      setAppSearchFilter(searchFilter);
      onSearchClick(searchFilter);
    }
  }

  // Handle Element updates.
  const updateDateRange = (newRange: DateRange) => {
    setSearchFilter({
      ...searchFilter,
      dateRange: newRange,
    });

    console.log("SearchFilterCard filter UPDATED");
  }

  return (
    <Card>
      <CardHeader className="p-0 m-0 mb-5">
        <Typography variant={"h2"} as="h1" className="mx-5 py-2">Reserva ahora</Typography>
      </CardHeader>
      <CardContent>
        <DatePickerWithRange updateDateRange={updateDateRange}></DatePickerWithRange>
        <Separator className="my-4" />
        <Button size={"lg"} onClick={btSearchClick}>
          <SearchIcon className="text-primary-foreground me-2" />
          <Typography variant={"h3"} className="text-primary-foreground">Buscar</Typography>
        </Button>
      </CardContent>
    </Card>
  )
}
