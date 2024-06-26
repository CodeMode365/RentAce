import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toPascalCase } from "@/lib/utilities/toPascalCase";
import { cn } from "@/lib/utils";
import { CheckIcon, MoveDown } from "lucide-react";
import React, { Dispatch, FC, SetStateAction, useState } from "react";

import { iSpaceData } from "@/types/space";
interface iProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  data: iSpaceData;
  setData: Dispatch<SetStateAction<iSpaceData>>;
}

const Step1: FC<iProps> = ({ setCurrentStep, data, setData }) => {
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

  const { title, owner, spaceType, amount, payType } = data;

  return (
    <div className={`grid gap-4 py-4 min-w-full`}>
      <h2 className="font-medium text-sky-500">Basic info</h2>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          className="col-span-3"
          placeholder="e.g: Flat for rent for offices uses only."
          value={title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
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
          value={owner}
          onChange={(e) => setData({ ...data, owner: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Type</Label>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {spaceType
                ? toPascalCase(spaceType)
                : "Select space..."}
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
                      setData({
                        ...data,
                        spaceType: toPascalCase(currentValue),
                      });
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
        <Label className="text-right">Amount</Label>
        <Input
          id="fee"
          className="col-span-2"
          placeholder="e.g. Rs .20"
          value={amount}
          onChange={(e) => setData({ ...data, amount: e.target.value })}
        />

        <Select
          onValueChange={(selected) => {
            setData({ ...data, payType: toPascalCase(selected) });
          }}
        >
          <SelectTrigger className="w-auto">
            <SelectValue
              placeholder={`${payType ? payType : "Pay Type"}`}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>PayType</SelectLabel>
              {paymentType.map((payType, index) => (
                <SelectItem value={payType.value} key={payType.value}>
                  {payType.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter className="w-full flex justify-end items-center">
        <Button
          className=" bg-sky-500 shadow-xl font-normal text-white hover:bg-sky-500 hover:text-white"
          size={"sm"}
          variant={"secondary"}
          onClick={() => {
            console.log("next step load");
            setCurrentStep(1);
          }}
        >
          Next
        </Button>
      </DialogFooter>
    </div>
  );
};

export default Step1;
