export const todoContainer: any[] = [];
export let idGenerator = () => {
    return Math.floor((Math.random() * 10) * (10 * Math.random()) * (20 * Math.random()) * (100000 * Math.random()));
};