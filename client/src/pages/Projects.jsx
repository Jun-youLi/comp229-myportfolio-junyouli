// src/pages/Projects.jsx
// Projects page with at least 3 highlighted projects

const projects = [
  {
    id: 1,
    title: "Personal Finance Tracker",
    role: "Full-stack developer",
    description:
      "A Flask-based web application that helps users track income, expenses and budgets, with a modern dark dashboard and premium analytics features.",
    image: "/projects/finance-tracker.png",
  },
  {
    id: 2,
    title: "Cyberpunk 2077 Modding Assistant",
    role: "Backend & AI agent designer",
    description:
      "A multi-agent assistant that helps players install and troubleshoot Cyberpunk 2077 mods using RAG, planning agents and critic agents.",
    image: "/projects/cp2077-assistant.png",
  },
  {
    id: 3,
    title: "PlanVoyage Travel Planner",
    role: "Data & API integration",
    description:
      "A travel planning concept project that combines weather data, route information and AI recommendations to suggest smart itineraries.",
    image: "/projects/planvoyage.png",
  },
];

function Projects() {
  return (
    <section className="page projects-page">
      <h1>Projects</h1>
      <p className="page-intro">
        Here are some of the projects I am working on or have recently
        completed. Each project helped me practise different skills such as web
        development, APIs, databases, and AI.
      </p>

      <div className="card-grid">
        {projects.map((project) => (
          <article key={project.id} className="card">
            <div className="card-image">
              <img
                src={project.image}
                alt={project.title}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/400x250?text=Project+Image";
                }}
              />
            </div>
            <div className="card-body">
              <h2>{project.title}</h2>
              <p className="card-role">{project.role}</p>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
