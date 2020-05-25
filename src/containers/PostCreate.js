import React, {useRef, useState } from 'react'
import { Header, Button, Form } from 'semantic-ui-react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import { history } from "../helpers";
import Message from '../components/Message';
import { api } from '../api';
import { authAxios } from "../services"

const PostCreate = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const [title, setTitle] = useState(null);
    const [markdown, setMarkdown] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const fileInputRef = useRef()

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData()
        formData.append("thumbnail", thumbnail)
        formData.append("title", title)
        formData.append("content", markdown)
        authAxios
            .post(api.posts.create, formData, {
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
            <Header>Create a post</Header>
            {error && (
                <Message danger message={error} />
            )}
            {thumbnail && <Message info message={`Selected image: ${thumbnail.name}`} />}
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
                    value=""
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

export default PostCreate;