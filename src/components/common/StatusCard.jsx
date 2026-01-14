const StatsCard = ({ stats }) => {
  const items = [
    { label: "Consultants", value: stats.consultants },
    { label: "Clients", value: stats.clients },
    { label: "Projects", value: stats.projects },
    { label: "Contents", value: stats.contents }
  ];

  return (
    <div className="row mb-4">
      {items.map((item, index) => (
        <div key={index} className="col-6 col-md-3 mb-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="fw-bold">{item.value}</h5>
              <p className="text-muted mb-0">{item.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
