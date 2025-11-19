import React from 'react';

type ConfettiPiece = { id: number; left: number; color: string };

const Confetti: React.FC<{ pieces: ConfettiPiece[] }> = ({ pieces }) => {
  if (!pieces || pieces.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="w-3 h-4 rounded-sm confetti-piece"
          style={{ left: `${p.left}%`, background: p.color, position: 'absolute', top: '-10vh' }}
        />
      ))}
    </div>
  );
};

export default Confetti;
