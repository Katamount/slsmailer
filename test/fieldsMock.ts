interface IFieldSet{
    phone: string;
    name: string;
    subject: string;
}
export function mockFields(): IFieldSet {
    return {name: "bob", phone: "4345555555", subject: "hi"};
}