import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'fs';

export class FileManager {
  private path = `${__dirname}/../../../`;

  exists(file: any): boolean {
    const route = `${this.path}${file}`;
    return existsSync(route);
  }

  existsOrCreate(path: any): boolean {
    const route = `${this.path}${path}`;
    try {
      if (existsSync(route)) {
        return true;
      }
      mkdirSync(route, { recursive: true });
      return true;
    } catch (e) {
      return false;
    }
  }

  move(origin: any, destination: any): boolean {
    try {
      const routeOrigin = `${this.path}${origin}`;
      const routeDestination = `${this.path}${destination}`;
      const fileOld = readFileSync(routeOrigin);
      writeFileSync(routeDestination, fileOld);
      return true;
    } catch (e) {
      return false;
    }
  }

  moveAndDelete(origin: any, destination: any): boolean {
    try {
      const routeOrigin = `${this.path}${origin}`;
      const routeDestination = `${this.path}${destination}`;
      const fileOld = readFileSync(routeOrigin);
      writeFileSync(routeDestination, fileOld);
      unlinkSync(routeOrigin);
      return true;
    } catch (e) {
      return false;
    }
  }

  compare(before: any, after: any): boolean {
    const fileBefore = `${this.path}${before}`;
    const fileAfter = `${this.path}${after}`;
    return fileBefore === fileAfter;
  }

  delete(file: any, fileBefore: any | null): boolean {
    try {
      const before = `${this.path}${fileBefore}`;
      const after = `${this.path}${file}`;
      if (this.exists(file) && this.exists(fileBefore) && before !== after) {
        unlinkSync(before);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  remove(file: any): boolean {
    try {
      unlinkSync(file);
      return true;
    } catch (e) {
      return false;
    }
  }
}
