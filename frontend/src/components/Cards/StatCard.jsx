import "./StatCard.css";

function StatCard({ title, value, color }) {
  return (
    <div className="stat-card">

      <div
        className="card-top"
        style={{ background: color }}
      ></div>

      <h2>{value}</h2>

      <p>{title}</p>

    </div>
  );
}

export default StatCard;