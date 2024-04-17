// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const ageInput = document.getElementById('age');
    const incomeInput = document.getElementById('income');
    const extraIncomeInput = document.getElementById('extraIncome');
    const deductionsInput = document.getElementById('deductions');
    const calculateBtn = document.getElementById('calculateBtn');
    const errorIcons = document.getElementById('errorIcons');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
  
    calculateBtn.addEventListener('click', function(event) {
      event.preventDefault();
      hideErrorIcons();
      if (validateForm()) {
        const age = ageInput.value;
        const income = parseFloat(incomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value);
        const deductions = parseFloat(deductionsInput.value);
  
        let tax = 0;
        if (income + extraIncome - deductions > 800000) {
          if (age === '<40') {
            tax = 0.3 * (income + extraIncome - deductions - 800000);
          } else if (age === '40-60') {
            tax = 0.4 * (income + extraIncome - deductions - 800000);
          } else if (age === '≥60') {
            tax = 0.1 * (income + extraIncome - deductions - 800000);
          }
        }
  
        showModal(tax);
      }
    });
  
    function validateForm() {
      let isValid = true;
      if (!ageInput.value) {
        displayError(ageInput, ageError);
        isValid = false;
      }
      if (!incomeInput.value) {
        displayError(incomeInput, incomeError);
        isValid = false;
      }
      if (!extraIncomeInput.value) {
        displayError(extraIncomeInput, extraIncomeError);
        isValid = false;
      }
      if (!deductionsInput.value) {
        displayError(deductionsInput, deductionsError);
        isValid = false;
      }
      return isValid;
    }
  
    function displayError(input, errorIcon) {
      input.classList.add('error');
      errorIcon.style.display = 'inline-block';
    }
  
    function hideErrorIcons() {
      const icons = errorIcons.querySelectorAll('.errorIcon');
      icons.forEach(icon => icon.style.display = 'none');
    }
  
    function showModal(tax) {
      const taxResult = document.getElementById('taxResult');
      taxResult.textContent = `Tax to be paid: ${tax.toFixed(2)} Lakhs`;
      modal.style.display = 'block';
    }
  
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  });
  