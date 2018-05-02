export class Model {
  static deserialize<T extends Model>(source: any): T {
    const object = {};
    Object.keys(source).forEach(key => {
      object[key] = source[key];
    });
    return <T> object;
  }
}
