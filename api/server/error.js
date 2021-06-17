 module.exports = () => {
   return (err, req, res, next) => {
     //if error status is not specified then set it to 500 (server error)
     let status = req.errStatus ? req.errStatus : 500;
     res.status(status).json({error: err.message});
   }
 }
