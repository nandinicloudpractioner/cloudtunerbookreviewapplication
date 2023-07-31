import React, { useState } from 'react';
import { css } from '@emotion/css';
import Button from './Button';
import { v4 as uuid } from 'uuid';
import Amplify, { Storage, API, Auth, Predictions } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import { createPost } from './graphql/mutations';

Amplify.addPluggable(new AmazonAIPredictionsProvider());

/* Initial state to hold form input, saving state */
const initialState = {
  name: '',
  description: '',
 
  file: '',
  location: '',
  saving: false
};

export default function CreatePost({
  updateOverlayVisibility, updatePosts, posts
}) {
  /* 1. Create local state with useState hook */
  const [formState, updateFormState] = useState(initialState)

  /* 2. onChangeText handler updates the form state when a user types int a form field */
  function onChangeText(e) {
    e.persist();
    updateFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }));
  }

  /* 3. onChangeFile hanlder will be fired when a user uploads a file  */
 

  /* 4. Save the post  */
  async function save() {
    try {
      const { name, description, location} = formState;
      if (!name || !description || !location ) return;
      updateFormState(currentState => ({ ...currentState, saving: true }));

     
      const postId = uuid();
      const postDescription = description ;
      const postInfo = { name, description: postDescription, location,  id: postId };
      console.log("post info is");
      console.log(postInfo)
      await API.graphql({
        query: createPost,
        variables: { input: postInfo },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      const { username } = await Auth.currentAuthenticatedUser()
      updatePosts([...posts, { ...postInfo, image: formState.file, owner: username }]);
      updateFormState(currentState => ({ ...currentState, saving: false }));
      updateOverlayVisibility(false);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  return (
    <div className={containerStyle}>
      <input
        placeholder="Book Name"
        name="name"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Author"
        name="location"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Review"
        name="description"
        className={inputStyle}
        onChange={onChangeText}
      />
     
      <Button title="Create Review " onClick={save} />
      <Button type="cancel" title="Cancel" onClick={() => updateOverlayVisibility(false)} />
      { formState.saving && <p className={savingMessageStyle}>Saving post...</p> }
    </div>
  );
}

const inputStyle = css`
  margin-bottom: 10px;
  outline: none;
  padding: 7px;
  border: 1px solid #ddd;
  font-size: 16px;
  border-radius: 4px;
`

const imageStyle = css`
  height: 120px;
  margin: 10px 0px;
  object-fit: contain;
`

const containerStyle = css`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 420px;
  position: fixed;
  left: 0;
  border-radius: 4px;
  top: 0;
  margin-left: calc(50vw - 220px);
  margin-top: calc(50vh - 230px);
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0.25rem;
  padding: 20px;
`;

const savingMessageStyle = css`
  margin-bottom: 0px;
`
