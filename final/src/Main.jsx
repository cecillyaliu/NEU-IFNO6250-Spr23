import React from "react";
import { useEffect, useState } from "react";
import "./css/Main.css";

function Main({getPosts, allPosts, error, avatar}){

    function generatePostHtml(allPosts) {
        return allPosts.map((post) => {
            const timestamp = new Date(post.timestamp);
            const date = timestamp.getDate();
            const year = timestamp.getFullYear();
            const month = timestamp.getMonth() + 1;
            const minutes = timestamp.getMinutes();
            const seconds = timestamp.getSeconds();
            const hours = timestamp.getHours();     
            
            return(
                
                <li className="each-post" key={post.id}>
                    <div className="post-content">
                        <p className="title-post">{post.title}</p>
                        <p className="text-post">{post.text}</p>
                        <p className="author-post">From:  {post.author}</p>
                        <p className="time-post">Posted time: {year}-{month}-{date} {hours}:{minutes}:{seconds}</p>
                    </div>
                </li>
            )
        });
    };

    useEffect(() => {
        const interval = setInterval(() => getPosts(), 500);
        return () => clearInterval(interval);
    }, [getPosts]);

    return (
        <div className="main-inside-container">
            <ul>
                {generatePostHtml(allPosts)}
            </ul>
        </div>
   ); 
}

export default Main;