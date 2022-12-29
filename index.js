/* Java script*/
let element = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);
let form2=document.getElementById("form");
var user_entry=[];
const retrive_user_entries=()=>{
    let entries=localStorage.getItem("user_entry");
    if(entries)
    {
        entries=JSON.parse(entries)

    }
    else{
        entries=[];
    }
    return entries;
};

const displayEntry=()=>{

    //let table = element("user-table");
    let entries = retrive_user_entries();
   
    const tentry=entries.map((entry)=>{
        const name='<td>${entry.name}</td>';
        const email='<td>${entry.email}</td>';
        const password='<td>${entry.password}</td>';
        const dob ='<td>${entry.dob}</td>';
        const termc='<td>${entry.termc}</td>';
        const record='<tr>${name} ${email}   ${password}    ${dob} ${termc} </tr> ';
        return record;
    }).join("\n");
   const table1=' <table><tr> <th>UserName</th> <th>Email</th> <th>Password</th>  <th>Date of Birth</th> <th>Accepted term</th> </tr>${tentry} </table>';
     let details=document.getElementById("user_entry");
     details.innerHTML=table1;
};
const saveform=(event)=>{
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;             
    const password=document.getElementById("password").value;
    const dob=document.getElementById("dob").value;
    const termc=document.getElementById("termc").checked;

    let currentYear= new Date().getFullYear();
    let dateofbirth =dob.split("-")[0];
    let byear = dateofbirth[0];
    let age =  (currentYear - byear)
    console.log({ age, currentYear, byear });
  if (age < 18 || age > 55) {
    document.getElementById("dob").style = "border:1px solid red";
    return alert("Your age must be under 18 and 55 years");
  } else {
    document.getElementById("dob").style = "border:none";
      const entry={
        name,
        email,
        password,
        dob,
        termc
    };
    user_entry = retrive_user_entries();
    user_entry.push(entry);
    localStorage.setItem("user_entry", JSON.stringify(user_entry));
    displayEntry();
    form2.reset();
  }
};
form2.addEventListener("submit",saveform);
displayEntry();

