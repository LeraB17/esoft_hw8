class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  // ресурс не найден
  static notFound(message) {
    return new ApiError(404, message);
  }

  // ошибка сервера
  static internal(message) {
    return new ApiError(500, message);
  }

  // для валидации :)
  static teapot(message) {
    return new ApiError(418, message);
  }
}

module.exports = ApiError;
