document.addEventListener("DOMContentLoaded", () => {

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
    initData();

    function initData() {
        const azi = new Date();
        const oraCurenta = azi.getHours();

        if (oraCurenta >= 18) {
            azi.setDate(azi.getDate() + 1);
        }

        const yyyy = azi.getFullYear();
        const mm = String(azi.getMonth() + 1).padStart(2, '0');
        const dd = String(azi.getDate()).padStart(2, '0');

        const dataMin = `${yyyy}-${mm}-${dd}`;
        dataInput.min = dataMin;
        dataInput.value = dataMin;

        genereazaOre();
    }

    /* ================= GOOGLE SHEET ================= */
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxRW0t4_bpJQdh3Ojg4ZR1QKeDJ5GEZ6mK49OupAFkyWn6Bqm6H9-drSjQOF3oUoMAs/exec"; // pune URL-ul Apps Script aici

   async function fetchOcupate() {
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      credentials: "omit"
    });

    if (!res.ok) {
      throw new Error(res.status);
    }

    const data = await res.json();
    const dataAleasa = dataInput.value;

    // normalizează orele ocupate la doar număr HH
    return data
      .filter(o => o.data === dataAleasa)
      .map(o => {
        // extrage ora ca număr (HH)
        return Number(o.ora.split(":")[0]);
      });

  } catch (err) {
    console.error("Nu am putut prelua orele ocupate", err);
    return [];
  }
}

    /* ================= ORE ================= */
    async function genereazaOre() {
  oraSelect.innerHTML = '<option value="">-- Selectează ora --</option>';
  if (!dataInput.value) return;

  const acum = new Date();
  const oraCurenta = acum.getHours();
  
  //const aziStr = acum.toISOString().split("T")[0];
  
  const yyyy = acum.getFullYear();
const mm = String(acum.getMonth() + 1).padStart(2, "0");
const dd = String(acum.getDate()).padStart(2, "0");
const aziStr = `${yyyy}-${mm}-${dd}`;

  const oreOcupate = await fetchOcupate();

  for (let ora = 12; ora <= 18; ora++) {

    // ❌ nu afișăm ore din trecut
    if (dataInput.value === aziStr && ora <= oraCurenta) continue;

    // ❌ nu afișăm ore ocupate
   if (oreOcupate.includes(ora)) continue;

    const opt = document.createElement("option");
    opt.value = `${ora}:00`;
    opt.textContent =
      dataInput.value === aziStr ? `${ora}:00` : `${ora}:00 (Mâine)`;

    oraSelect.appendChild(opt);
  }
}

    dataInput.addEventListener("change", genereazaOre);

    /* ================= LIVRARE / RIDICARE ================= */
    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            timeOptions.style.display = "block";
            dateOptions.style.display = "block";

            if (radio.value === "Livrare") {
                deliveryDetails.style.display = "block";
                pickupInfo.style.display = "none";
            } else {
                deliveryDetails.style.display = "none";
                pickupInfo.style.display = "block";
                inputAdresa.value = "";
                inputTelefon.value = "";
            }
        });
    });

    /* ================= TRIMITERE ================= */
    sendBtn.addEventListener("click", async () => {

        const produse = document.querySelectorAll('.item input[type="checkbox"]:checked');
        const livrare = document.querySelector('input[name="delivery"]:checked');
        const ora = oraSelect.value;
        const dataFinala = dataInput.value;

        if (!produse.length) {
            alert("Selectează cel puțin un produs!");
            return;
        }
        if (!livrare) {
            alert("Alege Livrare sau Ridicare!");
            return;
        }
        if (!dataFinala) {
            alert("Alege data!");
            return;
        }
        if (!ora) {
            alert("Alege ora!");
            return;
        }

        // Generează ClientID
        const clientID = clientIDInput.value || `client_${Date.now()}`;
        clientIDInput.value = clientID;

        mesajFinal = `ClientID: ${clientID}\nComandă:\n`;

        produse.forEach(p => {
            const item = p.closest(".item");
            const nume = item.querySelector("h3").innerText;

            const qtyInput = item.querySelector('.qty-input');
            const qty = qtyInput ? qtyInput.value : 1;

            mesajFinal += `- ${nume} x${qty}\n`;
        });

        mesajFinal += `\nData: ${dataFinala}`;
        mesajFinal += `\nOra: ${ora}`;
        mesajFinal += `\nMetodă: ${livrare.value}`;

        if (livrare.value === "Livrare") {
            if (!inputAdresa.value.trim() || !inputTelefon.value.trim()) {
                alert("Completează adresa și telefonul!");
                return;
            }

            confirmAdresa.textContent = inputAdresa.value;
            confirmTelefon.textContent = inputTelefon.value;

            confirmBox.style.display = "block";
            confirmBox.scrollIntoView({ behavior: "smooth" });

        } else {
            mesajFinal += "\nRidicare de la locație";
            mesajFinal += "\nAdresă locație: 2 Rue De Drancy Cottage , 93700 Drancy";

            // Salvează global în Google Sheet și deschide WhatsApp
            await postComanda(clientID, dataFinala, ora);
            finalizeaza();
        }
    });

    /* ================= CONFIRMARE LIVRARE ================= */
    editDataBtn.addEventListener("click", () => {
        confirmBox.style.display = "none";
        inputAdresa.focus();
    });

confirmSendBtn.addEventListener("click", async () => {
  confirmSendBtn.disabled = true;

  mesajFinal += "\nAdresă: " + inputAdresa.value;
  mesajFinal += "\nTelefon: " + inputTelefon.value;

  const raspuns = await postComanda(
    clientIDInput.value,
    dataInput.value,
    oraSelect.value
  );

  if (raspuns.status === "error") {
    alert(raspuns.message);
    confirmSendBtn.disabled = false;
    return;
  }

  oraSelect.value = "";
  await genereazaOre();

  finalizeaza();
});

    /* ================= POST COMANDA ================= */
 async function postComanda(clientID, dataComanda, oraComanda) {
  try {
    const payload = JSON.stringify({
      data: dataComanda,
      ora: oraComanda,
      clientID: clientID
    });

    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: payload
    });

    const text = await res.text(); // NU res.json direct
    const json = JSON.parse(text);

    console.log("Răspuns Apps Script:", json);
    return json;

  } catch (err) {
    console.error("Eroare la salvarea comenzii:", err);
    return { status: "error", message: "Eroare rețea +" };
  }
}

    /* ================= FINAL ================= */
   async function finalizeaza() {
    mesajFinal += "\nComentariu: " + (comentariu.value.trim() || "Niciun comentariu");

    const telefon = "+33681536514";
    window.open(
        "https://wa.me/" + telefon + "?text=" + encodeURIComponent(mesajFinal),
        "_blank"
    );

    // Re-generează orele disponibile
    await genereazaOre();
	}

});
