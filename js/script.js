let InputField = document.getElementById("input-field");
let ShortButton = document.getElementById("get-btn");
const Container = document.querySelector(".url-container")
let MenuButton = document.querySelector(".menu-btn")
let MenuContianer = document.getElementById("menu-container");
/* url */
let URl = "https://api.shrtco.de/v2/";

function ShowMenu(){
    MenuContianer.classList.toggle("showMenu");
}

function CheckUrl(){
    let InputValue = InputField.value
   fetch(`${URl}shorten?url=${InputValue}/long/link.html`)
   .then((response) => {
       return response.json();
   })
   .then(data => {
    if(InputValue === ""){
        isEmpty();
        setTimeout(() => {
            location.reload();
        },2000)
    }
    else {

        console.log(data)

        let shortLink = document.createElement("div");
        let LongLink = document.createElement("div");
        let ListElement = document.createElement("div");
        let CopyButton = document.createElement("button");
        LongLink.textContent = `${InputValue}`
        shortLink.textContent = `${encodeURI(data.result.full_short_link)}`
        CopyButton.textContent = "Copy";
        ListElement.appendChild(LongLink);
        ListElement.appendChild(shortLink);
        ListElement.appendChild(CopyButton);
        Container.appendChild(ListElement);


        shortLink.setAttribute('class', "shortlink");
        LongLink.setAttribute('class', "longlink");
        InputField.value = ""

        function copyText(){
            const CreateInput = document.createElement("input");
            CreateInput.setAttribute("type", "text");
            CreateInput.value = shortLink.textContent;
            CreateInput.select();
            navigator.clipboard.writeText(CreateInput.value)
            CopyButton.textContent = "copied";
            CopyButton.classList.add("copyButton");
        }
        CopyButton.addEventListener("click", copyText)
    }
   })
}

/* Input is empty or not */

function isEmpty(){
    if(InputField.value === ""){
        alert("Please add a link");
    }
}




ShortButton.addEventListener("click", CheckUrl);
MenuButton.addEventListener("click", ShowMenu)
