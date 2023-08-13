const form = document.querySelector("#credit-card");
const cardNumber = document.querySelector("#card-number");
const cardHolder = document.querySelector("#name-text");
const cardExpiration = document.querySelector("#valid-thru-text");
const cardCVV = document.querySelector("#cvv-text");

const cardNumberText = document.querySelector(".number-vl");
const cardHolderText = document.querySelector(".name-vl");
const cardExpirationText = document.querySelector(".expiration-vl");
const cardCVVText = document.querySelector(".cvv-vl");

cardNumber.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardNumberText.innerText = "1234 5678 9101 1121";
    } else {
        const valuesOfInput = e.target.value.replaceAll(" ", "");

        if (e.target.value.length > 14) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
            cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
        } else if (e.target.value.length > 9) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
            cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
        } else if (e.target.value.length > 4) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
            cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
        } else {
            cardNumberText.innerHTML = valuesOfInput
        }
    }
})

cardHolder.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardHolderText.innerHTML = "INDUWARA FERNANDO";
    } else {
        cardHolderText.innerHTML = e.target.value.toUpperCase();
    }
})

cardExpiration.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardExpirationText.innerHTML = "02/40";
    } else {
        const valuesOfInput = e.target.value.replace("/", "");

        if (e.target.value.length > 2) {
            e.target.value = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
            cardExpirationText.innerHTML = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
        } else {
            cardExpirationText.innerHTML = valuesOfInput;
        }
    }
})

cardCVV.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardCVVText.innerHTML = "123";
    } else {
        cardCVVText.innerHTML = e.target.value;
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // alert("Credit Card Added!");
    // Redirect to thankyou.html after the alert
    // window.location.href = 'thankyou.html';
})

document.addEventListener('DOMContentLoaded', function () {
   

    const submitBtn2 = document.getElementById('submitBtn2');
    submitBtn2.addEventListener('click', function () {
        const dataObject = JSON.parse(localStorage.getItem('formData'));
        const timeObject = JSON.parse(localStorage.getItem('timeSlotCounts'));
        const userData = JSON.parse(localStorage.getItem('userData'));

        document.getElementById('summaryTime').innerText = dataObject.durationOfStay.join(', ');
        document.getElementById('summaryDate').innerText = dataObject.date;
        document.getElementById('summaryDuration').innerText = `${dataObject.durationOfStay.length} hrs (${timeObject.normalSelected} Normal : ${timeObject.peakSelected} Peak)`;
        document.getElementById('summaryFullName').innerText = userData.fullName;
        document.getElementById('summaryMobileNumber').innerText = userData.mobileNumber;
        document.getElementById('summaryEmail').innerText = userData.email; 
        document.getElementById('summaryGender').innerText = userData.selectedGender;
        
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
        document.getElementById('add').innerText =`$${totalAmount}`;

       
    });
});

