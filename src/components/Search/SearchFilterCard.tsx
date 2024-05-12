import { Separator } from "../ui/separator"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Typography } from "../ui/typography"
import 'react-day-picker/dist/style.css';
import { DatePickerWithRange } from "../ui/dateRange-picker";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchFilter } from "@/model/SearchFilter";
import { DateRange } from "react-day-picker";
import { useToast } from "../ui/use-toast";
import { useAppStore } from "@/store";
import { useLocation } from "react-router-dom";

type funOnSearchClick = (newFilter: SearchFilter) => void;

export function SearchFilterCard({ onSearchClick }: { onSearchClick?: funOnSearchClick }) {

  //App filter. Updated on btSearchClick.
  const appSearchFilter = useAppStore((state) => (state.searchFilter));
  const setAppSearchFilter = useAppStore((state) => (state.setSearchFilter));

  //Local Filter state.
  const [searchFilter, setSearchFilter] = useState<SearchFilter>(appSearchFilter)

  //On location change, try to load searchFilter from state.
  //FIXME: Si llegamos sin state, hay que borrar el state global...
  const location = useLocation();
  useEffect(() => {
    setSearchFilter(location.state);
  }, [location]);


  const { toast } = useToast();

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

  const datePickerElement = searchFilter == null ? (
    <DatePickerWithRange
      updateDateRange={updateDateRange}
      allowPast={false}>
    </DatePickerWithRange>
  ) : (
    <DatePickerWithRange
      updateDateRange={updateDateRange}
      allowPast={false}
      startDate={searchFilter.dateRange.from}
      endDate={searchFilter.dateRange.to}>
    </DatePickerWithRange>
  );

  return (
    <Card>
      <CardHeader className="p-0 m-0 mb-5">
        <Typography variant={"h2"} as="h1" className="mx-5 py-2">Reserva ahora</Typography>
      </CardHeader>
      <CardContent>
        {datePickerElement}
        <Separator className="my-4" />
        <Button size={"lg"} onClick={btSearchClick}>
          <SearchIcon className="text-primary-foreground me-2" />
          <Typography variant={"h3"} className="text-primary-foreground">Buscar</Typography>
        </Button>
      </CardContent>
    </Card>
  )
}
