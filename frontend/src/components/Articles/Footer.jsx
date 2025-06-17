import React, { useState } from "react";

const Footer = ({ className = "" }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <footer className={`w-full bg-[#FFDEB5] text-[#3B3021] ${className}`}>
      <div className="max-w-7xl mx-auto pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Explore Column */}
          <div>
            <h3 className="text-xl font-bold">Explore</h3>
            <ul className="mt-4 space-y-3 text-base">
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Tickets</a></li>
              <li><a href="#" className="hover:underline">Workshops</a></li>
            </ul>
          </div>
          
          {/* Help Column */}
          <div>
            <h3 className="text-xl font-bold">Help</h3>
            <ul className="mt-4 space-y-3 text-base">
              <li><a href="#" className="hover:underline">Terms & Condition</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          
          {/* Follow Column */}
          <div>
            <h3 className="text-xl font-bold">Follow</h3>
            <ul className="mt-4 space-y-3 text-base">
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">TikTok</a></li>
              <li><a href="#" className="hover:underline">X</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-xl font-bold">Join Our Newsletter</h3>
            <form onSubmit={handleSubmit} className="mt-4">
              <label htmlFor="email-sub" className="text-base">Email</label>
              <input
                id="email-sub"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#3B3021] focus:border-[#EE9D2B] focus:outline-none py-2 mt-2 transition-colors"
                required
              />
              {/* Submission can be done by pressing Enter */}
            </form>
            <p className="mt-12 text-base">Copyright @2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;