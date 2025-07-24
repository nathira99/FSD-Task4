let entries = [];
let editIndex = null;

function getInputValues() {
  return {
    description: document.getElementById("description").value.trim(),
    amount: parseFloat(document.getElementById("amount").value),
    type: document.getElementById("type").value,
  };
}

function resetFields() {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("type").value = "income";
  editIndex = null;
}

function addEntry() {
  const { description, amount, type } = getInputValues();
  if (!description || isNaN(amount)) return alert("Enter valid data.");

  const newEntry = { description, amount, type };
  if (editIndex !== null) {
    entries[editIndex] = newEntry;
    editIndex = null;
  } else {
    entries.push(newEntry);
  }

  renderEntries();
  resetFields();
}

function editEntry(index) {
  const entry = entries[index];
  document.getElementById("description").value = entry.description;
  document.getElementById("amount").value = entry.amount;
  document.getElementById("type").value = entry.type;
  editIndex = index;
}

function deleteEntry(index) {
  if (confirm("Delete this entry?")) {
    entries.splice(index, 1);
    renderEntries();
  }
}

function renderEntries() {
  const list = document.getElementById("entry-list");
  const filter = document.querySelector('input[name="filter"]:checked').value;
  list.innerHTML = "";

  let totalIncome = 0,
    totalExpense = 0;

  entries.forEach((entry, i) => {
    if (filter !== "all" && entry.type !== filter) return;

    if (entry.type === "income") totalIncome += entry.amount;
    else totalExpense += entry.amount;

    const li = document.createElement("li");
    li.className = "flex justify-between items-center py-2";

    const text = document.createElement("div");
    text.innerHTML = `<strong>${entry.type === "income" ? "+" : "-"}$${
      entry.amount
    }</strong> - ${entry.description}`;

    const actions = document.createElement("div");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "text-blue-500 mr-2";
    editBtn.onclick = () => editEntry(i);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "text-red-500";
    deleteBtn.onclick = () => deleteEntry(i);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(actions);
    list.appendChild(li);
  });

  document.getElementById("total-income").textContent = `$${totalIncome}`;
  document.getElementById("total-expense").textContent = `$${totalExpense}`;
  document.getElementById("balance").textContent = `$${
    totalIncome - totalExpense
  }`;
}

renderEntries();
