import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AbstractSubmissionStatus.css";

const AbstractSubmissionStatus = () => {
  const [abstract, setAbstract] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [isFinalized, setIsFinalized] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedAbstract, setUpdatedAbstract] = useState({});
  const [newFile, setNewFile] = useState(null); // ✅ Handle file uploads

  // Retrieve token and UID from sessionStorage
  const token = sessionStorage.getItem("token");
  const uid = sessionStorage.getItem("uid");

  useEffect(() => {
    const fetchAbstract = async () => {
      try {
        const response = await axios.get(
          `https://stisv.onrender.com/get-abstract/${uid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setAbstract(response.data.abstract);
        setUpdatedAbstract(response.data.abstract || {});

        if (response.data.abstract) {
          setStatus(response.data.abstract.status || "Pending");
          setIsFinalized(response.data.abstract.isFinalized || false);
        }
      } catch (err) {
        setError("Failed to fetch abstract");
      } finally {
        setLoading(false);
      }
    };

    if (uid && token) {
      fetchAbstract();
    } else {
      setError("User not authenticated.");
      setLoading(false);
    }
  }, [uid, token]);

  // Handle Abstract Updates
  const handleUpdate = async () => {
    setUpdating(true);

    try {
      const formData = new FormData();
      formData.append("uid", uid); // ✅ Send UID

      let hasUpdates = false;

      // ✅ Append only changed fields
      [
        "title",
        "theme",
        "presentingType",
        "firstAuthorName",
        "firstAuthorAffiliation",
        "otherAuthors",
        "presentingAuthorName",
        "presentingAuthorAffiliation",
        "mainBody"
      ].forEach((field) => {
        if (updatedAbstract[field] !== abstract[field]) {
          formData.append(field, updatedAbstract[field]);
          hasUpdates = true;
        }
      });

      // ✅ Handle File Upload
      if (newFile) {
        formData.append("abstractFile", newFile);
        hasUpdates = true;
      }

      if (!hasUpdates) {
        setError("No changes made.");
        setUpdating(false);
        return;
      }

      await axios.put(
        `https://stisv.onrender.com/update-abstract`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAbstract(updatedAbstract);
      setEditMode(false);
      setNewFile(null); // ✅ Clear file input after upload
      setError(null);
    } catch (error) {
      setError("Error updating abstract.");
    } finally {
      setUpdating(false);
    }
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    if (!isFinalized) {
      setNewFile(e.target.files[0]);
    }
  };

  // Handle Finalization (Disable Editing)
  const handleFinalize = async () => {
    setFinalizing(true);
    try {
      await axios.post(
        `https://stisv.onrender.com/finalize-abstract`,
        { uid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFinalized(true);
      setEditMode(false);
    } catch (error) {
      setError("Error finalizing submission.");
    } finally {
      setFinalizing(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="abstract-status-container">
      <h2>Abstract Submission Status</h2>

      {/* ✅ Abstract Code Display */}
      {abstract && (
        <div className="abstract-row">
          <strong>Abstract Code:</strong> <span className="abstract-code">{abstract.abstractCode}</span>
        </div>
      )}

      {abstract ? (
        <div className="abstract-details">
          {/* ✅ Abstract Details */}
          {[
            { label: "Title", key: "title" },
            { label: "Theme", key: "theme" },
            { label: "Mode of Presentation", key: "presentingType", type: "select", options: ["Oral", "Poster"] },
            { label: "First Author Name", key: "firstAuthorName" },
            { label: "First Author Affiliation", key: "firstAuthorAffiliation" },
            { label: "Other Authors", key: "otherAuthors", type: "textarea" },
            { label: "Presenting Author Name", key: "presentingAuthorName" },
            { label: "Presenting Author Affiliation", key: "presentingAuthorAffiliation" },
            { label: "Main Body", key: "mainBody", type: "textarea" }
          ].map((field) => (
            <div className="abstract-row" key={field.key}>
              <strong>{field.label}:</strong>
              {editMode ? (
                field.type === "select" ? (
                  <select
                    value={updatedAbstract[field.key]}
                    onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, [field.key]: e.target.value })}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={updatedAbstract[field.key]}
                    onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, [field.key]: e.target.value })}
                  />
                ) : (
                  <input
                    type="text"
                    value={updatedAbstract[field.key]}
                    onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, [field.key]: e.target.value })}
                  />
                )
              ) : (
                <span>{abstract[field.key]}</span>
              )}
            </div>
          ))}

          <div className="abstract-row">
            <strong>Status:</strong>
            <span className={status === "Approved" ? "status-accepted" : status === "Rejected" ? "status-rejected" : "status-pending"}>
              {status}
            </span>
          </div>

          {/* ✅ File Upload or Download */}
          <div className="abstract-row">
            <strong>Abstract File:</strong>
            {abstract.abstractFile ? (
              <a href={abstract.abstractFile} target="_blank" rel="noopener noreferrer" className="download-link">
                Download
              </a>
            ) : (
              <span>No file uploaded</span>
            )}
          </div>

          {/* ✅ Allow File Upload if Not Finalized */}
          {!isFinalized && (
            <div className="abstract-row">
              <strong>Upload New File:</strong>
              <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
            </div>
          )}

          {/* ✅ Edit & Update Buttons */}
          {!isFinalized && (
            <div className="abstract-actions">
              {editMode ? (
                <>
                  <button className="save-button" onClick={handleUpdate} disabled={updating}>
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                  <button className="cancel-button" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="edit-button" onClick={() => setEditMode(true)}>
                  Edit Abstract
                </button>
              )}
            </div>
          )}

          {/* ✅ Finalize Submission Button */}
          {!isFinalized && (
            <button className="finalize-button" onClick={handleFinalize} disabled={finalizing}>
              {finalizing ? "Finalizing..." : "Finalize Submission"}
            </button>
          )}
        </div>
      ) : (
        <p>No abstract submitted yet.</p>
      )}
    </div>
  );
};

export default AbstractSubmissionStatus;
