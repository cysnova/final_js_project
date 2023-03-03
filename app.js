document.getElementById("loan-form").addEventListener("submit", function (e) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";
  setTimeout(calcualteResult, 1000);
  e.preventDefault();
});

function calcualteResult() {
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = amount.value;
  const calculatedRate = interest.value / 100 / 12; //r/n
  const calculatedTimes = years.value * 12; //nt

  // Compute monthly payment
  const x = Math.pow(1 + calculatedRate, calculatedTimes);
  const monthly = (principal * x * calculatedRate) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedTimes).toFixed(2);
    totalInterest.value = (monthly * calculatedTimes - principal).toFixed(2);
    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

function showError(error) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "none";
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-dark text-center fs-5";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
