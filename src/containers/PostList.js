import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import { Divider, Header, Item } from 'semantic-ui-react'
import axios from 'axios'
import Loader from '../components/Loader';
import Message from '../components/Message'

const PostList = () => {
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/posts/');
                setPosts(res.data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    return (
        <div>
        <Header>Post list</Header>
        <Divider/>
        {error && <Message negative message={error} />}
        {loading && <Loader />}
        <Item.Group>
            {posts?.map(post => {
                return (
                    <Item key={post.id}>
                        <Item.Image size='small' src={post.thumbnail} />
                        <Item.Content>
                            <NavLink to={`/posts/${post.slug}`}>
                                <Item.Header as='h3'>{post.title}</Item.Header>
                            </NavLink>
                            <Item.Description>{post.content}</Item.Description>
                        </Item.Content>
                    </Item>
                )
            })}
        </Item.Group>
        </div>
    )
}

export default PostList;
