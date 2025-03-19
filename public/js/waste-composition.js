const categories = ["paper", "glass", "metal", "plastics", "kitchen_waste", "hazardous_waste", "electronic_waste", "other_organic", "other_non_organic"];

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();x

        let wasteComposition = [];
        
        categories.forEach(category => {
            document.querySelectorAll(`[data-category="${category}"] .waste-entry`).forEach(entry => {
                const origin_id = entry.querySelector(`select[name="${category}[][origin]"]`).value;
                const waste_amount = parseFloat(entry.querySelector(`input[name="${category}[][weight]"]`).value) || 0;
                const subtype_remarks = entry.querySelector(`input[name="${category}[][name]"]`).value.trim();
                const material_id = materialMap[category]||null; // Convert category to its SQL ID
        
                if (subtype_remarks && origin_id && waste_amount > 0 && material_id) {
                    wasteComposition.push({ collection_id, material_id, subtype_remarks, origin_id, waste_amount });
                } else {
                    console.error("Invalid data:", { category, material_id, origin_id, waste_amount });
                }
            });
        });

        if (wasteComposition.length === 0) {
            alert("Error: No valid waste composition data.");
            return;
        }

        console.log("Submitting Data:", wasteComposition);

        fetch("/api/waste", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wasteComposition })
        })
        .then(response => response.json())
        .then(data => console.log("Server Response:", data))
        .catch(error => console.error("Submission Error:", error));
    });
});
    
    const container = document.getElementById("wasteComposition");
    categories.forEach(category => {
        let categoryDiv = document.createElement("div");
        categoryDiv.className = "waste-category";
        categoryDiv.dataset.category = category;
        categoryDiv.innerHTML = `
            <label>${category.replace("_", " ").toUpperCase()}:</label>
            <div class="entries"></div>
            
            <button class="btn-approve" type="button" onclick="addEntry('${category}')">
                <i class="fa-solid fa-plus"></i> Add Entry
            </button>
        `;
        container.appendChild(categoryDiv);
    });

    // Validate before form submission
    document.querySelector("form").addEventListener("submit", function (event) {
        if (!validateTotalPercentage()) {
            event.preventDefault(); // Prevent form submission
            alert("Error: Total waste composition must equal 100%.");
            return false;
        }
    });

    // Validate on input change
    document.querySelectorAll(".weight-input").forEach(input => {
        input.addEventListener("input", validateTotalPercentage);
    });


function addEntry(category) {
    let container = document.querySelector(`[data-category="${category}"] .entries`);
    let entryDiv = document.createElement("div");
    entryDiv.classList.add("waste-entry");

    entryDiv.innerHTML = `
        <input type="text" name="${category}[][name]" placeholder="Waste Type" required>
        
        <select name="${category}[][origin]" required>
            <option value="">Select Origin</option>
            <option value="1">Residential</option>
            <option value="2">Commercial</option>
            <option value="3">Institutional</option>
            <option value="4">Industrial</option>
            <option value="5">Health</option>
            <option value="6">Agricultural and Livestock</option>
        </select>



        <input type="number" name="${category}[][weight]" class="weight-input" min="0" step="0.001" placeholder="Weight % (wt)" required oninput="validateTotalPercentage()">

        <button class="btn-reject" type="button" onclick="removeEntry(this)">
            Remove <i class="fa-solid fa-trash-can"></i>
        </button>
    `;
    
    container.appendChild(entryDiv);
}

// Remove entry
function removeEntry(button) {
    button.parentElement.remove();
    validateTotalPercentage(); // Revalidate after removal
}


function validateTotalPercentage() {
    let total = 0;
    document.querySelectorAll(".weight-input").forEach(input => {
        total += parseFloat(input.value) || 0;
    });

    let warning = document.getElementById("waste-warning");
    if (!warning) {
        warning = document.createElement("p");
        warning.id = "waste-warning";
        warning.style.color = "red";
        document.getElementById("wasteComposition").appendChild(warning);
    }

    if (Math.abs(total - 100) < 0.01) {
        warning.textContent = "";
        return true;
    } else {
        warning.textContent = `Total waste composition must be 100%. Current: ${total.toFixed(2)}%`;
        return false;
    }
}
