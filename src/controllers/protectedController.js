export const costumerRoute = async (req, res) => {
    console.log('this is a route that costumers have access');
    res.json({ message: 'Hello Costumer'})
}

export const employeeRoute = async (req, res) => {
    console.log('this is a route that employees have access');
    res.json({ message: 'Hello Employee'})
}

export const adminRoute = async (req, res) => {
    console.log('this is a route that admins have access');
    res.json({ message: 'Hello Admin'})
}