import React from 'react'
import {Container} from 'semantic-ui-react'
import Navbar from '../components/Navbar'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Container text style={{ marginTop: '7em' }}>
                {children}
            </Container>
        </>
    )
}

export default Layout;