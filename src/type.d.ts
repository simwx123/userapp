
  
interface uList {
  id: number;
  name: string;
  username: string;
  email: string;
  address: any;
  phone: string;
  website: string;
  company: any;
}

  type UsersState = {
    users: uList[];
  };
  
  type UsersAction = {
    type: string;
    user: uList;
  };
  
  type DispatchType = (args: usersAction) => usersAction;
  