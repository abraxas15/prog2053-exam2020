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