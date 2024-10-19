import React from "react";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import {Link} from "react-router-dom";

const ComingSoon = () => {
    return (
        <>
            <PageHeading url={"/static/media/image2.2afdf2e7a647b3e0e510.png"} text={"Store"}></PageHeading>
            <div>
                <h1 align={"center"} style={{margin:"100px", fontSize:"5rem"}}>Coming soon</h1>

            </div>

        </>
    )
}

export default ComingSoon

