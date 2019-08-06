const getStorage = (item) => (JSON.parse(sessionStorage.getItem(item)))

const setStorage = (item, data) => (sessionStorage.setItem(item, JSON.stringify(data)))

const removeStorage = (item) => (sessionStorage.removeItem(item))

var gotdata = false
var resdata
var url='https://joyletter.herokuapp.com'
// setInterval(getdata, 1000)
function waitPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            // alert("succes")
            resolve("Success!"); // Yay! Everything went well!
        },11000 );
    })
}
async function getdata() {
    OnLoad()
    if (!gotdata) {
        if (getStorage("data")) {
            document.getElementById('data').innerHTML = getStorage("data")
            gotdata = true

        }
        else {

            axios.get(`${url}/data`)
                .then(res => {
                    console.log(res)
                    
                        gotdata = true
                        resdata=res.data
                        document.getElementById('skip').innerHTML=`<button onclick="skip()" class="btn">Next <i class="fa fa-fast-forward"></i></button>`
                        setStorage("data", res.data)
                    

                })
                .catch(e => {
                    // alert("error")
                    // myFunction()

                })
        }
    }
}

function skip(){
    document.getElementById('data').innerHTML = resdata

    }



function OnLoad(bool) {

    document.addEventListener('deviceready', function () {
        //enabling zoom control
        cordova.plugins.ZoomControl.ZoomControl(bool);
        // enabling built in zoom control
        cordova.plugins.ZoomControl.setBuiltInZoomControls(bool);
        // enabling display zoom control
        cordova.plugins.ZoomControl.setDisplayZoomControls(bool);
        // enabling wide viewport
        cordova.plugins.ZoomControl.setUseWideViewPort(bool);
    }, function () {
        alert('error deviceready');
    });

}



function share() {
    axios.get(`${url}/message`).
        then(res => {

            window.plugins.socialsharing.share(res.data.message, null, null, res.data.link)

        })
        .catch(e => {
            alert(e)
        })
}

function events(){
    axios.get(`${url}/events`)
    .then(res=>{
        document.getElementById("events").innerHTML=res.data
    })
}

function OnLoad() {

    document.addEventListener('deviceready', function () {
        //enabling zoom control
        cordova.plugins.ZoomControl.ZoomControl("true");
        // enabling built in zoom control
        cordova.plugins.ZoomControl.setBuiltInZoomControls("true");
        // enabling display zoom control
        cordova.plugins.ZoomControl.setDisplayZoomControls("true");
        // enabling wide viewport
        cordova.plugins.ZoomControl.setUseWideViewPort("true");
    }, function () {
        alert('error deviceready');
    });

}
function load() {
    OnLoad("true");

    qrstr = window.location.search
    arr = []
    qrstr = qrstr.split('&')
    for (i = 0; i < qrstr.length; i++) {
        arr[i] = qrstr[i].split('=')[1];
    }
    console.log(arr)
    document.getElementById("view").innerHTML = `
    
    <div >  
     <iframe src="${arr[0]}" allowtransparency="true" width="100%" height="100%">Loading....</iframe>
      
    </div>
    
    `
    document.getElementById("desc").innerHTML += `
    <div color="brown" align="center"> 
        ${arr[1]}   ${arr[2]} 
        <button class="btn btn-secondary" style="float:left"; 
        onclick="window.location.href='help.html'">
        <i class="fa fa-question-circle fa-x" "></i>
        </button>
    <button class="btn btn-primary btnshare"
    onclick="share()">
    <i class="fa fa-share-alt" aria-hidden="true"></i>
</button>
</div>
    `
}




