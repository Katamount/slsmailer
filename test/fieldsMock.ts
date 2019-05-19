interface IFieldSet{
    phone: string;
    name: string;
    subject: string;
}
export function fieldsMock(): IFieldSet {
    return {name: "bob", phone: "4345555555", subject: "hi"};
}