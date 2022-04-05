import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Title from './Title'
import Pictures from './Pictures'
import '../index.css'


var Card = ({ name, birthyear }) => {
    const [url, setURL] = useState("")

    useEffect(() => {
        Pictures(name, setURL)
    }, []);

    return (
        <article className='person'>
            <img src={url} alt={name} />
            <div>
                <b><p>{name}</p></b>
                <p>b. {birthyear}</p>
            </div>
        </article>
    )
}

export default function Births() {
    var today = new Date()
    const [posts, setPosts] = useState([]);
    const [inputText, setInputText] = useState("");

    let birthyear = inputText
    let url = `https://byabbe.se/on-this-day/${today.getMonth() + 1}/${today.getDate()}/births.json`

    const fetchPosts = async () => {
        const response = await fetch(url);
        const data = await response.json();

        if (birthyear > 0) {
            setPosts(data.births.filter(item => item.year === birthyear));
        } else {
            setPosts(data.births)
        }
    };

    useEffect(() => {
        fetchPosts()
    }, [inputText]);

    return (
        <>
            <div className="pagetitle">
                <Title record="Birth" />
            </div>
            <div className="container search">
                <TextField
                    className="searchfield"
                    onChange={(e) => setInputText(e.target.value)}
                    variant="outlined"
                    fullWidth
                    label="Search by Year"
                />
            </div>
            <div className="cardsection container">
                {posts
                    .map((item) => (
                        <Card
                            key={item.wikipedia[0].title}
                            name={item.wikipedia[0].title}
                            birthyear={item.year}
                        />
                    ))}
            </div>
        </>
    )
}
