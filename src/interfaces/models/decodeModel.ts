export interface DecodeDataModel
{
    payload: {
        role: string;
        user_id: number;
    },
    iat: number;
    exp: number;
}
