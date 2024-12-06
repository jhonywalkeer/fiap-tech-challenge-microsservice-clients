export class BaseEntity {
  constructor(
    public id: string,
    public create_at?: Date,
    public update_at?: Date,
    public deleted_at?: Date
  ) {}
}
