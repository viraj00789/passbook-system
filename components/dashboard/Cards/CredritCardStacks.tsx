"use client";

import { CARDS, CreditCard } from "@/Data/creditCardData";
import { motion } from "framer-motion";
import { useState } from "react";

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

const CardStack = () => {
  const [cards, setCards] = useState<CreditCard[]>(CARDS);

  const moveToEnd = (fromIndex: number) => {
    setCards((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.push(moved);
      return updated;
    });
  };

  return (
    <div className="w-[35%] flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-3xl bg-gray-50 dark:bg-gray-800">
      <ul className="relative h-50 w-100">
        {cards.map((card, index) => {
          const canDrag = index === 0;

          return (
            <motion.li
              key={card.id}
              className="absolute h-65 w-100 list-none rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl"
              style={{
                backgroundColor: card.bgColor,
                cursor: canDrag ? "grab" : "auto",
                transformOrigin: "top center",
              }}
              animate={{
                y: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: cards.length - index,
              }}
              drag={canDrag ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              whileDrag={{
                scale: 1.0,
              }}
              onDragEnd={() => moveToEnd(index)}
            >
              {/* Glass overlay */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-white/20 pointer-events-none"
                initial={{ opacity: 0 }}
                whileDrag={{ opacity: 1 }} // show overlay while dragging
              />

              {/* Card content */}
              <div className="relative flex h-full flex-col justify-between p-6 text-white">
                <span className="text-sm uppercase tracking-wider opacity-80">
                  {card.brand}
                </span>

                <span className="text-lg tracking-widest">{card.number}</span>

                <div className="flex justify-between text-sm opacity-80">
                  <span>{card.holder}</span>
                  <span>{card.expiry}</span>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default CardStack;
