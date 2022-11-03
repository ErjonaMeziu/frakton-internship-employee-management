export interface UserDataModel
{
    id: number,
    email: String     
    name: String
    password:String
    register_at:Date 
    is_approved: Boolean    
    role: String
    profile: String|null
}