const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');

// Load and show all expenses when the page opens
async function loadExpenses() {
  const res = await fetch('/expenses');
  const expenses = await res.json();

  list.innerHTML = ''; // clear the list first
  let total = 0;

  expenses.forEach(exp => {
    total += exp.amount;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${exp.title} — $${exp.amount.toFixed(2)} (${exp.category}) — ${exp.date}</span>
      <button onclick="deleteExpense(${exp.id})">Delete</button>
    `;
    list.appendChild(li);
  });

  totalDisplay.textContent = total.toFixed(2);
}

// When the form is submitted, add a new expense
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // stop the page from refreshing

  const title = document.getElementById('title').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;

  await fetch('/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, amount, category, date })
  });

  form.reset(); // clear the form
  loadExpenses(); // refresh the list
});

// Delete an expense
async function deleteExpense(id) {
  await fetch(`/expenses/${id}`, { method: 'DELETE' });
  loadExpenses(); // refresh the list
}

// Load expenses as soon as the page opens
loadExpenses();