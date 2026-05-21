"use client";
import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteModal from "@/components/modals/delete-modal";
import ClaudePagination from "@/components/ui/claude-pagination";
import { Trash, Eye } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import moment from "moment";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import { toast } from "sonner";
import PricingTeamView from "./pricing-team-view";
import { TeamRevenueApiResponse, Payment } from "./team-pricing-data-type";

const PricingTeamContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectViewContact, setSelectViewContact] = useState(false);
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const [selectedContact, setSelectedContact] = useState<Payment | null>(null);
  const [selectedContactId, setSelectedContactId] = useState("");
  const queryClient = useQueryClient();



  const { data, isLoading, error, isError } = useQuery<TeamRevenueApiResponse>({
    queryKey: ["team-payment-and-pricing", currentPage],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/total-revenue?paymentType=TeamGame&page=${currentPage}&limit=8`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.json()
    },
    enabled: !!token
  })

  const totalPages = data?.meta ? Math.ceil(data.meta.total / data.meta.limit) : 0;



 let content;


  if (isLoading) {
    content = (
      <div>
        <TableSkeletonWrapper count={5} />
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else if (
    data &&
    data?.data &&
    data?.data?.data &&
    data?.data?.data?.length === 0
  ) {
    content = (
      <div>
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  }
  else if (data && data?.data && data?.data?.data && data?.data?.data?.length > 0){
    content = (
        <Table className="">
          <TableHeader className="bg-[#E6F4E6] rounded-t-[12px]">
            <TableRow className="">
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] py-4 pl-6">
                Team Name
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Price
              </TableHead>
              {/* <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Phone Number
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Message
              </TableHead> */}
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4 ">
                Date
              </TableHead>
              <TableHead className="text-sm font-normal leading-[150%] text-[#343A40] text-center py-4">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b border-x border-[#E6E7E6] rounded-b-[12px]">
            {data?.data?.data?.map((item, index) => {
              return (
                <TableRow key={index} className="">
                  <TableCell className="text-base font-medium text-[#68706A] leading-[150%] pl-6 py-4">
                    {item?.team?.teamName || "N/A"}
                  </TableCell>
                  <TableCell className="text-base font-normal text-[#68706A] leading-[150%] text-center py-4">
                    {item?.amount || 0}
                  </TableCell>
                  {/* <TableCell className="text-base font-normal text-[#68706A] leading-[150%] text-center py-4">
                    {item?.phone}
                  </TableCell>
                  <TableCell className="w-[395px] text-base font-normal text-[#68706A] leading-[150%] text-center py-4">
                    {item?.message}
                  </TableCell> */}
                  <TableCell className="text-base font-medium text-[#343A40] leading-[150%] text-center py-4">
                    {moment(item?.createdAt).format("MMM DD YYYY")}
                  </TableCell>
                  <TableCell className="h-full flex items-center justify-center gap-6 py-4">
                    <button
                      onClick={() => {
                        setSelectViewContact(true);
                        setSelectedContact(item);
                      }}
                      className="cursor-pointer mt-2"
                    >
                      <Eye className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteModalOpen(true);
                        setSelectedContactId(item?.paymentId)
                      }}
                      className="cursor-pointer mt-2"
                    >
                      <Trash className="h-6 w-6 text-red-500" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
    )
  }

    // delete team payment api
  const { mutate } = useMutation({
    mutationKey: ["delete-team-payment"],
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/delete-player-account/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Team Payment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["team-payment-and-pricing"] });
    },
  });

  const handleDelete = () => {
    if (selectedContactId) {
      mutate(selectedContactId);
    }
    setDeleteModalOpen(false);
  };
  return (
    <div>
      {/* table container */}
      <div className="p-6 space-y-6">

        {/* table  */}
      <div>{content}</div>

        {/* pagination  */}
        {
          totalPages > 1 && (
            <div className="w-full flex items-center justify-between py-6">
              <p className="text-base font-normal text-[#68706A] leading-[150%]">
                Showing {currentPage} to 8 of {data?.meta?.total} results
              </p>
              <div>
                <ClaudePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          )
        }

        {/* delete modal  */}
        {deleteModalOpen && (
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDelete}
            title="Are You Sure?"
            desc="Are you sure you want to delete this Team Payment"
          />
        )}

        {/* contact view modal  */}
        <div>
          {selectViewContact && (
            <PricingTeamView
              open={selectViewContact}
              onOpenChange={(open: boolean) => setSelectViewContact(open)}
              TeamPricing={selectedContact}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingTeamContainer;
