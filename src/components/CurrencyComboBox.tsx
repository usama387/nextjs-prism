"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "../../hooks/use-media-query";
import { Currencies, Currency } from "@/lib/currencies";

export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCurrencyOption, setSelectedCurrencyOption] =
    React.useState<Currency | null>(null);

  // for desktop screens
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-center">
            {selectedCurrencyOption ? (
              <>{selectedCurrencyOption.label}</>
            ) : (
              <>Set Currency</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <OptionList
            setOpen={setOpen}
            setSelectedCurrencyOption={setSelectedCurrencyOption}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-center">
          {selectedCurrencyOption ? (
            <>{selectedCurrencyOption.label}</>
          ) : (
            <> Set Currency</>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionList
            setOpen={setOpen}
            setSelectedCurrencyOption={setSelectedCurrencyOption}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function OptionList({
  setOpen,
  setSelectedCurrencyOption,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCurrencyOption: (status: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map((currency: Currency) => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={(value) => {
                setSelectedCurrencyOption(
                  Currencies.find((priority) => priority.value === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
