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
import { supabase } from '@/lib/supabase';

export default function ChatSidebar({ room_id }) {
  const [pseudo, setPseudo] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Ajoute un message localement en pending
  const addPendingMessage = (msg) => {
    setMessages((prev) => [
      ...prev,
      { ...msg, pending: true, tempId: Date.now() + Math.random() },
    ]);
  };

  const sendMessage = async () => {
    const tempMsg = {
      room_id,
      pseudo,
      message,
      created_at: new Date().toISOString(),
    };
    addPendingMessage(tempMsg);

    await supabase.from("chats").insert([tempMsg]);
    setMessage("");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("chats")
        .select()
        .order("created_at", { ascending: true });

      setMessages((prev) => {
        const pending = prev.filter((m) => m.pending);
        const stillPending = pending.filter(
          (p) =>
            !data.some((d) => d.pseudo === p.pseudo && d.message === p.message)
        );
        return [...data, ...stillPending];
      });
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
    await sendMessage();
    setMessage("");
  };

  return (
    <>
      <Sidebar side="right" variant="default">
        {typeof room_id == "object" ? (
          <SidebarContent>
            <span>Veuillez selectioner un arrondissement</span>
          </SidebarContent>
        ) : (
          <SidebarContent className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id || msg.tempId}
                  className={`text-sm ${
                    msg.pending ? "opacity-50 italic" : ""
                  }`}
                >
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
        )}
      </Sidebar>
    </>
  );
}
