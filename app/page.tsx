export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">
        Swim Coach Toolkit
      </h1>

      <div className="border rounded-lg p-4 max-w-md">
        <h2 className="text-xl font-semibold">
          Allan
        </h2>

        <p>Age: 13</p>

        <div className="mt-4">
          <h3 className="font-medium">
            Skills
          </h3>

          <ul className="list-disc ml-5">
            <li>Front Float</li>
            <li>Freestyle Kick</li>
          </ul>
        </div>
      
        <div className="mt-4">
          <h3 className="font-medium">
            Notes
          </h3>

          <p>
            Needs to keep head lower during freestyle in order to let legs float.
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Drills</h3>
          <ul className="list-disc ml-5">
            <li>Kickboard Flutter Kick - 4x25</li>
            <li>Streamline Push-offs</li>
            <li>Breathing control drill</li>
          </ul>
        </div>
      </div>
    </main>
  );
}