const app = document.getElementById("app") as HTMLDivElement;
const audio = document.querySelector("#audio") as HTMLAudioElement;

audio.volume = 0.5;

async function getGitHubApi(): Promise<string> { 
    const api: Promise<Response> = fetch("https://api.github.com/users");

    const data = await api
        .then(value =>
            value.json()
        )
        .then(data => { 
            return data
        });

    return data;
}

async function renderUsersElement(): Promise<void> { 
    const api: string = await getGitHubApi();

    for(let i: number = 0; i <= 20; i++){ 
        const paragraph = document.createElement("p") as HTMLParagraphElement;
        paragraph.textContent = JSON.stringify(api[i]);
        paragraph.id = "user" + i;

        app.appendChild(paragraph);
    }

    let i: number = 0;
    let j: number = 0;

    setInterval(() => { 
        i++;
        j++;
        
        if(i === 20){ 
            i = 0;
        }

        if(j === 15){ 
            j = 0;
        }
        
        const paragraph = document.getElementById(`user${i}`) as HTMLParagraphElement;

        paragraph.textContent = JSON.stringify(
            api[i+j-Math.floor(Math.random()*5)]
        );
    }, 100);
}

renderUsersElement();
