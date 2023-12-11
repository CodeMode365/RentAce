import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, ThumbsDown, ThumbsUp } from "lucide-react";

const CommentSection = () => {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>View comments</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-12 text-gray-700">
              <div className="col-span-2 flex justify">
                <Avatar className="w-14 h-14">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="col-span-10 ">
                <h3 className="font-semibold -mb-[2px] text-[16px]">
                  Ramesh Poudel
                </h3>
                <p className="col-span-10 text-[16px] my-1">
                  Some important comment about the space
                </p>
                <p className="flex items-center my-2">
                  <ThumbsUp size={18} className="mx-1 cursor-pointer" />
                  <ThumbsDown size={18} className="mx-1 cursor-pointer" />
                  <Heart size={18} className="mx-1 cursor-pointer" />
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CommentSection;
