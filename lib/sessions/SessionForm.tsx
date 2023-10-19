// components/FeedbackForm.js
import { useState } from "react";

const FeedbackForm = ({ projects }: any) => {
  const [formData, setFormData] = useState({
    date: "",
    type: "",
    progress: "AVERAGE",
    summary: "",
    notes: "",
    duration: "",
    session_url: "",
    projectId: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* You can add other form fields here, like date, type, etc. */}
      <div>
        <label htmlFor='projectId'>Project</label>
        <select
          id='projectId'
          name='projectId'
          value={formData.projectId}
          onChange={handleChange}>
          <option value=''>Select a project</option>
          {projects.map((project: any) => (
            <option
              key={project.id}
              value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      {/* Other input fields... */}
      <button type='submit'>Submit</button>
    </form>
  );
};

export default FeedbackForm;
