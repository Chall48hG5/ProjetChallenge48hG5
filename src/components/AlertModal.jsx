// components/AlertModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mapping arrondissement vers quartier
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

const AlertModal = () => {
  const [form, setForm] = useState({
    temperature: "",
    humidite: "",
    sismicite: "",
    catastrophe: "",
    arrondissement: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const parsedArr = parseInt(form.arrondissement);
    const zone = zones.find((z) => z.id === parsedArr);

    if (!zone) {
      alert(
        "Arrondissement invalide. Veuillez entrer un chiffre entre 1 et 9."
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("alert").insert({
      temperature: parseFloat(form.temperature),
      humidite: parseFloat(form.humidite),
      sismicite: parseFloat(form.sismicite),
      catastrophe: form.catastrophe,
      quartier: form.arrondissement,
      date: new Date(new Date().setFullYear(2171)).toISOString(),
    });

    setLoading(false);

    if (error) {
      console.error("Erreur lors de l'envoi :", error.message);
      alert("Erreur lors de l'envoi de l'alerte.");
    } else {
      alert("Alerte envoyée avec succès !");
      setForm({
        temperature: "",
        humidite: "",
        sismicite: "",
        catastrophe: "",
        arrondissement: "",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 text-white hover:bg-red-600">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Signaler une alerte
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle alerte</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Température (°C)</Label>
            <Input
              name="temperature"
              type="number"
              value={form.temperature}
              onChange={handleChange}
              step="0.1"
            />
          </div>

          <div className="grid gap-2">
            <Label>Humidité (%)</Label>
            <Input
              name="humidite"
              type="number"
              value={form.humidite}
              onChange={handleChange}
              step="0.1"
            />
          </div>

          <div className="grid gap-2">
            <Label>Sismicité</Label>
            <Input
              name="sismicite"
              type="number"
              value={form.sismicite}
              onChange={handleChange}
              step="0.01"
              placeholder="Ex : 0.5, 1.2, 2.8"
            />
          </div>

          <div className="grid gap-2">
            <Label>Catastrophe</Label>
            <Input
              name="catastrophe"
              type="text"
              value={form.catastrophe}
              onChange={handleChange}
              placeholder="Ex : Inondation, Incendie..."
            />
          </div>

          <div className="grid gap-2">
            <Label>Arrondissement (1-9)</Label>
            <Input
              name="arrondissement"
              type="number"
              value={form.arrondissement}
              onChange={handleChange}
              placeholder="Ex : 1, 2, 3..."
              min="1"
              max="9"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white"
            >
              {loading ? "Envoi..." : "Envoyer l'alerte"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
