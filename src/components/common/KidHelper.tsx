import React from 'react';

type KidHelperProps = {
  name?: string;
  message: string;
};

const KidHelper: React.FC<KidHelperProps> = ({ name = 'Amigo', message }) => {
  return (
    <div
      role="group"
      aria-label={`Ayudante ${name}`}
      className="flex items-center gap-3 p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl shadow-sm"
    >
      <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-white text-2xl select-none">
        😊
      </div>
      <div className="text-sm">
        <div className="font-bold text-amber-700">{name}</div>
        <div className="text-amber-800">{message}</div>
      </div>
    </div>
  );
};

export default KidHelper;
