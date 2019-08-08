url = "https://joyletter-test.herokuapp.com"

const getStorage = (item) => (JSON.parse(sessionStorage.getItem(item)))

const setStorage = (item, data) => (sessionStorage.setItem(item, JSON.stringify(data)))

const removeStorage = (item) => (sessionStorage.removeItem(item))


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
        axios.post(`${url}/event/update`)
    }
    else { alert("fill all details") }


}


function disAproved(id) {
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
        axios.post(`${url}/event/update`)
    }
    else { alert("fill all details") }


}

function getAllEvent() {
    alert('hello')
    axios.get(`${url}/event/getall`).then(res => {
        console.log(res.data.event[1].title)
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
        for (i = 0; i < res.data.event.length; i++) {

            // s+=res.data.event[i].contactNumber+'<br>'
            s += `<tr>
            <th scope="row">${i}</th>
            <td>${res.data.event[i].contactPerson}</td>
            <td>${res.data.event[i].contactNumber}</td>
            <td><button type="button" onclick="getApproved('${res.data.event[i]._id}')" class="btn btn-primary">Primary</button></td>
          </tr>`
        }
        s += `</tbody>
        </table>`
        document.getElementById('allEvents').innerHTML = s

    })

}

function getApproved(id) {
    alert("approve")
    axios.get(`${url}/event/get/${id}`).then(res => {
        console.log(res.data.event)
        setStorage('event', res.data.event)
        s = `
        Contact Person:<input id="cp" value="${res.data.event.contactPerson}" type="text" /><br>
    Contact Number:<input id="cn" type="number"/><br>

    Event Title:<input id="et" type="text"><br>
    Event City:<input id="ct" type="text"><br>
    Event Address:<input id="ea" type="text"><br>
    Event Description:<input id="ed" type="text"><br>
    Event Start date:<input id="sd" type="date"><br>
    Event End date:<input id="ead" type="date"><br>
    Event publish date on app:<input id="pd" type="date"><br>
    Event un-publish date on app:<input id="ud" type="date"><br>
<button onclick="submitEvent()">Submit for review</button>`
    })

}

