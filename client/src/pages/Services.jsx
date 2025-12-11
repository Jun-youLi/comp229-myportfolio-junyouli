// src/pages/Services.jsx
// List of services you can offer

const services = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Building responsive front-end interfaces using HTML5, CSS3, JavaScript and React.",
  },
  {
    id: 2,
    title: "Backend & APIs",
    description:
      "Creating RESTful APIs with Node.js/Express and working with MongoDB or SQL databases.",
  },
  {
    id: 3,
    title: "AI & Automation",
    description:
      "Designing simple AI agents and automation scripts that help with debugging, data processing and game modding.",
  },
];

function Services() {
  return (
    <section className="page services-page">
      <h1>Services</h1>
      <p className="page-intro">
        As a student, I am still growing my skills, but I am comfortable working
        with the following areas:
      </p>

      <div className="card-grid">
        {services.map((service) => (
          <article key={service.id} className="card">
            <div className="card-body">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
