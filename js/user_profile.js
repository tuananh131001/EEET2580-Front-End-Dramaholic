let current_user = localStorage.getItem('UserID')
fetch(`https://dramaholic.herokuapp.com/api/customers`)
.then((response) => response.json())
.then((data) => data.content)
.then((content) => {
let total_user = content.length
if (total_user==0) {
    console.log("no data found");
    return;
}
else {
    for (let i = 0; i < total_user; i++) {
    if (content[i].id == current_user)
    return content[i];
    }
    return;
}
})
.then((user) => {
    // document.querySelector("#membership").innerHTML = 'Member since ' + user.membership
    // document.querySelector("#user_avt").src = localStorage.getItem('avt')
    document.querySelector("#user_username").innerHTML += user.username
    document.querySelector("#user_name").innerHTML = user.name
    document.querySelector("#user_mail").innerHTML = user.email
    document.querySelector("#user_password").value += user.password
    document.querySelector("#user_phone").innerHTML = user.phone
    document.querySelector("#user_dob").innerHTML = user.dob
})
.catch((error) => {
    console.log(error); 
});


document.querySelector("#edit_info_btn").addEventListener('click', init_modal_edit_info);
function init_modal_edit_info() {
    document.querySelector("#modal_username").value = document.querySelector("#user_username").innerHTML;
    document.querySelector("#modal_name").value = document.querySelector("#user_name").innerHTML;
    document.querySelector("#modal_mail").value = document.querySelector("#user_mail").innerHTML;
    document.querySelector("#modal_phone").value = document.querySelector("#user_phone").innerHTML;
    document.querySelector("#modal_dob").value = document.querySelector("#user_dob").innerHTML;
}

// document.querySelector("#show_checkbox").addEventListener('click', show_pw('.password'));
// function show_pw(selector) {
// var pw = document.querySelectorAll(selector);
// console.log(pw[0].getAttribute("type"));

// if (pw[0].type == "password") {
//     for (var i= 0; i<pw.length; i++)
//     pw[i].type = "text";

// } else {
//     for (var i= 0; i<pw.length; i++)
//     pw[i].type = "password";
// }
// }

function change_avt() {
localStorage.setItem('avt') = document.querySelector("#upload_avt").value;
$('.alert').alert()
location.reload();
}

//reset modal form after close
$(".modal").on('hidden.bs.modal', function () {
    var pw = document.querySelectorAll(".password");
      for (var i= 0; i<pw.length; i++)
        pw[i].type = "password";
    $(this).find('form').trigger('reset');
});

function valid_pw() {
    var current_pw = document.querySelector("#current_pw_modal");
    var new_pw = document.querySelector("#new_pw_modal");
    var confirm_pw = document.querySelector("#confirm_pw_modal");

    if (current_pw.value != localStorage.getItem("password")) {
        current_pw.setCustomValidity("Wrong password");
        return false;
    }
    else {
        current_pw.setCustomValidity("");
        if (new_pw.value.length < 5 || new_pw.value.length > 15) {
        new_pw.setCustomValidity("Password must have 5-15 characters");
        return false;
        }
        else {
        new_pw.setCustomValidity("");
        if (new_pw.value != confirm_pw.value) {
            confirm_pw.setCustomValidity("Confirm password doesn't match");
            return false;
        }
        else {
            confirm_pw.setCustomValidity("");
            return true;
        } 
        }
    }
}


edit_info_form.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch("https://dramaholic.herokuapp.com/api/customers/" + current_user, {
        method: 'PUT',
        body: JSON.stringify(new FormData(edit_info_form))
    });

    let result = await response.json();
        alert(result.message);
};

change_pw_form.onsubmit = async (e) => {
    e.preventDefault();

    if (valid_pw()) {
        let data = {
            password:document.querySelector("#new_pw_modal").value
        }
        console.log(JSON.stringify(data))

        let response = await fetch(`https://dramaholic.herokuapp.com/api/customers/${current_user}/`, {
        method: "PUT",
        header: [
            {
                "Content-Type":"application/json",
            }
        ],
        body: JSON.stringify(data)
        });

        let result = await response.json();
        alert(result.message);
    } 
};