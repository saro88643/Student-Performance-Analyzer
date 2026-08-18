import "./Dashboard.css";
import StatCard from "../../components/Cards/StatCard";
function Dashboard(){

    return(

        <div className="dashboard">

            <h1>Dashboard</h1>

            <div className="cards">

    <StatCard
        title="Students"
        value="520"
        color="#2563EB"
    />

    <StatCard
        title="Teachers"
        value="24"
        color="#10B981"
    />

    <StatCard
        title="Attendance"
        value="96%"
        color="#F59E0B"
    />

    <StatCard
        title="Performance"
        value="87%"
        color="#EF4444"
    />

</div>
        </div>

    )

}

export default Dashboard;