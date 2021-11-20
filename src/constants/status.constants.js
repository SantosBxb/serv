const _processResponse = (data) => {
	if (Array.isArray(data) || (typeof data === 'object' && data !== null)){
		return data;
	}
	if (data !== undefined && data !== null){
		return { message: data };
	}
	return undefined;
};

exports.Success = (res, data) =>
	res.status(200).json(_processResponse(data));
exports.SuccessNoContent = (res) => res.status(204).send();
exports.ErrorBadRequest = (res, error) =>
	res.status(400).json(_processResponse(error));
exports.ErrorBadParams = (res, error) =>
	res.status(422).json(_processResponse(error));
exports.InternalError = (res, error) =>
	res.status(500).json(_processResponse(error));
exports.NotFound = (res) => res.status(404).send();
exports.Unauthorized = (res) => res.status(401).send();
exports.UserNotReady = (res) => res.status(418).send();