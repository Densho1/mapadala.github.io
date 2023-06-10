// have an objest that stores answers of the user!
// maybe need ng database (or dict) for reference number ; key: refnum, value: object w/ status
var database = {};
var buy_progress = 0;
var update_request = 0;
var data_availability = 0;
var answers = {};

function start() {

    let res_msg = document.createElement('div');
    res_msg.innerHTML = "Hello user! How can I help you today?";
    res_msg.setAttribute("class", "left");

    document.getElementById('msg_area').appendChild(res_msg);
    document.getElementById('send').addEventListener("click", (e) => {
        if (buy_progress == 0 && update_request == 0) handleresponse(e);
        else if (update_request == 1) handleupdate(e);
        else if (buy_progress == 1) buy1(e);
        else if (buy_progress == 2) buy2(e);
        else if (buy_progress == 3) buy3(e);
        else if (buy_progress == 4) buy4(e);
        else if (buy_progress == 5) buy5(e);
        else if (buy_progress == 100) buy100(e);
    });

    document.getElementById('input').addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById('send').click();
          }
    });
}

function buy1(e) {
    e.preventDefault();
    var req = document.getElementById('text').value;
    let res = "";

    if (req == undefined || req == "") {}
    if (req.includes('chat')) {buy_progress = 0; res = "Alright! Let's talk."; displaymsg(req, res)}
    if (/other/i.test(req) || /custom/i.test(req)) {
        res = "What custom map do you need?";
        buy_progress = 100;
        displaymsg(req, res);
    }
    else if (/map/i.test(req) || /charts/i.test(req) || /images/i.test(req) || /\d/.test(req) || /'table'/i.test(req)) {
        res = `Okay! That is noted. What is your region of interest?<br />
        Region I - Ilocos Region
        Region II - Cagayan Valley
        Region III - Central Luzon
        Region IV-A - CALABARZON
        Region IV-B - MIMAROPA Region
        Region V - Bicol Region
        Region VI - Western Visayas
        Region VII - Central Visayas
        Region VIII - Eastern Visayas
        Region IX - Zamboanga Peninsula
        Region X - Northern Mindanao
        Region XI - Davao Region
        Region XII - SOCCSKSARGEN
        Region XIII - Caraga
        NCR - National Capital Region
        CAR - Cordillera Administrative Region
        BARMM - Bangsamoro Autonomous Region in Muslim Mindanao
        `
        buy_progress += 1;
        answers['map'] = req;
        displaymsg(req, res);
    }
    else {
        res = "I didn't quite get that. Please choose a valid response or say \"I want to chat with you\" to activate the chat function";
        displaymsg(req, res);
    }
    
    //buy_progress += 1;
}

function buy2(e) {
    e.preventDefault();
    var req = document.getElementById('text').value;
    let res = "";

    if (req == undefined || req == "") {}
    if (req.includes('chat')) {buy_progress = 0; res = "Alright! Let's talk."; displaymsg(req, res)}
    else if (/region/i.test(req) || /ncr/i.test(req)) {
        res = "What is your city or municipality? Please Specify.<br />"
        displaymsg(req, res);
        buy_progress += 1;
        answers['region'] = req;
    }
    else {
        res = "I didn't quite get that. Please choose a valid response or say \"I want to chat with you\" to activate the chat function";
        displaymsg(req, res);
    }
    //city/municipality
}

function buy3(e) {
    e.preventDefault();
    var req = document.getElementById('text').value;
    let res = "";

    if (req == undefined || req == "") {}
    if (req.includes('chat')) {buy_progress = 0; res = "Alright! Let's talk."; displaymsg(req, res)}
    else if (/nautical charts/i.test(answers['map']) || /10/i.test(answers['map'])) {
        res = `Unfortunately, Nautical Charts are unavailable at the moment.<br /><br />
        Please inquire again after a few days or call NAMRIA at (02)1234567.
        `
        displaymsg(req, res);
        buy_progress = 0;
    }
    else if (RegExp(req, "i").test(cities)) {
        res = `What is your requested scale of map (1: ____)<br />
        1: 5000<br />
        1: 10,000<br />
        1: 50,000<br />
        1: 100,000<br />
        1: 250,000
       `
        displaymsg(req, res);
        buy_progress += 1;
        answers['city'] = req
    }
    else {
        res = "I didn't quite get that. Please choose a valid response or say \"I want to chat with you\" to activate the chat function";
        displaymsg(req, res);
    }
    //city/municipality
    //scale of map (1: ____)
}

function buy4(e) {
    e.preventDefault();
    var req = document.getElementById('text').value;
    let res = "";

    if (req == undefined || req == "") {}
    if (req.includes('chat')) {buy_progress = 0; res = "Alright! Let's talk."; displaymsg(req, res)}
    else if (req.includes('1:')) {
        res = `Here is a summary of your request:<br /><br />
        You have ordered a ${answers['map']} of ${answers['region']}, ${answers['city']} with a scale of ${req}.<br /><br />

        The total amount due is P1,500.
        <br /><br />
        If this is alright with you, please confirm with typing your NAME and CONTACT NUMBER`
        displaymsg(req, res);
        buy_progress += 1;
    }
    else {
        res = "I didn't quite get that. Please choose a valid response or say \"I want to chat with you\" to activate the chat function";
        displaymsg(req, res);
    }
    //summary of stuff
}

function buy5(e) {
    e.preventDefault();
    var req = document.getElementById('text').value;
    let res = "";

    if (req == undefined || req == "") {}
    if (req.includes('chat')) {buy_progress = 0; res = "Alright! Let's talk."; displaymsg(req, res)}
    else if (/yes/i.test(req)) {
        res = `For payment, please make a fund transfer to the following bank information:<br /><br />
        LandBank<br />
        NAMRIA Trust Fund<br />
        0707 2050 23<br /><br />
        After payment, please chat us with “I would like to upload proof of payment” so that we can validate your payment.<br /><br />
        To continue, type OK.
        `
        displaymsg(req, res);
        buy_progress = 100;
    }
    else {
        res = "I didn't quite get that. Please choose a valid response or say \"I want to chat with you\" to activate the chat function";
        displaymsg(req, res);
    }
    //payment
}

function buy100(e) {
    e.preventDefault();
    var req = document.getElementById('text').value;
    let res = ""; 
    
    if (req == undefined || req == "") {}
    else {
        res = `We've got your order! Your reference number is ${Date.now()}`;
        // TODO: put in database
        displaymsg(req, res);
        buy_progress = 0;
    }
}

async function handleresponse(e) 
    {
        e.preventDefault();
        var req = document.getElementById('text').value;
        let res = "";

        if (req == undefined || req == "") {

        }
        else if (/update/i.test(req)) {
            res = `Alright! What is your reference number?`
            update_request += 1;
            displaymsg(req, res);
        }
        else if (/upload/i.test(req) || /payment/i.test(req)) {
            res = `We'll have this feature available very soon! For now, please email transactions@namria.gov.ph for your proof of payment.`;
            displaymsg(req, res);
        }
        else if (/map/i.test(req) || /data/i.test(req)) { //you can put regex here
            res = `Alright! What kind of product do you need?<br />
            1. topographic maps<br />
            2. land cover maps<br />
            3. road maps<br />
            4. flood maps<br />
            5. provincial maps<br />
            6. regional map<br />
            7. tide & current table<br />
            8. comprehensive land use maps<br />
            9. volcanology related maps<br />
            10. nautical charts<br />
            11. satellite images<br />
            `
            buy_progress += 1;
            displaymsg(req, res)
        }
        else {
            //await axios.get(`https://api.monkeydev.com/fun`)
            await axios.get(`https://chatbot-api.gq/?message=${req}`).then(response => {
                console.log("GET Response");
                console.log(response.data);
                if (response.status === 200) {
                    res = response.data;
                }
            })
            displaymsg(req, res)
        }
    }

