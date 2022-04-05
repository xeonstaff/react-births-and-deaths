import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css'
import Title from './Title'
import Pictures from './Pictures'
import TextField from "@mui/material/TextField";


var Card = ({ name, deathyear }) => {
    const [url, setURL] = useState("")

    useEffect(() => {
        Pictures(name, setURL)
    }, []);

    return (
        <article className='person'>
            <img src={url} alt={name} />
            <div>
                <b><p>{name}</p></b>
                <p>d. {deathyear}</p>
            </div>
        </article>
    )
}

export default function Deaths() {
    var today = new Date()
    const url = `https://byabbe.se/on-this-day/${today.getMonth() + 1}/${today.getDate()}/deaths.json`;

    const [posts, setPosts] = useState([]);
    const [inputText, setInputText] = useState("");

    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/deaths')
        }

        if (!authToken) {
            navigate('/signin')
        }
    }, [])

    let deathyear = inputText

    const fetchPosts = async () => {
        const response = await fetch(url);
        const data = await response.json();

        if (deathyear > 0) {
            setPosts(data.deaths.filter(item => item.year === deathyear));
        } else {
            setPosts(data.deaths)
        }
    };

    useEffect(() => {
        fetchPosts()
    }, [inputText]);

    return (
        <>
            <div className="pagetitle">
                <Title record="Death" />
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
                            deathyear={item.year}
                        />
                    ))}
            </div>
        </>
    )
}
