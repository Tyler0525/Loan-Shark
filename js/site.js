// display amesage to the user
function getMessage() {

    let userMessage = document.getElementById("message").value;
    
Swal.fire({
    icon: 'success',
    title: 'THE APP SAYS',
    userMessage,
})

    console.log("Hello Console Log");
}