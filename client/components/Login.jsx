import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <div className="main-display">
      </div>
      <Link to={'/home'}>
        <button type="button">Login</button>
      </Link>
    </>
  );
}