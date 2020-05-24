import React from 'react'
import {Container, Header, Image} from 'semantic-ui-react'
import Loader from '../components/Loader';
import Message from '../components/Message'
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { useFetch } from '../helpers';

const PostDetail = () => {
    const { postSlug } = useParams()
    const {data, loading, error} = useFetch(api.posts.retrieve(postSlug))
    return (
        <Container text>
            {error && <Message negative message={error} />}
            {loading && <Loader />}
            {data && (
                <div>
                    <Image src={data.thumbnail} />
                    <Header as='h1'>
                        {data.title}
                    </Header>
                    <Header as='h4'>Last updated: {`${new Date(data.last_updated).toLocaleDateString()}`}</Header>
                    <p>
                        {data.content}
                    </p>
                </div>
            )}
        </Container>
    )
}

export default PostDetail;