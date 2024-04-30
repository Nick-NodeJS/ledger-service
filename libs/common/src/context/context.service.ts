import { Request } from 'express';
import { RequestContext } from 'nestjs-request-context';

import { Injectable } from '@nestjs/common';

import { HEADER_REQUEST_ID } from '../common/constants';

@Injectable()
export class ContextService {
  getRequestHeaders() {
    const request: Request = RequestContext.currentContext?.req;
    if (!request) {
      return {};
    }

    const requestId = request[HEADER_REQUEST_ID];
    const url = request.originalUrl;

    return { requestId, url };
  }
}
