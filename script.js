document.addEventListener("DOMContentLoaded", () => 
{

    /* ================= TABURI ================= */
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");
        });
    });

    /* ================= ELEMENTE ================= */
    const radios = document.querySelectorAll('input[name="delivery"]');
    const timeOptions = document.getElementById("timeOptions");
    const oraSelect = document.getElementById("ora");

    const dateOptions = document.getElementById("dateOptions");
    const dataInput = document.getElementById("dataLivrare");

    const deliveryDetails = document.querySelector(".delivery-details");
    const inputAdresa = document.getElementById("adresa");
    const inputTelefon = document.getElementById("telefon");

    const sendBtn = document.getElementById("sendOrder");
    const comentariu = document.getElementById("comentariu");

    const confirmBox = document.getElementById("confirmBox");
    const confirmAdresa = document.getElementById("confirmAdresa");
    const confirmTelefon = document.getElementById("confirmTelefon");
    const editDataBtn = document.getElementById("editData");
    const confirmSendBtn = document.getElementById("confirmSend");

    const pickupInfo = document.getElementById("pickupInfo");

    const clientIDInput = document.getElementById("clientID");
    let mesajFinal = "";

    /* ================= CANTITATE ================= */
    document.querySelectorAll('.product-check').forEach(check => {
        check.addEventListener('change', function () {
            const qtyBox = this.closest('.item').querySelector('.qty-box');
            const qtyInput = qtyBox.querySelector('.qty-input');

            if (this.checked) {
                qtyBox.style.display = 'block';
                qtyInput.value = 1;
            } else {
                qtyBox.style.display = 'none';
                qtyInput.value = 1;
            }
        });
    });

    /* ================= DATA INITIALĂ ================= */
    // initData();

    // function initData() {
        // const azi = new Date();
        // const oraCurenta = azi.getHours();

        // if (oraCurenta >= 18) {
            // azi.setDate(azi.getDate() + 1);
        // }

        // const yyyy = azi.getFullYear();
        // const mm = String(azi.getMonth() + 1).padStart(2, '0');
        // const dd = String(azi.getDate()).padStart(2, '0');

        // const dataMin = `${yyyy}-${mm}-${dd}`;
        // dataInput.min = dataMin;
        // dataInput.value = dataMin;

        // genereazaOre();
    // }

    /* ================= GOOGLE SHEET ================= */
    // const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxRW0t4_bpJQdh3Ojg4ZR1QKeDJ5GEZ6mK49OupAFkyWn6Bqm6H9-drSjQOF3oUoMAs/exec"; // pune URL-ul Apps Script aici

   // async function fetchOcupate() {
  // try {
    // const res = await fetch(GOOGLE_SCRIPT_URL, {
      // method: "GET",
      // redirect: "follow",
      // cache: "no-store",
      // credentials: "omit"
    // });

    // if (!res.ok) {
      // throw new Error(res.status);
    // }

    // const data = await res.json();
    // const dataAleasa = dataInput.value;

    // // normalizează orele ocupate la doar număr HH
    // return data
      // .filter(o => o.data === dataAleasa)
      // .map(o => {
        // // extrage ora ca număr (HH)
        // return Number(o.ora.split(":")[0]);
      // });

  // } catch (err) {
    // console.error("Nu am putut prelua orele ocupate", err);
    // return [];
  // }
// }

    /* ================= ORE ================= */
    // async function genereazaOre() {
  // oraSelect.innerHTML = '<option value="">-- Selectează ora --</option>';
  // if (!dataInput.value) return;

  // const acum = new Date();
  // const oraCurenta = acum.getHours();
  
  // //const aziStr = acum.toISOString().split("T")[0];
  
  // const yyyy = acum.getFullYear();
// const mm = String(acum.getMonth() + 1).padStart(2, "0");
// const dd = String(acum.getDate()).padStart(2, "0");
// const aziStr = `${yyyy}-${mm}-${dd}`;

  // const oreOcupate = await fetchOcupate();

  // for (let ora = 12; ora <= 18; ora++) {

    // // ❌ nu afișăm ore din trecut
    // if (dataInput.value === aziStr && ora <= oraCurenta) continue;

    // // ❌ nu afișăm ore ocupate
   // if (oreOcupate.includes(ora)) continue;

    // const opt = document.createElement("option");
    // opt.value = `${ora}:00`;
    // opt.textContent =
      // dataInput.value === aziStr ? `${ora}:00` : `${ora}:00 (Mâine)`;

    // oraSelect.appendChild(opt);
  // }
