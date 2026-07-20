import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

export function TechBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 50;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient
            id="lineGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="rgba(139, 92, 246, 0.3)"
            />
            <stop
              offset="50%"
              stopColor="rgba(168, 85, 247, 0.5)"
            />
            <stop
              offset="100%"
              stopColor="rgba(139, 92, 246, 0.3)"
            />
          </linearGradient>
        </defs>

        {particles.map((particle, index) => {
          const nextParticle =
            particles[(index + 1) % particles.length];
          const distance = Math.sqrt(
            Math.pow(particle.x - nextParticle.x, 2) +
              Math.pow(particle.y - nextParticle.y, 2),
          );

          if (distance < 20) {
            return (
              <motion.line
                key={`line-${particle.id}`}
                x1={`${particle.x}%`}
                y1={`${particle.y}%`}
                x2={`${nextParticle.x}%`}
                y2={`${nextParticle.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              />
            );
          }
          return null;
        })}
      </svg>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, particle.speedX * 100, 0],
            y: [0, particle.speedY * 100, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Pulsing Rings */}
      <div className="absolute top-1/4 left-1/4">
        <motion.div
          className="w-96 h-96 rounded-full border border-violet-500/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="absolute bottom-1/4 right-1/4">
        <motion.div
          className="w-96 h-96 rounded-full border border-purple-500/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Floating Code Symbols */}
      <div className="absolute inset-0">
        {["<", ">", "{", "}", "(", ")", "[", "]"].map(
          (symbol, index) => (
            <motion.div
              key={symbol + index}
              className="absolute text-violet-500/10 font-mono text-4xl"
              style={{
                left: `${(index * 12) % 100}%`,
                top: `${(index * 15) % 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.5,
              }}
            >
              {symbol}
            </motion.div>
          ),
        )}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-0 -left-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-0 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Binary Rain Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-violet-500/10 font-mono text-xs whitespace-nowrap"
            style={{
              left: `${(i * 5) % 100}%`,
              top: "-10%",
            }}
            animate={{
              y: ["0vh", "110vh"],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            {Array.from({ length: 20 }, () =>
              Math.random() > 0.5 ? "1" : "0",
            ).join("")}
          </motion.div>
        ))}
      </div>
    </div>
  );
}