function goToDashboard(){

    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const demoUser = "admin";
    const demoPass = "admin123";

    if(username === demoUser && password === demoPass){
        window.location.href = "dashboard.html";
    }else{
        alert("Invalid username or password");
    }

}