export interface MenuItem {
  icon?: { name: string };
  text: string;
  action?: () => void;
}
