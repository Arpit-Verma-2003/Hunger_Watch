import React from "react";

const Navbar = () => {
  return (
    <nav className="nav" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#f5f5f5" }}> {/* Light gray background */}
      <div className="nav-links" style={{ display: "flex" }}>
        <a href="/" className="nav-link" style={{ padding: "10px", margin: "0 5px", textDecoration: "none", color: "#333" }}>
          Home
        </a>
        <a href="/sign" className="nav-link" style={{ padding: "10px", margin: "0 5px", textDecoration: "none", color: "#333" }}>
          Sign Up / Login
        </a>
        <a href="/upload" className="nav-link" style={{ padding: "10px", margin: "0 5px", textDecoration: "none", color: "#333" }}>
          Upload Proof
        </a>
        <a href="/fetch" className="nav-link" style={{ padding: "10px", margin: "0 5px", textDecoration: "none", color: "#333" }}>
          Fetch Posts
        </a>
        <a href="/firestore" className="nav-link" style={{ padding: "10px", margin: "0 5px", textDecoration: "none", color: "#333" }}>
          Add Details
        </a>
        <a href="/about" className="nav-link" style={{ padding: "10px", margin: "0 5px", textDecoration: "none", color: "#333" }}>
          About Us
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
