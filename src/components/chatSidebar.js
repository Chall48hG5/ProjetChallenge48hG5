"use client";

import React, { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ChatSidebar() {
  const [pseudo, setPseudo] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const room_id = 3;

  const sendMessage = async () => {
    await supabase.from("chats").insert([
      {
        room_id,
        pseudo,
        message,
        created_at: new Date().toISOString(),
      },
    ]);
    setMessage("");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("chats")
        .select()
        .order("created_at", { ascending: true });
      setMessages(data);
    };

    fetchMessages();

    const channel = supabase
      .channel("realtime:chats")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chats" },
        () => fetchMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pseudo.trim() || !message.trim()) return;
    // await supabase.from("chats").insert([{ pseudo, message }]);
    await sendMessage();
    setMessage("");
  };

  return (
    <Sidebar side="right" variant="default">
      <SidebarContent className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className="text-sm">
              <strong>{msg.pseudo}:</strong> {msg.message}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t space-y-2">
          <Input
            placeholder="Votre nom"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <Input
            placeholder="Votre message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Envoyer
          </Button>
        </form>
      </SidebarContent>
    </Sidebar>
  );
}
