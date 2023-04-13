import React from "react";
import { Link } from "react-router-dom";
import { navLinks, socialLinks } from "../Resource/data";
import Logo from "../Resource/images/logo.png";
import PolicyPdf from "../Resource/Policy.pdf";

const Footer = () => {
  const handleOpenPdf = () => {
    window.open(PolicyPdf, "_blank");
  };
  return (
    <div className="bg-primaryDark bg-opacity-70 px-6 py-6">
      <div className=" grid grid-cols-1 md:grid-cols-4 py-6 md:py-0 w-full mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-24" />
          </Link>
        </div>
        {/* Nav Links */}
        <div>
          <h1 className="text-xl font-bold border-b w-fit pb-2 my-3">
            Crazzzy Monsters
          </h1>
          {navLinks.map((link) => (
            <Link to={link.path} key={link.name}>
              <h2 className="hover:text-primary w-fit">{link.name}</h2>
            </Link>
          ))}
        </div>
        {/* Social Links */}
        <div>
          <h1 className="text-xl font-bold border-b w-fit pb-2 my-3">
            Social Links
          </h1>
          {socialLinks.map((link) => (
            <Link to={link.path} target="_blank" key={link.name}>
              <h2 className="hover:text-primary w-fit">{link.name}</h2>
            </Link>
          ))}
        </div>
        {/* Contact */}
        <div>
          <h1 className="text-xl font-bold border-b w-fit pb-2 my-3">
            Contact info
          </h1>
          <div>
            <Link key="terms">
              <h2 className="hover:text-primary w-fit" onClick={handleOpenPdf}>
                Terms & Conditions
              </h2>
            </Link>
            <Link key="email">
              <h2 className="hover:text-primary w-fit">Email</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center py-4">&#169; Powered by Crazzzy Monsters</div>
    </div>
  );
};

export default Footer;
