const leadForm = document.getElementById("leadForm");
const leadTableBody = document.getElementById("leadTableBody");
const searchInput = document.getElementById("searchInput");

// Load existing leads
let leads = JSON.parse(localStorage.getItem("leads")) || [];

function updateStats(){

    document.getElementById("totalLeads").textContent =
        leads.length;

    document.getElementById("contactedLeads").textContent =
        leads.filter(
            lead => lead.status === "Contacted"
        ).length;

    document.getElementById("convertedLeads").textContent =
        leads.filter(
            lead => lead.status === "Converted"
        ).length;
}
// Display leads
function displayLeads() {

    leadTableBody.innerHTML = "";

    leads.forEach((lead, index) => {

        let statusClass = "";

        if (lead.status === "New") {
            statusClass = "status-new";
        }
        else if (lead.status === "Contacted") {
            statusClass = "status-contacted";
        }
        else {
            statusClass = "status-converted";
        }

        const row = `
            <tr>
                <td>${lead.name}</td>
                <td>${lead.email}</td>
                <td>${lead.source}</td>

                <td class="${statusClass}">
                    ${lead.status}
                </td>

                <td>${lead.notes}</td>

<td>
    <button
        class="edit-btn"
        onclick="editLead(${index})">
        Edit
    </button>

    <button
        class="delete-btn"
        onclick="deleteLead(${index})">
        Delete
    </button>
</td>
</tr>
`;
        leadTableBody.innerHTML += row;
    });
updateStats();

}

// Add lead
leadForm.addEventListener("submit", function(e){

    e.preventDefault();

    const lead = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        source: document.getElementById("source").value,

        status: document.getElementById("status").value,

        notes: document.getElementById("notes").value
    };

    leads.push(lead);

    localStorage.setItem(
        "leads",
        JSON.stringify(leads)
    );

    leadForm.reset();

    searchInput.value = "";
    
    displayLeads();
});

// Delete lead
function deleteLead(index){

    leads.splice(index, 1);

    localStorage.setItem(
        "leads",
        JSON.stringify(leads)
    );

    displayLeads();
}

searchInput.addEventListener("keyup", function(){

    let search = searchInput.value.toLowerCase();

    let filteredLeads = leads.filter(function(lead){

        return (
            lead.name.toLowerCase().includes(search) ||
            lead.email.toLowerCase().includes(search)
        );

    });

    leadTableBody.innerHTML = "";

    filteredLeads.forEach((lead, index)=>{

        let statusClass="";

        if(lead.status==="New"){
            statusClass="status-new";
        }
        else if(lead.status==="Contacted"){
            statusClass="status-contacted";
        }
        else{
            statusClass="status-converted";
        }

        leadTableBody.innerHTML += `
        <tr>
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>${lead.source}</td>
            <td class="${statusClass}">${lead.status}</td>
            <td>${lead.notes}</td>
            <td>
                <button class="edit-btn"
                    onclick="editLead(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteLead(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

});

function editLead(index){

    let lead = leads[index];

    document.getElementById("name").value = lead.name;
    document.getElementById("email").value = lead.email;
    document.getElementById("source").value = lead.source;
    document.getElementById("status").value = lead.status;
    document.getElementById("notes").value = lead.notes;

    leads.splice(index,1);

    localStorage.setItem(
        "leads",
        JSON.stringify(leads)
    );

    displayLeads();
}

// Initial load
displayLeads();
