import { UUIDv4 } from './uuid';

export const randomString = () => Math.random().toString(36).slice(2);

export const randomStringNumber = () => UUIDv4().replace(/[^0-9]/g, '');

export const randomUUID = () => UUIDv4();

export const stringFormat = (
  label: string,
  type: 'lowAll' | 'upAll' | 'upFirst' | 'upFirstOnly'
) => {
  if (type === 'lowAll') {
    return label.toLowerCase();
  }

  if (type === 'upAll') {
    return label.toUpperCase();
  }

  if (type === 'upFirst') {
    return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
  }

  if (type === 'upFirstOnly') {
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
};
