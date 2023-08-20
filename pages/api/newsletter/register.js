const registerHandler = (req, res) => {
  if (req.method === 'POST') {
    res.status(201).json({ message: 'Signed up!', email: req.body.email })
  }
}

export default registerHandler
