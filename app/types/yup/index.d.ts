import 'yup';

declare module 'yup' {
  interface StringSchema {
    phoneNumber(): StringSchema;
  }
}
