export type DbErrors = {
  code: string;
  message: string;
};

export const dataBaseErrors: Array<DbErrors> = [
  {
    code: '23505',
    message: 'already exists',
  },
];
