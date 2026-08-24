import type { FilterQuery, Model, UpdateQuery } from "mongoose";

export class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  create(data: Partial<T>) {
    return this.model.create(data);
  }

  findById(id: string) {
    return this.model.findById(id);
  }

  findOne(filter: FilterQuery<T>) {
    return this.model.findOne(filter);
  }

  findMany(filter: FilterQuery<T> = {}) {
    return this.model.find(filter).sort({ createdAt: -1 });
  }

  updateById(id: string, data: UpdateQuery<T>) {
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  deleteById(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
