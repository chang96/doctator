import "../elements.css"
function OpenApi() {
    return <div className="c">
        <div><p>openapi version:</p></div>

        <div><input name="openapi_version" value="3.0.3" readOnly/></div>
    </div>
}

export default OpenApi