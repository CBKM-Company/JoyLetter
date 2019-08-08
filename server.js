url = "https://joyletter-test.herokuapp.com"

const getStorage = (item) => (JSON.parse(sessionStorage.getItem(item)))

const setStorage = (item, data) => (sessionStorage.setItem(item, JSON.stringify(data)))

const removeStorage = (item) => (sessionStorage.removeItem(item))

function check(){
    if(!getStorage('auth'))
        window.location.href = 'login.html'
}

function login() {
    axios.post(`${url}/login`, {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    })
        .then(res => {
            // console.log(res.data.token)
            if (res.data.login) {
                setStorage('auth', res.data)
                window.location.href = 'toBeApproved.html'
            }

            else {
                alert("login un-successful")
            }
        })
        .catch(e => {
            console.log(e)
        })
}


function logout(){
    removeStorage('auth')
    removeStorage('event')
}

function submitEvent() {
    cp = document.getElementById("cp").value
    cn = document.getElementById("cn").value
    et = document.getElementById("et").value
    ct = document.getElementById("ct").value
    ea = document.getElementById("ea").value
    ed = document.getElementById("ed").value
    pd = document.getElementById("pd").value
    ud = document.getElementById("ud").value
    ead = document.getElementById("ead").value
    sd = document.getElementById("sd").value


    if (cp && cn && et && ct && ea && ed && pd && ud && ead && sd) {
        pd += "T12:30:00.000Z"
        ud += "T12:30:00.000Z"
        data = {
            startDate: sd,
            endDate: ead,
            publishDate: pd,
            unPublishDate: ud,
            title: et,
            description: ed,
            city: ct,
            address: ea,
            contactNumber: cn,
            contactPerson: cp,
            status: 0,
        }
        console.log(data)
        axios.post(`${url}/event/save`, data)
            .then(res => {
                console.log(res)
               window.location.href="thank.html"
            })
    }
    else { alert("fill all details") }


}




function aproved(id) {
    check();

    cp = document.getElementById("cp").value
    cn = document.getElementById("cn").value
    et = document.getElementById("et").value
    ct = document.getElementById("ct").value
    ea = document.getElementById("ea").value
    ed = document.getElementById("ed").value
    pd = document.getElementById("pd").value
    ud = document.getElementById("ud").value
    ead = document.getElementById("ead").value
    sd = document.getElementById("sd").value


    if (cp && cn && et && ct && ea && ed && pd && ud && ead && sd) {
        pd += "T12:30:00.000Z"
        ud += "T12:30:00.000Z"
        data = {
            id: id,
            startDate: sd,
            endDate: ead,
            publishDate: pd,
            unPublishDate: ud,
            title: et,
            description: ed,
            city: ct,
            address: ea,
            contactNumber: cn,
            contactPerson: cp,
            status: 1
        }
        console.groupCollapsed(data)
        axios.defaults.headers.common['token'] = getStorage('auth').token
        axios.post(`${url}/event/update`, data)
            .then(res => {
                console.log(res.data)
                // removeStorage('event')
                window.location.href = 'approved.html'
            })
            

    }
    else { alert("fill all details") }


}


function disApproved(id) {
    check();
    cp = document.getElementById("cp").value
    cn = document.getElementById("cn").value
    et = document.getElementById("et").value
    ct = document.getElementById("ct").value
    ea = document.getElementById("ea").value
    ed = document.getElementById("ed").value
    pd = document.getElementById("pd").value
    ud = document.getElementById("ud").value
    ead = document.getElementById("ead").value
    sd = document.getElementById("sd").value


    if (cp && cn && et && ct && ea && ed && pd && ud && ead && sd) {
        pd += "T12:30:00.000Z"
        ud += "T12:30:00.000Z"
        data = {
            id: id,
            startDate: sd,
            endDate: ead,
            publishDate: pd,
            unPublishDate: ud,
            title: et,
            description: ed,
            city: ct,
            address: ea,
            contactNumber: cn,
            contactPerson: cp,
            status: -1
        }
        console.groupCollapsed(data)
        axios.defaults.headers.common['token'] = getStorage('auth').token
        axios.post(`${url}/event/update`, data)
            .then(res => {
                console.log(res.data)
                // removeStorage('event')
                window.location.href = 'disapproved.html'
            })
    }
    else { alert("fill all details") }


}

