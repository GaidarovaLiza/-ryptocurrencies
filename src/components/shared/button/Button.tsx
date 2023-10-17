import React from "react";

type ButtonTypeProps = {
  name: string
  styles: string
  callback?: () => void
}

export const Button: React.FC<ButtonTypeProps> = ({ name, styles, callback }) => {
  const handleClick = () => {
    if (callback) {
      callback();
    }
  };

  return (
    <button className={styles} onClick={handleClick}>
      {name}
    </button>
  );
};
