import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { CircleDollarSign, Dot, MoreVertical } from "lucide-react";

const InfoCard = () => {
  return (
    <Card className="col-span-2 h-auto shadow-md">
      <CardHeader className="h-16">
        <div className="relative flex">
          <span className="h-8 w-8 bg-yellow-100 flex items-center justify-center rounded-md mr-2">
            <CircleDollarSign className="text-yellow-500" />
          </span>
          <span className="text-sm my-auto text-gray-600">Total Revenue</span>
          <MoreVertical className="text-gray-500 ml-auto my-auto" size={16} />
        </div>
      </CardHeader>

      <CardContent className="-mb-4">
        <h4 className="text-2xl font-medium text-gray-700 ">Rs. 45,5000</h4>
      </CardContent>

      <CardFooter className="-mb-2">
        <h5 className="text-gray-600 text-xs">
          <span className="text-green-500 font-bold">45% </span> from last month
        </h5>
      </CardFooter>
    </Card>
  );
};

export default InfoCard;
