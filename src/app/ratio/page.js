"use client";

import React from "react";
import geojsonData from "../../data/metropole-de-lyon_adr_voie_lieu.adrarrond.json";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function RatioPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [instruments, setInstruments] = useState([]);

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

  return (
    <>
      <ul>
        {instruments.map((item) => (
          <li key={item.id}>
            <strong>{item.pseudo} :</strong> {item.message}
          </li>
        ))}
      </ul>
      <Map geojsonData={geojsonData} />
    </>
  );
}
