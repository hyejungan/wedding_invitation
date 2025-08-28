import React from "react";
import { motion } from "framer-motion";

export default function Reveal({
  as: Tag = "div",
  children,
  className,
  y = 24,
  delay = 0,
  duration = 0.6,
  amount = 0.6,
  once = true,
}) {
  return (
    <Tag className={className}>
      <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration, ease: "easeOut", delay }}
        viewport={{ once, amount }}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