// }

    // dataInput.addEventListener("change", genereazaOre);

    // /* ================= LIVRARE / RIDICARE ================= */
    // radios.forEach(radio => {
        // radio.addEventListener("change", () => {
            // timeOptions.style.display = "block";
            // dateOptions.style.display = "block";

            // if (radio.value === "Livrare") {
                // deliveryDetails.style.display = "block";
                // pickupInfo.style.display = "none";
            // } else {
                // deliveryDetails.style.display = "none";
                // pickupInfo.style.display = "block";
                // inputAdresa.value = "";
                // inputTelefon.value = "";
            // }
        // });
    // });

    /* ================= TRIMITERE ================= */
    // sendBtn.addEventListener("click", async () => {

        // const produse = document.querySelectorAll('.item input[type="checkbox"]:checked');
        // const livrare = document.querySelector('input[name="delivery"]:checked');
        // const ora = oraSelect.value;
        // const dataFinala = dataInput.value;

        // if (!produse.length) {
            // alert("Selectează cel puțin un produs!");
            // return;
        // }
        // if (!livrare) {
            // alert("Alege Livrare sau Ridicare!");
            // return;
        // }
        // if (!dataFinala) {
            // alert("Alege data!");
            // return;
        // }
        // if (!ora) {
            // alert("Alege ora!");
            // return;
        // }

        // // Generează ClientID
        // const clientID = clientIDInput.value || `client_${Date.now()}`;
        // clientIDInput.value = clientID;

        // mesajFinal = `ClientID: ${clientID}\nComandă:\n`;

        // produse.forEach(p => {
            // const item = p.closest(".item");
            // const nume = item.querySelector("h3").innerText;

            // const qtyInput = item.querySelector('.qty-input');
            // const qty = qtyInput ? qtyInput.value : 1;

            // mesajFinal += `- ${nume} x${qty}\n`;
        // });

        // mesajFinal += `\nData: ${dataFinala}`;
        // mesajFinal += `\nOra: ${ora}`;
        // mesajFinal += `\nMetodă: ${livrare.value}`;

        // if (livrare.value === "Livrare") {
            // if (!inputAdresa.value.trim() || !inputTelefon.value.trim()) {
                // alert("Completează adresa și telefonul!");
                // return;
            // }

            // confirmAdresa.textContent = inputAdresa.value;
            // confirmTelefon.textContent = inputTelefon.value;

            // confirmBox.style.display = "block";
            // confirmBox.scrollIntoView({ behavior: "smooth" });

        // } else {
            // mesajFinal += "\nRidicare de la locație";
            // mesajFinal += "\nAdresă locație: 2 Rue De Drancy Cottage , 93700 Drancy";

            // // Salvează global în Google Sheet și deschide WhatsApp
            // await postComanda(clientID, dataFinala, ora);
            // finalizeaza();
        // }
    // });

    /* ================= CONFIRMARE LIVRARE ================= */
    // editDataBtn.addEventListener("click", () => {
        // confirmBox.style.display = "none";
        // inputAdresa.focus();
    // });

// confirmSendBtn.addEventListener("click", async () => {
  // confirmSendBtn.disabled = true;

  // mesajFinal += "\nAdresă: " + inputAdresa.value;
  // mesajFinal += "\nTelefon: " + inputTelefon.value;

  // const raspuns = await postComanda(
    // clientIDInput.value,
    // dataInput.value,
    // oraSelect.value
  // );

  // if (raspuns.status === "error") {
    // alert(raspuns.message);
    // confirmSendBtn.disabled = false;
    // return;
  // }

  // oraSelect.value = "";
  // await genereazaOre();

  // finalizeaza();
// });

    // /* ================= POST COMANDA ================= */
 // async function postComanda(clientID, dataComanda, oraComanda) {
  // try {
    // const payload = JSON.stringify({
      // data: dataComanda,
      // ora: oraComanda,
      // clientID: clientID
    // });

    // const res = await fetch(GOOGLE_SCRIPT_URL, {
      // method: "POST",
      // headers: {
        // "Content-Type": "text/plain;charset=utf-8"
      // },
      // body: payload
    // });

    // const text = await res.text(); // NU res.json direct
    // const json = JSON.parse(text);

    // console.log("Răspuns Apps Script:", json);
    // return json;

  // } catch (err) {
    // console.error("Eroare la salvarea comenzii:", err);
    // return { status: "error", message: "Eroare rețea +" };
  // }
