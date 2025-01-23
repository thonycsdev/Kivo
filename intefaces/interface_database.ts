import { QueryConfig, QueryResult } from 'pg';

export default interface InterfaceDatabase {
	query<T>(queryObject: QueryConfig): Promise<QueryResult<T>>;
}
