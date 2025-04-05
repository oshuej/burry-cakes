import React from 'react';
import sprite from '../assets/images/sprite.svg';

export const Icon = ({ name, color = 'currentColor', size = 24 }) => {
    return (
        <svg width={size} height={size} fill="none" stroke={color}>
          <use href={`${sprite}#${name}`} />
        </svg>
    )
  }
