"use client";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react"
import React, { useState } from "react";
import Link from "next/link"
// import { useSession } from "next-auth/react";
import { UserManagementApiResponse } from "../../_components/user-management-data-type";
import PlayerData from "./player-data";
import { User } from "./single-user-data-type";
import TransferHistoryPage from "./transfer-history";
import NationalTeamCareerPage from "./national-team-career";
import RatingPage from "./rating";
import FoulsPage from "./fouls";
import SetPiecesPage from "./set-pieces";
import GkStatsPage from "./gk-stats";
import LastPlayerReportPage from './last-player-report';
import DefensiveStatsPage from './defensive-stats';
import AttackingStatsPage from "./attacking-stats";
import DistributionStatsPage from "./distribution-stats";

const UserManagementTabs = ({ id }: { id: string }) => {
  // const session = useSession();
  // const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const [isActive, setIsActive] = useState("player-data");


  // get api call 
  const { data } = useQuery<UserManagementApiResponse>({
    queryKey: ["single-user", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`, {
        method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return res.json();
    },
    // enabled: !!token
  })

  const playerRole =   data?.data?.role;

  return (
    <div className="p-6">

      <div className="pb-4">
        <Link href="/user-management">
          <button className="bg-[#B6B6B6] flex items-center gap-2 text-[#131313] text-back leading-[120%] font-semibold py-2 px-4 rounded-[8px] "><ArrowLeft className="w-5 h-5" /> Back</button>
        </Link>
      </div>

      {/* sub-pages */}
      <div>
        <div className="bg-[#B6B6B6] flex items-center gap-8 p-3 rounded-[8px]">
          <button
            className={`text-xs lg:text-sm text-[#131313] leading-[120%] font-semibold py-2 px-2 ${isActive === "player-data" &&
              "bg-primary text-white rounded-[8px]"
              }`}
            onClick={() => setIsActive("player-data")}
          >
            Player Data
          </button>
          <button
            className={`text-xs lg:text-sm text-[#131313] leading-[120%] font-semibold py-2 px-2 ${isActive === "transfer-history" &&
              "bg-primary text-white rounded-[8px]"
              }`}
            onClick={() => setIsActive("transfer-history")}
          >
            Transfer History
          </button>

          <button
            className={`text-xs lg:text-sm text-[#131313] leading-[120%] font-semibold py-2 px-2 ${isActive === "national-team-career" &&
              "bg-primary text-white rounded-[8px]"
              }`}
            onClick={() => setIsActive("national-team-career")}
          >
            National Team Career
          </button>
          <button
            className={`text-xs lg:text-sm text-[#131313] leading-[120%] font-semibold py-2 px-2 ${isActive === "rating" &&
              "bg-primary text-white rounded-[8px]"
              }`}
            onClick={() => setIsActive("rating")}
          >
            Rating
          </button>

          <button
            className={`text-xs lg:text-sm text-[#131313] leading-[120%] font-semibold py-2 px-2 ${isActive === "defensive-stats" &&
              "bg-primary text-white rounded-[8px]"
              }`}
            onClick={() => setIsActive("defensive-stats")}
          >
            Defensive Stats
          </button>

           {/* attacking  */}

          {
            playerRole == "player" &&  <button
            className={`text-xs lg:text-sm text-[#131313] leading-[120%] font-semibold py-2 px-2 ${isActive === "attacking-stats" &&
              "bg-primary text-white rounded-[8px]"
              }`}
            onClick={() => setIsActive("attacking-stats")}
          >
            Attacking Stats
          </button>
          }
         

          <button
            className={`text-xs lg:text-sm text-[#131313] leading-[120%] font-semibold py-2 px-2 ${isActive === "distribution-stats" &&
              "bg-primary text-white rounded-[8px]"
              }`}
            onClick={() => setIsActive("distribution-stats")}
          >
            Distribution Stats
          </button>

          {/* gk stats  */}
          
          {
            playerRole == "gk" && <button
            className={`text-xs lg:text-sm text-[#131313] leading-[120%] font-semibold py-2 px-2 ${isActive === "gk-stats" &&
              "bg-primary text-white rounded-[8px]"
              }`}
            onClick={() => setIsActive("gk-stats")}
          >
            GK Stats
          </button>
          }

          {/* set pieces  */}

              {
                playerRole == "player" && <button
            className={`text-xs lg:text-sm text-[#131313] leading-[120%] font-semibold py-2 px-2 ${isActive === "set-pieces" &&
              "bg-primary text-white rounded-[8px]"
              }`}
            onClick={() => setIsActive("set-pieces")}
          >
            Set Pieces
          </button>
              }
          

          {/* fouls  */}

          {
            playerRole == "player" && <button
            className={`text-xs lg:text-sm text-[#131313] leading-[120%] font-semibold py-2 px-2 ${isActive === "fouls" &&
              "bg-primary text-white rounded-[8px]"
              }`}
            onClick={() => setIsActive("fouls")}
          >
            Fouls
          </button>
          }
          
          <button
            className={`text-xs lg:text-sm text-[#131313] leading-[120%] font-semibold py-2 px-2 ${isActive === "last-player-report" &&
              "bg-primary text-white rounded-[8px]"
              }`}
            onClick={() => setIsActive("last-player-report")}
          >
            Last Player Report
          </button>


        </div>

        <div className="mt-8">
          {isActive === "player-data" && (

            <div>
              <PlayerData data={data?.data as unknown as User} />
            </div>
          )}

          {isActive === "transfer-history" && (

            <div>
              <TransferHistoryPage id={id || ""} />
            </div>
          )}

          {isActive === "national-team-career" && (

            <div>
              <NationalTeamCareerPage id={id || ""} />
            </div>
          )}

          {isActive === "rating" && (

            <div>
              <RatingPage id={id || ""} />
            </div>
          )}


          {isActive === "defensive-stats" && (

            <div>
              <DefensiveStatsPage id={id || ""} />
            </div>
          )} 

          {isActive === "attacking-stats" && (

            <div>
              <AttackingStatsPage id={id || ""} />
            </div>
          )} 

            {isActive === "distribution-stats" && (

            <div>
              <DistributionStatsPage id={id || ""} role={playerRole || ""} />
            </div>
          )} 

          {isActive === "gk-stats" && (

            <div>
              <GkStatsPage id={id || ""} />
            </div>
          )}

          {isActive === "set-pieces" && (

            <div>
              <SetPiecesPage id={id || ""} />
            </div>
          )}

          {isActive === "fouls" && (

            <div>
              <FoulsPage id={id || ""} />
            </div>
          )}

          {isActive === "last-player-report" && (

            <div>
              <LastPlayerReportPage id={id || ""} />
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default UserManagementTabs;
