"use client";
import React from "react";

import geojsonData from "../data/metropole-de-lyon_adr_voie_lieu.adrarrond.json";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import ArrondissementDetails from "@/components/ArrondissementDetails";
import { get } from "react-hook-form";
import LoginForm from "@/components/Login";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

const mockData = {
  seismes: [
    { date: "2024-03-20", magnitude: 2.1, probabilite: "15%" },
    { date: "2024-03-25", magnitude: 1.8, probabilite: "10%" },
    { date: "2024-03-28", magnitude: 1.5, probabilite: "5%" },
  ],
  // ,
  // alertes: [
  //   { type: 'Météo', message: 'Risque de fortes pluies ce weekend' },
  //   { type: 'Travaux', message: 'Rénovation de la rue principale du 15 au 20 avril' },
  //   { type: 'Transport', message: 'Perturbations sur la ligne de métro A' },
  // ],
  activites: [
    {
      nom: "Distribution de provisions",
      date: "2024-04-01",
      lieu: "Place centrale",
    },
    {
      nom: "Point médical mobile",
      date: "2024-04-02",
      lieu: "Place du marché",
    },
    { nom: "Réunion d'information", date: "2024-04-05", lieu: "Mairie" },
    {
      nom: "Centre d'accueil temporaire",
      date: "2024-04-08",
      lieu: "Gymnase municipal",
    },
  ],
};

export default function RatioPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [messages, setMessages] = useState([]);
  const [alerts, setAlerts] = useState();
  const [activities, setActivities] = useState([]);
  const [selectedArrondissement, setSelectedArrondissement] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const { data: messages } = await supabase
        .from("chats")
        .select()
        .order("created_at", { ascending: true });
      setMessages(messages || []);
    };

    const getAlerts = async () => {
      const { data: alerts } = await supabase
        .from("alerts")
        .select()
        .order("created_at", { ascending: true });
      console.log("aaaaaaaaaa", alerts);
      setAlerts(alerts || []);
    };

    const getActivities = async () => {
      console.log("aaaa")
      const { data: activities } = await supabase
        .from("activities")
        .select()
        .order("date", { ascending: true });
      setActivities(activities || []);
    }

    getMessages();
    getAlerts();
    getActivities();

    const subscription = supabase
      .channel("live")
      .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "chats" },
      (payload) => {
        getMessages();
      }
      )
      .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "alerts" },
      (payload) => {
        getAlerts();
      }
      )
      .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "activities" },
      (payload) => {
        getActivities();
      }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSelectArrondissement = (arrondissement) => {
    setSelectedArrondissement(arrondissement);
    // console.log(arrondissement)
    // console.log(activities)
    // setActivities(activities.filter((activity) => {
    //   console.log(activity  )
    //   // return activity.district == arrondissement
    // }
    // )
    // );
  };

  const handleSendMessage = async (message) => {
    await supabase.from("chats").insert([
      {
        message,
        room_id: selectedArrondissement || "general",
        pseudo: "anonymous",
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Section carte et détails */}
        <div className="lg:col-span-9">
          <div className="h-[500px] bg-white">
            <Map
              geojsonData={geojsonData}
              onSelectArrondissement={handleSelectArrondissement}
            />
          </div>

          {selectedArrondissement && (
            <div className="bg-white border-t">
              <ArrondissementDetails
                arrondissement={selectedArrondissement}
                data={mockData}
                alerts={alerts}
                activities={activities}
              />
            </div>
          )}
        </div>


        {/* Section chat */}
        <div className="lg:col-span-3 bg-white border-l">
          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            arrondissement={selectedArrondissement || "Général"}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
