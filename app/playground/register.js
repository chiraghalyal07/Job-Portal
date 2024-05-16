const bcryptjs = require('bcryptjs')
const password = 'secret123'
console.log('password',password)
async function generateHash(){
    const salt = await bcryptjs.genSalt()
    const encrypted = await bcryptjs.hash(password,salt)
    console.log(encrypted)
}
generateHash()