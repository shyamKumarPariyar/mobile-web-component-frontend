import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../../service/dashboard.service";
import StatsCard from "../common/StatusCard";
import StatusChart from "../common/StatusChart";
import { countByStatus } from "../../utils/StatusCounter";
import { useHeader } from "../common/HeaderContext";


const Dashboard = () => {
  const { setTitle, setHeader } = useHeader()
  const [stats, setStats] = useState({
    consultants: [],
    clients: [],
    projects: [],
  });

  useEffect(() => {
    fetchDashboardStats().then(setStats);
  }, []);
    useEffect(() => {
        setTitle("DKN SYSTEM | Dashboard");
        setHeader("Dashboard");
    }, [setTitle, setHeader]); 

  return (
    <div className="container-fluid mt-4">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      {/* KPI Cards */}
      <StatsCard
        stats={{
          consultants: stats?.consultants?.length,
          clients: stats?.clients?.length,
          projects: stats?.projects?.length,
        }}
      />

      {/* Charts */}
      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <StatusChart
            title="Consultants Status"
            data={countByStatus(stats?.consultants)}
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <StatusChart
            title="Clients Status"
            data={countByStatus(stats?.clients)}
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <StatusChart
            title="Projects Status"
            data={countByStatus(stats?.projects)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
