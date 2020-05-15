var elems = document.querySelectorAll(".sidenav");
M.Sidenav.init(elems);

const getNav = () => {
    return fetch('component/nav.html', {mode: 'no-cors'})
    .then(response => response.text())
}

const loadNav = async () => {
    const result = await getNav()
    document.querySelectorAll(".topnav, .sidenav").forEach(el => {
        el.innerHTML = result
    });

    document.querySelectorAll(".sidenav a, .topnav a").forEach(el => {
        el.addEventListener('click', e => {
            const sidenav = document.querySelector(".sidenav");
            page = e.target.getAttribute("href").substr(1)
            if(page === "socialmedia") page = "sosmed"
            loadPage(page)
            
            M.Sidenav.getInstance(sidenav).close();
        })
    })
}

const loadPage = page => {
    const content = document.querySelector("#body-content");
    fetch(`pages/${page}.html`, {mode: 'no-cors'})
    .then(response => response.text())
    .then(result => content.innerHTML = result)
}

let page = window.location.hash.substr(1);
if (page == "") page = "home";
loadPage(page)

loadNav()