"use client";

import React, { useEffect, useState } from "react";

import geojsonData from "../data/metropole-de-lyon_adr_voie_lieu.adrarrond.json";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import ArrondissementDetails from "@/components/ArrondissementDetails";
import LoginForm from "@/components/Login";
import RegisterForm from "@/components/RegisterForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SubscriptIcon } from "lucide-react";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function RatioPage() {
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  // );

  const zones = [
    { id: 1, value: 128 },
    { id: 2, value: 59 },
    { id: 3, value: 125 },
    { id: 4, value: 29 },
    { id: 5, value: 53 },
    { id: 6, value: 45 },
    { id: 7, value: 189 },
    { id: 8, value: 42 },
    { id: 9, value: 181 },
  ];

  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [alerts, setAlerts] = useState();
  const [activities, setActivities] = useState([]);
  const [selectedArrondissement, setSelectedArrondissement] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMapClickable, setIsMapClickable] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getCurrentUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
        .from("alert")
        .select()
        .order("date", { ascending: true });
      setAlerts(alerts || []);
    };

    const getActivities = async () => {
      const { data: activities } = await supabase
        .from("activities")
        .select()
        .order("date", { ascending: true });
      setActivities(activities || []);
    };

    getMessages();
    getAlerts();
    getActivities();

    const getFilteredAlerts = async () => {
      const { data: filteredAlerts } = await supabase
        .from("alert")
        .select()
        .eq("quartier", selectedArrondissement)
        .order("date", { ascending: true });
      setAlerts(filteredAlerts || []);
    };

    return () => {
      // subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (alerts !== undefined) {
      setIsMapClickable(true);
    }
  }, [alerts]);

  useEffect(() => {
    if (!selectedArrondissement) return;

    const getFilteredAlerts = async () => {
      const { data: filteredAlerts } = await supabase
        .from("alert")
        .select()
        .eq("quartier", selectedArrondissement)
        .order("date", { ascending: true });
      setAlerts(filteredAlerts || []);
    };

    const getFilteredActivities = async () => {
      const { data: filteredActivities } = await supabase
        .from("activities")
        .select()
        .eq("quartier", selectedArrondissement)
        .order("date", { ascending: true });
      setActivities(filteredActivities || []);
    };

    const getMessages = async () => {
      const { data: messages } = await supabase
        .from("chats")
        .select()
        .order("created_at", { ascending: true });
      setMessages(messages || []);
    };

    const subscription = supabase
      .channel("live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chats" },
        getMessages
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "alert" },
        (payload) => {
          getFilteredAlerts();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "activities" },
        getFilteredActivities
      )
      .subscribe();

    getFilteredAlerts();
    getFilteredActivities();

    return () => {
      subscription.unsubscribe();
    };
  }, [selectedArrondissement]);

  const handleSelectArrondissement = (arrondissement) => {
    if (!isMapClickable) return;

    let zone = zones.find((z) => z.value === arrondissement);
    setSelectedArrondissement(zone.id);
  };

  const handleSendMessage = async (message) => {
    if (!message) return;

    await supabase.from("chats").insert([
      {
        message,
        user_id: user.id,
        room_id: selectedArrondissement || "general",
        pseudo: user?.email || "anonymous",
      },
    ]);
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
      />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Section carte et détails */}
        <div className="lg:col-span-9">
          <div className="h-[500px] bg-white">
            {!isLoginOpen && !isRegisterOpen && alerts? (
              <Map
                geojsonData={geojsonData}
                onSelectArrondissement={handleSelectArrondissement}
              />
            ) : null}
          </div>

          {selectedArrondissement && (
            <div className="bg-white border-t">
              <ArrondissementDetails
                arrondissement={selectedArrondissement}
                data={{
                  seismes: [
                    { date: "2024-04-01", magnitude: 5.0, probabilite: "10%" },
                    { date: "2024-04-02", magnitude: 4.5, probabilite: "20%" },
                  ],
                  alertes: alerts.filter(
                    (a) => a.arrondissement === selectedArrondissement
                  ),
                  activites: activities.filter(
                    (a) => a.arrondissement === selectedArrondissement
                  ),
                }}
                alerts={alerts}
                activities={activities}
              />
            </div>
          )}
        </div>

        {/* Section chat */}
        <div className="lg:col-span-3 bg-white border-l">
          <Chat
            user={user}
            messages={messages}
            onSendMessage={handleSendMessage}
            arrondissement={selectedArrondissement || "Général"}
          />
        </div>
      </main>

      <Footer />

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md z-[999]">
          <DialogHeader>
            <DialogTitle>Connexion</DialogTitle>
            <DialogDescription>
              Veuillez saisir vos identifiants.
            </DialogDescription>
          </DialogHeader>
          <LoginForm onSuccess={handleLoginSuccess} />
        </DialogContent>
      </Dialog>

      {/* Register Dialog */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="sm:max-w-md z-[999]">
          <DialogHeader>
            <DialogTitle>Créer un compte</DialogTitle>
            <DialogDescription>
              Remplissez le formulaire pour vous inscrire.
            </DialogDescription>
          </DialogHeader>
          <RegisterForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
