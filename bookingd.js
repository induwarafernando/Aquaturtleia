

// Alpine.js initialization
document.addEventListener("alpine:init", () => {
    Alpine.data('selectedGender', () => ({
      selectedGender: '',
    }));
  });
  


  // Ensure you include Alpine.js in your project before using this script

// Initialize intl-tel-input
document.addEventListener("DOMContentLoaded", function() {
    // Your existing code for intl-tel-input initialization
    // ...
});

// Alpine.js initialization
document.addEventListener("alpine:init", () => {
    Alpine.data('selectedGender', () => ({
        selectedGender: '',
    }));

});




document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitBtn');
  
    // Event listener for submit button
    submitButton.addEventListener('click', function(event) {
      event.preventDefault();
  
      // Capture user input
      const fullName = document.getElementById('fullname').value;
      const mobileNumber = document.getElementById('mobileNumber').value;
      const email = document.getElementById('email').value;
      const confirmEmail = document.getElementById('confirmEmail').value;
      const selectedGender = document.getElementById('gender').value;
  
      // Create an object to store captured data
      const userData = {
        fullName: fullName,
        mobileNumber: mobileNumber,
        email: email,
        confirmEmail: confirmEmail,
        selectedGender: selectedGender
      };
  
      // Store the object in local storage
      localStorage.setItem('userData', JSON.stringify(userData));
  
      // Update the summary table with the captured data using innerHTML
      document.getElementById('summaryFullName').innerHTML = fullName;
      document.getElementById('summaryMobileNumber').innerHTML = mobileNumber;
      document.getElementById('summaryEmail').innerHTML = email;
      document.getElementById('summaryGender').innerHTML = selectedGender;

      const dataObject = JSON.parse(localStorage.getItem('formData'));
    const timeObject = JSON.parse(localStorage.getItem('timeSlotCounts'))

    // Update Date, Time, and Duration
    document.getElementById('summaryDate').innerText = dataObject.date;
    // Assuming 'selectedTimeSlots' in the dataObject is an array of selected time slots
    document.getElementById('summaryTime').innerText = dataObject.durationOfStay.join(', ');
    document.getElementById('summaryDuration').innerText = `${dataObject.durationOfStay.length} hrs (${timeObject.normalSelected} Normal : ${timeObject.peakSelected} Peak)`;
    


// Update Customer Types, Quantities, and Amounts
let totalAmount = 0;
dataObject.customerTypes.forEach((customerType, index) => {
  const rowId = `summary${customerType.replace(/\s+/g, '')}Row`;
  const amountId = `summary${customerType.replace(/\s+/g, '')}Amount`;

  const rowElement = document.getElementById(rowId);
  const amountElement = document.getElementById(amountId);

  if (dataObject.quantities[index] > 0) {
    rowElement.style.display = 'table-row';
    amountElement.innerText = `$${dataObject.amounts[index]}`;
    totalAmount += dataObject.amounts[index];
  } else {
    rowElement.style.display = 'none';
  }



  
// Update Infant row separately
const infantRow = document.getElementById('summaryInfantRow');
const infantAmount = document.getElementById('summaryInfantAmount');
const infantQty = document.querySelector('.qty[name="qty"][value="Infant"]');

// Check if infantQty is found before accessing its value
if (infantQty !== null) {
  const infantQtyValue = parseInt(infantQty.value);

  if (infantQtyValue > 0) {
    infantRow.style.display = 'table-row';
    infantAmount.innerText = '$0';
  } else {
    infantRow.style.display = 'none';
  }
}
// Update Final Total
document.getElementById('summaryTotal').innerText = `$${totalAmount}`;



    });
  });
});


//Vallidation

document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submitBtn');

  // Event listener for submit button
  submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Validate the form fields
    if (validateForm()) {
      // If validation passes, capture user input and proceed
      const fullName = document.getElementById('fullname').value;
      const mobileNumber = document.getElementById('mobileNumber').value;
      const email = document.getElementById('email').value;
      const confirmEmail = document.getElementById('confirmEmail').value;
      const selectedGender = document.getElementById('gender').value;

      // Create an object to store captured data
      const userData = {
        fullName: fullName,
        mobileNumber: mobileNumber,
        email: email,
        confirmEmail: confirmEmail,
        selectedGender: selectedGender
      };

      // Store the object in local storage
      localStorage.setItem('userData', JSON.stringify(userData));

      // Update the summary table with the captured data using innerHTML
      document.getElementById('summaryFullName').innerHTML = fullName;
      document.getElementById('summaryMobileNumber').innerHTML = mobileNumber;
      document.getElementById('summaryEmail').innerHTML = email;
      document.getElementById('summaryGender').innerHTML = selectedGender;
    }
  });

  // Function to validate the form fields
  function validateForm() {
    const fullName = document.getElementById('fullname').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const email = document.getElementById('email').value;
    const confirmEmail = document.getElementById('confirmEmail').value;

    if (!fullName || !mobileNumber || !email || !confirmEmail) {
      alert('All fields are required.');
      return false;
    }

    if (email !== confirmEmail) {
      alert('Email and Confirm Email must match.');
      return false;
    }

    return true;
  }
});
