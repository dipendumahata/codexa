import React, { useState } from "react";
import axios from "axios";

function TutorialUploadForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      const res = await axios.post("/api/photos", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Tutorial uploaded!");
      setTitle("");
      setImage(null);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Upload failed");
    }
  };

  return (
    <form className="tutorial-upload-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tutorial Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="submit">Upload Tutorial</button>
    </form>
  );
}

export default TutorialUploadForm;
