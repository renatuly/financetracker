document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalExpensesElement = document.getElementById('total-expenses');

    let expenses = [];

    // Load saved expenses from Local Storage
    loadExpenses();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (description && !isNaN(amount)) {
            const expense = { description, amount };
            expenses.push(expense);

            // Save expense to Local Storage
            saveExpenses();

            // Add expense to the list
            addExpenseToList(expense);

            // Update total expenses
            updateTotalExpenses();

            // Clear form
            form.reset();
        }
    });

    function addExpenseToList(expense) {
        const li = document.createElement('li');
        li.textContent = `${expense.description}: ₸${expense.amount.toFixed(2)}`;
        expenseList.appendChild(li);
    }

    function updateTotalExpenses() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalExpensesElement.textContent = `₸${total.toFixed(2)}`;
    }

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function loadExpenses() {
        const savedExpenses = localStorage.getItem('expenses');
        if (savedExpenses) {
            expenses = JSON.parse(savedExpenses);
            expenses.forEach(addExpenseToList);
            updateTotalExpenses();
        }
    }
});
