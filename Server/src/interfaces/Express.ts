import { Request as Req, Response as Resp } from 'express';

export interface Request extends Req {
  userId?: String;
  body: any;
  params: any;
}

export interface Response extends Resp {
  message: String;
  data: any;
  isError: boolean;
}
