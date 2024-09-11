import React from 'react';

export const Icon = ({ name, color = 'currentColor', size = 24 }) => {
    return (
      <>
        <svg width={size} height={size} fill={color}>
          <use href={`/icons/sprite.svg#${name}`} />
        </svg>
      </>
    )
  }
