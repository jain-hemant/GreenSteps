import { useEffect, useState } from 'react';
import {
  FaHome,
  FaRegListAlt,
  FaChartLine,
  FaMedal,
  FaGift,
  FaUsers,
  FaBars,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToggleState } from '../store/slices/applicationSlice';

const menus = [
  { title: 'Dashboard', path: '/', icon: <FaHome /> },
  { title: 'Log Action', path: '/activity-logs', icon: <FaRegListAlt /> },
  { title: 'History', path: '/history', icon: <FaChartLine /> },
  { title: 'Badges', path: '/badges', icon: <FaMedal /> },
  { title: 'Rewards', path: '/rewards', icon: <FaGift /> },
  { title: 'Community', path: '/community', icon: <FaUsers /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatchToRedux = useDispatch();

  useEffect(() => {
    dispatchToRedux(setToggleState(open));
  }, [open]);

  return (
    <div
      className={`fixed h-screen z-10 p-4 pt-8 duration-500 shadow-lg transition-all ${
        open
          ? 'w-64 bg-gradient-to-br from-[#A7C957] to-[#6A994E]'
          : 'w-20 bg-[#386641]'
      }`}
    >
      <FaBars
        className="absolute right-4 top-4 h-6 w-6 cursor-pointer text-white hover:scale-110 transition-transform"
        onClick={() => setOpen(!open)}
      />
      <ul className="mt-10 space-y-4">
        {menus.map((m) => (
          <motion.li
            key={m.title}
            onClick={() => navigate(m.path)}
            className="flex items-center space-x-3 p-2 rounded-xl cursor-pointer text-white hover:bg-[#FFBF69] transition-all shadow-md"
            whileHover={{ scale: 1.1, rotate: 3 }}
          >
            <motion.div
              initial={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              className="h-6 w-6"
            >
              {m.icon}
            </motion.div>
            {open && <span className="font-semibold">{m.title}</span>}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
