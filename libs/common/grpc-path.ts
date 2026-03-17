import { join } from 'path';

export const UserProtoPath = (user: string) => {
  return join(process.cwd(), `libs/proto/${user}.proto`);
};