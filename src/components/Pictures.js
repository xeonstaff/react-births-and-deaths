async function getKey(name) {
    var url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=pageimages&format=json&origin=*&pithumbsize=100`
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        });
        const data = await response.json();
        const thiskey = Object.keys(data.query.pages)[0]
        return (thiskey)

    } catch (error) {
        console.error(error);
    }
}

export default async function Pictures(name, callback) {
    var url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=pageimages&format=json&origin=*&pithumbsize=100`

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        });

        const data = await response.json();
        const a = await getKey(name);
        const b = data.query.pages[a].thumbnail.source

        if (a > 0 && typeof b === 'string') {
            callback(b)
        } else {
            //callback('https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106')

            console.log('error retrieving key')
        }
    } catch {
        callback('https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106')
        // console.log('error retrieving picture')
        //callback('../../public/defaultpic.jpeg')
    }
}

