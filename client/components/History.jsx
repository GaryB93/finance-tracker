import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function History() {
  fetch('/api/history')
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });

  return (
    <div>
      <h1>Finance History</h1>
      <Link to={'/home'}>
        <button type="button">Home</button>
      </Link>
    </div>
  )
}