function displaymsg(req, res)
    {
        let msg_req = document.createElement('div');
        let msg_res = document.createElement('div');
        
        let Con1 = document.createElement('div');
        let Con2 = document.createElement('div');
        
        Con1.setAttribute("class", "msgCon1");
        Con2.setAttribute("class", "msgCon2");

        msg_req.innerHTML = req ;
        msg_res.innerHTML = res ;

        msg_req.setAttribute("class", "right");
        msg_res.setAttribute("class", "left");
        
        let message = document.getElementById('msg_area');

        message.appendChild(Con1);
        message.appendChild(Con2);

        Con1.appendChild(msg_req);
        Con2.appendChild(msg_res);

        document.getElementById('text').value = "";
        function scroll() {
            var scrollMsg = document.getElementById('msg_area');
            scrollMsg.scrollTop = scrollMsg.scrollHeight;
        }
        scroll();  
    }

function handleupdate(e) {
    e.preventDefault();
    var req = document.getElementById('text').value;
    let res = "";

    if (req == undefined || req == "") {}
    if (req.includes('chat')) {buy_progress = 0; res = "Alright! Let's talk."; displaymsg(req, res)}
    else if (/\d/.test(req)) {
        res = `The order with reference numner ${req} is currently in PROCESSING.<br /><br />
        Please wait an additional 2 more business days for for the processing of your order. Thank you.`
        displaymsg(req, res);
        update_request = 0;

    }
    else {
        res = "I didn't quite get that. Please choose a valid response or say \"I want to chat with you\" to activate the chat function";
        displaymsg(req, res);
    }
}

// function handleavail(e) {
//     e.preventDefault();
//     var req = document.getElementById('text').value;
//     let res = "";

//     if (req == undefined || req == "") {}
//     if (req.includes('chat')) {buy_progress = 0; res = "Alright! Let's talk."; displaymsg(req, res)}
//     else if (true) {
//         res =  ``
//     }
// }

