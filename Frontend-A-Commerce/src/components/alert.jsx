const Alert = (props) => {
    return (
        <>
            {props.message ?
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{props.message}!</strong> Please check the details below.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> :
                null}
        </>
    )
}

export default Alert