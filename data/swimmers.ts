export type Swimmer = {
    id: number;
    name: string;
    age: number;
    focuses: string[];
    notes: string;
    drills: string[];
  };
  
  export const swimmers: Swimmer[] = [
    {
      id: 1,
      name: "Allan",
      age: 13,
      focuses: ["Front Float", "Freestyle Kick"],
      notes:
        "Needs to keep head lower during freestyle in order to let legs float.",
      drills: [
        "Kickboard Flutter Kick - 4x25",
        "Streamline Push-offs",
        "Breathing control drill",
      ],
    },
  ];