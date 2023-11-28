import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  ArrowDownWideNarrow,
  CheckIcon,
  ChevronDown,
  MoveDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AddSpaceModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const spacestype = [
    {
      value: "parking",
      label: "Parking",
    },
    {
      value: "room",
      label: "Room",
    },
    {
      value: "flat",
      label: "Flat",
    },
    {
      value: "house",
      label: "House",
    },
    {
      value: "other",
      label: "Other",
    },
  ];
  const paymentType = [
    { label: "Hourly", value: "hourlt" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Annually", value: "annually" },
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-sky-500">Post new Space</DialogTitle>
          <DialogDescription>
            Please provide all the information about the space that you are
            providing to the client.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              placeholder="e.g: Flat for rent for offices uses only."
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="owner" className="text-right">
              Owner
            </Label>
            <Input
              id="owner"
              className="col-span-3"
              placeholder="e.g. Pabin Dhami"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? spacestype.find((space) => space.value === value)?.label
                    : "Select space..."}
                  {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                  <MoveDown size={14} />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search space type`..."
                    className="h-9"
                  />
                  <CommandEmpty>No matching type.</CommandEmpty>

                  <CommandGroup>
                    {spacestype.map((space) => (
                      <CommandItem
                        key={space.value}
                        value={space.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {space.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === space.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fee" className="text-right">
              Owner
            </Label>
            <Input id="fee" className="col-span-2" placeholder="e.g. Rs .20" />

            <Select>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Pay Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>PayType</SelectLabel>
                  {paymentType.map((payType, index) => (
                    <SelectItem value={payType.value} id={payType.value}>
                      {payType.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className=" bg-sky-500 shadow-xl text-white hover:bg-sky-500 hover:text-white"
            size={"sm"}
            variant={"secondary"}
          >
            Post Space
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