// }

    // /* ================= FINAL ================= */
   // async function finalizeaza() {
    // mesajFinal += "\nComentariu: " + (comentariu.value.trim() || "Niciun comentariu");

    // const telefon = "+33681536514";
    // window.open(
        // "https://wa.me/" + telefon + "?text=" + encodeURIComponent(mesajFinal),
        // "_blank"
    // );

    // // Re-generează orele disponibile
    // await genereazaOre();
	// }
	
	document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;

    setLanguage(lang);

    document.querySelectorAll(".lang-btn")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
  });
});

// inițializare
const savedLang = localStorage.getItem("lang") || "ro";
setLanguage(savedLang);

document.querySelector(`.lang-btn[data-lang="${savedLang}"]`)
  ?.classList.add("active");

 });


/* ================= LIMBI ================= */
const translations = {
  ro: {
    menu_title: "MENIU",
    tab_sushi: "Sushi",
    tab_biscuiti: "Biscuiți",
    tab_placinte: "Plăcinte",

    order_notice: "⚠️Comanda se plasează din timp⚠️",
    order_time_1: "1 zi",
    order_time_2: "2 - 3 Zile",
    weekend_delivery: "Livrările se fac doar în weekend",

    sushi_somon: "Sushi Burger Somon + 🎁Coca-Cola🎁",
    sushi_somon_desc: "Orez, Somon, Avocado, Philadelphia, Foi nori, Icră roșie, Salată iceberg, Castraveți, Sos, Semințe de susan (Mix)",

    sushi_creveti: "Sushi Burger Creveți + 🎁Coca-Cola🎁",
    sushi_creveti_desc: "Orez, Creveți, Avocado, Philadelphia, Foi nori, Icră roșie, Salată iceberg, Castraveți, Sos, Semințe de susan (Mix)",

    sushi_pane: "Sushi Burger Creveți Panées + 🎁Coca-Cola🎁",
    sushi_panee_desc: "Orez, Creveți pane, Avocado, Philadelphia, Foi nori, Icră roșie, Salată iceberg, Castraveți, Sos, Semințe de susan (Mix)",

    sushi_ton: "Sushi Burger Ton + 🎁Coca-Cola🎁",
	sushi_ton_desc: "Orez, Ton, Avocado, Philadelphia, Foi nori, Icră roșie, Salată iceberg, Castraveți, Sos, Semințe de susan (Mix)",

    sushi_mix: "Sushi Burger Mix + 🎁Coca-Cola🎁",
	sushi_mix_desc: "Orez, Somon,Creveți, Avocado, Philadelphia, Foi nori, Icră roșie, Salată iceberg, Castraveți, Sos, Semințe de susan (Mix)",

    sushi_calzi: "Role Calde 8 Bucăți (Somon sau Creveți) + 🎁Coca-Cola🎁",
    sushi_calzi_desc: "Orez, Somon sau Creveți, Avocado, Philadelphia, Foi nori, Castraveți, Semințe de susan (Mix)",
	
	platou: "Platou Sushi 24 Bucăți",
	platou_desc: "Rolă cu somon – 8 Bucăți\nRolă cu Creveți – 8 Bucăți\nRolă Philadelphia – 8 Bucăți",
	
    vafe: "Vafe cu cremă mascarpone și caramel",
	price_vafe: "(20 Bucăți)",

    biscuiti_artizanali: "Biscuiți artizanali",

    nucusoare_4: "Nucușoare 4 gusturi",
    gust_capsuna: "Căpșună",
    gust_ciocolata: "Ciocolată",
    gust_rafaello: "Rafaello",
    gust_fistic: "Fistic",
	gust_info: "4 Bucăți de fiecare gust",

    nucusoare_lapte: "Nucușoare cu lapte condensat",
    gust_copilarie: "Gustul dulce al copilăriei",

    aperitiv_somon: "Aperitiv cu somon icră roșie și Philadelphia",
    aperitiv: "Aperitiv",

    platou_mediu: "Plăcintă cu Brânză",
	pl_brinza_info: "(La alegerea clientului cu verdeață ceapă & mărar + 1€ )",
    platou_1: "Plăcintă cu Cartofi",
    platou_2: "Plăcintă cu Varză",
	pl_qty: "Bucata",

    pickup_title: "📍 Adresa pentru ridicare:  2 Rue de Drancy Cottage , 93700 Drancy",
    delivery_93: "Livrarea pentru zona 93 : 5€",
    delivery_other: "Livrarea pentru alte zone: 10€",
    delivery_min: "Livrare de la 2 Cutii!!!"
  },

  fr: {
    menu_title: "MENU",
    tab_sushi: "Sushi",
    tab_biscuiti: "Biscuits",
    tab_placinte: "Tourtes",

    order_notice: "⚠️La commande doit être passée à l'avance⚠️",
    order_time_1: "1 jour",
    order_time_2: "2 - 3 jours",
    weekend_delivery: "Livraison uniquement le week-end",

    sushi_somon: "Sushi Burger Saumon + 🎁Coca-Cola🎁",
    sushi_somon_desc: "Riz, Saumon, Avocat, Philadelphia, Feuilles de nori, Œufs de poisson rouge, Laitue iceberg, Concombre, Sauce, Graines de sésame (Mix)",

    sushi_creveti: "Sushi Burger Crevettes + 🎁Coca-Cola🎁",
    sushi_creveti_desc: "Riz, Crevettes, Avocat, Philadelphia, Feuilles de nori, Œufs de poisson rouge, Laitue iceberg, Concombre, Sauce, Graines de sésame (Mix)",

    sushi_pane: "Sushi Burger Crevettes panées + 🎁Coca-Cola🎁",
    sushi_panee_desc: "Riz, Crevettes panées, Avocat, Philadelphia, Feuilles de nori, Œufs de poisson rouge, Laitue iceberg, Concombre, Sauce, Graines de sésame (Mix)",

    sushi_ton: "Sushi Burger Thon + 🎁Coca-Cola🎁",
	sushi_ton_desc: "Riz, Thon, Avocat, Philadelphia, Feuilles de nori, Œufs de poisson rouge, Laitue iceberg, Concombre, Sauce, Graines de sésame (Mix)",
	
    sushi_mix: "Sushi Burger Mix + 🎁Coca-Cola🎁",
	sushi_mix_desc:  "Riz, Crevettes,Saumon, Avocat, Philadelphia, Feuilles de nori, Œufs de poisson rouge, Laitue iceberg, Concombre, Sauce, Graines de sésame (Mix)",
   
    sushi_calzi: "Roulés chauds 8 pièces + 🎁Coca-Cola🎁",
	sushi_calzi_desc: "Riz, Crevettes,Saumon, Avocat, Philadelphia, Feuilles de nori,Concombre",

	platou: "Plateau de sushis 24 pièces",
	platou_desc: "Rouleau de saumon – 8 pièces\nRouleau de crevettes – 8 pièces\nRouleau Philadelphia – 8 pièces",
	


    vafe: "Gaufres à la crème mascarpone et caramel",
    biscuiti_artizanali: "Biscuits artisanaux",
	price_vafe: "(20 pièces)",

    nucusoare_4: "Noisettes – 4 saveurs",
    gust_capsuna: "Fraise",
    gust_ciocolata: "Chocolat",
    gust_rafaello: "Raffaello",
    gust_fistic: "Pistache",
	gust_info: "4 morceaux de chaque saveur",

    nucusoare_lapte: "Noisettes au lait concentré",
    gust_copilarie: "Le goût sucré de l'enfance",

    aperitiv_somon: "Apéritif au saumon, œufs de poisson rouge et Philadelphia",
    aperitiv: "Apéritif",

    platou_mediu: "Tourte au fromage",
	pl_brinza_info: "Au choix du client, avec oignons verts et aneth + 1€",
    platou_1: "Tourte aux pommes de terre",
    platou_2: "Tourte au chou",
	pl_qty: "Pièces",
	
    pickup_title: "📍 Adresse de retrait : 2 Rue de Drancy Cottage , 93700 Drancy",
    delivery_93: "Livraison zone 93 : 5€",
    delivery_other: "Livraison autres zones : 10€",
    delivery_min: "Livraison à partir de 2 boîtes !!!"
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;

    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    } else {
      console.warn(`Lipsă traducere: ${lang}.${key}`);
    }
  });

  localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  setLanguage(localStorage.getItem("lang") || "ro");
});
