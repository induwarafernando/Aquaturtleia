function openPopup() {
    var popup = document.getElementById("Popupm");
    popup.classList.add("open-popup");
}

function closePopup() {
    var popup = document.getElementById("Popupm");
    popup.classList.remove("open-popup");
}

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