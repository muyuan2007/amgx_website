import { FourOhFour } from "../components/Fails";
import { Fragment } from 'react'
import Head from 'next/head'

function NotFound() {
    
    return <Fragment>
        <Head>
            <title>Page not found</title>
        </Head>
        <FourOhFour /></Fragment>
}

export default NotFound