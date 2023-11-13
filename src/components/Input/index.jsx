import React from 'react';
import styles from "./styles.module.css";

export default function Input({ tipo, value, onChange, placeholder, className, ...props }) {
  return (
    <div className={`${styles.input} ${className}`}>
      <input type={tipo} value={value} onChange={onChange} placeholder={placeholder} {...props} />
    </div>
  );
}
