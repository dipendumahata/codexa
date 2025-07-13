import React, { useState } from "react";
import axios from "axios";
import "./HackathonCreateForm.css";

const HackathonCreateForm = () => {
  const [form, setForm] = useState({
    title: "",
    hostName: "",
    sortDescription: "",
    description: "",
    coverImage: null,
    logoImage: null,
    location: "",
    registrationLink: "",
    startDate: "",
    endDate: "",
    eligibility: "",
    teamSizeMin: 1,
    teamSizeMax: 4,
    isFree: true,
    registrationFee: "",
    judgingCriteria: "",
    prizes: "",
    guidelines: "",
    contactEmail: "",
    contactPhone: "",
    categories: "",
    tags: "",
  });

  const [faqList, setFaqList] = useState([{ question: "", answer: "" }]);

  // Handle text, checkbox and file inputs
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  // Handle FAQ inputs
  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...faqList];
    updatedFaqs[index][field] = value;
    setFaqList(updatedFaqs);
  };

  const addFaq = () => {
    setFaqList([...faqList, { question: "", answer: "" }]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append form fields
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append FAQs
    faqList.forEach((faq, index) => {
      formData.append(`faq[${index}][question]`, faq.question);
      formData.append(`faq[${index}][answer]`, faq.answer);
    });

    try {
      await axios.post("/api/hackathons", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Hackathon created successfully!");
      setForm({ ...form, coverImage: null, logoImage: null }); // Reset image state
      setFaqList([{ question: "", answer: "" }]); // Reset FAQ
    } catch (err) {
      console.error(err);
      alert("Failed to create hackathon.");
    }
  };

  return (
    <form className="hackathon-form" onSubmit={handleSubmit}>
      <h2>Create Hackathon</h2>

      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="hostName" placeholder="Host Name" value={form.hostName} onChange={handleChange} required />
      <input name="sortDescription" placeholder="Short Description" value={form.sortDescription} onChange={handleChange} required />
      <textarea name="description" placeholder="Full Description" value={form.description} onChange={handleChange} required />

      <label>Cover Image</label>
      <input type="file" name="coverImage" accept="image/*" onChange={handleChange} required />
      <label>Logo Image</label>
      <input type="file" name="logoImage" accept="image/*" onChange={handleChange} required />

      <input name="location" placeholder="Location (Online/Offline)" value={form.location} onChange={handleChange} required />
      <input name="registrationLink" placeholder="Registration Link" value={form.registrationLink} onChange={handleChange} required />

      <label>Start Date</label>
      <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
      <label>End Date</label>
      <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />

      <input name="eligibility" placeholder="Eligibility" value={form.eligibility} onChange={handleChange} />
      <input type="number" name="teamSizeMin" placeholder="Min Team Size" value={form.teamSizeMin} onChange={handleChange} />
      <input type="number" name="teamSizeMax" placeholder="Max Team Size" value={form.teamSizeMax} onChange={handleChange} />

      <label>
        <input type="checkbox" name="isFree" checked={form.isFree} onChange={handleChange} />
        Free Registration?
      </label>

      {!form.isFree && (
        <input type="number" name="registrationFee" placeholder="Registration Fee" value={form.registrationFee} onChange={handleChange} />
      )}

      <textarea name="judgingCriteria" placeholder="Judging Criteria" value={form.judgingCriteria} onChange={handleChange} />
      <textarea name="prizes" placeholder="Prizes" value={form.prizes} onChange={handleChange} />
      <textarea name="guidelines" placeholder="Guidelines" value={form.guidelines} onChange={handleChange} />
      <input name="contactEmail" placeholder="Contact Email" value={form.contactEmail} onChange={handleChange} />
      <input name="contactPhone" placeholder="Contact Phone" value={form.contactPhone} onChange={handleChange} />
      <input name="categories" placeholder="Categories (comma-separated)" value={form.categories} onChange={handleChange} />
      <input name="tags" placeholder="Tags (comma-separated)" value={form.tags} onChange={handleChange} />

      <h4>FAQs</h4>
      {faqList.map((faq, index) => (
        <div className="faq-inputs" key={index}>
          <input
            placeholder="Question"
            value={faq.question}
            onChange={(e) => handleFaqChange(index, "question", e.target.value)}
          />
          <input
            placeholder="Answer"
            value={faq.answer}
            onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addFaq}>+ Add FAQ</button>

      <button type="submit">Submit Hackathon</button>
    </form>
  );
};

export default HackathonCreateForm;
