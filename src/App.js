import axios from "axios"
import React, { useMemo, useRef, useState, useEffect } from "react"
import Counter from "./components/Counter"
import PostForm from "./components/PostForm"
import PostItem from "./components/PostItem"
import PostList from "./components/PostList"
import MyButton from "./components/UI/button/MyButton"
import MyInput from "./components/UI/input/MyInput"
import MyModal from "./components/UI/MyModal/MyModal"
import PostFilter from "./components/UI/PostFilter"
import MySelect from "./components/UI/select/MySelect"
import { usePosts } from "./hooks/usePosts"
import "./styles/App.css"

function App() {
    //Массив постов
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({ sort: "", query: "" })

    const [modal, setModal] = useState(false)
    //Хук с сортировкой и поском
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    //Слежка
    //  Выполнениен при создании
    // return Выполнение при удалении
    // [ ] выполнение при изменении
    useEffect(() => {
        fetchPosts()
    }, [])

    //Создание поста
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    async function fetchPosts() {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
        )
        setPosts(response.data)
    }

    //получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id))
    }

    return (
        <div className='App'>
            {/* Создание поста в модальном окне */}
            <MyButton style={{ marginTop: 20 }} onClick={() => setModal(true)}>
                Create a user
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <hr />
            {/* Фильтрация и поиск  */}
            <PostFilter filter={filter} setFilter={setFilter} />

            {/* Проверка существования постов */}

            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title='Title List'
            />
        </div>
    )
}

export default App
