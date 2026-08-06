document.addEventListener("DOMContentLoaded", () => {

    // --- FUNZIONE UNICA: checkbox che abilita/disabilita input associati ---
    document.querySelectorAll(".cb-toggle").forEach(checkbox => {

        checkbox.addEventListener("change", () => {
            const target = checkbox.dataset.target;

            document
                .querySelectorAll(`.toggle-input[data-target="${target}"]`)
                .forEach(input => {
                    input.disabled = !checkbox.checked;
                });
        });

    });

    // --- TRASFORMA TUTTI GLI INPUT TESTUALI IN TESTO QUANDO PREMI INVIO ---
    document.addEventListener("keydown", function(e) {

        if (e.target.matches("input[type='text']") && e.key === "Enter") {
            e.preventDefault();

            const input = e.target;
            const testo = input.value.trim();
            if (testo === "") return;

            const span = document.createElement("span");
            span.textContent = testo;
            span.style.fontWeight = "bold";
            span.style.cursor = "pointer";

            // clic per tornare in modifica
            span.addEventListener("click", () => {
                span.replaceWith(input);
                input.focus();
            });

            input.replaceWith(span);
        }
    });

});

// --- FUNZIONE GENERALE DOWNLOAD PDF (bottone nascosto dalla stampa) ---
function scaricaPDF() {
    window.print();
}
