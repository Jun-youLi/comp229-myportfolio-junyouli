// src/components/Footer.jsx
// Simple footer with contact info

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        &copy; {currentYear} Jun-You Li (301443909) – AI Systems Design Student,
        Centennial College.
      </p>
    </footer>
  );
}
<p>CI/CD Demo: 2025-12-12</p>

export default Footer;