function getAllEvent(f) {
    check();
    axios.defaults.headers.common['token'] = getStorage('auth').token
    axios.get(`${url}/event/getall`).then(res => {
        console.log(res.data.event[1].title)
        data = res.data.event.filter(e => {
            return e.status == f
        })
        s = `<table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Event Title</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>`
        for (i = 0; i < data.length; i++) {

            // s+=res.data.event[i].contactNumber+'<br>'
            s += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${data[i].contactPerson}</td>
            <td>${data[i].contactNumber}</td>
            <td><button type="button" onclick="getApproved('${data[i]._id}')" class="btn btn-primary">Details</button></td>
          </tr>`
        }
        s += `</tbody>
        </table>`
        document.getElementById('allEvents').innerHTML = s

    })


}

function getApproved(id) {
    check()
    axios.get(`${url}/event/get/${id}`).then(res => {
        console.log(res.data.event)

        setStorage('event', res.data.event)
        window.location.href = 'getApproved.html'

    })

}

function deleteId(id) {
    check()
    axios.get(`${url}/delete/${id}`).then(res => {
        console.log(res.data)

    })

}


function getContact() {
    check()
    event = getStorage('event')
    document.getElementById('getApproved').innerHTML = `


    <div class="container">
    <div class="form-group">
        <label for="exampleFormControlInput1">Contact Person:</label>
        <input type="text" class="form-control" value="${event.contactPerson}" id="cp" placeholder="Contact Person">
    </div>
    <div class="form-group">
        <label for="exampleFormControlInput1">Contact Number:</label>
        <input type="text" class="form-control" value="${event.contactNumber}" id="cn" placeholder="Contact Number">
    </div>
    <div class="form-group">
        <label for="exampleFormControlInput1">Event Title:</label>
        <input type="text" class="form-control" value="${event.title}" id="et" placeholder="Event Title">
    </div>
    <div class="form-group">
        <label for="exampleFormControlInput1">Event City:</label>
        <input type="text" class="form-control" value="${event.city}" id="ct" placeholder="Event City">
    </div>
    <div class="form-group">
        <label for="exampleFormControlInput1">Event Address:</label>
        <input type="text" class="form-control" value="${event.address}" id="ea" placeholder="Event Address">
    </div>

    <div class="form-group">
        <label for="exampleFormControlTextarea1">Event Description:</label>
        <textarea class="form-control" id="ed" value ="${event.description}" rows="3"> ${event.description}</textarea>
    </div>
    <div class="form-group">
        <label for="exampleFormControlInput1">Event Start date:</label>
        <input type="date" class="form-control"  value="${event.startDate.split('T')[0]}" id="sd" placeholder="Event Start date">
    </div>
    <div class="form-group">
        <label for="exampleFormControlInput1">Event End date:</label>
        <input type="date" class="form-control"  value="${event.publishDate.split('T')[0]}"  id="ead" placeholder="Event End date">
    </div>
    <div class="form-group">
        <label for="exampleFormControlInput1">Event publish date on app:</label>
        <input type="date" class="form-control"  value="${event.publishDate.split('T')[0]}" id="pd" placeholder="Event publish date on app">
    </div>
    <div class="form-group">
        <label for="exampleFormControlInput1">Event un-publish date on app:</label>
        <input type="date" class="form-control" value="${event.unPublishDate.split('T')[0]}" id="ud" placeholder="var jwt = require('jsonwebtoken');
                        "> <br>
                        <button class="btn btn-primary" onclick="aproved('${event._id}')">Approve</button>  
    <button class="btn btn-primary" onclick="disApproved('${event._id}')">Disapprove</button> 
    </div>

       `

}


