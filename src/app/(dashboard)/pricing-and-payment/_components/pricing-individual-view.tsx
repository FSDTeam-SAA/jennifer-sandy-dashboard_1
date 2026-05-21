import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import moment from "moment";
import { PaymentItem } from "./individual-pricing-data-type";

const PricingIndividualView = ({
  open,
  onOpenChange,
  individualPricing,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  individualPricing: PaymentItem | null;
}) => {
  if (!individualPricing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6 space-y-4 !rounded-[12px] bg-white">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-[120%] text-primary text-center">Individual Player Details</h3>

        <div className="space-y-4">
          <p className="text-base font-normal text-[#6C757D)] leading-[150%] text-center">
            <strong className="text-lg font-semibold text-[#343A40] leading-[150%]">Player Name :</strong> {individualPricing?.user?.name || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%] text-center">
            <strong className="text-lg font-semibold text-[#343A40] leading-[150%]">Team Name :</strong> {individualPricing?.user?.teamName || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%] text-center">
            <strong className="text-lg font-semibold text-[#343A40] leading-[150%]">Category :</strong> {individualPricing?.user?.category || "N/A"}
          </p>
          
          <p className="text-base font-normal text-[#6C757D)] leading-[150%] text-center">
            <strong className="text-lg font-semibold text-[#343A40] leading-[150%]">League :</strong> {individualPricing?.user?.league || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%] text-center">
            <strong className="text-lg font-semibold text-[#343A40] leading-[150%]">Date :</strong> {moment(individualPricing?.createdAt).format("MMM DD, YYYY")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingIndividualView;

