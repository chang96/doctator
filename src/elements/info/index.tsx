import "../elements.css"

function Info() {
    return <div className="c">
        <div><p>Info:</p></div>
        
        <div><p>title:</p></div>
        <div><input name="title" /></div>

        <div><p>version:</p></div>
        <div><input name="version" /></div>
    </div>
}

export default Info