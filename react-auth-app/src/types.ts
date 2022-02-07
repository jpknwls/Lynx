// ./src/types.ts

interface UserResponse {

 
  
};

export interface AccountResponse {
  id: string;
  email: string;
  username: string;
  links: String;
  is_active: boolean;
  created: Date;
  updated: Date;
  access: string;
  refresh: string;
}


/*

  export interface UserResponse {
    username: string
    links: string
   }


*/