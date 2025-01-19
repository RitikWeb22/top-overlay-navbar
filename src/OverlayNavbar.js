import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom"; // Assuming you are using React Router

const OverlayNavbar = ({
  brandName = "BrandName",
  menuItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Services", to: "/services" },
    { name: "Contact", to: "/contact" },
  ],
  cartCount = 1,
  CartButton = ({ cartCount }) => (
    <div className="relative text-2xl cursor-pointer hover:text-gray-700">
      <FaShoppingCart />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
          {cartCount}
        </span>
      )}
    </div>
  ),
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  // Variants for horizontal slide animations
  const sliceVariants = {
    hidden: { x: "-100%" },
    visible: (i) => ({
      x: 0,
      transition: { duration: 0.6, delay: i * 0.1 },
    }),
    exit: { x: "-100%", transition: { duration: 0.5 } },
  };

  // Variants for content animation
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleNavbar}
        className="text-xl p-2 text-white bg-gray-800 hover:text-gray-400 focus:outline-none rounded-full fixed top-4 left-4 z-50"
      >
        {isOpen ? <FaTimes /> : <FaBarsStaggered />}
      </button>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Horizontal Slides */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={sliceVariants}
                className="absolute w-full h-1/4 bg-[#000]"
                style={{ top: `${i * 25}%` }}
              />
            ))}

            {/* Navbar Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
              className="absolute inset-0 flex flex-col sm:flex-row items-center justify-around px-10 text-white text-lg"
            >
              {/* Brand Name with Link */}
              <motion.div
                variants={contentVariants}
                className="text-2xl font-bold cursor-pointer hover:text-gray-700"
              >
                <Link to="/" className="text-white">{brandName}</Link>
              </motion.div>

              {/* Menu Items with Links */}
              <motion.ul
                className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-8 sm:space-y-0 space-y-4 sm:ml-0 ml-4"
                variants={contentVariants}
              >
                {menuItems.map((item, index) => (
                  <motion.li key={index} whileHover={{ scale: 1.1 }} className="cursor-pointer hover:text-gray-700">
                    <Link to={item.to} className="text-white">{item.name}</Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Custom Cart Button */}
              <motion.div
                variants={contentVariants}
                className="relative cursor-pointer"
              >
                <CartButton cartCount={cartCount} />
              
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OverlayNavbar;
