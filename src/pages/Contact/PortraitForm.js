import React from "react";


export const PortraitForm = ({currentUser}) =>
    <form className={"form-container"}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name.."
               defaultValue={currentUser?.username}

        />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email.."
               defaultValue={currentUser?.email}

        />

        <label htmlFor="email">Style</label>
        <input type="email" id="email" name="email" placeholder="Your email.."/>

        <label htmlFor="subject">Subject</label>
        <textarea id="subject" name="subject" placeholder="Write something.."></textarea>

        <button type="submit" className="btn primary">Submit</button>
    </form>