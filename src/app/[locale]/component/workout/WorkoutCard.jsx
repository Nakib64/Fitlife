export default function WorkoutCard({ day, exercises }) {
  return (
    <div className="border rounded p-4 mb-4 shadow-sm">
      <h3 className="text-lg font-bold mb-2">{day}</h3>
      <ul className="space-y-1">
        {exercises.map((ex, i) => (
          <li key={i} className="flex justify-between">
            <span>{ex.name}</span>
            <span>{ex.sets} x {ex.reps}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
