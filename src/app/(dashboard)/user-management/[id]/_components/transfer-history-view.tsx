import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import moment from "moment";
import Image from 'next/image'
import { TransferHistory } from "@/components/types/transfer-history-data-type";

const TransferHistoryView = ({
  open,
  onOpenChange,
  transferHistory,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transferHistory: TransferHistory | null;
}) => {
  if (!transferHistory) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 space-y-4 bg-white !rounded-[12px]">

        <div className="space-y-4">
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Season :</strong> <br/> {transferHistory?.season || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Departure Date :</strong> <br/> {moment(transferHistory?.date).format("MMM DD, YYYY")}
          </p>
           <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Left Club Name :</strong> <br/> {transferHistory?.leftClubName || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Left Club :</strong> <br/> 
                <Image src={transferHistory?.leftClub || "/assets/images/no-image.png"} alt="Profile" width={40} height={40} className="w-16 h-16 rounded-[12px] object-contain" />
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Left Country Flag :</strong> <br/> 
                <Image src={transferHistory?.leftCountery || "/assets/images/no-image.png"} alt="Profile" width={40} height={40} className="w-16 h-16 rounded-[12px] object-contain" />
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Joined Club Name :</strong> <br/> {transferHistory?.joinedclubName || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Joined Club :</strong> <br/> 
                <Image src={transferHistory?.joinedClub || "/assets/images/no-image.png"} alt="Profile" width={40} height={40} className="w-16 h-16 rounded-[12px] object-contain" />
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">joined Country Club :</strong> <br/> 
                <Image src={transferHistory?.joinedCountery || "/assets/images/no-image.png"} alt="Profile" width={40} height={40} className="w-16 h-16 rounded-[12px] object-contain" />
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransferHistoryView;

