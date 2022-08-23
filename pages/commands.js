import { useEffect, useState } from 'react'
import Commands from '../components/Commands'
import { Fragment } from 'react'
import Head from 'next/head'


function Command() {
    const [height, setHeight] = useState(0)
    useEffect(() => {
        setHeight(document.documentElement.scrollHeight)

    }, [])
    return <Fragment>
        <Head>
            <title>Commands</title>
            <meta name="description" content='This is the list of commands that AMGX comes with'></meta>
        </Head>
        <div style={{ position: 'relative', top: 110 }}>
            <Commands />
        </div>
    </Fragment>


}

export default Command