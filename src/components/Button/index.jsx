import React from 'react';
import styles from "./styles.module.css";

export default function Button({ onClick, children, className, ...props }) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
