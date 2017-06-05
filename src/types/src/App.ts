import { DIContainer } from './';

export interface App {
  init(mountElement: HTMLDivElement, container: DIContainer, callback: (status: boolean) => void): void;
  destroy(mountElement: HTMLDivElement): void;
}
