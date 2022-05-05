import React from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import PostItem from "./PostItem"

const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return (
      <h1>
        No Posts
      </h1>
    )
  }
  return (
    <div>
      <h1>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) =>
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem remove={remove} number={index + 1} post={post} key={post.id} />

          </CSSTransition>
        )}
      </TransitionGroup>

    </div>
  )
}

export default PostList
