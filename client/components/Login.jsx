import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <h1>Finance Tracker</h1>
      <Link to={'/home'}>
        <button type="button">Login</button>
      </Link>
    </div>
  );
}