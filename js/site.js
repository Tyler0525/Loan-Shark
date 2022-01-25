// display amesage to the user

//Caluculate the payment for the loan
function calcPayment(amount, rate, term) {
    return (amount * rate) / (1 - Math.pow(1 + rate, -term));
}


//caluctlate the interest for the current balance of the loan 
function calcInterest(balance, rate) {
    return balance * rate;
}


//convert rate to a monthly interest rate 
function calcRate(rate) {
    return rate = rate / 1200;
}

function getValues() {
    let loanAmount = document.getElementById("lamount").value;
    //months inputed from the user 
    let loanTerm = document.getElementById("lterm").value;
    let loanRate = document.getElementById("lrate").value;

    loanAmount = Number(loanAmount);
    loanTerm = parseInt(loanTerm);


    loanRate = parseFloat(loanRate);
    loanRate = calcRate(loanRate);

    //calculate a payment
    let payment = calcPayment(loanAmount, loanRate, loanTerm);

    //return a list of payment objects 
    let payments = getPayments(loanAmount, loanRate, loanTerm, payment);

    displayData(payments, loanAmount, payment);

}

//Build the amorization schedule 
function getPayments(loanAmount, loanRate, loanTerm, payment) {
    let paymentsArray = [];

    let balance = loanAmount;
    let totalInterest = 0;
    let monthlyPrincipal = 0;
    let monthlyInterest = 0;
    let monthlyTotalInterest = 0;

    for (let month = 1; month <= loanTerm; month++) {

        monthlyInterest = calcInterest(balance, loanRate);
        totalInterest += monthlyInterest;
        monthlyPrincipal = payment - monthlyInterest;
        balance = Math.abs(balance - monthlyPrincipal);

        //add the details to an object
        let curPayment = {
            month: month,
            payment: payment,
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            totalInterest: totalInterest,
            balance: balance
        };
        paymentsArray.push(curPayment);
    }

    return paymentsArray;
}

//display the data to the user 
function displayData(payments, loanAmount, payment) {

    let tableBody = document.getElementById("scheduleBody");

    let template = document.getElementById("schedule-Template");

    //clears the table of any previous data 
    tableBody.innerHTML = "";

    //configure currency formatter
    let currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    for (let i = 0; i < payments.length; i++) {

        let payRow = template.content.cloneNode(true);
        let payCols = payRow.querySelectorAll("td");

        payCols[0].textContent = payments[i].month;
        payCols[1].textContent = currencyFormatter.format(payments[i].payment.toFixed(2));
        payCols[2].textContent = currencyFormatter.format(payments[i].principal.toFixed(2));
        payCols[3].textContent = currencyFormatter.format(payments[i].interest.toFixed(2));
        payCols[4].textContent = currencyFormatter.format(payments[i].totalInterest.toFixed(2));
        payCols[5].textContent = currencyFormatter.format(payments[i].balance.toFixed(2));

        tableBody.appendChild(payRow);
    }
    //total Interest is in the last row of the payments array. 
    let totalInterest = payments[payments.length - 1].totalInterest;

    //calculate the total cost 
    let totalCost = Number(loanAmount) + totalInterest;

    let totalPrincipal = Number(loanAmount);

    let labelPrincipal = document.getElementById("totalPrincipal");
    labelPrincipal.innerHTML = Number(totalPrincipal).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let labelInterest = document.getElementById("totalInterest");
    labelInterest.innerHTML = Number(totalInterest).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let labelPayment = document.getElementById("payment");
    labelPayment.innerHTML = Number(payment).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let labelTotalCost = document.getElementById("totalPayments");
    labelTotalCost.innerHTML = Number(totalCost).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

}