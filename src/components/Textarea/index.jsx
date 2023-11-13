import React from 'react';
import styles from "./styles.module.css";

export default function Textarea({ tipo, value, onChange, placeholder, className, ...props }) {
  return (
    <div className={`${styles.textarea} ${className}`}>
      <textarea type={tipo} value={value} onChange={onChange} placeholder={placeholder} {...props} />
    </div>
  );
}
