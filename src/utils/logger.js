const logger = (req, res, next) => {
	res.status(404).json({msg:"api is not founds"})
	console.log(`${req.method} ${req.url}`);
	next();
};

export default logger;

