document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
});
function iniciarApp(){
    crearGaleria();
    scrollNav();
    navegacionFija();
}
function scrollNav(){
    const enlaces=document.querySelectorAll(".navegacion-principal a");
    enlaces.forEach(enlace =>{
        enlace.addEventListener("click",e =>{
            e.preventDefault();
            const seccionScroll=e.target.attributes.href.value;
            const seccion=document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior:"smooth"});
        });
    });
}
function navegacionFija(){
    const header=document.querySelector(".header");
    const sobreFestival=document.querySelector(".sobre-festival");
    const body=document.querySelector("body");
    window.addEventListener("scroll",e=>{
        if(sobreFestival.getBoundingClientRect().top<0){
            header.classList.add("fijo");
            body.classList.add("body-scroll");
        }else{
            header.classList.remove("fijo");
            body.classList.remove("body-scroll");
        }
    });
}
function crearGaleria(){
    const galeria=document.querySelector('.galeria-imagenes');
    for(let i=1;i<=12;i++){
        const imagen=document.createElement('picture');
        imagen.innerHTML= `<source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" 
        alt="imagen galeria"></img>`;
        imagen.onclick=function(){
            mostrarImagen(i);
        };
        galeria.appendChild(imagen);
        }
    
}
function mostrarImagen(index){
    const imagen=document.createElement('PICTURE');
    imagen.innerHTML= `<source srcset="build/img/grande/${index}.avif" type="image/avif">
        <source srcset="build/img/grande/${index}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${index}.jpg" 
        alt="imagen galeria"></img>`;
    //crea el overlay con la imagen
    const overlay=document.createElement("DIV");
    // overlay.onclick=function(){
    //     const body =document.querySelector("body");
    //     body.classList.remove("fijar-body");
    //     overlay.remove();
    // }
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    //boton para cerrar el modal o imagen completa de galeria
    const cerrarModal=document.createElement("P");
    cerrarModal.textContent="X";
    cerrarModal.classList.add("btn-cerrar");
    cerrarModal.onclick=function(){
        const body =document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    //se selecciona y agrega el overlay en el body
    const body =document.querySelector("body");
    body.classList.add("fijar-body");
    body.appendChild(overlay);
    
}
tituloHeader=document.querySelector(".header h1");//agrega un listener para cuando se hace click en h1 del header y hacer scroll al principio de la pagina
tituloHeader.addEventListener("click",()=>{
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
})