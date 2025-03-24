// listener
document.addEventListener("DOMContentLoaded", ()=> {
    fetch("navbar.html")
        .then(response=>response.text())
        .then(data=> {
            document.getElementById("navbar").innerHTML = data;
            let links=document.querySelectorAll(".nav-links a");

            // finds active tab
            links.forEach(link=> {
                if(link.href === window.location.href) {
                    link.classList.add("active");
                }
            });
            
            let script=document.createElement("script");
            script.src="index.js";
            document.body.appendChild(script);
        })
})