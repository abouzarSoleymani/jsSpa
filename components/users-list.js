var usersListComponent = {
    template: `
        <button onclick="openModalDialog()">modal</button>
        <div class="users-list-container">
            <div class="title">لیست کاربران</div>
            <table id="table"></table>
         </div>`,
    onInit: () => {
        userListPage();
    }
}

function userListPage() {
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
    function createElement(tagName) {
        return document.createElement(tagName)
    }


    const columns = ["نام کاربری", "نام", "نام خانوادگی", "کد ملی", "تاریخ تولد", "شهر", "شماره موبایل", "آدرس", "نقش", "رمز عبور"];
    const tableConfig = {
        columns: columns,
        rowData: {
            data: users,
            actions: [
                {
                    title: 'حذف',
                    className: 'remove',
                    click: removeRow
                },
                {
                    title: 'ویرایش',
                    className: 'edit',
                    click: editRow
                },
                {
                    title: 'تغییر رمز',
                    className: 'change-pass',
                    click: changePass
                }
            ]
        }

    }

    function removeRow(row) {
        console.log('remove', row)
    }

    function editRow(row) {
        console.log('edit', row)
    }

    function changePass(row) {
        console.log('changePass', row)
    }

    function createTable(tableConfig) {
        if (Array.isArray(tableConfig.rowData.data) && tableConfig.rowData.data.length > 0) {
            const table = document.getElementById('table');
            table.appendChild(createTHead(tableConfig));
            table.appendChild(createTBody(tableConfig));
        } else {
            throw new Error('table data is empty or is not an array');
        }

    }

    function createTHead(tableConfig) {
        const columns = tableConfig.columns;
        const actions =  tableConfig.rowData.actions;
        const thead = createElement('thead');
        const tr = createElement('tr');
        for (let col = 0; col < columns.length; col++) {
            const th = createElement('th');
            th.appendChild(document.createTextNode(columns[col]));
            tr.appendChild(th);
        }
        if (actions.length > 0) {
            const th = createElement('th');
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        return thead;
    }


    function createTBody(tableConfig) {
        const data =  tableConfig.rowData.data;
        const actions = tableConfig.rowData.actions;
        const keys = Object.keys(data[0]);
        const tbody = createElement('tbody');
        for (let row = 0; row < data.length; row++) {
            const tr = createElement('tr');

            for (let col = 0; col < keys.length; col++) {
                const td = createElement('td');
                td.appendChild(document.createTextNode(data[row][keys[col]]));
                tr.appendChild(td);
            }
            if (actions.length > 0) {
                const td = createElement('td');
                const actionsContainer = createElement('div');
                actionsContainer.classList.add('actions-container');
                td.appendChild(actionsContainer);
                for (let act = 0; act < actions.length; act++) {
                    const button = createElement('input');
                    button.setAttribute('type', 'button');
                    button.setAttribute('value', actions[act].title);
                    button.classList.add(actions[act].className);
                    button.addEventListener("click", actions[act].click.bind(null, data[row]));
                    actionsContainer.appendChild(button);
                    tr.appendChild(td);
                }
            }
            tbody.appendChild(tr);
        }
        return tbody;
    }

    createTable(tableConfig);
}
function openModalDialog() {
    openModal('افراد', 'آیا از حذف رکورد مطمین هستید ؟ ', 'بله' , 'خیر').then(res => {
        console.log(res)
    })
}
