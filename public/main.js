
const socket = io()
let username = ''
let userList = []

loginPage.style.display = 'flex'
chatPage.style.display = 'none'
loginInput.addEventListener('keyup', (e)=>{
   if(e.key==='Enter'){
    if(loginInput.value){
    socket.emit('user-enter',{name:loginInput.value, role:role.value})
    document.title = `Chat ${role.value} - ${loginInput.value}`
    loginPage.style.display = 'none'
    chatPage.style.display = 'flex'
   }}
})

socket.on('users-logged-in', (user)=>{
    headerChatbot.innerHTML = `Chatbot ${user.role} -  Bem-vindo, ${user.name}!`
    userList.push(user)
    inputText.focus()
})


socket.on('users-logged-in',(user)=>{
    inputText.addEventListener('keyup', (e)=>{
        if(e.key==='Enter'){
          if(user.id === socket.id&&user.role === 'Cliente'){
            handleClienteMsg(inputText.value)
          }
        }
    })

})
async function handleClienteMsg(msg){
    let response = await fetch('http://127.0.0.1:5000/chatbot',{method:'POST', headers:{'Content-Type': 'application/json'}, body:JSON.stringify({msg})})
    let data = await response.json()
    console.log(data)
}