/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const validator = require('validator')

const user = {
    name: 'hello',
    email: 'hello@hi.io',
    address: 'dhaka'
}

module.exports = {
    data(req, res) {
        if (!user) {
            return res.status(404).json({ error: 'no user found!' })
        }

        return res.json(user)
    },
    create(req, res) {
        const { name, email, address } = req.body

        if (name && validator.isEmail(email) && address) {
            return res.json({ message: 'success' })
        }

        return res.status(400).json({ error: 'required field missing or invalid email' })
    },
    update(req, res) {
        const fields = ['name', 'email', 'address']

        if (req.body.email) {
            if (!validator.isEmail(req.body.email)){
                return res.status(400).json({ error: 'invalid email' })
            }
        }

        const data = { ...req.body }
        const required = Object.keys(data).every(key => fields.includes(key))
        
        if (required) {
            return res.json({
                ...user,
                ...req.body
            })
        }

        return res.status(400).json({ error: 'required field missing or invalid key(s)' })
    }
};

