const asyncHandler = (func) => {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch((err) => next(err))
    }
}

export default asyncHandler; 

// const asyncHandler = (func) => {
//     async (req,res,next) => {
//         try {
//             await func(req,res,next)
//         } catch (err) {
//             res.status(err.code || 500).json({
//                success: false,
//                message: err.message
//             })
//         }
//     }
// }
