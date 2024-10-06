import './paths.css'

import AuthSelection from '../../elements/authSelection'
import Description from '../../elements/description'
import Body from '../../elements/body'
import Headers from '../../elements/headers'
import Params from '../../elements/params'
import PathText from '../../elements/paths'
import Queries from '../../elements/queries'
import Url from '../../elements/url'
import TagsSelection from '../../elements/tagsSelection'

import { useState } from 'react'

type PathElements = {
    description: JSX.Element,
    auth: JSX.Element,
    url: JSX.Element,
    path: JSX.Element,
    queries: JSX.Element,
    headers: JSX.Element,
    params: JSX.Element,
    body: JSX.Element,
    tags: JSX.Element
}

type PathElementsKey = keyof PathElements

const pathElements = {
    description: <Description />,
    auth: <AuthSelection />,
    url: <Url />,
    path: <PathText />,
    queries: <Queries />,
    headers: <Headers />,
    params: <Params />,
    body: <Body />,
    tags: <TagsSelection />
}
function Paths() {
    const [state, setState] = useState<{active: PathElementsKey}>({active: "url"})
    const handleActiveelement = (e: React.MouseEvent<HTMLDivElement>) => {
        setState({active: e.currentTarget.id as PathElementsKey})
    }
    return <div>
        <div className="fr2 ov">
        <div className='flex15'>
            <select>
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>PATCH</option>
                <option>DELETE</option>
                <option>OPTION</option>
            </select>
        </div>
        <div className='flex70'><input className='fw' /></div>
        <div className='flex15'><button className='fw'>send</button></div>
        </div>

        <div className="fr1 ov">
            <div onClick={handleActiveelement} className='pointa' id="url">Url</div>
            <div onClick={handleActiveelement} className='pointa' id="path">Path</div>
            <div onClick={handleActiveelement} className='pointa' id="params">Params</div>
            <div onClick={handleActiveelement} className='pointa' id="queries">Queries</div>
            <div onClick={handleActiveelement} className='pointa' id="headers">Headers</div>
            <div onClick={handleActiveelement} className='pointa' id="auth">Auth</div>
            <div onClick={handleActiveelement} className='pointa' id="body">Body</div>
            <div onClick={handleActiveelement} className='pointa' id="description">Description</div>
            <div onClick={handleActiveelement} className='pointa' id="tags">Tags</div>
        </div>

        <div className='elementContainer ov'>
            {pathElements[state.active]}
        </div>

        <div className='elementContainer ov'>

        </div>


    </div>
}

export default Paths