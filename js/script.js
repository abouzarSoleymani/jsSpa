function appRoot() {

    this.routes = [
        {path: '/', loadComponent: 'components/users-list', component: 'usersListComponent'},
        {path: '/login', loadComponent: 'components/login', component: 'loginComponent'},
    ];

    this.loadStyle = (styleUrl) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `${styleUrl}.css`;
        document.getElementsByTagName('HEAD')[0].appendChild(link);
    }
    this.loadScript = (scriptUrl) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript'
            script.async = true
            script.src = `${scriptUrl}.js`;
            const el = document.getElementsByTagName('script')[0]
            el.parentNode.insertBefore(script, el)
            script.addEventListener('load', (e) => {
                resolve(script)
            })
            script.addEventListener('error', () => {
                reject(new Error(`${this.src} failed to load.`))
            })
        })
    }


    this.render = path => {
        const route = routes.find(f => f.path === path);
        if (route) {
            this.loadScript(route.loadComponent).then(()=> {
                this.loadStyle(route.loadComponent)
                const currentComponentLoaded  = window[route.component]
                document.querySelector("#app").innerHTML = currentComponentLoaded.template;
                currentComponentLoaded.onInit();
            }).catch(() => {
                console.error('Script loading failed! Handle this error');
            });

        }
    };
    window.addEventListener("popstate", e =>
        this.render(new URL(window.location.href).pathname)
    );
    this.render("/");


}

const onNavigate = (pathname) => {
    const root= new appRoot();
    root.render(pathname);
}

document.addEventListener("DOMContentLoaded", function(){
    appRoot();
});




function setOnStorage(key , value) {
    localStorage.setItem(key , JSON.stringify(value))
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

async function openModal(title = '', text = '', acceptText='accept', cancelText = 'cancel', isConfirm = false) {
    const myModal = new SimpleModal(title, text, acceptText, cancelText, isConfirm);
    try {
        const modalResponse = await myModal.dialog();
        return modalResponse;
    } catch(err) {
        console.log(err);
    }
}
