import { getConnection } from "typeorm";

/**
* 获取数据库事务会话
*/
export const getTransactionQueryRunner = async () => {
  // get a connection and create a new query runner
  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();

  // establish real database connection using our new query runner
  await queryRunner.connect();

  // lets now open a new transaction:
  await queryRunner.startTransaction();

  return queryRunner;
}