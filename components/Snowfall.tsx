
import React, { useMemo } from 'react';

const Snowfall: React.FC = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.4,
      size: Math.random() * 4 + 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            top: '-10px',
            animation: `snow-fall-${s.id} ${s.duration}s linear infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      <style>{`
        ${snowflakes.map(s => `
          @keyframes snow-fall-${s.id} {
            0% { transform: translateY(-10px) translateX(0); }
            100% { transform: translateY(110vh) translateX(${Math.random() * 100 - 50}px); }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default Snowfall;
