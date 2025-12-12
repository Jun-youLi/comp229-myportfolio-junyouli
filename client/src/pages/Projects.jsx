// client/src/pages/Projects.jsx

import React, { useEffect, useState } from "react";

function Projects({ currentUser, token, apiBase }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form state for admin to create a project
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const isAdmin = currentUser?.role === "admin";

  // Fetch all projects (public endpoint)
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(`${apiBase}/projects`);
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load projects");
      } else {
        setProjects(data);
      }
    } catch (error) {
      console.error("Fetch projects error:", error);
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Admin: create a new project
  const handleCreateProject = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("You must be logged in as admin to create projects.");
      return;
    }

    try {
      const response = await fetch(`${apiBase}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, link }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create project");
        return;
      }

      setMessage("Project created successfully");
      setTitle("");
      setDescription("");
      setLink("");
      // Reload list after creating a project
      fetchProjects();
    } catch (error) {
      console.error("Create project error:", error);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="projects-page">
      <h2>Projects</h2>

      {loading && <p>Loading projects...</p>}
      {message && <p className="projects-message">{message}</p>}

      {/* Project list */}
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project._id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer">
                View Project
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Only admin can see the create form */}
      {isAdmin && (
        <div className="project-admin-section">
          <h3>Create New Project (Admin Only)</h3>
          <form className="project-form" onSubmit={handleCreateProject}>
            <label>
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label>
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>

            <label>
              Link (optional)
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </label>

            <button type="submit">Create Project</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Projects;
