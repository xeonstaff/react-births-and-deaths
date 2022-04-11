import React from 'react'
import '../index.css'

export default function Title(props) {
    var today = new Date()

    const ordinal = (number) => {
        const ordinalRules = new Intl.PluralRules("en", {
            type: "ordinal"
        });
        const suffixes = {
            one: "st",
            two: "nd",

            few: "rd",
            other: "th"
        };
        const suffix = suffixes[ordinalRules.select(number)];
        return (number + suffix);
    }

    const titletext = ` records for the ${ordinal(today.getDate())} day 
        of the ${ordinal(today.getMonth())} month, 
        in the year ${today.getFullYear()}.`

    return (
        <div>
            <h1 className='search'>
                {props.record} {titletext}
            </h1>
        </div>
    )
}
