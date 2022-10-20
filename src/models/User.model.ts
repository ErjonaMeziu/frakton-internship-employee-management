export default class UserModel {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    verified?: number;
    usage_plan!: string | null;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

    // Table name is the only required property.
    static tableName = 'users';

    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static jsonSchema = {
        type: 'object',
        required: ['name', 'email', 'password'],

        properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            created_at: { type: 'date' },
            updated_at: { type: 'date' },
            deleted_at: { type: 'date' },
        },
    };

    // This object defines the relations to other models. The relationMappings
    // property can be a thunk to prevent circular dependencies.
    static relationMappings = () => ({});
}
