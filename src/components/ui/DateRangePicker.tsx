"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { ActiveModifiers, DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Typography } from "./typography"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  //TODOME: Si el día es mods.outside, navegar al mes correspondiente.
  const handleDayClickFrom = (day: Date, mods: ActiveModifiers) => {
    setDateRange({
      from: mods.selected ? undefined : day,
      to: dateRange?.to
    })
  }
  const handleDayClickTo = (day: Date, mods: ActiveModifiers) => {
    setDateRange({
      from: dateRange?.from,
      to: mods.selected ? undefined : day
    })
  }

  return (
    <div className={cn("grid gap-x-2 grid-cols-2 grid-rows-2", className)}>
      <Typography variant={"largeText"} as="p">Desde</Typography>
      <Typography variant={"largeText"} as="p">Hasta</Typography>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="dateFrom"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              format(dateRange.from, "LLL dd, y")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={dateRange?.from}
            selected={dateRange?.from}
            onDayClick={handleDayClickFrom}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="dateTo"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.to ? (
              format(dateRange.to, "LLL dd, y")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={dateRange?.to}
            selected={dateRange?.to}
            onDayClick={handleDayClickTo}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
