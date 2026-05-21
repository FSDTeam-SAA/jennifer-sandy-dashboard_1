import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import moment from "moment";
import { PlayerReport } from "@/components/types/last-player-report-data-type";

const LastPlayerReportView = ({
  open,
  onOpenChange,
  lastPlayerReport,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lastPlayerReport: PlayerReport | null;
}) => {
  if (!lastPlayerReport) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[550px] overflow-y-auto p-6 space-y-4 bg-white !rounded-[12px]">

        <div className="space-y-4">
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Date :</strong> <br/> {moment(lastPlayerReport?.date).format("MMM DD, YYYY")}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Category :</strong> <br/> {lastPlayerReport?.category || "N/A"}
          </p>
           <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Game Title:</strong> <br/> {lastPlayerReport?.gameTitle || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Rating :</strong> <br/> {lastPlayerReport?.rating || "N/A"}
          </p>
            <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Position :</strong> <br/> {lastPlayerReport?.position || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Minutes Played :</strong> <br/> {lastPlayerReport?.minutesPlayed || "N/A"}
          </p>
           <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Defensive Summary :</strong> <br/> {lastPlayerReport?.deFensiveSummary || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Strengths :</strong> <br/> {lastPlayerReport?.strengths || "N/A"}
          </p>
            <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Offensive Summary :</strong> <br/> {lastPlayerReport?.offensiveSummary || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Weaknesses :</strong> <br/> {lastPlayerReport?.weaknesses || "N/A"}
          </p>
           <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">Distribution Summary :</strong> <br/> {lastPlayerReport?.distributionSummary || "N/A"}
          </p>
          <p className="text-base font-normal text-[#6C757D)] leading-[150%]">
            <strong className="text-base font-semibold text-[#343A40] leading-[150%]">General Comments :</strong> <br/> {lastPlayerReport?.generalComments || "N/A"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LastPlayerReportView;

