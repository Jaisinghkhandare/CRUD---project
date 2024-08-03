
const user= localStorage.getItem("user");
//console.log(user,typeof user);
const uname=document.getElementById("username");
const userobj= JSON.parse(user);
uname.innerText= userobj.username;