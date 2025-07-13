import React from "react";
import "./Tutorials.css";
import axios from "axios";

function Tutorials({ tutorials, setTutorials, user }) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tutorial?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/photos/${id}`, { withCredentials: true });
      setTutorials((prev) => prev.filter((t) => t._id !== id));
      alert("Tutorial deleted.");
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("Failed to delete tutorial.");
    }
  };

  return (
    <section className="tutorials-section">
      <h2 className="tutorials-heading">Paid Tutorials</h2>

      <div className="tutorials-list">
        {tutorials.length > 0 ? (
          tutorials.map((tutorial) => (
            <div className="tutorial-card" key={tutorial._id}>
              <div className="tutorial-thumbnail">
                {tutorial.imageUrl ? (
                  <img src={tutorial.imageUrl} alt={tutorial.title} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <div className="tutorial-info">
                <h4 className="tutorial-title">{tutorial.title}</h4>
                <p className="tutorial-author">
                  {tutorial.createdBy?.username || "Unknown"}
                </p>
              </div>
              {user &&
                (user._id === tutorial.createdBy?._id ||
                  user.role === "admin") && (
                  <button
                    onClick={() => handleDelete(tutorial._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                )}
            </div>
          ))
        ) : (
          <p className="no-tutorials-msg">No tutorials found.</p>
        )}
      </div>
    </section>
  );
}

export default Tutorials;
