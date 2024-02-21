export default function Authetication() {
    return (
        <>
            <div>
                <form action="/submit">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Enter OTP</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" />
                    </div>
                </form>
            </div>
        </>
    )
}