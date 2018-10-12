
class response {
    success(res, data, message) {
        return res.status(200).json({ message: message, data: data });
    }
    errorInternal(res, error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
    message(res, status, message) {
        return res.status(status).json({ message });
    }

}
response = new response();
module.exports = response;