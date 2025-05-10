import { motion } from 'framer-motion';
import {
  FaLeaf,
  FaSeedling,
  FaRecycle,
  FaBus,
  FaFireAlt,
  FaTrophy,
  FaMedal,
  FaAward,
  FaStar,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Api from '../request';
import { selectToggleState } from '../store/slices/applicationSlice';
import { selectMe } from '../store/slices/userSlice';

const iconPool = [
  FaLeaf,
  FaSeedling,
  FaRecycle,
  FaBus,
  FaFireAlt,
  FaTrophy,
  FaMedal,
  FaAward,
  FaStar,
];

export default function BadgeCabinet() {
  const isToogleEnabled = useSelector(selectToggleState);
  const [allBadges, setAllBadges] = useState([]);
  const [usersBadges, setUsersBadges] = useState([]);
  const currentUser = useSelector(selectMe);

  async function fetchBadges() {
    const [gRes, cRes] = await Promise.all([
      Api.fetch('/api/badge/all'),
      Api.fetch(`/api/badge/user/${currentUser?._id}`),
    ]);
    setAllBadges(gRes);
    setUsersBadges(cRes);
  }

  useEffect(() => {
    if (currentUser?._id) fetchBadges();
  }, [currentUser]);

  const isEarned = (badgeId) => usersBadges.some((b) => b._id === badgeId);

  return (
    <div
      className={`${isToogleEnabled ? 'ml-63  w-[80vw]' : 'ml-20  w-[80vw]'} overflow-x-hidden transition-all duration-500 p-6 min-h-screen`}
    >
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center sm:text-left">
        Badge Cabinet
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {allBadges.map((badge, index) => {
          const earned = isEarned(badge._id);
          const Icon = iconPool[index % iconPool.length];

          return (
            <motion.div
              key={badge._id}
              className={`relative p-4 rounded-2xl shadow-md flex flex-col items-center justify-center transition-all duration-300 cursor-pointer 
                ${earned ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-white' : 'bg-gray-100 text-green-800 opacity-80 hover:opacity-100'}
              `}
              whileHover={earned ? { scale: 1.1, rotate: 1 } : { scale: 1.03 }}
            >
              {earned && (
                <motion.div
                  className="absolute inset-0 rounded-2xl z-0 bg-yellow-100 mix-blend-screen animate-pulse pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
              <Icon className="text-4xl mb-2 z-10" />
              <span className="font-semibold text-center text-sm z-10">
                {badge.name}
              </span>
              <p className="text-xs text-center mt-1 z-10">
                {badge.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
