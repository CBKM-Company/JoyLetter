url = "https://joyletter-test.herokuapp.com"

const getStorage = (item) => (JSON.parse(sessionStorage.getItem(item)))

const setStorage = (item, data) => (sessionStorage.setItem(item, JSON.stringify(data)))

const removeStorage = (item) => (sessionStorage.removeItem(item))




function login() {
    axios.post(`${url}/login`, {
        username: 'cbkm',
        password: 'cbkm1234'
    })
        .then(res => {
            console.log(res)
            setStorage('auth', res.data)           
        })
        .catch(e => {
            console.log(e)
        })
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
                console.log(res.data)
            })
    }
    else { alert("fill all details") }


}




function aproved(id) {

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
        axios.post(`${url}/event/update`, data)
            .then(res => {
                console.log(res.data)
                window.location.href = 'approved.html'
            })

    }
    else { alert("fill all details") }


}


function disApproved(id) {
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
        axios.post(`${url}/event/update`, data)
            .then(res => {
                console.log(res.data)
                window.location.href = 'disapproved.html'
            })
    }
    else { alert("fill all details") }


}

function getAllEvent(f) {
    axios.defaults.headers.common['token'] = getStorage("auth").login

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
    axios.get(`${url}/event/get/${id}`).then(res => {
        console.log(res.data.event)

        setStorage('event', res.data.event)
        window.location.href = 'getApproved.html'

    })

}


function getContact() {
    event = getStorage('event')
    document.getElementById('getApproved').innerHTML = `
        Contact Person:<input id="cp" value="${event.contactPerson}" type="text" /><br>
    Contact Number:<input id="cn" value="${event.contactNumber}" type="number"/><br>

    Event Title:<input id="et" value="${event.title}" type="text"><br>
    Event City:<input id="ct" value="${event.city}" type="text"><br>
    Event Address:<input id="ea" value="${event.address}" type="text"><br>
    Event Description:<input id="ed" value="${event.description}" type="text"><br>
    Event Start date:<input id="sd" value="${event.startDate.split('T')[0]}" type="date"><br>
    Event End date:<input id="ead" value="${event.endDate.split('T')[0]}" type="date"><br>
    Event publish date on app:<input id="pd" value="${event.publishDate.split('T')[0]}" type="date"><br>
    Event un-publish date on app:<input id="ud" value="${event.unPublishDate.split('T')[0]}" type="date"><br>
    <button onclick="aproved('${event._id}')">Approve</button> <br>
    <button onclick="disApproved('${event._id}')">Disapprove</button> `

}


