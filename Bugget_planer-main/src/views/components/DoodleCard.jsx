export default function DoodleCard({ title, description, variant, icon }) {
  return (
    <div className={`doodle-card card-${variant}`}>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}