url="https://joyletter-test.herokuapp.com"

function submitEvent(){
    cp=document.getElementById("cp").value
    cn=document.getElementById("cn").value
    et=document.getElementById("et").value
    ct=document.getElementById("ct").value
    ea=document.getElementById("ea").value
    ed=document.getElementById("ed").value
    pd=document.getElementById("pd").value
    ud=document.getElementById("ud").value
    ead=document.getElementById("ead").value
    sd=document.getElementById("sd").value


    if(cp&&cn&&et&&ct&&ea&&ed&&pd&&ud&&ead&&sd)
{

    data={
        startDate:sd,
        endDate:ead,
        publishDate:pd,
        unPublishDate:ud,
        title:et,
        description:ed,
        city:ct,
        address:ea,
        contactNumber:cn,
        contactPerson:cp,
    }
    console.groupCollapsed(data)
    axios.post(`${url}/event/save`)
}
else{alert("fill all details")}


}


function getApproved(){
    alert("approve")
    axios.get(`${url}/event/getall`).then(res=>{
        console.log(res)
    })
}

function aproved(id){
    
    cp=document.getElementById("cp").value
    cn=document.getElementById("cn").value
    et=document.getElementById("et").value
    ct=document.getElementById("ct").value
    ea=document.getElementById("ea").value
    ed=document.getElementById("ed").value
    pd=document.getElementById("pd").value
    ud=document.getElementById("ud").value
    ead=document.getElementById("ead").value
    sd=document.getElementById("sd").value


    if(cp&&cn&&et&&ct&&ea&&ed&&pd&&ud&&ead&&sd)
{

    data={
        id:id,
        startDate:sd,
        endDate:ead,
        publishDate:pd,
        unPublishDate:ud,
        title:et,
        description:ed,
        city:ct,
        address:ea,
        contactNumber:cn,
        contactPerson:cp,
        status:1
    }
    console.groupCollapsed(data)
    axios.post(`${url}/event/update`)
}
else{alert("fill all details")}


}


function disAproved(id){
    cp=document.getElementById("cp").value
    cn=document.getElementById("cn").value
    et=document.getElementById("et").value
    ct=document.getElementById("ct").value
    ea=document.getElementById("ea").value
    ed=document.getElementById("ed").value
    pd=document.getElementById("pd").value
    ud=document.getElementById("ud").value
    ead=document.getElementById("ead").value
    sd=document.getElementById("sd").value


    if(cp&&cn&&et&&ct&&ea&&ed&&pd&&ud&&ead&&sd)
{

    data={
        id:id,
        startDate:sd,
        endDate:ead,
        publishDate:pd,
        unPublishDate:ud,
        title:et,
        description:ed,
        city:ct,
        address:ea,
        contactNumber:cn,
        contactPerson:cp,
        status:-1
    }
    console.groupCollapsed(data)
    axios.post(`${url}/event/update`)
}
else{alert("fill all details")}


}