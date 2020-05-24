import React from 'react'
import {NavLink} from 'react-router-dom'
import { Divider, Header, Item } from 'semantic-ui-react'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {api} from "../api"
import { useFetch } from '../helpers';

const PostList = () => {
    const {data, loading, error} = useFetch(api.posts.list)
    return (
        <div>
        <Header>Post list</Header>
        <Divider/>
        {error && <Message negative message={error} />}
        {loading && <Loader />}
        <Item.Group>
            {data?.map(post => {
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
