document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            form.submit();
            alert('Order Placed, please check your inbox for a confirmation email');
        }
    });

    function validateForm() {
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const area = document.querySelector('#area-code').value;
        const telephone = document.querySelector('#telephone').value;
        const address = document.querySelector('#address').value;
        const cardNumber = document.querySelector('#cardNumber').value;
        const cvv = document.querySelector('#cvv').value;
        const expiryMonth = document.querySelector('#expiryMonth').value;
        const expiryYear = document.querySelector('#expiryYear').value;

        if (!name) {
            alert('Name field is required.');
            return false;
        }

        if (!email || !email.includes('@') || !email.endsWith('.com')) {
            alert('Please enter a valid email address.');
            return false;
        }

        if(!area || !/\d{3}$/.test(area)){
            alert('Area code must contain 3 digits');
            return false;
        }

        if (!telephone || !/^\d{7}$/.test(telephone)) {
            alert('Phone number should contain 7 digits.');
            return false;
        }

        if (!address) {
            alert('Address field is required.');
            return false;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            alert('Card number should be 16 digits long.');
            return false;
        }

        if (!/^\d{3}$/.test(cvv)) {
            alert('CVV should be 3 digits.');
            return false;
        }

        if (!/^(0[1-9]|1[0-2])$/.test(expiryMonth)) {
            alert('Expiry month should be between 01 and 12.');
            return false;
        }

        const currentYear = new Date().getFullYear();
        if (isNaN(expiryYear) || expiryYear < currentYear + 1 || expiryYear > 2029) {
            alert('Expiry year should be after ' + (currentYear + 1) + ' and before 2030.');
            return false;
        }

        return true;
    }
});
