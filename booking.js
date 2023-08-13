document.addEventListener('DOMContentLoaded', function () {
    
    updateAmounts();
    var qtyInputs = document.querySelectorAll('.qty');
    var plusButtons = document.querySelectorAll('.qty-plus');
    var minusButtons = document.querySelectorAll('.qty-minus');

    for (var i = 0; i < qtyInputs.length; i++) {
        qtyInputs[i].addEventListener('keyup', updateAmounts);
        qtyInputs[i].addEventListener('keypress', updateAmounts);
        qtyInputs[i].addEventListener('blur', updateAmounts);
        qtyInputs[i].addEventListener('change', updateAmounts);

        plusButtons[i].addEventListener('click', increaseQty);
        minusButtons[i].addEventListener('click', decreaseQty);
    }
;

function increaseQty() {
    var qtyInput = this.parentNode.querySelector('.qty');
    var currentQty = parseInt(qtyInput.value);
    qtyInput.value = currentQty + 1;
    updateAmounts();
}

function decreaseQty() {
    var qtyInput = this.parentNode.querySelector('.qty');
    var currentQty = parseInt(qtyInput.value);
    if (currentQty > 0) {
        qtyInput.value = currentQty - 1;
        updateAmounts();
    }
}

function updateAmounts() {
    var rows = document.querySelectorAll('#myTable tbody tr');
    var total = 0;
    
    for (var i = 0; i < rows.length; i++) {
        var qtyInput = rows[i].querySelector('.qty');
        var priceDiv = rows[i].querySelector('.price');
        var amountSpan = rows[i].querySelector('.amount');

        var qty = parseInt(qtyInput.value);
        var price = parseFloat(priceDiv.getAttribute('value'));
        var amount = qty * price;
        amountSpan.textContent = amount.toFixed(2);

        total += amount;
    }

    var totalSpan = document.getElementById('total');
    totalSpan.textContent = total.toFixed(2);
}
});

//js for storing on local storage//


  document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the selected date
    const selectedDate = document.getElementById('selectedDate').value;

    // Get the customer types, quantities, and prices
    const customerTypes = ["Local Adult", "Local Child", "Foreign Adult", "Foreign Child"];
    const quantities = Array.from(document.querySelectorAll('.qty')).map(input => parseInt(input.value));
    const nprices = [4,2,10,5];
    const pprices = [6,3,13,8];
    const timeObject = JSON.parse(localStorage.getItem('timeSlotCounts'))
    const peakSelected = timeObject.peakSelected;
    const normalSelected = timeObject.normalSelected;
    // Calculate the total amount per customer type
    const amounts = quantities.map((quantity, index) => quantity * nprices[index]*normalSelected + quantity * pprices[index]*peakSelected);

    // Calculate the final total
    const finalTotal = amounts.reduce((acc, amount) => acc + amount, 0);

    // Get the selected time slots
    const selectedTimeSlots = Array.from(document.querySelectorAll('[name="timeSlot"]:checked')).map(checkbox => checkbox.value);

    // Create the data object
    const dataObject = {
      date: selectedDate,
      customerTypes: customerTypes,
      quantities: quantities,
      nprices: nprices,
      pprices: pprices,
      amounts: amounts,
      finalTotal: finalTotal,
      durationOfStay: selectedTimeSlots,
    };

    // Store the data object in local storage
    localStorage.setItem('formData', JSON.stringify(dataObject));

    // Display an alert or perform any other action to notify the user of successful submission
    alert('Form submitted successfully!');
  });




//summary table js//

  document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Update the summary table with the data from the local storage
    updateSummaryTable();
  });

  function updateSummaryTable() {
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
});

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


    //hourstable
    document.getElementById('normal-hours').innerText = `${timeObject.normalSelected}`;
    document.getElementById('peak-hours').innerText = `${timeObject.peakSelected}`;
    document.getElementById('normal-hours1').innerText = `${timeObject.normalSelected}`;
    document.getElementById('peak-hours1').innerText = `${timeObject.peakSelected}`;
    document.getElementById('normal-hours2').innerText = `${timeObject.normalSelected}`;
    document.getElementById('peak-hours2').innerText = `${timeObject.peakSelected}`;
    document.getElementById('normal-hours3').innerText = `${timeObject.normalSelected}`;
    document.getElementById('peak-hours3').innerText = `${timeObject.peakSelected}`;
    document.getElementById('normal-hours4').innerText = `${timeObject.normalSelected}`;
    document.getElementById('peak-hours4').innerText = `${timeObject.peakSelected}`;


