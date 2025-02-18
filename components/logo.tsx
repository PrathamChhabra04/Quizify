import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Image
        src="/logo.png"
        alt="Quizify Logo"
        width={200}
        height={80}
        className="h-12 py-1 w-auto object-contain"
      />
    </div>
  );
};

export default Logo;
