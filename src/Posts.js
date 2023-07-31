import React from 'react';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';


export default function Posts({
  posts = []
}) {
  return (
    <>
      <h1 className={sectionTitleStyle}>Book Reviews</h1>
      {
        posts.map(post => (
      
            <div key={post.id} className={postContainer}>
              <div className={ownerContainer}>
                <h3 className={postTitleStyle}><span className={StitleStyle}>Review By: </span> {post.owner}</h3>
                 
              </div>
              <h4 className={postTitleStyle}><span className={StitleStyle}>Book Name: </span> {post.name}</h4>
              <h4 className={postTitleStyle}><span className={StitleStyle}>Author: </span> {post.location}</h4>
             <h4 className={ReviewStyle}><span className={StitleStyle}>Review: </span> " {post.description} "</h4>
          
              <Link to="/deletePost" className={deletelinkStyle}><u>Delete</u></Link>
                
                
              
            </div>
         
        ))
      }
    </>
  );
}

const postTitleStyle = css`
  margin: 15px 0px;
  color: #696969;
  font-family: font-family: 'Times New Roman', serif;
`;
const StitleStyle = css`
  color: #2D68C4;
  font-family: "Trebuchet MS"
`;
const ReviewStyle = css`
  color: #B22222;
  font-family: 'Comic Sans MS';
`;
const deletelinkStyle = css`
  text-decoration: none;
  right: 110px;
  color:coral;
  font-weight: bold;
  text-decoration: none;
  margin-right: 20px;
  text-shadow: rgba(0, 0, 0, 0.01) 0 0 1px;
  \:hover {
    color: #058aff;
  }
`;

const postContainer = css`
  border-radius: 4px;
  padding: 1px 20px 20px 20px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.15);
  \:hover {
    border-color: #152939;
  }
`;

const ownerContainer = css`
  border-bottom: 1px solid #dedede;
  h2 { 
    display: inline-block;
    margin-left: 20px;
    color: #152939;
  }
`;

const avatarPlaceholder = css`
  width: 20px;
  height: 30px;
  padding-top: 10px;
  display: inline-block;
  img {
    margin-top: 5px;
    width: 100%;
    border: 1px solid #dedede;
    border-radius: 20px;
  }
`;



const sectionTitleStyle = css `
  font-family:'Amazon Ember', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  color: #0093AF;
  
`;
