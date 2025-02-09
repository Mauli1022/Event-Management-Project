import { useState } from "react";
import SideBar from "./SideBar";
import CreateEvent from "./CreateEvent";
import EventList from "./EventList";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("events");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "events" && <EventList />}
        {activeTab === "create-event" && <CreateEvent />}
      </div>
    </div>
  );
};

export default AdminDashboard;
