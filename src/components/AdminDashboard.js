import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAbstracts = async () => {
      try {
        const response = await axios.get("https://stisv.onrender.com/get-all-abstracts");
        setAbstracts(response.data.abstracts);
      } catch (error) {
        setError("Error fetching abstracts");
      } finally {
        setLoading(false);
      }
    };
    fetchAbstracts();
  }, []);

  const updateStatus = async (uid, status) => {
    try {
      await axios.put("https://stisv.onrender.com/admin/update-abstract-status", { uid, status });
      setAbstracts((prev) => prev.map((abstract) => (abstract.uid === uid ? { ...abstract, status } : abstract)));
    } catch (error) {
      setError("Error updating abstract status");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Abstract Code</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {abstracts.map((abstract) => (
            <tr key={abstract.uid}>
              <td>{abstract.abstractCode}</td>
              <td>{abstract.title}</td>
              <td>{abstract.firstAuthorName}</td>
              <td className={abstract.status === "Approved" ? "status-approved" : abstract.status === "Rejected" ? "status-rejected" : "status-pending"}>
                {abstract.status}
              </td>
              <td>
                <button className="approve-button" onClick={() => updateStatus(abstract.uid, "Approved")}>Approve</button>
                <button className="reject-button" onClick={() => updateStatus(abstract.uid, "Rejected")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
