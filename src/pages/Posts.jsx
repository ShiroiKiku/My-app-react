import { usePosts } from "../hooks/usePosts";
import PostFilter from "../components/PostFilter";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import React, { useEffect, useRef, useState } from "react";
import { getPageCount } from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import Loader from "../components/UI/Loader/Loader";
import PostForm from "../components/PostForm";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    //Массив постов
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState(false);
    const lastElement = useRef();

    //Хук с сортировкой и поском
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    //состояние загрузки hook
    const [fetchPosts, isPostsLoading, postError] = useFetching(
        async (limit, page) => {
            const response = await PostService.getAll(limit, page);
            setPosts([...posts, ...response.data]);
            const totalCount = response.headers["x-total-count"];
            setTotalPages(getPageCount(totalCount, limit));
        }
    );

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    //Слежка
    //  Выполнениен при создании
    // return Выполнение при удалении
    // [ ] выполнение при изменении
    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit]);

    //Создание поста
    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    //получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page);
    };
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
            <MySelect
                value={limit}
                onChange={(value) => setLimit(value)}
                defaultValue='number of posts'
                options={[
                    { value: 1, name: "1" },
                    { value: 5, name: "5" },
                    { value: 10, name: "10" },
                    { value: -1, name: "all" },
                ]}
            />
            {/* Вывод ошибки */}
            {/* РАЗОБРАТЬСЯ */}
            {postError && <h1>Ошибка ${postError}</h1>}

            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title='Title List'
            />
            <div
                ref={lastElement}
                style={{ height: 20, background: "red" }}></div>
            {/* Проверка существования постов */}
            {isPostsLoading && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 50,
                    }}>
                    <Loader />
                </div>
            )}

            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
