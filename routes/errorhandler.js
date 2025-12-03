// middleware/errorHandler.js (ESM)
export default function errorHandler(err, req, res, next) {
  // log the full error (adjust/remove in production)
  console.error(err);

  // Handle Mongo duplicate key error (e.g., unique email)
  if (err?.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
      fields: err.keyValue ?? {}
    });
  }

  // Send error response
  res.status(err?.status || 500).json({
    message: err?.message || "Internal Server Error"
  });
}