import React from 'react';

export default function Info(props) {
  return (
    <div className="finance-display">
      <span>{props.name}</span><span>${props.value}</span>
    </div>
  );
}