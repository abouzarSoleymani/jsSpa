var loginComponent = {
    template : `
        <div class="login-page">
        <div class="login-form-container">
            <div class="title">ورود به سیستم</div>
            <div class="login-form">
                <form id="login-form" action="#" method="post">
                    <div class="form-field">
                        <input id="username" name="username" type="text" placeholder="نام کاربری">
                    </div>
                    <div class="form-field">
                        <input id="password" name="password" type="password" placeholder="رمز عبور">
                    </div>
                    <div class="form-field">
                        <button id="login-button" type="submit">ورود</button>
                    </div>
                </form>
            </div>
        </div>
        </div>`,
    onInit: () => {
        loginPage();
    }
};

function loginPage() {
    const users = [
        {
            username: 'abouzar69',
            firstName: 'abouzar',
            lastName: 'soleymani',
            nationalCode: '1050248112',
            birthDate: '1369/09/29',
            city:'tehran',
            mobile: '09330208184',
            address: 'tehran lashgar gharbi',
            role: 'admin',
            password: 'admin'
        }
    ];
    const loginBtn = document.getElementById('login-button');
    const loginForm = document.getElementById('login-form');

    if(loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            login();
        })
    }
    function getUserValidate(userInfo) {
        return users.find(f => f.username === userInfo.username && f.password === userInfo.password);
    }
    function login() {
        const userInfo = {
            username: loginForm.username.value,
            password: loginForm.password.value
        }

        if(getUserValidate(userInfo)) {
            setOnStorage('user-info', userInfo)
            onNavigate('/')
        } else {
           openModalDialog()
        }
    }
}
function openModalDialog() {
    openModal('خطا', 'نام کاربری و یا رمز عبور اشتباه است ', 'باشه' , '', true).then(res => {
        console.log(res)
    })
}
