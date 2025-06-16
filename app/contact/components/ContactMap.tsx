import { motion } from 'framer-motion';

export default function ContactMap() {
  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Find Us
      </h2>
      <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
        <p className="text-gray-600 text-lg text-center">
          Interactive Map will be integrated here
          <br />
          <span className="text-sm">(Google Maps or similar service)</span>
        </p>
      </div>
    </motion.div>
  );
}