// Update Final Total
document.getElementById('summaryTotal').innerText = `$${totalAmount}`;
}

document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();

// Enable the next page button after clicking the submit button
document.getElementById('nextPageButton').removeAttribute('disabled');
  });


  document.getElementById('dropdownButton').addEventListener('click', function () {
    const checkboxList = document.getElementById('checkboxList');
    checkboxList.classList.toggle('show');
  });
  
  const checkboxes = document.querySelectorAll('.checkbox-list input[type="checkbox"]');
  const peakTimeSlots = ['11am', '12pm', '1pm'];
  const peakRange = ['3pm', '4pm', '5pm', '6pm'];
  
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        if (index > 0 && !checkboxes[index - 1].checked) {
          this.checked = false;
        }
      } else {
        for (let i = index + 1; i < checkboxes.length; i++) {
          checkboxes[i].checked = false;
        }
      }
  
      // Update data object with peak and non-peak hours
      const dataObject = JSON.parse(localStorage.getItem('formData')) || {};
      dataObject.durationOfStay = Array.from(checkboxes).map(checkbox => {
        const value = checkbox.value;
        if (peakTimeSlots.includes(value) || (value >= peakRange[0] && value <= peakRange[peakRange.length - 1])) {
          return `${value} (Peak)`;
        } else {
          return value;
        }
      });
      localStorage.setItem('formData', JSON.stringify(dataObject));
    });
  });
  
  
function updateSelectedDate() { 
    const calendarInput = document.getElementById('calendar');
    const selectedDateInput = document.getElementById('selectedDate');
    selectedDateInput.value = calendarInput.value;
  }
  
// Array to store selected time slots
let selectedTimeSlots = [];

// Array of all time slot values
const timeSlots = [
  "7am", "8am", "9am", "10am", "11am",
  "12pm", "1pm", "2pm", "3pm", "4pm",
  "5pm", "6pm"
];

// Array of peak hour values
const peakHours = ["11am", "12pm", "1pm", "3pm", "4pm", "5pm", "6pm"];

// Function to update the local storage
function updateLocalStorage() {
  const peakSelected = selectedTimeSlots.filter(slot => peakHours.includes(slot)).length;
  const normalSelected = selectedTimeSlots.length - peakSelected;

  const timeSlotCounts = {
    peakSelected: peakSelected,
    normalSelected: normalSelected
  };

  localStorage.setItem('timeSlotCounts', JSON.stringify(timeSlotCounts));
}

// Initialize checkboxes and local storage
const checkboxList = document.getElementById('checkboxList');
checkboxList.innerHTML = timeSlots.map(slot => `
  <label>
    <input type="checkbox" name="timeSlot" value="${slot}">
    ${slot}
  </label>
`).join('');

// Load stored values from local storage
const storedTimeSlotCounts = localStorage.getItem('timeSlotCounts');
if (storedTimeSlotCounts) {
  const parsedCounts = JSON.parse(storedTimeSlotCounts);
  selectedTimeSlots = [...Array(parsedCounts.peakSelected).fill('').map(() => peakHours[0]), ...Array(parsedCounts.normalSelected).fill('').map(() => timeSlots[0])];
} else {
  selectedTimeSlots = [];
}

// Update the checkboxes based on selectedTimeSlots array
checkboxList.querySelectorAll('input[name="timeSlot"]').forEach(input => {
  input.checked = selectedTimeSlots.includes(input.value);
});

// Event listener for checkbox changes
document.addEventListener('change', function(event) {
  if (event.target.name === 'timeSlot') {
    if (event.target.checked) {
      selectedTimeSlots.push(event.target.value);
    } else {
      const index = selectedTimeSlots.indexOf(event.target.value);
      if (index !== -1) {
        selectedTimeSlots.splice(index, 1);
      }
    }
    updateLocalStorage();
  }
});