let cities = `Bangued, Abra
Boliney, Abra
Bucay, Abra
Bucloc, Abra
Daguioman, Abra
Danglas, Abra
Dolores, Abra
La Paz, Abra
Lacub, Abra
Lagangilang, Abra
Lagayan, Abra
Langiden, Abra
Licuan-Baay, Abra
Luba, Abra
Malibcong, Abra
Manabo, Abra
Peñarrubia, Abra
Pidigan, Abra
Pilar, Abra
Sallapadan, Abra
San Isidro, Abra
San Juan, Abra
San Quintin, Abra
Tayum, Abra
Tineg, Abra
Tubo, Abra
Villaviciosa, Abra
Buenavista, Agusan del Norte
Carmen, Agusan del Norte
Jabonga, Agusan del Norte
Kitcharao, Agusan del Norte
Las Nieves, Agusan del Norte
Magallanes, Agusan del Norte
Nasipit, Agusan del Norte
Remedios T. Romualdez, Agusan del Norte
Santiago, Agusan del Norte
Tubay, Agusan del Norte
Bunawan, Agusan del Sur
Esperanza, Agusan del Sur
La Paz, Agusan del Sur
Loreto, Agusan del Sur
Prosperidad, Agusan del Sur
Rosario, Agusan del Sur
San Francisco, Agusan del Sur
San Luis, Agusan del Sur
Santa Josefa, Agusan del Sur
Sibagat, Agusan del Sur
Talacogon, Agusan del Sur
Trento, Agusan del Sur
Veruela, Agusan del Sur
Altavas, Aklan
Balete, Aklan
Banga, Aklan
Batan, Aklan
Buruanga, Aklan
Ibajay, Aklan
Kalibo, Aklan
Lezo, Aklan
Libacao, Aklan
Madalag, Aklan
Makato, Aklan
Malay, Aklan
Malinao, Aklan
Nabas, Aklan
New Washington, Aklan
Numancia, Aklan
Tangalan, Aklan
Bacacay, Albay
Camalig, Albay
Daraga, Albay
Guinobatan, Albay
Jovellar, Albay
Libon, Albay
Malilipot, Albay
Malinao, Albay
Manito, Albay
Oas, Albay
Pio Duran, Albay
Polangui, Albay
Rapu-Rapu, Albay
Santo Domingo, Albay
Tiwi, Albay
Anini-y, Antique
Barbaza, Antique
Belison, Antique
Bugasong, Antique
Caluya, Antique
Culasi, Antique
Hamtic, Antique
Laua-an, Antique
Libertad, Antique
Pandan, Antique
Patnongon, Antique
San Jose de Buenavista, Antique
San Remigio, Antique
Sebaste, Antique
Sibalom, Antique
Tibiao, Antique
Tobias Fornier, Antique
Valderrama, Antique
Calanasan, Apayao
Conner, Apayao
Flora, Apayao
Kabugao, Apayao
Luna, Apayao
Pudtol, Apayao
Santa Marcela, Apayao
Baler, Aurora
Casiguran, Aurora
Dilasag, Aurora
Dinalungan, Aurora
Dingalan, Aurora
Dipaculao, Aurora
Maria Aurora, Aurora
San Luis, Aurora
Akbar, Basilan
Al-Barka, Basilan
Hadji Mohammad Ajul, Basilan
Hadji Muhtamad, Basilan
Lantawan, Basilan
Maluso, Basilan
Sumisip, Basilan
Tabuan-Lasa, Basilan
Tipo-Tipo, Basilan
Tuburan, Basilan
Ungkaya Pukan, Basilan
Abucay, Bataan
Bagac, Bataan
Dinalupihan, Bataan
Hermosa, Bataan
Limay, Bataan
Mariveles, Bataan
Morong, Bataan
Orani, Bataan
Orion, Bataan
Pilar, Bataan
Samal, Bataan
Basco, Batanes
Itbayat, Batanes
Ivana, Batanes
Mahatao, Batanes
Sabtang, Batanes
Uyugan, Batanes
Agoncillo, Batangas
Alitagtag, Batangas
Balayan, Batangas
Balete, Batangas
Bauan, Batangas
Calaca, Batangas
Calatagan, Batangas
Cuenca, Batangas
Ibaan, Batangas
Laurel, Batangas
Lemery, Batangas
Lian, Batangas
Lobo, Batangas
Mabini, Batangas
Malvar, Batangas
Mataasnakahoy, Batangas
Nasugbu, Batangas
Padre Garcia, Batangas
Rosario, Batangas
San Jose, Batangas
San Juan, Batangas
San Luis, Batangas
San Nicolas, Batangas
San Pascual, Batangas
Santa Teresita, Batangas
Taal, Batangas
Talisay, Batangas
Taysan, Batangas
Tingloy, Batangas
Tuy, Batangas
Atok, Benguet
Bakun, Benguet
Bokod, Benguet
Buguias, Benguet
Itogon, Benguet
Kabayan, Benguet
Kapangan, Benguet
Kibungan, Benguet
La Trinidad, Benguet
Mankayan, Benguet
Sablan, Benguet
Tuba, Benguet
Tublay, Benguet
Almeria, Biliran
Biliran, Biliran
Cabucgayan, Biliran
Caibiran, Biliran
Culaba, Biliran
Kawayan, Biliran
Maripipi, Biliran
Naval, Biliran
Alburquerque, Bohol
Alicia, Bohol
Anda, Bohol
Antequera, Bohol
Baclayon, Bohol
Balilihan, Bohol
Batuan, Bohol
Bien Unido, Bohol
Bilar, Bohol
Buenavista, Bohol
Calape, Bohol
Candijay, Bohol
Carmen, Bohol
Catigbian, Bohol
Clarin, Bohol
Corella, Bohol
Cortes, Bohol
Dagohoy, Bohol
Danao, Bohol
Dauis, Bohol
Dimiao, Bohol
Duero, Bohol
Garcia Hernandez, Bohol
Getafe, Bohol
Guindulman, Bohol
Inabanga, Bohol
Jagna, Bohol
Lila, Bohol
Loay, Bohol
Loboc, Bohol
Loon, Bohol
Mabini, Bohol
Maribojoc, Bohol
Panglao, Bohol
Pilar, Bohol
President Carlos P. Garcia, Bohol
Sagbayan, Bohol
San Isidro, Bohol
San Miguel, Bohol
Sevilla, Bohol
Sierra Bullones, Bohol
Sikatuna, Bohol
Talibon, Bohol
Trinidad, Bohol
Tubigon, Bohol
Ubay, Bohol
Valencia, Bohol
Baungon, Bukidnon
Cabanglasan, Bukidnon
Damulog, Bukidnon
Dangcagan, Bukidnon
Don Carlos, Bukidnon
Impasugong, Bukidnon
Kadingilan, Bukidnon
Kalilangan, Bukidnon
Kibawe, Bukidnon
Kitaotao, Bukidnon
Lantapan, Bukidnon
Libona, Bukidnon
Malitbog, Bukidnon
Manolo Fortich, Bukidnon
Maramag, Bukidnon
Pangantucan, Bukidnon
Quezon, Bukidnon
San Fernando, Bukidnon
Sumilao, Bukidnon
Talakag, Bukidnon
Angat, Bulacan
Balagtas, Bulacan
Baliuag, Bulacan
Bocaue, Bulacan
Bulakan, Bulacan
Bustos, Bulacan
Calumpit, Bulacan
Doña Remedios Trinidad, Bulacan
Guiguinto, Bulacan
Hagonoy, Bulacan
Marilao, Bulacan
Norzagaray, Bulacan
Obando, Bulacan
Pandi, Bulacan
Paombong, Bulacan
Plaridel, Bulacan
Pulilan, Bulacan
San Ildefonso, Bulacan
San Miguel, Bulacan
San Rafael, Bulacan
Santa Maria, Bulacan
Abulug, Cagayan
Alcala, Cagayan
Allacapan, Cagayan
Amulung, Cagayan
Aparri, Cagayan
Baggao, Cagayan
Ballesteros, Cagayan
Buguey, Cagayan
Calayan, Cagayan
Camalaniugan, Cagayan
Claveria, Cagayan
Enrile, Cagayan
Gattaran, Cagayan
Gonzaga, Cagayan
Iguig, Cagayan
Lal-lo, Cagayan
Lasam, Cagayan
Pamplona, Cagayan
Peñablanca, Cagayan
Piat, Cagayan
Rizal, Cagayan
Sanchez-Mira, Cagayan
Santa Ana, Cagayan
Santa Praxedes, Cagayan
Santa Teresita, Cagayan
Santo Niño, Cagayan
Solana, Cagayan
Tuao, Cagayan
Basud, Camarines Norte
Capalonga, Camarines Norte
Daet, Camarines Norte
Jose Panganiban, Camarines Norte
Labo, Camarines Norte
Mercedes, Camarines Norte
Paracale, Camarines Norte
San Lorenzo Ruiz, Camarines Norte
San Vicente, Camarines Norte
Santa Elena, Camarines Norte
Talisay, Camarines Norte
Vinzons, Camarines Norte
Baao, Camarines Sur
Balatan, Camarines Sur
Bato, Camarines Sur
Bombon, Camarines Sur
Buhi, Camarines Sur
Bula, Camarines Sur
Cabusao, Camarines Sur
Calabanga, Camarines Sur
Camaligan, Camarines Sur
Canaman, Camarines Sur
Caramoan, Camarines Sur
Del Gallego, Camarines Sur
Gainza, Camarines Sur
Garchitorena, Camarines Sur
Goa, Camarines Sur
Lagonoy, Camarines Sur
Libmanan, Camarines Sur
Lupi, Camarines Sur
Magarao, Camarines Sur
Milaor, Camarines Sur
Minalabac, Camarines Sur
Nabua, Camarines Sur
Ocampo, Camarines Sur
Pamplona, Camarines Sur
Pasacao, Camarines Sur
Pili, Camarines Sur
Presentacion, Camarines Sur
Ragay, Camarines Sur
Sagñay, Camarines Sur
San Fernando, Camarines Sur
San Jose, Camarines Sur
Sipocot, Camarines Sur
Siruma, Camarines Sur
Tigaon, Camarines Sur
Tinambac, Camarines Sur
Catarman, Camiguin
Guinsiliban, Camiguin
Mahinog, Camiguin
Mambajao, Camiguin
Sagay, Camiguin
Cuartero, Capiz
Dao, Capiz
Dumalag, Capiz
Dumarao, Capiz
Ivisan, Capiz
Jamindan, Capiz
Maayon, Capiz
Mambusao, Capiz
Panay, Capiz
Panitan, Capiz
Pilar, Capiz
Pontevedra, Capiz
President Roxas, Capiz
Sapian, Capiz
Sigma, Capiz
Tapaz, Capiz
Bagamanoc, Catanduanes
Baras, Catanduanes
Bato, Catanduanes
Caramoran, Catanduanes
Gigmoto, Catanduanes
Pandan, Catanduanes
Panganiban, Catanduanes
San Andres, Catanduanes
San Miguel, Catanduanes
Viga, Catanduanes
Virac, Catanduanes
Alfonso, Cavite
Amadeo, Cavite
Carmona, Cavite
General Emilio Aguinaldo, Cavite
General Mariano Alvarez, Cavite
Indang, Cavite
Kawit, Cavite
Magallanes, Cavite
Maragondon, Cavite
Mendez, Cavite
Naic, Cavite
Noveleta, Cavite
Rosario, Cavite
Silang, Cavite
Tanza, Cavite
Ternate, Cavite
Alcantara, Cebu
Alcoy, Cebu
Alegria, Cebu
Aloguinsan, Cebu
Argao, Cebu
Asturias, Cebu
Badian, Cebu
Balamban, Cebu
Bantayan, Cebu
Barili, Cebu
Boljoon, Cebu
Borbon, Cebu
Carmen, Cebu
Catmon, Cebu
Compostela, Cebu
Consolacion, Cebu
Cordova, Cebu
Daanbantayan, Cebu
Dalaguete, Cebu
Dumanjug, Cebu
Ginatilan, Cebu
Liloan, Cebu
Madridejos, Cebu
Malabuyoc, Cebu
Medellin, Cebu
Minglanilla, Cebu
Moalboal, Cebu
Oslob, Cebu
Pilar, Cebu
Pinamungajan, Cebu
Poro, Cebu
Ronda, Cebu
Samboan, Cebu
San Fernando, Cebu
San Francisco, Cebu
San Remigio, Cebu
Santa Fe, Cebu
Santander, Cebu
Sibonga, Cebu
Sogod, Cebu
Tabogon, Cebu
Tabuelan, Cebu
Tuburan, Cebu
Tudela, Cebu
Compostela, Davao de Oro
Laak, Davao de Oro
Mabini, Davao de Oro
Maco, Davao de Oro
Maragusan, Davao de Oro
Mawab, Davao de Oro
Monkayo, Davao de Oro
Montevista, Davao de Oro
Nabunturan, Davao de Oro
New Bataan, Davao de Oro
Pantukan, Davao de Oro
Alamada, Cotabato
Aleosan, Cotabato
Antipas, Cotabato
Arakan, Cotabato
Banisilan, Cotabato
Carmen, Cotabato
Kabacan, Cotabato
Libungan, Cotabato
M'lang, Cotabato
Magpet, Cotabato
Makilala, Cotabato
Matalam, Cotabato
Midsayap, Cotabato
Pigcawayan, Cotabato
Pikit, Cotabato
President Roxas, Cotabato
Tulunan, Cotabato
Asuncion, Davao del Norte
Braulio E. Dujali, Davao del Norte
Carmen, Davao del Norte
Kapalong, Davao del Norte
New Corella, Davao del Norte
San Isidro, Davao del Norte
Santo Tomas, Davao del Norte
Talaingod, Davao del Norte
Bansalan, Davao del Sur
Hagonoy, Davao del Sur
Kiblawan, Davao del Sur
Magsaysay, Davao del Sur
Malalag, Davao del Sur
Matanao, Davao del Sur
Padada, Davao del Sur
Santa Cruz, Davao del Sur
Sulop, Davao del Sur
Don Marcelino, Davao Occidental
Jose Abad Santos, Davao Occidental
Malita, Davao Occidental
Santa Maria, Davao Occidental
Sarangani, Davao Occidental
Baganga, Davao Oriental
Banaybanay, Davao Oriental
Boston, Davao Oriental
Caraga, Davao Oriental
Cateel, Davao Oriental
Governor Generoso, Davao Oriental
Lupon, Davao Oriental
Manay, Davao Oriental
San Isidro, Davao Oriental
Tarragona, Davao Oriental
Basilisa, Dinagat Islands
Cagdianao, Dinagat Islands
Dinagat, Dinagat Islands
Libjo, Dinagat Islands
Loreto, Dinagat Islands
San Jose, Dinagat Islands
Tubajon, Dinagat Islands
Arteche, Eastern Samar
Balangiga, Eastern Samar
Balangkayan, Eastern Samar
Can-avid, Eastern Samar
Dolores, Eastern Samar
General MacArthur, Eastern Samar
Giporlos, Eastern Samar
Guiuan, Eastern Samar
Hernani, Eastern Samar
Jipapad, Eastern Samar
Lawaan, Eastern Samar
Llorente, Eastern Samar
Maslog, Eastern Samar
Maydolong, Eastern Samar
Mercedes, Eastern Samar
Oras, Eastern Samar
Quinapondan, Eastern Samar
Salcedo, Eastern Samar
San Julian, Eastern Samar
San Policarpo, Eastern Samar
Sulat, Eastern Samar
Taft, Eastern Samar
Buenavista, Guimaras
Jordan, Guimaras
Nueva Valencia, Guimaras
San Lorenzo, Guimaras
Sibunag, Guimaras
Aguinaldo, Ifugao
Alfonso Lista, Ifugao
Asipulo, Ifugao
Banaue, Ifugao
Hingyon, Ifugao
Hungduan, Ifugao
Kiangan, Ifugao
Lagawe, Ifugao
Lamut, Ifugao
Mayoyao, Ifugao
Tinoc, Ifugao
Adams, Ilocos Norte
Bacarra, Ilocos Norte
Badoc, Ilocos Norte
Bangui, Ilocos Norte
Banna, Ilocos Norte
Burgos, Ilocos Norte
Carasi, Ilocos Norte
Currimao, Ilocos Norte
Dingras, Ilocos Norte
Dumalneg, Ilocos Norte
Marcos, Ilocos Norte
Nueva Era, Ilocos Norte
Pagudpud, Ilocos Norte
Paoay, Ilocos Norte
Pasuquin, Ilocos Norte
Piddig, Ilocos Norte
Pinili, Ilocos Norte
San Nicolas, Ilocos Norte
Sarrat, Ilocos Norte
Solsona, Ilocos Norte
Vintar, Ilocos Norte
Alilem, Ilocos Sur
Banayoyo, Ilocos Sur
Bantay, Ilocos Sur
Burgos, Ilocos Sur
Cabugao, Ilocos Sur
Caoayan, Ilocos Sur
Cervantes, Ilocos Sur
Galimuyod, Ilocos Sur
Gregorio del Pilar, Ilocos Sur
Lidlidda, Ilocos Sur
Magsingal, Ilocos Sur
Nagbukel, Ilocos Sur
Narvacan, Ilocos Sur
Quirino, Ilocos Sur
Salcedo, Ilocos Sur
San Emilio, Ilocos Sur
San Esteban, Ilocos Sur
San Ildefonso, Ilocos Sur
San Juan, Ilocos Sur
San Vicente, Ilocos Sur
Santa, Ilocos Sur
Santa Catalina, Ilocos Sur
Santa Cruz, Ilocos Sur
Santa Lucia, Ilocos Sur
Santa Maria, Ilocos Sur
Santiago, Ilocos Sur
Santo Domingo, Ilocos Sur
Sigay, Ilocos Sur
Sinait, Ilocos Sur
Sugpon, Ilocos Sur
Suyo, Ilocos Sur
Tagudin, Ilocos Sur
Ajuy, Iloilo
Alimodian, Iloilo
Anilao, Iloilo
Badiangan, Iloilo
Balasan, Iloilo
Banate, Iloilo
Barotac Nuevo, Iloilo
Barotac Viejo, Iloilo
Batad, Iloilo
Bingawan, Iloilo
Cabatuan, Iloilo
Calinog, Iloilo
Carles, Iloilo
Concepcion, Iloilo
Dingle, Iloilo
Dueñas, Iloilo
Dumangas, Iloilo
Estancia, Iloilo
Guimbal, Iloilo
Igbaras, Iloilo
Janiuay, Iloilo
Lambunao, Iloilo
Leganes, Iloilo
Lemery, Iloilo
Leon, Iloilo
Maasin, Iloilo
Miagao, Iloilo
Mina, Iloilo
New Lucena, Iloilo
Oton, Iloilo
Pavia, Iloilo
Pototan, Iloilo
San Dionisio, Iloilo
San Enrique, Iloilo
San Joaquin, Iloilo
San Miguel, Iloilo
San Rafael, Iloilo
Santa Barbara, Iloilo
Sara, Iloilo
Tigbauan, Iloilo
Tubungan, Iloilo
Zarraga, Iloilo
Alicia, Isabela
Angadanan, Isabela
Aurora, Isabela
Benito Soliven, Isabela
Burgos, Isabela
Cabagan, Isabela
Cabatuan, Isabela
Cordon, Isabela
Delfin Albano, Isabela
Dinapigue, Isabela
Divilacan, Isabela
Echague, Isabela
Gamu, Isabela
Jones, Isabela
Luna, Isabela
Maconacon, Isabela
Mallig, Isabela
Naguilian, Isabela
Palanan, Isabela
Quezon, Isabela
Quirino, Isabela
Ramon, Isabela
Reina Mercedes, Isabela
Roxas, Isabela
San Agustin, Isabela
San Guillermo, Isabela
San Isidro, Isabela
San Manuel, Isabela
San Mariano, Isabela
San Mateo, Isabela
San Pablo, Isabela
Santa Maria, Isabela
Santo Tomas, Isabela
Tumauini, Isabela
Balbalan, Kalinga
Lubuagan, Kalinga
Pasil, Kalinga
Pinukpuk, Kalinga
Rizal, Kalinga
Tanudan, Kalinga
Tinglayan, Kalinga
Agoo, La Union
Aringay, La Union
Bacnotan, La Union
Bagulin, La Union
Balaoan, La Union
Bangar, La Union
Bauang, La Union
Burgos, La Union
Caba, La Union
Luna, La Union
Naguilian, La Union
Pugo, La Union
Rosario, La Union
San Gabriel, La Union
San Juan, La Union
Santo Tomas, La Union
Santol, La Union
Sudipen, La Union
Tubao, La Union
Alaminos, Laguna
Bay, Laguna
Calauan, Laguna
Cavinti, Laguna
Famy, Laguna
Kalayaan, Laguna
Liliw, Laguna
Los Baños, Laguna
Luisiana, Laguna
Lumban, Laguna
Mabitac, Laguna
Magdalena, Laguna
Majayjay, Laguna
Nagcarlan, Laguna
Paete, Laguna
Pagsanjan, Laguna
Pakil, Laguna
Pangil, Laguna
Pila, Laguna
Rizal, Laguna
Santa Cruz, Laguna
Santa Maria, Laguna
Siniloan, Laguna
Victoria, Laguna
Bacolod, Lanao del Norte
Baloi, Lanao del Norte
Baroy, Lanao del Norte
Kapatagan, Lanao del Norte
Kauswagan, Lanao del Norte
Kolambugan, Lanao del Norte
Lala, Lanao del Norte
Linamon, Lanao del Norte
Magsaysay, Lanao del Norte
Maigo, Lanao del Norte
Matungao, Lanao del Norte
Munai, Lanao del Norte
Nunungan, Lanao del Norte
Pantao Ragat, Lanao del Norte
Pantar, Lanao del Norte
Poona Piagapo, Lanao del Norte
Salvador, Lanao del Norte
Sapad, Lanao del Norte
Sultan Naga Dimaporo, Lanao del Norte
Tagoloan, Lanao del Norte
Tangcal, Lanao del Norte
Tubod, Lanao del Norte
Amai Manabilang, Lanao del Sur
Bacolod-Kalawi, Lanao del Sur
Balabagan, Lanao del Sur
Balindong, Lanao del Sur
Bayang, Lanao del Sur
Binidayan, Lanao del Sur
Buadiposo-Buntong, Lanao del Sur
Bubong, Lanao del Sur
Butig, Lanao del Sur
Calanogas, Lanao del Sur
Ditsaan-Ramain, Lanao del Sur
Ganassi, Lanao del Sur
Kapai, Lanao del Sur
Kapatagan, Lanao del Sur
Lumba-Bayabao, Lanao del Sur
Lumbaca-Unayan, Lanao del Sur
Lumbatan, Lanao del Sur
Lumbayanague, Lanao del Sur
Madalum, Lanao del Sur
Madamba, Lanao del Sur
Maguing, Lanao del Sur
Malabang, Lanao del Sur
Marantao, Lanao del Sur
Marogong, Lanao del Sur
Masiu, Lanao del Sur
Mulondo, Lanao del Sur
Pagayawan, Lanao del Sur
Piagapo, Lanao del Sur
Picong, Lanao del Sur
Poona Bayabao, Lanao del Sur
Pualas, Lanao del Sur
Saguiaran, Lanao del Sur
Sultan Dumalondong, Lanao del Sur
Tagoloan II, Lanao del Sur
Tamparan, Lanao del Sur
Taraka, Lanao del Sur
Tubaran, Lanao del Sur
Tugaya, Lanao del Sur
Wao, Lanao del Sur
Abuyog, Leyte
Alangalang, Leyte
Albuera, Leyte
Babatngon, Leyte
Barugo, Leyte
Bato, Leyte
Burauen, Leyte
Calubian, Leyte
Capoocan, Leyte
Carigara, Leyte
Dagami, Leyte
Dulag, Leyte
Hilongos, Leyte
Hindang, Leyte
Inopacan, Leyte
Isabel, Leyte
Jaro, Leyte
Javier, Leyte
Julita, Leyte
Kananga, Leyte
La Paz, Leyte
Leyte, Leyte
MacArthur, Leyte
Mahaplag, Leyte
Matag-ob, Leyte
Matalom, Leyte
Mayorga, Leyte
Merida, Leyte
Palo, Leyte
Palompon, Leyte
Pastrana, Leyte
San Isidro, Leyte
San Miguel, Leyte
Santa Fe, Leyte
Tabango, Leyte
Tabontabon, Leyte
Tanauan, Leyte
Tolosa, Leyte
Tunga, Leyte
Villaba, Leyte
Ampatuan, Maguindanao
Barira, Maguindanao
Buldon, Maguindanao
Buluan, Maguindanao
Datu Abdullah Sangki, Maguindanao
Datu Anggal Midtimbang, Maguindanao
Datu Blah T. Sinsuat, Maguindanao
Datu Hoffer Ampatuan, Maguindanao
Datu Montawal, Maguindanao
Datu Odin Sinsuat, Maguindanao
Datu Paglas, Maguindanao
Datu Piang, Maguindanao
Datu Salibo, Maguindanao
Datu Saudi-Ampatuan, Maguindanao
Datu Unsay, Maguindanao
General Salipada K. Pendatun, Maguindanao
Guindulungan, Maguindanao
Kabuntalan, Maguindanao
Mamasapano, Maguindanao
Mangudadatu, Maguindanao
Matanog, Maguindanao
Northern Kabuntalan, Maguindanao
Pagalungan, Maguindanao
Paglat, Maguindanao
Pandag, Maguindanao
Parang, Maguindanao
Rajah Buayan, Maguindanao
Shariff Aguak, Maguindanao
Shariff Saydona Mustapha, Maguindanao
South Upi, Maguindanao
Sultan Kudarat, Maguindanao
Sultan Mastura, Maguindanao
Sultan sa Barongis, Maguindanao
Sultan Sumagka, Maguindanao
Talayan, Maguindanao
Upi, Maguindanao
Boac, Marinduque
Buenavista, Marinduque
Gasan, Marinduque
Mogpog, Marinduque
Santa Cruz, Marinduque
Torrijos, Marinduque
Aroroy, Masbate
Baleno, Masbate
Balud, Masbate
Batuan, Masbate
Cataingan, Masbate
Cawayan, Masbate
Claveria, Masbate
Dimasalang, Masbate
Esperanza, Masbate
Mandaon, Masbate
Milagros, Masbate
Mobo, Masbate
Monreal, Masbate
Palanas, Masbate
Pio V. Corpuz, Masbate
Placer, Masbate
San Fernando, Masbate
San Jacinto, Masbate
San Pascual, Masbate
Uson, Masbate
Aloran, Misamis Occidental
Baliangao, Misamis Occidental
Bonifacio, Misamis Occidental
Calamba, Misamis Occidental
Clarin, Misamis Occidental
Concepcion, Misamis Occidental
Don Victoriano Chiongbian, Misamis Occidental
Jimenez, Misamis Occidental
Lopez Jaena, Misamis Occidental
Panaon, Misamis Occidental
Plaridel, Misamis Occidental
Sapang Dalaga, Misamis Occidental
Sinacaban, Misamis Occidental
Tudela, Misamis Occidental
Alubijid, Misamis Oriental
Balingasag, Misamis Oriental
Balingoan, Misamis Oriental
Binuangan, Misamis Oriental
Claveria, Misamis Oriental
Gitagum, Misamis Oriental
Initao, Misamis Oriental
Jasaan, Misamis Oriental
Kinoguitan, Misamis Oriental
Lagonglong, Misamis Oriental
Laguindingan, Misamis Oriental
Libertad, Misamis Oriental
Lugait, Misamis Oriental
Magsaysay, Misamis Oriental
Manticao, Misamis Oriental
Medina, Misamis Oriental
Naawan, Misamis Oriental
Opol, Misamis Oriental
Salay, Misamis Oriental
Sugbongcogon, Misamis Oriental
Tagoloan, Misamis Oriental
Talisayan, Misamis Oriental
Villanueva, Misamis Oriental
Barlig, Mountain Province
Bauko, Mountain Province
Besao, Mountain Province
Bontoc, Mountain Province
Natonin, Mountain Province
Paracelis, Mountain Province
Sabangan, Mountain Province
Sadanga, Mountain Province
Sagada, Mountain Province
Tadian, Mountain Province
Pateros
Binalbagan, Negros Occidental
Calatrava, Negros Occidental
Candoni, Negros Occidental
Cauayan, Negros Occidental
Enrique B. Magalona, Negros Occidental
Hinigaran, Negros Occidental
Hinoba-an, Negros Occidental
Ilog, Negros Occidental
Isabela, Negros Occidental
La Castellana, Negros Occidental
Manapla, Negros Occidental
Moises Padilla, Negros Occidental
Murcia, Negros Occidental
Pontevedra, Negros Occidental
Pulupandan, Negros Occidental
Salvador Benedicto, Negros Occidental
San Enrique, Negros Occidental
Toboso, Negros Occidental
Valladolid, Negros Occidental
Amlan, Negros Oriental
Ayungon, Negros Oriental
Bacong, Negros Oriental
Basay, Negros Oriental
Bindoy, Negros Oriental
Dauin, Negros Oriental
Jimalalud, Negros Oriental
La Libertad, Negros Oriental
Mabinay, Negros Oriental
Manjuyod, Negros Oriental
Pamplona, Negros Oriental
San Jose, Negros Oriental
Santa Catalina, Negros Oriental
Siaton, Negros Oriental
Sibulan, Negros Oriental
Tayasan, Negros Oriental
Valencia, Negros Oriental
Vallehermoso, Negros Oriental
Zamboanguita, Negros Oriental
Allen, Northern Samar
Biri, Northern Samar
Bobon, Northern Samar
Capul, Northern Samar
Catarman, Northern Samar
Catubig, Northern Samar
Gamay, Northern Samar
Laoang, Northern Samar
Lapinig, Northern Samar
Las Navas, Northern Samar
Lavezares, Northern Samar
Lope de Vega, Northern Samar
Mapanas, Northern Samar
Mondragon, Northern Samar
Palapag, Northern Samar
Pambujan, Northern Samar
Rosario, Northern Samar
San Antonio, Northern Samar
San Isidro, Northern Samar
San Jose, Northern Samar
San Roque, Northern Samar
San Vicente, Northern Samar
Silvino Lobos, Northern Samar
Victoria, Northern Samar
Aliaga, Nueva Ecija
Bongabon, Nueva Ecija
Cabiao, Nueva Ecija
Carranglan, Nueva Ecija
Cuyapo, Nueva Ecija
Gabaldon, Nueva Ecija
General Mamerto Natividad, Nueva Ecija
General Tinio, Nueva Ecija
Guimba, Nueva Ecija
Jaen, Nueva Ecija
Laur, Nueva Ecija
Licab, Nueva Ecija
Llanera, Nueva Ecija
Lupao, Nueva Ecija
Nampicuan, Nueva Ecija
Pantabangan, Nueva Ecija
Peñaranda, Nueva Ecija
Quezon, Nueva Ecija
Rizal, Nueva Ecija
San Antonio, Nueva Ecija
San Isidro, Nueva Ecija
San Leonardo, Nueva Ecija
Santa Rosa, Nueva Ecija
Santo Domingo, Nueva Ecija
Talavera, Nueva Ecija
Talugtug, Nueva Ecija
Zaragoza, Nueva Ecija
Alfonso Castañeda, Nueva Vizcaya
Ambaguio, Nueva Vizcaya
Aritao, Nueva Vizcaya
Bagabag, Nueva Vizcaya
Bambang, Nueva Vizcaya
Bayombong, Nueva Vizcaya
Diadi, Nueva Vizcaya
Dupax del Norte, Nueva Vizcaya
Dupax del Sur, Nueva Vizcaya
Kasibu, Nueva Vizcaya
Kayapa, Nueva Vizcaya
Quezon, Nueva Vizcaya
Santa Fe, Nueva Vizcaya
Solano, Nueva Vizcaya
Villaverde, Nueva Vizcaya
Abra de Ilog, Occidental Mindoro
Calintaan, Occidental Mindoro
Looc, Occidental Mindoro
Lubang, Occidental Mindoro
Magsaysay, Occidental Mindoro
Mamburao, Occidental Mindoro
Paluan, Occidental Mindoro
Rizal, Occidental Mindoro
Sablayan, Occidental Mindoro
San Jose, Occidental Mindoro
Santa Cruz, Occidental Mindoro
Baco, Oriental Mindoro
Bansud, Oriental Mindoro
Bongabong, Oriental Mindoro
Bulalacao, Oriental Mindoro
Gloria, Oriental Mindoro
Mansalay, Oriental Mindoro
Naujan, Oriental Mindoro
Pinamalayan, Oriental Mindoro
Pola, Oriental Mindoro
Puerto Galera, Oriental Mindoro
Roxas, Oriental Mindoro
San Teodoro, Oriental Mindoro
Socorro, Oriental Mindoro
Victoria, Oriental Mindoro
Aborlan, Palawan
Agutaya, Palawan
Araceli, Palawan
Balabac, Palawan
Bataraza, Palawan
Brooke's Point, Palawan
Busuanga, Palawan
Cagayancillo, Palawan
Coron, Palawan
Culion, Palawan
Cuyo, Palawan
Dumaran, Palawan
El Nido, Palawan
Kalayaan, Palawan
Linapacan, Palawan
Magsaysay, Palawan
Narra, Palawan
Quezon, Palawan
Rizal, Palawan
Roxas, Palawan
San Vicente, Palawan
Sofronio Española, Palawan
Taytay, Palawan
Apalit, Pampanga
Arayat, Pampanga
Bacolor, Pampanga
Candaba, Pampanga
Floridablanca, Pampanga
Guagua, Pampanga
Lubao, Pampanga
Macabebe, Pampanga
Magalang, Pampanga
Masantol, Pampanga
Mexico, Pampanga
Minalin, Pampanga
Porac, Pampanga
San Luis, Pampanga
San Simon, Pampanga
Santa Ana, Pampanga
Santa Rita, Pampanga
Santo Tomas, Pampanga
Sasmuan, Pampanga
Agno, Pangasinan
Aguilar, Pangasinan
Alcala, Pangasinan
Anda, Pangasinan
Asingan, Pangasinan
Balungao, Pangasinan
Bani, Pangasinan
Basista, Pangasinan
Bautista, Pangasinan
Bayambang, Pangasinan
Binalonan, Pangasinan
Binmaley, Pangasinan
Bolinao, Pangasinan
Bugallon, Pangasinan
Burgos, Pangasinan
Calasiao, Pangasinan
Dasol, Pangasinan
Infanta, Pangasinan
Labrador, Pangasinan
Laoac, Pangasinan
Lingayen, Pangasinan
Mabini, Pangasinan
Malasiqui, Pangasinan
Manaoag, Pangasinan
Mangaldan, Pangasinan
Mangatarem, Pangasinan
Mapandan, Pangasinan
Natividad, Pangasinan
Pozorrubio, Pangasinan
Rosales, Pangasinan
San Fabian, Pangasinan
San Jacinto, Pangasinan
San Manuel, Pangasinan
San Nicolas, Pangasinan
San Quintin, Pangasinan
Santa Barbara, Pangasinan
Santa Maria, Pangasinan
Santo Tomas, Pangasinan
Sison, Pangasinan
Sual, Pangasinan
Tayug, Pangasinan
Umingan, Pangasinan
Urbiztondo, Pangasinan
Villasis, Pangasinan
Agdangan, Quezon
Alabat, Quezon
Atimonan, Quezon
Buenavista, Quezon
Burdeos, Quezon
Calauag, Quezon
Candelaria, Quezon
Catanauan, Quezon
Dolores, Quezon
General Luna, Quezon
General Nakar, Quezon
Guinayangan, Quezon
Gumaca, Quezon
Infanta, Quezon
Jomalig, Quezon
Lopez, Quezon
Lucban, Quezon
Macalelon, Quezon
Mauban, Quezon
Mulanay, Quezon
Padre Burgos, Quezon
Pagbilao, Quezon
Panukulan, Quezon
Patnanungan, Quezon
Perez, Quezon
Pitogo, Quezon
Plaridel, Quezon
Polillo, Quezon
Quezon, Quezon
Real, Quezon
Sampaloc, Quezon
San Andres, Quezon
San Antonio, Quezon
San Francisco, Quezon
San Narciso, Quezon
Sariaya, Quezon
Tagkawayan, Quezon
Tiaong, Quezon
Unisan, Quezon
Aglipay, Quirino
Cabarroguis, Quirino
Diffun, Quirino
Maddela, Quirino
Nagtipunan, Quirino
Saguday, Quirino
Angono, Rizal
Baras, Rizal
Binangonan, Rizal
Cainta, Rizal
Cardona, Rizal
Jalajala, Rizal
Morong, Rizal
Pililla, Rizal
Rodriguez, Rizal
San Mateo, Rizal
Tanay, Rizal
Taytay, Rizal
Teresa, Rizal
Alcantara, Romblon
Banton, Romblon
Cajidiocan, Romblon
Calatrava, Romblon
Concepcion, Romblon
Corcuera, Romblon
Ferrol, Romblon
Looc, Romblon
Magdiwang, Romblon
Odiongan, Romblon
Romblon, Romblon
San Agustin, Romblon
San Andres, Romblon
San Fernando, Romblon
San Jose, Romblon
Santa Fe, Romblon
Santa Maria, Romblon
Almagro, Samar
Basey, Samar
Calbiga, Samar
Daram, Samar
Gandara, Samar
Hinabangan, Samar
Jiabong, Samar
Marabut, Samar
Matuguinao, Samar
Motiong, Samar
Pagsanghan, Samar
Paranas, Samar
Pinabacdao, Samar
San Jorge, Samar
San Jose de Buan, Samar
San Sebastian, Samar
Santa Margarita, Samar
Santa Rita, Samar
Santo Niño, Samar
Tagapul-an, Samar
Talalora, Samar
Tarangnan, Samar
Villareal, Samar
Zumarraga, Samar
Alabel, Sarangani
Glan, Sarangani
Kiamba, Sarangani
Maasim, Sarangani
Maitum, Sarangani
Malapatan, Sarangani
Malungon, Sarangani
Enrique Villanueva, Siquijor
Larena, Siquijor
Lazi, Siquijor
Maria, Siquijor
San Juan, Siquijor
Siquijor, Siquijor
Barcelona, Sorsogon
Bulan, Sorsogon
Bulusan, Sorsogon
Casiguran, Sorsogon
Castilla, Sorsogon
Donsol, Sorsogon
Gubat, Sorsogon
Irosin, Sorsogon
Juban, Sorsogon
Magallanes, Sorsogon
Matnog, Sorsogon
Pilar, Sorsogon
Prieto Diaz, Sorsogon
Santa Magdalena, Sorsogon
Banga, South Cotabato
Lake Sebu, South Cotabato
Norala, South Cotabato
Polomolok, South Cotabato
Santo Niño, South Cotabato
Surallah, South Cotabato
T'Boli, South Cotabato
Tampakan, South Cotabato
Tantangan, South Cotabato
Tupi, South Cotabato
Anahawan, Southern Leyte
Bontoc, Southern Leyte
Hinunangan, Southern Leyte
Hinundayan, Southern Leyte
Libagon, Southern Leyte
Liloan, Southern Leyte
Limasawa, Southern Leyte
Macrohon, Southern Leyte
Malitbog, Southern Leyte
Padre Burgos, Southern Leyte
Pintuyan, Southern Leyte
Saint Bernard, Southern Leyte
San Francisco, Southern Leyte
San Juan, Southern Leyte
San Ricardo, Southern Leyte
Silago, Southern Leyte
Sogod, Southern Leyte
Tomas Oppus, Southern Leyte
Bagumbayan, Sultan Kudarat
Columbio, Sultan Kudarat
Esperanza, Sultan Kudarat
Isulan, Sultan Kudarat
Kalamansig, Sultan Kudarat
Lambayong, Sultan Kudarat
Lebak, Sultan Kudarat
Lutayan, Sultan Kudarat
Palimbang, Sultan Kudarat
President Quirino, Sultan Kudarat
Senator Ninoy Aquino, Sultan Kudarat
Banguingui, Sulu
Hadji Panglima Tahil, Sulu
Indanan, Sulu
Jolo, Sulu
Kalingalan Caluang, Sulu
Lugus, Sulu
Luuk, Sulu
Maimbung, Sulu
Old Panamao, Sulu
Omar, Sulu
Pandami, Sulu
Panglima Estino, Sulu
Pangutaran, Sulu
Parang, Sulu
Pata, Sulu
Patikul, Sulu
Siasi, Sulu
Talipao, Sulu
Tapul, Sulu
Alegria, Surigao del Norte
Bacuag, Surigao del Norte
Burgos, Surigao del Norte
Claver, Surigao del Norte
Dapa, Surigao del Norte
Del Carmen, Surigao del Norte
General Luna, Surigao del Norte
Gigaquit, Surigao del Norte
Mainit, Surigao del Norte
Malimono, Surigao del Norte
Pilar, Surigao del Norte
Placer, Surigao del Norte
San Benito, Surigao del Norte
San Francisco, Surigao del Norte
San Isidro, Surigao del Norte
Santa Monica, Surigao del Norte
Sison, Surigao del Norte
Socorro, Surigao del Norte
Tagana-an, Surigao del Norte
Tubod, Surigao del Norte
Barobo, Surigao del Sur
Bayabas, Surigao del Sur
Cagwait, Surigao del Sur
Cantilan, Surigao del Sur
Carmen, Surigao del Sur
Carrascal, Surigao del Sur
Cortes, Surigao del Sur
Hinatuan, Surigao del Sur
Lanuza, Surigao del Sur
Lianga, Surigao del Sur
Lingig, Surigao del Sur
Madrid, Surigao del Sur
Marihatag, Surigao del Sur
San Agustin, Surigao del Sur
San Miguel, Surigao del Sur
Tagbina, Surigao del Sur
Tago, Surigao del Sur
Anao, Tarlac
Bamban, Tarlac
Camiling, Tarlac
Capas, Tarlac
Concepcion, Tarlac
Gerona, Tarlac
La Paz, Tarlac
Mayantoc, Tarlac
Moncada, Tarlac
Paniqui, Tarlac
Pura, Tarlac
Ramos, Tarlac
San Clemente, Tarlac
San Jose, Tarlac
San Manuel, Tarlac
Santa Ignacia, Tarlac
Victoria, Tarlac
Bongao, Tawi-Tawi
Languyan, Tawi-Tawi
Mapun, Tawi-Tawi
Panglima Sugala, Tawi-Tawi
Sapa-Sapa, Tawi-Tawi
Sibutu, Tawi-Tawi
Simunul, Tawi-Tawi
Sitangkai, Tawi-Tawi
South Ubian, Tawi-Tawi
Tandubas, Tawi-Tawi
Turtle Islands, Tawi-Tawi
Botolan, Zambales
Cabangan, Zambales
Candelaria, Zambales
Castillejos, Zambales
Iba, Zambales
Masinloc, Zambales
Palauig, Zambales
San Antonio, Zambales
San Felipe, Zambales
San Marcelino, Zambales
San Narciso, Zambales
Santa Cruz, Zambales
Subic, Zambales
Baliguian, Zamboanga del Norte
Godod, Zamboanga del Norte
Gutalac, Zamboanga del Norte
Jose Dalman, Zamboanga del Norte
Kalawit, Zamboanga del Norte
Katipunan, Zamboanga del Norte
La Libertad, Zamboanga del Norte
Labason, Zamboanga del Norte
Leon B. Postigo, Zamboanga del Norte
Liloy, Zamboanga del Norte
Manukan, Zamboanga del Norte
Mutia, Zamboanga del Norte
Piñan, Zamboanga del Norte
Polanco, Zamboanga del Norte
President Manuel A. Roxas, Zamboanga del Norte
Rizal, Zamboanga del Norte
Salug, Zamboanga del Norte
Sergio Osmeña Sr., Zamboanga del Norte
Siayan, Zamboanga del Norte
Sibuco, Zamboanga del Norte
Sibutad, Zamboanga del Norte
Sindangan, Zamboanga del Norte
Siocon, Zamboanga del Norte
Sirawai, Zamboanga del Norte
Tampilisan, Zamboanga del Norte
Aurora, Zamboanga del Sur
Bayog, Zamboanga del Sur
Dimataling, Zamboanga del Sur
Dinas, Zamboanga del Sur
Dumalinao, Zamboanga del Sur
Dumingag, Zamboanga del Sur
Guipos, Zamboanga del Sur
Josefina, Zamboanga del Sur
Kumalarang, Zamboanga del Sur
Labangan, Zamboanga del Sur
Lakewood, Zamboanga del Sur
Lapuyan, Zamboanga del Sur
Mahayag, Zamboanga del Sur
Margosatubig, Zamboanga del Sur
Midsalip, Zamboanga del Sur
Molave, Zamboanga del Sur
Pitogo, Zamboanga del Sur
Ramon Magsaysay, Zamboanga del Sur
San Miguel, Zamboanga del Sur
San Pablo, Zamboanga del Sur
Sominot, Zamboanga del Sur
Tabina, Zamboanga del Sur
Tambulig, Zamboanga del Sur
Tigbao, Zamboanga del Sur
Tukuran, Zamboanga del Sur
Vincenzo A. Sagun, Zamboanga del Sur
Alicia, Zamboanga Sibugay
Buug, Zamboanga Sibugay
Diplahan, Zamboanga Sibugay
Imelda, Zamboanga Sibugay
Ipil, Zamboanga Sibugay
Kabasalan, Zamboanga Sibugay
Mabuhay, Zamboanga Sibugay
Malangas, Zamboanga Sibugay
Naga, Zamboanga Sibugay
Olutanga, Zamboanga Sibugay
Payao, Zamboanga Sibugay
Roseller Lim, Zamboanga Sibugay
Siay, Zamboanga Sibugay
Talusan, Zamboanga Sibugay
Titay, Zamboanga Sibugay
Tungawan, Zamboanga Sibugay
Angeles
Bacolod
Baguio
Butuan
Cagayan de Oro
Caloocan
Cebu City
Davao City
General Santos
Iligan
Iloilo City
Lapu-Lapu
Las Piñas
Lucena
Makati
Malabon
Mandaluyong
Mandaue
Manila
Marikina
Muntinlupa
Navotas
Olongapo
Parañaque
Pasay
Pasig
Puerto Princesa
Quezon City
San Juan
Tacloban
Taguig
Valenzuela
Zamboanga City
Cotabato City
Dagupan (Pangasinan)
Naga (Camarines Sur)
Ormoc (Leyte)
Santiago (Isabela)
Alaminos (Pangasinan)
Antipolo (Rizal)
Bacoor (Cavite)
Bago (Negros Occidental)
Bais (Negros Oriental)
Balanga (Bataan)
Batac (Ilocos Norte)
Batangas City (Batangas)
Bayawan (Negros Oriental)
Baybay (Leyte)
Bayugan (Agusan del Sur)
Bislig (Surigao del Sur)
Biñan (Laguna)
Bogo (Cebu)
Borongan (Eastern Samar)
Cabadbaran (Agusan del Norte)
Cabanatuan (Nueva Ecija)
Cabuyao (Laguna)
Cadiz (Negros Occidental)
Calamba (Laguna)
Calapan (Oriental Mindoro)
Calbayog (Samar)
Candon (Ilocos Sur)
Canlaon (Negros Oriental)
Carcar (Cebu)
Catbalogan (Samar)
Cauayan (Isabela)
Cavite City (Cavite)
Danao (Cebu)
Dapitan (Zamboanga del Norte)
Dasmariñas (Cavite)
Digos (Davao del Sur)
Dipolog (Zamboanga del Norte)
Dumaguete (Negros Oriental)
El Salvador (Misamis Oriental)
Escalante (Negros Occidental)
Gapan (Nueva Ecija)
General Trias (Cavite)
Gingoog (Misamis Oriental)
Guihulngan (Negros Oriental)
Himamaylan (Negros Occidental)
Ilagan (Isabela)
Imus (Cavite)
Iriga (Camarines Sur)
Isabela City (Basilan)
Kabankalan (Negros Occidental)
Kidapawan (Cotabato)
Koronadal (South Cotabato)
La Carlota (Negros Occidental)
Lamitan (Basilan)
Laoag (Ilocos Norte)
Legazpi (Albay)
Ligao (Albay)
Lipa (Batangas)
Maasin (Southern Leyte)
Mabalacat (Pampanga)
Malaybalay (Bukidnon)
Malolos (Bulacan)
Marawi (Lanao del Sur)
Masbate City (Masbate)
Mati (Davao Oriental)
Meycauayan (Bulacan)
Muñoz (Nueva Ecija)
Naga (Cebu)
Oroquieta (Misamis Occidental)
Ozamiz (Misamis Occidental)
Pagadian (Zamboanga del Sur)
Palayan (Nueva Ecija)
Panabo (Davao del Norte)
Passi (Iloilo)
Roxas City (Capiz)
Sagay (Negros Occidental)
Samal (Davao del Norte)
San Carlos (Pangasinan)
San Carlos (Negros Occidental)
San Fernando (La Union)
San Fernando (Pampanga)
San Jose (Nueva Ecija)
San Jose del Monte (Bulacan)
San Pablo (Laguna)
San Pedro (Laguna)
Santa Rosa (Laguna)
Santo Tomas (Batangas)
Silay (Negros Occidental)
Sipalay (Negros Occidental)
Sorsogon City (Sorsogon)
Surigao City (Surigao del Norte)
Tabaco (Albay)
Tabuk (Kalinga)
Tacurong (Sultan Kudarat)
Tagaytay (Cavite)
Tagbilaran (Bohol)
Tagum (Davao del Norte)
Talisay (Negros Occidental)
Talisay (Cebu)
Tanauan (Batangas)
Tandag (Surigao del Sur)
Tangub (Misamis Occidental)
Tanjay (Negros Oriental)
Tarlac City (Tarlac)
Tayabas (Quezon)
Toledo (Cebu)
Trece Martires (Cavite)
Tuguegarao (Cagayan)
Urdaneta (Pangasinan)
Valencia (Bukidnon)
Victorias (Negros Occidental)
Vigan (Ilocos Sur)`