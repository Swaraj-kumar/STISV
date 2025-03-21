import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AbstractSubmissionButton.css";

const SubmitAbstractForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    theme: "",
    presentingType: "",
    firstAuthorName: "",
    firstAuthorAffiliation: "",
    otherAuthors: "",
    presentingAuthorName: "",
    presentingAuthorAffiliation: "",
    abstractFile: null,
    mainBody: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle file upload change
  const handleFileChange = (e) => {
    setFormData({ ...formData, abstractFile: e.target.files[0] });
  };

  // ✅ Validate form fields
  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.theme) newErrors.theme = "Theme is required";
    if (!formData.presentingType) newErrors.presentingType = "Presenting Type is required";
    if (!formData.firstAuthorName) newErrors.firstAuthorName = "First Author Name is required";
    if (!formData.firstAuthorAffiliation) newErrors.firstAuthorAffiliation = "First Author Affiliation is required";
    if (!formData.presentingAuthorName) newErrors.presentingAuthorName = "Presenting Author Name is required";
    if (!formData.presentingAuthorAffiliation) newErrors.presentingAuthorAffiliation = "Presenting Author Affiliation is required";
    if (!formData.abstractFile) newErrors.abstractFile = "Abstract file submission is required";
    if (!formData.mainBody) newErrors.mainBody = "Main Body of Abstract is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Start spinner

    const token = sessionStorage.getItem("token");
    const uid = sessionStorage.getItem("uid");

    if (!token || !uid) {
      setMessage("User is not logged in.");
      setLoading(false); // Stop spinner on failure
      return;
    }

    const submitFormData = new FormData();
    submitFormData.append("uid", uid);
    submitFormData.append("title", formData.title);
    submitFormData.append("theme", formData.theme);
    submitFormData.append("presentingType", formData.presentingType);
    submitFormData.append("firstAuthorName", formData.firstAuthorName);
    submitFormData.append("firstAuthorAffiliation", formData.firstAuthorAffiliation);
    submitFormData.append("otherAuthors", formData.otherAuthors);
    submitFormData.append("presentingAuthorName", formData.presentingAuthorName);
    submitFormData.append("presentingAuthorAffiliation", formData.presentingAuthorAffiliation);
    submitFormData.append("mainBody", formData.mainBody);

    if (formData.abstractFile) {
      submitFormData.append("abstractFile", formData.abstractFile);
    }

    try {
      const response = await fetch("https://stisv.onrender.com/submit-abstract", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitFormData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Abstract submitted successfully!");
        setShowSuccessPopup(true);

        // ✅ Clear the form and remove file input after successful submission
        setFormData({
          title: "",
          theme: "",
          presentingType: "",
          firstAuthorName: "",
          firstAuthorAffiliation: "",
          otherAuthors: "",
          presentingAuthorName: "",
          presentingAuthorAffiliation: "",
          abstractFile: null,
          mainBody: "",
        });

        // ✅ Redirect to Status Page after 3 seconds
        setTimeout(() => {
          navigate("/AbstractSubmissionStatus");
        }, 3000);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting abstract:", error);
      setMessage("Submission failed. Please try again.");
    }

    setLoading(false); // ✅ Move here — only run after fetch is complete
  };

  return (
    <div className="submit-abstract-container">
      {/* ✅ Success Popup - Auto Redirects after 3 seconds */}
      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <h2>Success!</h2>
            <p>Abstract submission successful. Redirecting you...</p>
          </div>
        </div>
      )}

      {/* ✅ Loading Overlay */}
      {loading && (
        <div className="overlay">
          <div className="loader">Loading...</div>
          <p style={{ color: "#fff", marginTop: "1rem" }}>Submitting your abstract...</p>
        </div>
      )}

      <h1>Abstract Submission Form</h1>
      <form onSubmit={handleSubmit} className={loading ? "blur" : ""}>

        <label>Title of the Paper *</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        {errors.title && <span className="error">{errors.title}</span>}

        <label>Theme *</label>
        <input type="text" name="theme" value={formData.theme} onChange={handleChange} required />
        {errors.theme && <span className="error">{errors.theme}</span>}

        <label>Mode Of Presentation *</label>
        <select name="presentingType" value={formData.presentingType} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Oral">Oral</option>
          <option value="Poster">Poster</option>
        </select>
        {errors.presentingType && <span className="error">{errors.presentingType}</span>}

        <h3>First Author *</h3>
        <label>Name</label>
        <input type="text" name="firstAuthorName" value={formData.firstAuthorName} onChange={handleChange} required />
        {errors.firstAuthorName && <span className="error">{errors.firstAuthorName}</span>}

        <label>Affiliation</label>
        <input type="text" name="firstAuthorAffiliation" value={formData.firstAuthorAffiliation} onChange={handleChange} required />
        {errors.firstAuthorAffiliation && <span className="error">{errors.firstAuthorAffiliation}</span>}

        <h3>Other Author(s), if any</h3>
        <label>Names & Affiliations (if multiple, separate by comma)</label>
        <textarea name="otherAuthors" value={formData.otherAuthors} onChange={handleChange} />

        <h3>Presenting Author *</h3>
        <label>Name</label>
        <input type="text" name="presentingAuthorName" value={formData.presentingAuthorName} onChange={handleChange} required />
        {errors.presentingAuthorName && <span className="error">{errors.presentingAuthorName}</span>}

        <label>Affiliation</label>
        <input type="text" name="presentingAuthorAffiliation" value={formData.presentingAuthorAffiliation} onChange={handleChange} required />
        {errors.presentingAuthorAffiliation && <span className="error">{errors.presentingAuthorAffiliation}</span>}


        <label>Abstract File Submission *</label>
        <input type="file" name="abstractFile" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
        {errors.abstractFile && <span className="error">{errors.abstractFile}</span>}

        <label>Main Body of Abstract *</label>
        <textarea name="mainBody" value={formData.mainBody} onChange={handleChange} required></textarea>
        {errors.mainBody && <span className="error">{errors.mainBody}</span>}

        <div className="form-buttons">
          <button type="submit" disabled={loading}>Submit</button>
        </div>
      </form>

      {message && !showSuccessPopup && <p className="message">{message}</p>}
    </div>
  );
};

export default SubmitAbstractForm;