import * as React from "react";

import { useMediaQuery } from "@/hook/use-media-query";
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

type data = {
  value: string;
  label: string;
};

export function ComboBoxResponsive({
  data,
  label,
  onSelect,
  value,
}: {
  data: data[];
  label: string;
  onSelect: (value: string) => void;
  value?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selected, setSelected] = React.useState<data | null>(null);
  console.log(selected,"selected")
  React.useEffect(() => {
    if (selected) {
      onSelect(selected?.value);
    }
  }, [selected]);

  React.useEffect(() => {
    if (value) {
      setSelected(
        (data && data?.find((priority) => priority.value === value)) || null
      );
    }
  }, [data, value]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selected ? <>{selected.label}</> : <>{label}</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            data={data}
            setOpen={setOpen}
            setSelected={setSelected}
            label={label}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selected ? <>{selected.label}</> : <>{label}</>}{" "}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            label={label}
            data={data}
            setOpen={setOpen}
            setSelected={setSelected}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelected,
  data,
  label,
}: {
  setOpen: (open: boolean) => void;
  setSelected: (status: data | null) => void;
  data: data[];
  label: string;
}) {
  return (
    <Command>
      <CommandInput placeholder={label} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {data.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelected(
                  (data &&
                    data?.find((priority) => priority.value === value)) ||
                    null
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
