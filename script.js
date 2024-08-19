document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get input values
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const purchaser = document.getElementById('purchaser').value;
    
    // Save expense to local storage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ description, amount, purchaser });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Add to UI
    const expenseList = document.getElementById('expense-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        ${description} (Purchaser: ${purchaser}): ₸${amount.toFixed(2)}
        <button class="delete-btn">Delete</button>
    `;
    expenseList.appendChild(listItem);
    
    // Update total expenses
    updateTotalExpenses();
    
    // Clear form inputs
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('purchaser').value = '';
});

document.getElementById('expense-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        // Confirm deletion
        const confirmDelete = confirm("Are you sure you want to delete this expense?");
        if (confirmDelete) {
            const listItem = event.target.parentElement;
            const amountText = listItem.textContent.match(/₸([\d.]+)/)[1];
            const amount = parseFloat(amountText);
            const description = listItem.textContent.split(' (')[0];
            const purchaser = listItem.textContent.split('Purchaser: ')[1].split('):')[0];
            
            // Remove the list item
            listItem.remove();
            
            // Remove from local storage
            const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            const updatedExpenses = expenses.filter(expense => !(expense.description === description && expense.amount === amount && expense.purchaser === purchaser));
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            
            // Update total expenses
            updateTotalExpenses();
        }
    }
});

function updateTotalExpenses() {
    const expenseList = document.getElementById('expense-list');
    let totalExpenses = 0;
    
    expenseList.querySelectorAll('li').forEach(item => {
        const amountText = item.textContent.match(/₸([\d.]+)/)[1];
        totalExpenses += parseFloat(amountText);
    });
    
    document.getElementById('total-expenses').textContent = `₸${totalExpenses.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
});

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    expenses.forEach(expense => {
        const expenseList = document.getElementById('expense-list');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${expense.description} (Purchaser: ${expense.purchaser}): ₸${expense.amount.toFixed(2)}
            <button class="delete-btn">Delete</button>
        `;
        expenseList.appendChild(listItem);
    });
    
    updateTotalExpenses();
}
