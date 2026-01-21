import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealSpeed?: number;
  scrambleChars?: string;
}

const ScrambleText = ({
  text,
  className = "",
  scrambleSpeed = 50,
  revealSpeed = 100,
  scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || isDone) return;

    let intervalId: ReturnType<typeof setInterval>;
    let iteration = 0;
    const maxIterations = text.length;

    const animate = () => {
      intervalId = setInterval(() => {
        setDisplayText(() => {
          const nextText = text
            .split("")
            .map((char, index) => {
              if (index < iteration) return char;
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join("");

          return nextText;
        });

        if (iteration >= maxIterations) {
          clearInterval(intervalId);
          setIsDone(true);
        }

        iteration += 1 / (revealSpeed / scrambleSpeed); 
      }, scrambleSpeed);
    };

    animate();

    return () => clearInterval(intervalId);
  }, [isInView, text, scrambleSpeed, revealSpeed, scrambleChars, isDone]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
};

export default ScrambleText;
