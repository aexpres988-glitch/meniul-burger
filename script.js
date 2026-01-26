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
    const deliveryDetails = document.querySelector(".delivery-details");
    const pickupInfo = document.getElementById("pickupInfo");
    const inputAdresa = document.getElementById("adresa");
    const inputTelefon = document.getElementById("telefon");
    const sendBtn = document.getElementById("sendOrder");

    /* ================= STIL MESAJ RIDICARE ================= */
    pickupInfo.style.display = "none";
    pickupInfo.style.marginTop = "12px";
    pickupInfo.style.padding = "12px";
    pickupInfo.style.borderRadius = "10px";
    pickupInfo.style.background = "#f1f1f1";
    pickupInfo.style.color = "#000";
    pickupInfo.style.fontSize = "14px";
    pickupInfo.style.borderLeft = "5px solid #000";
    pickupInfo.innerHTML = "📍 <strong>Ridicare din locație</strong><br>Adresa locației va fi inclusă automat în mesajul de comandă după trimitere.";

    /* ================= GENEREAZĂ ORE ================= */
    genereazaOre();

    function genereazaOre() {
        oraSelect.innerHTML = '<option value="">-- Selectează ora --</option>';
        const now = new Date();
        const oraCurenta = now.getHours();

        if (oraCurenta >= 18) {
            for (let ora = 12; ora <= 18; ora++) {
                const opt = document.createElement("option");
                opt.value = `${ora}:00`;
                opt.textContent = `${ora}:00 (Mâine)`;
                oraSelect.appendChild(opt);
            }
        } else {
            for (let ora = 12; ora <= 18; ora++) {
                if (ora <= oraCurenta) continue;
                const opt = document.createElement("option");
                opt.value = `${ora}:00`;
                opt.textContent = `${ora}:00`;
                oraSelect.appendChild(opt);
            }
        }
    }

    /* ================= LIVRARE / RIDICARE ================= */
    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            timeOptions.style.display = "block";

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

    /* ================= CANTITATE PRODUSE ================= */
    document.querySelectorAll('.product-check').forEach(check => {
        check.addEventListener("change", function () {
            const qtyBox = this.closest(".item").querySelector(".qty-box");
            const qtyInput = qtyBox.querySelector(".qty-input");

            if (this.checked) {
                qtyBox.style.display = "block";
                qtyInput.value = 1;
            } else {
                qtyBox.style.display = "none";
                qtyInput.value = 1;
            }
        });
    });

    /* ================= TRIMITERE COMANDĂ ================= */
    sendBtn.addEventListener("click", () => {

        const produse = document.querySelectorAll('.product-check:checked');
        const livrare = document.querySelector('input[name="delivery"]:checked');
        const ora = oraSelect.value;
        const comentariu = document.getElementById("comentariu").value;

        if (produse.length === 0) {
            alert("Selectează cel puțin un produs!");
            return;
        }

        if (!livrare) {
            alert("Alege Livrare sau Ridicare!");
            return;
        }

        if (!ora) {
            alert("Alege ora!");
            return;
        }

        let mesaj = "Comanda:\n";
        produse.forEach(p => {
            const item = p.closest(".item");
            const nume = item.querySelector("h3").innerText;
            const qty = item.querySelector(".qty-input")?.value || 1;
            mesaj += `- ${nume} x ${qty}\n`;
        });

        mesaj += `\nMetodă: ${livrare.value}`;
        mesaj += `\nOra: ${ora}`;

        if (livrare.value === "Livrare") {
            if (!inputAdresa.value.trim() || !inputTelefon.value.trim()) {
                alert("Completează adresa și telefonul!");
                return;
            }

            mesaj += `\nAdresă: ${inputAdresa.value}`;
            mesaj += `\nTelefon: ${inputTelefon.value}`;
        } else {
            mesaj += "\nRidicare de la locație";
            mesaj += "\nAdresă locație: 2 Rue De Drancy Cottage , 93700 Drancy";
        }

        mesaj += `\nComentariu: ${comentariu.trim() || "Niciun comentariu"}`;

        const telefonWhatsApp = "+33681536514";
        window.open(
            "https://wa.me/" + telefonWhatsApp + "?text=" + encodeURIComponent(mesaj),
            "_blank"
        );
    });

});
