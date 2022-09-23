self.addEventListener('install',(ev)=>{
    console.log("Instalado");
})

/*self.addEventListener('activate',(ev)=>{
    console.log("Activado");
    const myPromise = new Promise((resolve,reject)=>{
        setInterval(()=>{
            console.log("Instalaciones finalizadas");
            resolve('ok')
        },3000)
    });
    ev.waitUntil(myPromise);
})*/


self.addEventListener('fetch',(ev)=>{
    //changeBodyColorServiceWorker(ev);
    changeImageServiceWorker(ev);
})

const manageErrorsServiceWorker = (ev) => {
    fetch(ev.request.url)
      .then((res)=>{
          if (res.ok)
              ev.respondWith(res);
          else
              ev.respondWith(fetch("./images/img2.jpg"))
     }).catch((error)=>{
         console.log(error)
    })
}

const changeBodyColorServiceWorker = (ev) => {
    if (ev.request.url.includes('style.css')) {
        const request = new Response(`
        body{
            color: red;
            background-color: #000;
        }
        `,{
            headers:{
                'Content-Type':'text/css'
            }
        })
        ev.respondWith(request);
    }
}

const changeImageServiceWorker = (event) => {
    if (event.request.url.includes(".jpg")){
        console.log(event.request.url)
        event.respondWith(fetch("./images/img2.jpg"))
    }
}

