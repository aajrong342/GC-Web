const materialMap = {
    "paper": '1',
    "glass": '2',
    "metal": '3',
    "plastic": '4',
    "kitchen_waste": '5',
    "hazardous_waste": '6',
    "electrical_waste": '7',
    "organic": '8',
    "inorganic": '9',

};

document.addEventListener("DOMContentLoaded", function () {

    // Waste form submission process begins with clicking submit
    document.getElementById("waste-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        
        const formData = new FormData(this);
        const jsonObject = Object.fromEntries(formData.entries());

        /*
        let wasteComposition = [];

        document.querySelectorAll(".waste-category").forEach(categoryDiv => {
            categoryDiv.querySelectorAll(".waste-entry").forEach(entry => {
                const material_name = categoryDiv.dataset.category;
                const material_id = materialMap[material_name] || null; // Convert category name to ID
                const subtype_remarks = entry.querySelector('input[name$="[name]"]').value.trim();
                const origin_id = entry.querySelector('select[name$="[origin]"]').value;
                const waste_amount = parseFloat(entry.querySelector('input[name$="[weight]"]').value) || 0;

                if (material_id && subtype_remarks && origin_id && waste_amount > 0) {
                    wasteComposition.push({ material_name, material_id, subtype_remarks, origin: origin_id, waste_amount });
                }
            });
        });

        jsonObject.wasteComposition = wasteComposition;
        */

        try {
            const response = await fetch("/submit-report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonObject)
            });

            const result = await response.json();
            if (response.ok) {
                alert("Report submitted successfully!");
            } else {
                alert(result.error || "Submission failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    });

    
});