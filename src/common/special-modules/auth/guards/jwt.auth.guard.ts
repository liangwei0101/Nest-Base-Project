import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const restfulRequest = context.switchToHttp().getRequest();
    const ctx = GqlExecutionContext.create(context);
    const graphqlRequest = ctx.getContext().req;
    if (restfulRequest) {
      // restful
      return restfulRequest;
    } else if (graphqlRequest) {
			// graphql
      return graphqlRequest;
    }
  }
}
