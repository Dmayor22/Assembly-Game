import React from "react";
import { clsx } from "clsx";

const Language = ({ langChip, index, wrongGuessCount}) => {
  const isLangLost = index < wrongGuessCount;
  const className = clsx("lang_btn", isLangLost && "lost");
  return (
    <span
      className={className}
      style={{
        backgroundColor: langChip.backgroundColor,
        color: langChip.color,
      }}
    >
      {langChip.name}
    </span>
  );
};

export default Language;
