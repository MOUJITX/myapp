import { UUIDv4 } from './uuid';

export const randomString = () => Math.random().toString(36).slice(2);

export const randomUUID = () => UUIDv4();
