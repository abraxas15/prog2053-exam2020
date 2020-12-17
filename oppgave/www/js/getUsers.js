function getAllUsers() {
    fetch(`api/fetchUsers.php`, {
    }).then(res=>res.json())
    .then(data=>{  
        var brukerContainer = document.getElementById("users"); 

        data.forEach(x=> {
            
        //lager nytt element og appendere til brukerContainer
        var nyBrukerElement = document.createElement('div');
        nyBrukerElement.setAttribute("id", x.uid)
        nyBrukerElement.innerText = x.uname + "\n" + x.firstName + " " + x.lastName + "\n";
        brukerContainer.appendChild(nyBrukerElement);
            
        //Kan klikke div
        nyBrukerElement.onclick = function() {getUser(nyBrukerElement.id)};
        });
    });
}

function getUser(e){
    var user = document.getElementById("user");
    user.style.display = "block";
    fetch("api/fetchUser.php?id=" + e.toString(), {
  
    }).then(res=>res.json())
    .then(data=>{

        //puts info about user inside the HTML form
        document.getElementById("lastName").value = data.lastName;
        document.getElementById("uid").value = e;
        document.getElementById("firstName").value = data.firstName;
        document.getElementById("uname").value = data.uname;

    });
}
document.getElementById("submitForm").addEventListener('click', e=>{
    const dataForm = new FormData(e.target.form);
    fetch('api/updateUser.php', {
     method: 'POST',
     body: dataForm
    }).then(res=>res.json())
      .then(data=>{
        if (data.status=='success') {
            console.log("The user was updated");
            getAllUsers();
        } else {
            console.log("The user was not updated");
        }
      })
  })