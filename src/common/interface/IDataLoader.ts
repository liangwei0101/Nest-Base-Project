/**
 * DataLoader 接口
 */
export interface IDataLoader<K, V> {
  load(id: K): Promise<V>;
}
