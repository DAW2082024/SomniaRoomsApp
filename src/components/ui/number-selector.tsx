import { useState } from "react"
import { Button } from "./button";
import { Typography } from "./typography";


export type UpdateSelectedNumberFunction = (newCount: number) => void;

export function NumberSelector(
  { updateCount, addEnabled = true, allowNegative = false }: 
  { updateCount: UpdateSelectedNumberFunction, addEnabled?: boolean, allowNegative?: boolean }) {

  const [count, setCount] = useState<number>(0);

  const counterUpdated = (newAmount: number) => {
    setCount(newAmount);

    if (updateCount != undefined) {
      updateCount(newAmount);
    }
  }

  const minusDisabled = (!allowNegative && count <= 0)

  return (
    <div className="flex flex-row items-center gap-2">
      <Button disabled={minusDisabled}
        onClick={() => counterUpdated(count - 1)}>-</Button>
      <Typography variant={"largeText"} className="mx-2">{count}</Typography>
      <Button disabled={!addEnabled}
        onClick={() => counterUpdated(count + 1)}>+</Button>
    </div>
  )
}
