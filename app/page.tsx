"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Swimmer } from "../data/swimmers";

export default function Home() {
  const [swimmers, setSwimmers] = useState<Swimmer[]>([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [focuses, setFocuses] = useState("");
  const [notes, setNotes] = useState("");
  const [drills, setDrills] = useState("");

  // ✅ LOAD FROM SUPABASE
  useEffect(() => {
    const fetchSwimmers = async () => {
      const { data, error } = await supabase
        .from("swimmers")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error loading swimmers:", error);
        return;
      }

      setSwimmers(data ?? []);
    };

    fetchSwimmers();
  }, []);

  // ➕ ADD SWIMMER TO SUPABASE
  const addSwimmer = async () => {
    if (!name.trim() || !age) return;

    const newSwimmer = {
      name: name.trim(),
      age: Number(age),

      focuses: focuses
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),

      notes: notes.trim(),

      drills: drills
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean),
    };

    const { data, error } = await supabase
      .from("swimmers")
      .insert([newSwimmer])
      .select()
      .single();

    if (error) {
      console.error("Error adding swimmer:", error);
      return;
    }

    // ✅ safely update UI
    if (data) {
      setSwimmers((prev) => [...prev, data]);
    }

    // clear form
    setName("");
    setAge("");
    setFocuses("");
    setNotes("");
    setDrills("");
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">
        Swim Coach Toolkit
      </h1>

      {/* ADD SWIMMER FORM */}
      <div className="border p-4 rounded mb-6 max-w-md space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Focuses (comma separated)"
          value={focuses}
          onChange={(e) => setFocuses(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Drills (comma separated)"
          value={drills}
          onChange={(e) => setDrills(e.target.value)}
        />

        <button
          onClick={addSwimmer}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded w-full"
        >
          Add Swimmer
        </button>
      </div>

      {/* SWIMMER LIST */}
      {swimmers.map((swimmer) => (
        <div
          key={swimmer.id}
          className="border rounded-lg p-4 max-w-md mb-4"
        >
          <h2 className="text-xl font-semibold">
            {swimmer.name}
          </h2>

          <p>Age: {swimmer.age}</p>

          <div className="mt-4">
            <h3 className="font-medium">Focuses</h3>
            <ul className="list-disc ml-5">
              {(swimmer.focuses ?? []).map((focus, i) => (
                <li key={i}>{focus}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-medium">Notes</h3>
            <p>{swimmer.notes}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-medium">Drills</h3>
            <ul className="list-disc ml-5">
              {(swimmer.drills ?? []).map((drill, i) => (
                <li key={i}>{drill}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </main>
  );
}