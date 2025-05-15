"use client";

import React from "react";
import geojsonData from "../../data/metropole-de-lyon_adr_voie_lieu.adrarrond.json";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import ChatSidebar from "@/components/chatSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function RatioPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [instruments, setInstruments] = useState([]);
  const [room_id, setRoom_id] = useState([])

  useEffect(() => {
    const getInstruments = async () => {
      const { data: instruments } = await supabase.from("chats").select();
      setInstruments(instruments);
    };

    getInstruments();

    const { data: subscription } = supabase
      .channel("live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chats" },
        (payload) => {
          console.log("Realtime data received!", payload);
          getInstruments();
        }
      )
      .subscribe();

    return () => {
      //   supabase.removeSubscription(subscription);
    };
  }, []);

  // Fonction pour gérer la sélection d'un arrondissement
  const handleSelectArrondissement = (arrondissement) => {
    setRoom_id(arrondissement);
  };

  return (
    <>
      <div className="flex flex-row justify-center h-screen">
          <div className="w-full h-1/2">
            <Map
              geojsonData={geojsonData}
              onSelectArrondissement={handleSelectArrondissement}
            />
          </div>
          <div className="h-screen">
            <SidebarProvider>
              <SidebarInset>
                <SidebarTrigger>Chat</SidebarTrigger>
                <ChatSidebar room_id={room_id} />
              </SidebarInset>
            </SidebarProvider>
        </div>
      </div>
    </>
  );
}
