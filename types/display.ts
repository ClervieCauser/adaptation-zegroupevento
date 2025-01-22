import { Order } from "./order";

export type DisplayMode = '1' | '2' | '3' | '4';

export type DisplayConfig = {
    mode: DisplayMode;
    selectedOrders: string[];
    displayedOrders: {[key: string]: Order};
};
