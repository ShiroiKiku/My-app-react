import React, { useState } from "react"
import Counter from "./components/Counter"
import PostItem from "./components/PostItem"
import PostList from "./components/PostList"
import MyButton from "./components/UI/button/MyButton"
import MyInput from "./components/UI/input/MyInput"
import "./styles/App.css"

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description" },
    { id: 2, title: "JavaScript 2", body: "Description" },
    { id: 3, title: "JavaScript 3", body: "Description" },
    { id: 4, title: "JavaScript 4", body: "Description" },
  ])
  const [title, setTitle] = useState("")
  const addNewPost = () => {}

  return (
    <div className="App">
      <form>
        <MyInput value={title} type="text" placeholder="Post name" />
        <MyInput type="text" placeholder="Post description" />
        <MyButton onClick={addNewPost}>Post create</MyButton>
      </form>
      <PostList posts={posts} title="Title List" />
    </div>
  )
}

export default App
