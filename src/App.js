import React, { useState, useEffect } from "react";
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { API, Storage, Auth } from 'aws-amplify';
import { listPosts } from './graphql/queries';
import { css } from '@emotion/css';

import Posts from './Posts';
import Post from './Post';
import Header from './Header';
import CreatePost from './CreatePost';
import Button from './Button';

function Router() {
  /* create a couple of pieces of initial state */
  const [showOverlay, updateOverlayVisibility] = useState(false);
  const [posts, updatePosts] = useState([]);
  const [myPosts, updateMyPosts] = useState([]);

  /* fetch posts when component loads */
  useEffect(() => {
      fetchPosts();
  }, []);
  async function fetchPosts() {
    /* query the API, ask for 100 items */
    let postData = await API.graphql({ query: listPosts, variables: { limit: 100 }});
    let postsArray = postData.data.listPosts.items;
    /* map over the image keys in the posts array, get signed image URLs for each image */
    postsArray = await Promise.all(postsArray.map(async post => {
     
      return post;
    }));
    /* update the posts array in the local state */
    setPostState(postsArray);
  }
  async function setPostState(postsArray) {
    const user = await Auth.currentAuthenticatedUser();
    const myPostData = postsArray.filter(p => p.owner === user.username);
    updateMyPosts(myPostData);
    updatePosts(postsArray);
  }
  return (
    <>
      <HashRouter>
          <div className={contentStyle}>
            <Header />
            <hr className={dividerStyle} />
            <Button title="Add Review" onClick={() => updateOverlayVisibility(true)} />
            <Switch>
              <Route exact path="/" >
                <Posts posts={posts} />
              </Route>
              <Route path="/post/\:id" >
                <Post />
              </Route>
              <Route exact path="/myposts" >
                <Posts posts={myPosts} />
              </Route>
              <Route exact path="/deletePost" >
               <p><b>For deletion of Posts</b>,<br/> Contact: <a href="mailto:thecloudtuner@gmail.com">thecloudtuner@gmail.com</a></p>
              </Route>
              
            </Switch>
            
          </div>
 
        </HashRouter>
        { showOverlay && (
          <CreatePost
            updateOverlayVisibility={updateOverlayVisibility}
            updatePosts={setPostState}
            posts={posts}
          />
        )}
  
    </>
  );
}

const dividerStyle = css`
  margin-top: 15px;
`

const contentStyle = css`
  min-height: calc(100vh - 45px);
  padding: 0px 40px;
`

export default withAuthenticator(Router);