var shloks =[

    `जयाचा जनीं जन्म नामार्थ झाला |<br>
    जयानें सदा वास नामांत केला ||<br>
    जयाच्या मुखीं सर्वदा नामकीर्ति |<br>
    नमस्कार त्या ब्रह्मचैतन्यमूर्ति ||<br>`,
    
    `तपे तोषला सद्गुरु ज्ञानियांचा |<br>वदे वाढवी पंथ या राघवाचा||<br>
    कलीमाजिं मंदावली धर्मभक्ती |<br>नमस्कार त्या ब्रह्मचैतन्यमूर्ति ||<br>`,
    
    `
    विदेहापरी चालवोनी प्रपंचा |<br>मुमुक्षूजनांलागी अध्यात्म चर्चा ||<br>करोनी बहु लोक ते मेळवीती|<br>नमस्कार त्या ब्रह्मचैतन्यमूर्ति ||<br>`,
    
    `जशी माउली ग्रास देते मुलाला |<br>तसें बोधूनि ज्ञान पाजी जनांला ||<br>धरेसारिखी ज्या वसे नित्य शांति |<br>नमस्कार त्या ब्रह्मचैतन्यमूर्ति ||<br>`,
    
    `बहू अज्ञ जीवांप्रती उद्धरीलें |<br>तसें नास्तिकां सत्पथा लावियेलें ||<br>समस्तांमुखें नाम हे बोलवीती |<br>नमस्कार त्या ब्रह्मचैतन्यमूर्ति ||<br>`,
    
    `समाधी पहातां समाधान होतें |<br>तनू कष्टवी त्यासि आनंद देते ||<br>मनीं भावितां कामना पूर्ण होती |<br>नमस्कार त्या ब्रह्मचैतन्यमूर्ति ||<br>`,
    
    `मुखें बोलवी सद्गुरु बुद्धिदाता |<br>अहंभार हा वागवी कोण माथां ||<br>जडो भावना रामदासी सदा ती |<br>नमस्कार त्या ब्रह्मचैतन्यमूर्ति ||<br>`,
    
    `आवडीनें भावें हरिनाम घेसी |<br>तुझी चिंता त्यासी सर्व आहे ||<br>
    नको खेद करूं  कोणत्या गोष्टीचा |<br>पति लक्षुमीचा जाणतसे ||<br>
    सकल जीवांचा करितो सांभाळ |<br>तुज मोकलील ऐसें  नाहीं ||<br>
    जैशी स्थिति आहे तैशापरी राहे |<br>कौतुक तूं पाहे संचिताचें ||<br>
    एका जनार्दनीं भोग प्रारब्धाचा |<br>हरिकृपें त्याचा नाश झाला ||<br>`,
    
    `असें मारुती एक श्रीराम भक्त |<br>तयांच्या परि नां   कुणीही विरक्त ||<br>तयांचेच येथे प्रतिरूप आलें |<br>नमस्कार श्री दत्ता काका तुम्हाते ||<br>`,
    
    `जयानें आम्हां देऊनी नाममंत्र |<br>सत्कर्मी लाविले हे देह यंत्र ||<br>उपासना ही चैतन्य ब्रह्म |<br>नमस्कार श्री दत्ता काका तुम्हां ||<br>`,
    
    `
    तुझीं हास्यमुद्रा नयनी असु दे |<br>तुझे नाम हे प्रेम हृदयीं वसुदे ||<br>जयां वाटे चैतन्य ब्रह्म मिळावे |<br>देणे दत्ता काकांसी नितते स्मरावें ||<br>`,
    
    `
    गुरुर्ब्रम्हा गुरुर्विष्णुर्गुरुर्देवो महेश्वरः|<br>
     गुरुः साक्षात्परब्रह्म तस्मै श्रीगुरवे नमः||<br>`,
    
    `
    ‌ज्या ज्या स्थळीं हें मन जाय माझें |<br>
    त्या त्या स्थळीं हें निजरूप तूझें ||<br>
    मी ठेवितों मस्तक ज्या ठिकाणीं |<br>
    तेथें तुझे सद्गुरु पाय दोन्ही||<br>`,
    
    `
    चैतन्य चालवि जयास तयास जाणे |<br>जाणोनि पूर्ण सगुणास सदैव माने ||<br>
    'मी सिद्ध नाहिं, मुनि नाहिं,' म्हणे जनांला |<br>साष्टांग वंदिन सदा गुरुपादुकांला ||<br>`,
    
    `
    मनीं वासना भक्ति तूझी करावी |<br>कृपाळूपणें राघवें पूरवावी ||<br>
    वसावें मजअंतरीं नाम घेतां |<br>
    रघूनायका मागणें हेंचि आतां ||<br>`,
    
    `उपासनेला दृढ चालवावें |<br>
    भूदेव-संतांसि सदा लवावें ||<br>
    सत्कर्मयोगें वय घालवावें |<br>
    सर्वांमुखीं मंगल बोलवावें ||<br>`,
    
    `
    चालतां बोलतां धंदा करितां |<br>
    खातां जेवितां सुखी होतां ||<br>
    नाना उपभोग भोगितां |<br>नाम विसरों नये ||<br>श्रीराम ||<br>`,
    
    `
    नाम स्मरे निरंतर |<br>तें जाणावें पुण्यशरीर ||<br>महां दोषांचे गिरिवर |<br>रामनामें नासती ||<br>श्रीराम ||<br>`,
    
    `
    अनन्यता मज घडो स्वानंदरूपीं |<br>
    हें मागणें, करिं कृपा सदया स्वरूपी |<br>जीवत्वभाव न ढळे, बहु शीण झाला |<br>जोडोनि पाणि शरणागत सद्गुरुला ||<br>`,
    
    `
    एक तत्व नाम दृढ धरीं मना |<br>हरिसी करुणा येईल तुझी ||<br>
    तें नाम सोपें रे राम कृष्ण गोविंद |<br>वाचेसी सद् गद जपे आधीं ||<br>
    नामापरतें तत्त्व नाहीं रे अन्यथा |<br>वाया आणिक पंथा जासी झणी ||<br>
    ज्ञानदेवा मौन जपमाळ अंतरीं |<br>धरोनि श्रीहरी जपे सदा ||<br>`
    ]