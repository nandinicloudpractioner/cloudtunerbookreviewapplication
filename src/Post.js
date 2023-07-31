import React, { useState, useEffect } from 'react'
import { css } from '@emotion/css';
import { useParams } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';
import { getPost } from './graphql/queries';

export default function Post() {
  const [loading, updateLoading] = useState(true);
  const [post, updatePost] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetchPost();
  }, []);
  async function fetchPost() {
    try {
      const postData = await API.graphql({
        query: getPost, variables: { id }
      });
      const currentPost = postData.data.getPost;
   

     
      updatePost(currentPost);
      updateLoading(false);
    } catch (err) {
      console.log('error: ', err);
    }
  }
  if (loading) return <h3>Loading...</h3>;
  console.log('post: ', post);
  return (
    <div className={postContainer}>
      <div className={ownerContainer}>
      
        <h4>Review by : {post.owner}</h4>
        <h4>{post.location}</h4>
        
      </div>
        <h3 className={postTitleStyle}> Book Title: {post.name}</h3>
        <p><span>Author: </span>{post.location}</p>
        <p><span>Review: </span> {post.description}</p>
        
        
    
    </div> );
}

const titleStyle = css`
  margin-bottom: 7px;
`;

const locationStyle = css`
  color: #0070f3;
  margin: 0;
`;


const ownerContainer = css`
  border-bottom: 1px solid #27285C;
  h2 { 
    display: inline-block;
    margin-left: 20px;
    color: #152939;
  }
  h4 {
    font-style: italic;
    margin-top: 0px;
  }
`;


const postTitleStyle = css`
  margin: 15px 0px;
  color: #152939;
`;

const postContainer = css`
  margin-top: 20px;
  border-radius: 4px;
  padding: 1px 20px 20px 20px;
  border: 1px solid #27285C;
  margin-bottom: 20px;
  :hover {
    border-color: #918936;
  }
`;
