import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadProject.css";

const API_URL = import.meta.env.VITE_API_URL;

function UploadProject() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    tags: "",
    learning: ""
  });

  const [userId, setUserId] = useState("");   // logged-in user ID
  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);

  // Fetch logged-in user info so we can attach their _id as owner
  useEffect(() => {
    axios
      .get(`${API_URL}/api/me`, { withCredentials: true })
      .then((res) => {
        if (res.data && res.data._id) {
          setUserId(res.data._id);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("owner", userId);  // Send _id (not name)
      data.append("tags", form.tags);
      data.append("learning", form.learning);
      data.append("logoImage", logo);
      data.append("coverImage", cover);
      data.append("stars", Math.floor(Math.random() * 300));

      await axios.post(`${API_URL}/api/projects/uploadproject`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Project uploaded successfully!");
      setForm({
        title: "",
        description: "",
        price: "",
        tags: "",
        learning: ""
      });
      setLogo(null);
      setCover(null);
    } catch (err) {
      alert("Upload failed! Check console for details.");
      console.error("Upload error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Project</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <input
          type="text"
          placeholder="Learning Points (comma separated)"
          value={form.learning}
          onChange={(e) => setForm({ ...form, learning: e.target.value })}
        />

        <label>Upload Logo</label>
        <input
          type="file"
          onChange={(e) => setLogo(e.target.files[0])}
          required
        />
        <label>Upload Cover Image</label>
        <input
          type="file"
          onChange={(e) => setCover(e.target.files[0])}
          required
        />

        <button type="submit" disabled={!userId}>
          {userId ? "Submit Project" : "Loading user..."}
        </button>
      </form>
    </div>
  );
}

export default UploadProject;
