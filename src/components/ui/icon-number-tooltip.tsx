import { Typography } from "./typography";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { PropsWithChildren } from "react";

interface IconWithTooltipNumberProps {
  amount?: number | null |undefined,
  altText?: string | null | undefined
}

export function IconWithTooltipNumber({ amount = undefined, altText = undefined, children }: PropsWithChildren<IconWithTooltipNumberProps>) {

  const iconElement = altText ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{altText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <>
      {children}
    </>
  );

  return (
    <>
      {amount && <Typography variant={"p_inline"}>{amount}</Typography>}
      {iconElement}
    </>
  )
}
