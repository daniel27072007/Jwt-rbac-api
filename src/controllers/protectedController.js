export const customerRoute = async (req, res) => {
    console.log('this is a route that customers have access');
    res.json({ message: 'Hello Customer'})
}

export const employeeRoute = async (req, res) => {
    console.log('this is a route that employees have access');
    res.json({ message: 'Hello Employee'})
}

export const adminRoute = async (req, res) => {
    console.log('this is a route that admins have access');
    res.json({ message: 'Hello Admin'})
}