
const form = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {        
        username: document.getElementById('username').value,        
        email: document.getElementById('email').value,        
        password: document.getElementById('password').value,        retypePassword: document.getElementById('retypePassword').value
    };

    console.log(formData + "i am in the register.js file")

    try {
        const response = await fetch('api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        console.log('This is the response variable' + response)
        console.log("I am in the register.js file")


        const data = await response.json();

        console.log('This is the data variable ' + data)

        if(response.ok) {
            alert('Registration successful. You can now log in.')
        } else {
            alert(data.message || 'Registration failed.')
        }
    }
    catch (error){
        console.log('Error:', error);
        alert('Error occurred, sort something out')
    }
})
