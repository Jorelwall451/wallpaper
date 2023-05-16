const app = document.getElementById("app");
const music = document.getElementById("music");
music.volume = 0.15

async function getGitHubApi(){ 
    const api = fetch("https://api.github.com/users");

    const data = await api
        .then(value =>
            value.json()
        )
        .then(data => { 
            return data
        });

    return data;
}

async function renderUsersElement(){ 
    const api = await getGitHubApi();

    for(let i = 0; i <= 20; i++){ 
        const paragraph = document.createElement("p");
        paragraph.textContent = JSON.stringify(api[i]);
        paragraph.id = "user" + i;

        app.appendChild(paragraph);
    }

    let i = 0;
    let j = 0;

    setInterval(() => { 
        i++;
        j++;
        
        if(i === 20){ 
            i = 0;
        }

        if(j === 25){ 
            j = 0;
        }
        
        const paragraph = document.getElementById(`user${i}`);
        paragraph.textContent = JSON.stringify(api[i+j-Math.floor(Math.random()*5)]);

    }, 100);
}
renderUsersElement();