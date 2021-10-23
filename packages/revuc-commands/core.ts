export type ICommand<Args> = { name: string; data: Args; __type: 'command'; };

export type IEvent<Args> = { name: string; data: Args; __type: 'event'; };

export type IQuery<Args> = { name: string; data: Args; __type: 'query'; };
