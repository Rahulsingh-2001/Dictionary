const wrapper=document.querySelector(".wrapper"),
searchInput=wrapper.querySelector("input");
synonyms=wrapper.querySelector(".synonyms .list"),
infoText=wrapper.querySelector(".info-text"),
volumeIcon=wrapper.querySelector(".word i"),
removeIcon=wrapper.querySelector(".search span"),
searchIcon=wrapper.querySelector(".fa-search");
let audio;
function data(result,word){
    if(result.title){
        infoText.innerHTML=`Can't find "${word}", Search Another Word.`
    }else{
        wrapper.classList.add("active");
        console.log(result);
        let definition =result[0].meanings[0].definitions[0],
        phonetics=`${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerText=result[0].word;
        document.querySelector(".word span").innerText=phonetics;
        document.querySelector(".meaning span").innerText=definition.definition;
        document.querySelector(".example span").innerText=definition.example;
        audio= new Audio("https:"+result[0].phonetics[0].audio)


        if(definition.synonyms[0]==undefined){
            synonyms.parentElement.style.display="none";
        }else{
            synonyms.parentElement.style.display="block";
            for (let i = 0; i < 5; i++) {
                let tag=`<span onclick=search('${definition.synonyms[i]}')>${definition.synonyms[i]}</span>`;
                synonyms.insertAdjacentHTML("beforeend",tag);  
            }
        }
    }
    
}

function search(word){
        wrapper.classList.remove("active");
        searchInput.value=word;
        fetchApi(word);
}

function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color="#000";
    infoText.innerHTML=`Searching Meaing of <span>"${word}"</span>`;
    let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res=>res.json()).then(result=>data(result,word));
    
}

searchInput.addEventListener('keyup',e=>{
    if(e.key==='Enter'){
        fetchApi(e.target.value);
    }
});


volumeIcon.addEventListener("click",()=>{
    audio.play();
});


removeIcon.addEventListener("click",()=>{
    searchInput.value='';
    searchInput.focus();
    infoText.innerHTML=`Type a word and press enter to get meaning, example, pronunnciation, and  synonyms of that typed word.`;
    infoText.style.color="#9a9a9a";
    wrapper.classList.remove("active");
});
searchIcon.addEventListener("click",()=>{
fetchApi(searchInput.value);
});     