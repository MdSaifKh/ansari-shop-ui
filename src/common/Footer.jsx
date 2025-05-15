const Footer = () => {
    return (
        <footer
          style={{
            backgroundColor: "#f6f7f8",
            color: "#474141",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            fontSize: "0.9rem",
          }}
        >
          <div>
            <h4 style={{ marginBottom: "0.5rem" }}>Ansari Shop</h4>
            <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: "0.5rem" }}>Contact Us</h4>
            <p>Email: saifkhan2815@gmail.com</p>
            <p>Phone: 7001543574</p>
          </div>
        </footer>
  );
}
  
  export default Footer;