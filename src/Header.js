import React from 'react';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react';

export default function Header() {
  return (
    <div className={headerContainer}>
      <h2 className={headerStyle}>Wall of Book Reviews</h2>
      <Link to="/" className={linkStyle}><u>All Reviews</u></Link>
      <Link to="/myposts" className={linkStyle}><u>My Reviews</u></Link>
      <Link className={signoutStyle}><AmplifySignOut /></Link>
    </div>
  )
}

const headerContainer = css`
  padding: 20px;
  color:#00308F;

`

const headerStyle = css`
  font-size: 40px;
  margin-top: 0px;
  font-family:'Amazon Ember', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
`

const linkStyle = css`
  color: black;
  font-weight: bold;
  text-decoration: none;
  margin-right: 20px;
  text-shadow: rgba(0, 0, 0, 0.01) 0 0 1px;
  \:hover {
    color: #058aff;
  }
`

const signoutStyle = css `
  display: inline-block;
  margin-left: 10vw;
  width: 100px;
  max-with: 20vw;
  background-color: #CCCCFF;
`
