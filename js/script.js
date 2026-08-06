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

    // --- FUNZIONE DI SUPPORTO PER APPLICARE LO STILE BLU AI BOTTONI ---
    const applyButtonStyle = (button) => {
        button.type = "button";
        button.style.backgroundColor = "#455B71";
        button.style.color = "#ffffff";
        button.style.border = "none";
        button.style.borderRadius = "4px";
        button.style.padding = "4px 8px";
        button.style.fontSize = "14px";
        button.style.cursor = "pointer";
        button.style.display = "inline-flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
    };

    // --- CONVERSIONE INPUT/TEXTAREA IN SPAN E VICEVERSA ---
    let lastActiveField = null;

    // Funzione principale di conversione da Campo a Span
    const convertToSpan = (field) => {
        const testo = field.value.trim();
        if (testo === "") return;

        const wrapper = field.closest(".textarea-wrapper");
        const elementToReplace = wrapper ? wrapper : field;

        // 1. Contenitore dello span salvato
        const container = document.createElement("span");
        container.className = "text-display-container";
        container.style.display = "inline-flex";
        container.style.alignItems = "center";
        container.style.gap = "8px";

        // 2. Span per il testo
        const textSpan = document.createElement("span");
        textSpan.textContent = testo;
        textSpan.style.fontWeight = "bold";
        textSpan.style.cursor = "pointer";

        if (field.tagName === "TEXTAREA") {
            textSpan.style.whiteSpace = "pre-wrap";
        }

        // 3. Funzione per tornare in modifica
        const revertToField = () => {
            container.replaceWith(elementToReplace);
            field.value = textSpan.textContent;
            field.focus();
        };

        textSpan.addEventListener("click", revertToField);
        container.appendChild(textSpan);

        // 4. Se è una TEXTAREA, crea il BOTTONE per la matita con lo STESSO STILE
        if (field.tagName === "TEXTAREA") {
            const editBtn = document.createElement("button");
            editBtn.className = "no-print edit-btn";
            editBtn.innerHTML = "✏️";
            editBtn.title = "Modifica testo";
            applyButtonStyle(editBtn); // Applica lo sfondo blu, padding, bordi, etc.

            editBtn.addEventListener("click", (e) => {
                e.preventDefault();
                revertToField();
            });

            container.appendChild(editBtn);
        }

        elementToReplace.replaceWith(container);
    };

    // Inizializzazione per input di testo e textarea
    const selector = "input[type='text'], textarea";

    document.querySelectorAll(selector).forEach(field => {

        if (field.tagName === "TEXTAREA") {
            if (!field.parentElement.classList.contains("textarea-wrapper")) {
                const wrapper = document.createElement("div");
                wrapper.className = "textarea-wrapper";
                wrapper.style.display = "inline-flex";
                wrapper.style.alignItems = "flex-start";
                wrapper.style.gap = "6px";

                field.parentNode.insertBefore(wrapper, field);
                wrapper.appendChild(field);

                // Bottone Spunta (Conferma)
                const confirmBtn = document.createElement("button");
                confirmBtn.className = "no-print confirm-btn";
                confirmBtn.innerHTML = "✅";
                confirmBtn.title = "Conferma testo";
                applyButtonStyle(confirmBtn); // Applica lo sfondo blu, padding, bordi, etc.

                confirmBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    convertToSpan(field);
                });

                wrapper.appendChild(confirmBtn);
            }
        }

        // Tracciamento ultimo campo attivo
        field.addEventListener("focus", () => {
            if (lastActiveField && lastActiveField !== field && lastActiveField.value.trim() !== "") {
                if (document.body.contains(lastActiveField)) {
                    convertToSpan(lastActiveField);
                }
            }
            lastActiveField = field;
        });

        // Salvataggio al blur
        field.addEventListener("blur", () => {
            setTimeout(() => {
                if (document.activeElement !== field && lastActiveField === field && field.value.trim() !== "") {
                    if (document.body.contains(field)) {
                        convertToSpan(field);
                    }
                }
            }, 150);
        });
    });

    // --- CONVERSIONE DA TASTIERA ---
    document.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            if (e.target.matches("input[type='text']")) {
                e.preventDefault();
                if (e.target.value.trim() !== "") {
                    convertToSpan(e.target);
                }
            }
            else if (e.target.matches("textarea") && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                if (e.target.value.trim() !== "") {
                    convertToSpan(e.target);
                }
            }
        }
    });

});

// --- FUNZIONE GENERALE DOWNLOAD PDF ---
function scaricaPDF() {
    window.print();
}