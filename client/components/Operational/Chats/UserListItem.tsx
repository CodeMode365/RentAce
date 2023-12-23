import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { FC } from "react";

interface iProps {
  userName: string;
  isActive: boolean;
  lastMessage: string;
}

const UserListItem: FC<iProps> = ({ userName, isActive, lastMessage }) => {
  const message =
    lastMessage && lastMessage.length > 20
      ? lastMessage.slice(0,20) + "..."
      : lastMessage;
  return (
    <div
      className={`items-center border-b rounded-sm p-2 shadow-sm my-[2px] w-full grid grid-cols-12 cursor-pointer hover:bg-gray-100 transition-all ${
        isActive && "bg-sky-100"
      }`}
    >
      <div className="col-span-3 relative mr-5">
        <Avatar className="shadow-md h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Badge className="absolute bottom-0 right-0 p-[5px] bg-rose-500 shadow-sm shadow-rose-500 drop-shadow-md" />
      </div>

      <div className="col-span-9">
        <h3 className="text-[16px] font-medium flex justify-between">
          <span>{userName}</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="text-gray-600 h-6 w-6 flex items-center justify-center rounded-full hover:bg-gray-100">
                <MoreVertical size={18} />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup className="font-medium">
                <DropdownMenuItem className="text-rose-500 hover:text-rose-500 cursor-pointer">
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Archive
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </h3>

        <p className="text-sm text-gray-500 text-left">{message}</p>
      </div>
    </div>
  );
};

export default UserListItem;
