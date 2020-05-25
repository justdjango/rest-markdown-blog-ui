import React, { useState, useRef } from 'react'
import {Button, Form, Header, Image, Divider} from 'semantic-ui-react'
import axios from "axios";
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import { history } from "../helpers";
import Loader from '../components/Loader';
import Message from '../components/Message'
import {authAxios} from "../services"
import { api } from '../api';
import { useParams, Redirect } from 'react-router-dom'
import { useFetch } from '../helpers'

const PostUpdateForm = ({ postSlug, initialTitle, initialContent, initialThumbnail }) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const [title, setTitle] = useState(initialTitle);
    const [markdown, setMarkdown] = useState(initialContent)
    const [currentThumbnail, setCurrentThumbnail] = useState(initialThumbnail)
    const [thumbnail, setThumbnail] = useState(null)

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const fileInputRef = useRef()

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData()
        if (thumbnail) formData.append("thumbnail", thumbnail)
        formData.append("title", title)
        formData.append("content", markdown)
        authAxios
            .put(api.posts.update(postSlug), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(res => {
                setLoading(false);
                history.push('/')
            })
            .catch(err => {
                setLoading(false);
                setError(err.message || err)
            })
    }


    return (
        <div>
            <Header>Update post</Header>
            {error && <Message negative message={error} />}
            {currentThumbnail && <Image src={currentThumbnail} size="small" />}
            <Divider />
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input 
                        placeholder='Title of your post' 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                    />
                </Form.Field>
                <MdEditor
                    value={markdown}
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={({text}) => setMarkdown(text)}
                />
                <Form.Field>
                    <Button
                        type="button"
                        fluid
                        content="Choose a thumbnail" 
                        labelPosition="left" 
                        icon="file"
                        onClick={() => fileInputRef.current.click()}
                    />
                    <input 
                        ref={fileInputRef} 
                        type="file" 
                        hidden
                        onChange={e => setThumbnail(e.target.files[0])}
                    />
                </Form.Field>
                <Button primary fluid loading={loading} disabled={loading} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

const PostUpdate = () => {
    const { postSlug } = useParams()
    const {data, loading, error} = useFetch(api.posts.retrieve(postSlug))
    if (data && data.is_author === false) {
        return <Redirect to="/" />
    }
    return (
        <>
            {error && <Message negative message={error} />}
            {loading && <Loader />}
            {data && <PostUpdateForm 
                postSlug={postSlug}
                initialTitle={data.title}
                initialContent={data.content}
                initialThumbnail={data.thumbnail} />}
        </>
    )
}

export default PostUpdate;