// Checks if the created or updated idea exceeds a revenue of 1 Mio $
const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const totalRevenue = Number(numWeeks) * Number(weeklyRevenue);
    if (!numWeeks || !weeklyRevenue || isNaN(totalRevenue) || totalRevenue < 1000000) {
        res.status(400).send('Not valid input or not a million dollar idea');
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
