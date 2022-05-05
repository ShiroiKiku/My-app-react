import axios from "axios"
import React, { useMemo, useRef, useState, useEffect } from "react"
import Counter from "./components/Counter"
import PostForm from "./components/PostForm"
import PostItem from "./components/PostItem"
import PostList from "./components/PostList"
import MyButton from "./UI/button/MyButton"
import MyInput from "./UI/input/MyInput"
import MyModal from "./UI/MyModal/MyModal"
import PostFilter from "./components/PostFilter"
import Loader from "./UI/Loader/Loader"
import MySelect from "./UI/select/MySelect"
import { usePosts } from "./hooks/usePosts"
import "./styles/App.css"
import PostService from "./API/PostService"
import { useFetching } from "./hooks/useFetching"

function App() {
    //Массив постов
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({ sort: "", query: "" })

    const [totalCount, setTotalCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const [modal, setModal] = useState(false)
    //Хук с сортировкой и поском
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    //состояние загрузки hook
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        console.log(response.headers["x-total-count"])
        setTotalCount(response.headers["x-total-count"])
    })

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
            {/* Вывод ошибки */}
            {/* РАЗОБРАТЬСЯ */}
            {postError && <h1>Ошибка ${postError}</h1>}

            {/* Проверка существования постов */}
            {isPostsLoading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 50,
                    }}>
                    <Loader />
                </div>
            ) : (
                <PostList
                    remove={removePost}
                    posts={sortedAndSearchedPosts}
                    title='Title List'
                />
            )}
        </div>
    )
}

export default App
