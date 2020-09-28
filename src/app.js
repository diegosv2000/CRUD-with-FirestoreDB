// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyAMEQ3U2m-wylRoMGbS8poo_rEuc6mu3Nw',
    authDomain: 'crud-v2-d7711.firebaseapp.com',
    projectId: 'crud-v2-d7711'
});
  
var db = firebase.firestore();

// Show Form
function formD(){
    document.getElementById("data").innerHTML = `
    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="example@gmail.com">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Andres Salvador">
    <label for="age">Age</label>
    <input type="number" id="age" name="age" placeholder="25">
    <label for="phone">Phone Number</label>
    <input type="number" id="phone" name="phone" placeholder="912456035">
    <button onclick="add()" id="record">Record Data</button>
    `;
}

// Add Data
function add(){
    var email=document.getElementById("email").value;
    var name=document.getElementById("name").value;
    var age=document.getElementById("age").value;
    var phone=document.getElementById("phone").value;
    db.collection("user").add({
        Email: email,
        Name: name,
        Age: age,
        Phone: phone
    })
    .then(function(docRef) {
        swal("Registered", "Successfully Registered Data", "success");
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        
        console.error("Error adding document: ", error);
    });
    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("phone").value = "";
}

// Read Data
function readD(){
    document.getElementById("data").innerHTML=`
    <table>
        <thead>
            <th>Email</th><th>Name</th><th>Age</th><th>Phone</th>
        </thead>
        <tbody id="tbody">
        <tr>
            <td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>
        </tr>
        </tbody>
    </table>
    `;
    document.getElementById("tbody").innerHTML="";

    db.collection("user").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("tbody").innerHTML+=`
            
            <tr>
                <td>${doc.data().Email}</td><td>${doc.data().Name}</td><td>${doc.data().Age}</td><td>${doc.data().Phone}</td><td><button id="edit" onclick="edit('${doc.id}','${doc.data().Email}','${doc.data().Name}','${doc.data().Age}','${doc.data().Phone}')"> Edit</button></td><td><button id="remove" onclick="remove('${doc.id}')">- Remove</button></td>
            </tr>
            
            `;
        });
    });
}


// Remove Element
function remove(ID){
    db.collection("user").doc(ID).delete().then(function() {

    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

    console.log("Document successfully deleted!");
    document.getElementById("data").innerHTML=`
        <table>
            <thead>
                <th>Email</th><th>Name</th><th>Age</th><th>Phone</th>
            </thead>
            <tbody id="tbody">
            <tr>
            table    <td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>
            </tr>
            </tbody>
        </>
    `;
    document.getElementById("tbody").innerHTML="";
    db.collection("user").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("tbody").innerHTML+=`
            
            <tr>
                <td>${doc.data().Email}</td><td>${doc.data().Name}</td><td>${doc.data().Age}</td><td>${doc.data().Phone}</td><td><button id="edit" onclick="edit('${doc.id}','${doc.data().Email}','${doc.data().Name}','${doc.data().Age}','${doc.data().Phone}')">Edit</button></td><td><button id="remove" onclick="remove('${doc.id}')">Remove</button></td>
            </tr>
            
            `;
        });
    });

    swal("Deleted Data", "It has been successfully deleted", "success");
}

// Edit data
function edit(ID,email,name,age,phone){

    document.getElementById("data").innerHTML = `
    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="example@gmail.com">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Andres Salvador">
    <label for="age">Age</label>
    <input type="number" id="age" name="age" placeholder="25">
    <label for="phone">Phone Number</label>
    <input type="number" id="phone" name="phone" placeholder="912456035">
    <button onclick="add()" id="record">Record Data</button>
    `;
    document.getElementById("email").value = email;
    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("phone").value = phone;
    var button= document.getElementById("record");
    button.innerHTML= "Record Changes";
    button.onclick = function(){
        var washingtonRef = db.collection("user").doc(ID);
        email = document.getElementById("email").value;
        name = document.getElementById("name").value;
        age = document.getElementById("age").value;
        phone = document.getElementById("phone").value;
        
        //Data Update
    document.getElementById("data").innerHTML=`
    <table>
        <thead>
            <th>Email</th><th>Name</th><th>Age</th><th>Phone</th>
        </thead>
        <tbody id="tbody">
        <tr>
        table    <td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>
        </tr>
        </tbody>
    </>
    `;
    document.getElementById("tbody").innerHTML="";
    db.collection("user").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("tbody").innerHTML+=`
            
            <tr>
                <td>${doc.data().Email}</td><td>${doc.data().Name}</td><td>${doc.data().Age}</td><td>${doc.data().Phone}</td><td><button id="edit" onclick="edit('${doc.id}','${doc.data().Email}','${doc.data().Name}','${doc.data().Age}','${doc.data().Phone}')">Edit</button></td><td><button id="remove" onclick="remove('${doc.id}')">Remove</button></td>
            </tr>
            
            `;
        });
    });
        
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            Email: email,
            Name: name,
            Age: age,
            Phone: phone
        })
        .then(function() {
            button.innerHTML='Record Data';
            swal("Saved", "Updated Data", "success");

        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        
    }
    
}
