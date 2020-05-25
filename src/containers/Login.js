import React, { useState } from 'react'
import { Header, Button, Container, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Message from "../components/Message"
import { api } from '../api';
import { history } from "../helpers"
import { authenticationService } from "../services"

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault()
    axios.post(api.auth.login, {
      username, email, password
    })
      .then(res => {
        localStorage.setItem("token", res.data.key)
        setLoading(false);
        history.push('/')
      })
      .catch(error => {
        setLoading(false);
        setError(error.message || error)
      })
  }

  if (authenticationService.isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <Container>
      <Header>Login to your account</Header>
      {error && (
        <Message danger message={error} />
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input 
              placeholder='Username' 
              value={username}
              type='text'
              onChange={e => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input 
              placeholder='Email' 
              value={email}
              type='email'
              onChange={e => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input 
              placeholder='Password' 
              value={password}
              type='password'
              onChange={e => setPassword(e.target.value)}
          />
        </Form.Field>
        <Button primary fluid loading={loading} disabled={loading} type='submit'>Login</Button>
      </Form>
    </Container>
  )
}

export default Login;