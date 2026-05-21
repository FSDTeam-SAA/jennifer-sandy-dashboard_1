"use client"

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import { Trash, SquarePen } from "lucide-react";
import ClaudePagination from "@/components/ui/claude-pagination";
import DeleteModal from "@/components/modals/delete-modal";
import AddEditMarketValueForm from "./add-edit-market-value-form";
import { MarketValueApiResponse, MarketValueItem } from "@/components/types/market-value-data-type";

const PlayerMarketValuePage = ({ id }: { id?: string }) => {
  console.log("view data", id)
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [marketValueId, setMarketValueId] = useState("");
  const [selectedMarketValue, setSelectedMarketValue] =
    useState<MarketValueItem | null>(null);
  const [addMarketValueForm, setAddMarketValueForm] = useState(false);
  const queryClient = useQueryClient();
  console.log(queryClient)
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data, isLoading, isError, error } = useQuery<MarketValueApiResponse>({
    queryKey: ["market-value", id, currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/marketvalue/${id}?page=${currentPage}&limit=8`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      );
      return res.json();
    },
    enabled: !!token,
  });

  console.log(data)

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
    data?.data?.length === 0
  ) {
    content = (
      <div className="">
        {/* <h2>Page Not Found</h2>
      <p>We’re working on building this platform. Please check back soon.</p> */}

        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  } else if (
    data &&
    data?.data &&
    data?.data?.length > 0
  ) {
    content = (
      <div>
        <Table className="">
          <TableHeader className="bg-primary/15 rounded-t-[12px]">
            <TableRow className="">
              <TableHead className="text-base font-medium leading-[150%] text-[#131313] py-3 px-6">
                Market Value
              </TableHead>
              <TableHead className="text-base font-medium leading-[150%] text-[#131313] text-center py-3">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b border-x border-[#E6E7E6] rounded-b-[12px]">
            {data?.data?.map((item, index) => {
              return (
                <TableRow key={index} className="">
                  <TableCell className="w-[267px] text-base font-medium text-[#131313] leading-[150%] px-6 py-3">

                   $ {item?.marketValue || "N/A"}
                  </TableCell>
                  <TableCell >
                    <div className="h-full w-auto flex items-end justify-center gap-6 py-3">

                      <button
                        onClick={() => {
                          setSelectedMarketValue(item);
                          setAddMarketValueForm(true);
                        }}
                        className="cursor-pointer"
                      >
                        <SquarePen className="h-6 w-6 text-[#181818]" />
                      </button>


                      <button
                        onClick={() => {
                          setDeleteModalOpen(true);
                          setMarketValueId(item?._id);
                        }}
                        className="cursor-pointer"
                      >
                        <Trash className="h-6 w-6 text-red-500" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }


  // delete national team player 
  const { mutate } = useMutation({
    mutationKey: ["delete-market-value"],
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/marketvalue/${id}`,
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
      toast.success(data?.message || "Market Value deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["market-value"] });
    },
  });

  const handleDelete = () => {
    if (marketValueId) {
      mutate(marketValueId);
    }
    setDeleteModalOpen(false);
  };
  return (
    <div>
      <div className='pt-2'>
        <div className="w-full flex items-center justify-between">
           <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#131313] leading-normal">Player Market Value</h3>
         <div>
          {
            data && data?.data && data?.data?.length < 1 && (
               <button onClick={() => {
            setSelectedMarketValue(null);
            setAddMarketValueForm(true);
          }} className="bg-primary text-white py-3 px-4 rounded-[12px] text-base leading-normal font-semibold">Add Market Value</button>
            )
          }
         </div>
        </div>

        <div className="pt-6">
          {content}
        </div>
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
            desc="Are you sure you want to delete this Market Value?"
          />
        )}

        {/* add and edit marketvalue form  */}

        <div>
          {
            addMarketValueForm && (
              <AddEditMarketValueForm
                open={addMarketValueForm}
                onOpenChange={(open: boolean) => setAddMarketValueForm(open)}
                defaultData={selectedMarketValue}
                playerId={id}
              />
            )
          }
        </div>


      </div>
    </div>
  )
}

export default PlayerMarketValuePage
















