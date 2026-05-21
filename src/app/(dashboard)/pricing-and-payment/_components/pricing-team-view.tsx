import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import moment from "moment";
import { Payment } from "./team-pricing-data-type";

const PricingTeamView = ({
  open,
  onOpenChange,
  TeamPricing,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  TeamPricing: Payment | null;
}) => {
  if (!TeamPricing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6 space-y-4 bg-white !rounded-[12px]">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-[120%] text-primary text-center">Team Details</h3>

        <div className="space-y-2">
          <p className="text-base font-normal text-[#6C757D)] leading-[150%] text-center">
            <strong className="text-lg font-semibold text-[#343A40] leading-[150%]">Coach Name :</strong> {TeamPricing?.team?.coachName || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%] text-center">
            <strong className="text-lg font-semibold text-[#343A40] leading-[150%]">Team Name :</strong> {TeamPricing?.team?.teamName || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%] text-center">
            <strong className="text-lg font-semibold text-[#343A40] leading-[150%]">Category :</strong> {TeamPricing?.team?.category || "N/A"}
          </p>
          
          <p className="text-base font-normal text-[#6C757D)] leading-[150%] text-center">
            <strong className="text-lg font-semibold text-[#343A40] leading-[150%]">League :</strong> {TeamPricing?.team?.league || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%] text-center">
            <strong className="text-lg font-semibold text-[#343A40] leading-[150%]">Date :</strong> {moment(TeamPricing?.createdAt).format("MMM DD, YYYY")}
          </p>

          <div className="pt-4">
            {
              TeamPricing?.team?.players?.map((item, index)=>{
                return  <p key={item?._id} className="text-base font-normal text-[#6C757D)] leading-[150%] text-center">
             <strong className="text-lg font-semibold text-[#343A40] leading-[150%]">Player {index+1} :</strong> {item?.name || "N/A"}
          </p>
              })
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingTeamView;

