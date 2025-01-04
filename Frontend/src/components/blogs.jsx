import React, { useEffect, useState } from "react";

function Blogs(){
    const[blogs,setBlogs]=useState([])

    async function fetchBlogs(){
        let data=await fetch("http://localhost:4000/api/v1/blogs");
        let res =await data.json();
        console.log(res.blogs);
        setBlogs(res.blogs);
    }
    useEffect(()=>{
        fetchBlogs();
    },[]);

    return (
        <div>
            {
                blogs.map((blog)=>(
                    <ul>
                        <li>{blog.title}</li>
                        <P>{blog.description}</P>
                    </ul>
                ))
            }
        </div>
    )
}
export default Blogs