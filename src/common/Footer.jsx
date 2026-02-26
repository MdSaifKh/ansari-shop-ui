const Footer = () => {
    return (
        <footer className="footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%' }}>
            <div>
              <h4 style={{ marginBottom: "0.5rem" }}>Ansari Shop</h4>
              <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: "0.5rem" }}>Contact Us</h4>
              <p>Email: saifkhan2815@gmail.com</p>
              <p>Phone: 7001543574</p>
            </div>
          </div>
        </footer>
    );
}

export default Footer;