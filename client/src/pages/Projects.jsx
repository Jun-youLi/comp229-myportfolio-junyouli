// client/src/pages/Projects.jsx
import { API_BASE } from "../apiBase";
import React, { useEffect, useMemo, useState } from "react";

function Projects({ currentUser, token, apiBase }) {
  const baseUrl = useMemo(
    () => (apiBase || API_BASE || "").replace(/\/$/, ""),
    [apiBase]
  );

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Admin create form state
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [completion, setCompletion] = useState(100);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const isAdmin = currentUser?.role === "admin";

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(`${baseUrl}/api/projects`);
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load projects");
      } else {
        setProjects(Array.isArray(data) ? data : []);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);

  const handleCreateProject = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("You must be logged in as admin to create projects.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          firstname,
          lastname,
          email,
          completion,
          description,
          link,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create project");
        return;
      }

      setMessage("Project created successfully");
      setTitle("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setCompletion(100);
      setDescription("");
      setLink("");
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

      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project._id} className="project-card">
            <h3>{project.title}</h3>
            {project.description && <p>{project.description}</p>}
            {project.completion !== undefined && project.completion !== null && (
              <p>Completion: {project.completion}%</p>
            )}
            {(project.firstname || project.lastname || project.email) && (
              <p>
                {project.firstname} {project.lastname}
                {project.email ? ` (${project.email})` : ""}
              </p>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer">
                View Project
              </a>
            )}
          </li>
        ))}
      </ul>

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
              First Name
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </label>

            <label>
              Last Name
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Completion (%)
              <input
                type="number"
                min="0"
                max="100"
                value={completion}
                onChange={(e) => setCompletion(Number(e.target.value))}
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
