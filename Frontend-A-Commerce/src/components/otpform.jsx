
const OtpForm = () => {
    return (
        <>


            <div className="modal fade show d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Enter The OTP</h1>
                        </div>
                        <div className="modal-body">
                            <form>

                                <div className="mb-3">
                                    <input type="password" className="form-control" id="OTP" />
                                </div>
                                
                                <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default OtpForm