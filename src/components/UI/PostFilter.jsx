import React from 'react';
import MyInput from './input/MyInput';
import MySelect from './select/MySelect';

const PostFilter = ({ filter, setFilter }) => {
    return (
        <div>
            {/* Поиск */}
            <MyInput
                value={filter.query}
                onChange={e => setFilter({ ...filter, query: e.target.value })}
                placeholder='Search...'
            />

            <hr />

            {/* Сортировка */}

            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
                defaultValue='Sort for'
                options={[
                    { value: "title", name: "For name" },
                    { value: "body", name: "For Description" },
                ]}
            />
        </div>
    );
};

export default PostFilter;