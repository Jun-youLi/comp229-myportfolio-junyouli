// src/pages/About.jsx
// About Me page with basic personal information

function About() {
  return (
    <section className="page about-page">
      <h1>About Me</h1>

      <div className="about-layout">
        {/* 这里用占位图片路径，你之后把真正的照片放到 public/profile.jpg */}
        <div className="about-photo">
          <img
            src="/profile.jpg"
            alt="Portrait of Jun-You Li"
            onError={(e) => {
              // Fallback if profile.jpg is missing
              e.currentTarget.src =
                "https://via.placeholder.com/300x300?text=Your+Photo";
            }}
          />
        </div>

        <div className="about-text">
          <h2>Jun-You Li (Cliff)</h2>
          <p>
            I am an international student at Centennial College, studying AI
            Systems Design. I am interested in web development, backend
            development, and AI-powered tools that solve real problems for
            students and gamers.
          </p>
          <p>
            Recently, I have been working on a personal finance tracker web
            application, a Cyberpunk 2077 modding assistant, and a travel
            planning tool that uses weather data and AI to recommend routes.
          </p>
          <p>
            Outside of school, I enjoy modding games, experimenting with UI
            design, and building tools that make complex systems easier to use.
          </p>

          <div className="about-resume">
            {/* 请把你的简历 PDF 放到 public/resume.pdf */}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              View My Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
