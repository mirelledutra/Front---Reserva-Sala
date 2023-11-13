import React from 'react';
import styles from "../Select/styles.module.css"

export default function Select({ name, value, onChange, options, placeholder, className, ...props }) {
  return (
    <div className={`${styles.select} ${className}`}>
      <select name={name} value={value} onChange={onChange} {...props}>
        {placeholder && <option value="" disabled hidden>{placeholder}</option>}
        <option value="">Selecione uma sala</option>
        {options.map((sala) => ( 
          <option key={sala.id} value={sala.id}>
            {sala.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
