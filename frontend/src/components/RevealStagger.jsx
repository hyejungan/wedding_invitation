import React from "react";
import { motion } from "framer-motion";

const container = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const item = (y = 18, duration = 0.55) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration, ease: "easeOut" } },
});

export default function RevealStagger({
  children,
  stagger = 0.08,
  delay = 0,
  y = 18,
  amount = 0.3,
  once = true,
}) {
  const kids = React.Children.toArray(children);
  return (
    <motion.div
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {kids.map((c, i) => (
        <motion.div key={i} variants={item(y)}>
          {c}
        </motion.div>
      ))}
    </motion.div>
  );
}
