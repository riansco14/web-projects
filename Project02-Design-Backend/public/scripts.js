const currentPage= window.location.pathname;
const menuItens= document.querySelectorAll(".links a");

for (item of menuItens){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active");
    }
}
console.log(menuItens);
