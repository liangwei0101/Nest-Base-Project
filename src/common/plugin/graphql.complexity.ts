import { HttpStatus } from '@nestjs/common';
import { GraphQLSchemaHost, Plugin } from '@nestjs/graphql';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';
import { CustomException } from '../httpHandle/customException';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  requestDidStart(): GraphQLRequestListener {
    const { schema } = this.gqlSchemaHost;

    return {
      didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
        });
        // 一个 graphql 字段为一个复杂度，最多不能超过50个字段.
        if (complexity > 50) {
          throw new CustomException(`GraphQL query is too complex: ${complexity}. Maximum allowed complexity: 20`, HttpStatus.BAD_REQUEST);
        }
      },
    };
  }
}
