import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <div className="itemDisplay">
      </div>
      <Link to={'/home'}>
        <button type="button">Login</button>
      </Link>
    </>
  );
}