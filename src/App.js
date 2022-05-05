import React, { useRef, useState } from "react"
import Counter from "./components/Counter"
import PostForm from "./components/PostForm"
import PostItem from "./components/PostItem"
import PostList from "./components/PostList"
import MyButton from "./components/UI/button/MyButton"
import MyInput from "./components/UI/input/MyInput"
import MySelect from "./components/UI/select/MySelect"
import "./styles/App.css"

function App() {
    //Массив постов
    const [posts, setPosts] = useState([
        { id: 1, title: "3 Третий name", body: "2 Второй desc " },
        { id: 2, title: "1 Первый name", body: "3 Третий desc" },
        { id: 3, title: "2 Второй name", body: "4 Четвертый desc" },
        { id: 4, title: "4 Четвертый name", body: "1 Первый desc" },
    ])
    //Двустороннее связывание сортировки
    const [selectedSort, setSelectedSort] = useState("")
    //Двустороннее связывание поиска
    const [searchQuery, setSearchQuery] = useState("")

    //сортировка массива
    function getSortedPosts() {
        if (selectedSort) {
            return [...posts].sort((a, b) =>
                a[selectedSort].localeCompare(b[selectedSort])
            )
        }
        return posts
    }
    const sortedPosts = getSortedPosts()
    const sortPosts = (sort) => {
        setSelectedSort(sort)
    }

    //Создание поста
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    //получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id))
    }

    return (
        <div className='App'>
            <PostForm create={createPost} />

            <hr />

            {/* Поиск */}
            <MyInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search...'
            />

            <hr />

            {/* Сортировка */}
            <div>
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue='Sort for'
                    options={[
                        { value: "title", name: "For name" },
                        { value: "body", name: "For Description" },
                    ]}
                />
            </div>

            {/* Проверка существования постов */}
            {posts.length != 0 ? (
                <PostList
                    remove={removePost}
                    posts={sortedPosts}
                    title='Title List'
                />
            ) : (
                <h1>No posts</h1>
            )}
        </div>
    )
}

export default App
