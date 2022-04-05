import React, { useState, useEffect } from "react";
import '../index.css'
import Title from './Title'
import Pictures from './Pictures'
import TextField from "@mui/material/TextField";


var Card = ({ name, year }) => {
    const [url, setURL] = useState("")

    useEffect(() => {
        Pictures(name, setURL)
    }, []);

    return (
        <article className='person'>
            <img src={url} alt={name} />
            <div>
                <b><p>{name}</p></b>
                <p>{year}</p>
            </div>
        </article>
    )
}

export default function Deaths() {
    var today = new Date()
    const url = `https://byabbe.se/on-this-day/${today.getMonth() + 1}/${today.getDate()}/deaths.json`;

    const [posts, setPosts] = useState([]);

    //set search result 'inputText' as year...?
    const [inputText, setInputText] = useState("");
    // let year = 742
    // useEffect(() => {
    //     year = { inputText }
    // }, [{ inputText }]);


    const fetchPosts = async () => {
        const response = await fetch(url);
        const data = await response.json();
        let year = 0

        if (year > 0) {
            setPosts(data.deaths.filter(item => item.year === year));
        } else {
            setPosts(data.deaths)
        }
    };

    useEffect(() => {
        fetchPosts()
    }, []);

    return (
        <>
            <div>
                <Title record="Death" />
            </div>
            <div className="search">
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
                            wiki={item.wikipedia[0].wikipedia}
                            year={item.year}
                        />
                    ))}
            </div>
        </>
    )
}
