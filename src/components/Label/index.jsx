import React from 'react';
import styles from "./styles.module.css";

export default function Label({ htmlFor, className, ...props }) {
  return (
    <div className={`${styles.label} ${className}`}>
      <label type={className} {...props} />
    </div>
  );
}
