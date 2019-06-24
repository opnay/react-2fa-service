export class LocalStorageManager {
  private readonly _key: string;

  constructor(storageKey: string) {
    this._key = storageKey;
  }

  get key(): string {
    return this._key;
  }

  get value(): string {
    const data = localStorage.getItem(this._key) || '';

    // sometimes saved 'undefined'
    if (data === 'undefined') {
      localStorage.removeItem(this._key);
      return '';
    }

    return data;
  }

  set value(value: string) {
    if (!value || value === 'undefined') {
      localStorage.removeItem(this._key);
    } else {
      localStorage.setItem(this._key, value);
    }
  }
}

export const tokenListStorage = new LocalStorageManager('tk-list');
