document.getElementById('login-btn').addEventListener('click', function (e) {
    e.preventDefault()

    // Access Id's
    const mobileNumber = document.getElementById('mobile-number').value;
    const pin = parseInt(document.getElementById('pin').value);
    const warning = document.getElementById('warning');

    // Warning message for validations
    function warningMessage(messeage) {
        warning.innerText = messeage
        warning.style.display = "block"

        setTimeout(function () {
            warning.style.display = "none"
        }, 2000)
    }

    // Validations
    if (mobileNumber === "" || isNaN(mobileNumber) || mobileNumber.length < 11 || mobileNumber.length > 11) {
        warningMessage("⚠ Please enter a valid number");
    }
    else if (pin === "" || isNaN(pin) || pin.length < 4) {
        warningMessage("⚠ Please enter a valid pin");
    }
    else {
        window.location.href = "./home.html"
    }
})