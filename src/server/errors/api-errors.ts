export class ApiErrors extends Error {
  constructor(message: string, public readonly statusCode: number) {
    super(message);
  }
}

export class Bad_Request extends ApiErrors {
  constructor(message: string) {
    super(message, 400);
  }
}

export class Not_Fould extends ApiErrors {
  constructor(message: string) {
    super(message, 404);
  }
}

export class Unauthorezid extends ApiErrors {
  constructor(message: string) {
    super(message, 401);
  }
}

export class Internal_Server_Error extends ApiErrors {
  constructor(message: string) {
    super(message, 500);
  }
}
