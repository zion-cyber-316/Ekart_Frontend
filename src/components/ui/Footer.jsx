// import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Section */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              E<span className="text-blue-500">Kart</span>
            </h2>

            <p className="text-gray-400 text-sm leading-6 max-w-sm">
              Your one-stop destination for quality products at the best
              prices. Shop smarter, shop better with E-Kart.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 hover:text-white transition duration-300"
              >
                <FaFacebookF size={17} />
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 hover:text-white transition duration-300"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-sky-500 hover:text-white transition duration-300"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 hover:text-white transition duration-300"
              >
                <FaYoutube size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-600 hover:text-white transition duration-300"
              >
                <FaGithub size={18} />
              </a>

            </div>
          </div>


          {/* Quick Links */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <a
                  href="/"
                  className="hover:text-blue-500 transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/products"
                  className="hover:text-blue-500 transition"
                >
                  Products
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="hover:text-blue-500 transition"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="/cart"
                  className="hover:text-blue-500 transition"
                >
                  My Orders
                </a>
              </li>

            </ul>
          </div>


          {/* Customer Service */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-5">
              Customer Service
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition"
                >
                  Shipping & Delivery
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition"
                >
                  Return Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition"
                >
                  Terms & Conditions
                </a>
              </li>

            </ul>
          </div>


          {/* Contact */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm">

              {/* Address */}
              <div className="flex items-start gap-3">

                <MapPin
                  size={19}
                  className="text-blue-500 mt-1 shrink-0"
                />

                <p className="leading-6">
                  147 Jajunagr Baheri (BLY),
                  <br />
                  UTTAR PRADESH, India
                </p>

              </div>


              {/* Phone */}
              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-blue-500 shrink-0"
                />

                <a
                  href="tel:+918476950316"
                  className="hover:text-blue-500 transition"
                >
                  +91 8476950316
                </a>

              </div>


              {/* Email */}
              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-blue-500 shrink-0"
                />

                <a
                  href="mailto:support@ekart.com"
                  className="hover:text-blue-500 transition"
                >
                  gauravmehra316@ekart.com
                </a>

              </div>

            </div>
          </div>

        </div>


        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* Newsletter Text */}
            <div>

              <h3 className="text-white font-semibold text-lg">
                Subscribe to our @gaurav_mehra_316
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Get updates about new products and special offers.
              </p>

            </div>


            {/* Newsletter Input */}
            <div className="flex w-full md:w-auto">

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  md:w-72
                  px-4
                  py-3
                  bg-gray-900
                  border
                  border-gray-700
                  rounded-l-lg
                  outline-none
                  focus:border-blue-500
                  text-white
                  text-sm
                "
              />

              <button
                className="
                  px-5
                  py-3
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-medium
                  rounded-r-lg
                  transition
                  duration-300
                "
              >
                Subscribe
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            lg:px-10
            py-5
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
            text-sm
            text-gray-500
          "
        >

          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} E-Kart. All rights reserved.
          </p>

          <p className="text-center sm:text-right">
            Made with ❤️ using React & Tailwind CSS
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;