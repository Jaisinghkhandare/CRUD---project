const loginButton = document.getElementById("login_button")
//console.log(loginButton);
const username = document.getElementById("username");
const password = document.getElementById("pass");
const registerButton = document.getElementById("register_button");


loginButton.addEventListener("click", async (event) => {


    if (username.value && password.value) {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                })
            });

            const data = await response.json();

            if (response.ok) {
                
                console.log('JWT Token:', data.token);
                const user = { username: username.value, token: data.token };
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "http://localhost:3000/profile";
            } else {
                alert(`Login failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while logging in');
        }
    }
});
registerButton.addEventListener("click" , (event)=>
{
    if(username.value && password.value)
    {
        
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
              username: username.value,
                password: password.value
            })
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            console.log(data);
            if(data.message === "User added successfully")
            {
                alert("succesfullyvvvv registered");
            }
            if(data.message === "Error adding user")
            {
                alert("error addding usssser");
            }
        })
            

    }
})