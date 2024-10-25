const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const loginData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    try{
        const response = await fetch('api/auth/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })

        const data = await response.json();

        console.log('This is the data variable ' + data)

        if(response.ok) {
            alert('Registration successful. You can now log in.')
        } else {
            alert(data.message || 'Registration failed.')
        }
    }
    catch(error){
        console.log('Error: ', error)
    }
})